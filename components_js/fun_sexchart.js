// 右盒子_右下角_性别比例图模块
function fun_sexchart(data_sexchart) {
    var myChart = echarts.init(document.querySelector('.sex_part .chart'));
    var symbols = [
      'path://M512 88m-88 0a88 88 0 1 0 176 0 88 88 0 1 0-176 0Z M744.9 619.6c-21.3 5.7-43.3-6.9-49-28.3l-64.1-239c-1.2-4.5-7.9-3.6-7.9 1V1008c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16V640c0-8.8-7.2-16-16-16s-16 7.2-16 16v368c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16V353.3c0-4.7-6.7-5.6-7.9-1l-64.1 239c-5.7 21.3-27.7 34-49 28.3-21.3-5.7-34-27.6-28.3-49l69.5-260C339 240.7 402.4 192 474.8 192h74.3c72.5 0 135.9 48.7 154.6 118.7l69.5 260c5.7 21.3-6.9 43.2-28.3 48.9z',
      'path://M511.6 190.5c-39.4 0-71.3-39.9-71.3-89.1 0-49.2 31.9-89.1 71.3-89.1s71.3 39.9 71.3 89.1c0 49.2-31.8 89.1-71.3 89.1zM706 500.3c12.4 51-42.5 72.1-55.7 23l-53.8-216h-17.2l94.3 379.5h-88.7V972c0 51.6-63.2 51.6-63.2 0V686.7h-20.4v285.2c0 51.6-65.4 51.6-65.4 0V686.7H349.5l92.4-379.5H427l-53.6 216c-13.6 48-68.6 28.1-55.8-23.1L377.7 266c7-27.1 35.8-73.3 86-75.5h96.6c48.6 2.1 77.7 48.8 85.7 75.3l60 234.5z m0 0'
    ];
    var bodyMax = 400;//指定图形界限的值
    var labelSetting = {
            show: true,
            position: 'bottom',
            offset: [20, 4],
            formatter: function (param) {
              return '('+((param.value / bodyMax) * 100).toFixed(0) + '%)';
            },
            textStyle: {
                fontSize: 10,
                fontFamily: 'Arial',
                color: '#686868'
            }
    };
    var markLineSetting = { //设置标线
        symbol: 'none',
        lineStyle: {
            normal: {
                opacity: 0.3
            }
        },
        data: [{
            type: 'max',
            label: {
                formatter: 'max: {c}'
            }
        }, {
            type: 'min',
            label: {
                formatter: 'min: {c}'
            }
        }]
    };
    let option = {
        grid: {
            // left: '20%',
            // right: '20%',
            top: '13%',
            bottom: '0',
            left: '1%',
            right: '1%',
            containLabel: true
        },
        xAxis: {
            data: ['男', '女'],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                },
            }
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisTick: {
                // 刻度线
                show: false
            },
            axisLine: {
                // 轴线
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#00badb',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#393d60',
                    opacity:'0.4'
                },
            }
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter:"{b}:{c}",
            axisPointer: {
                type: 'none',
            }
        },
        series: [
            {
                name: '男女比例',
                type: 'pictorialBar',
                symbolClip: true,
                symbolBoundingData: bodyMax,
                label: labelSetting,
                barWidth: '45',
                z: 10,
                data: [
                    {
                        value: data_sexchart[0].value,
                        symbol: symbols[0],
                        itemStyle: {
                            normal: {
                                color:'rgba(99,184,255)' //单独控制颜色
                            }
                        }
                    },
                    {
                        value: data_sexchart[1].value,
                        symbol: symbols[1],
                        itemStyle: {
                            normal: {
                                color: 'rgb(255,128,98)' //单独控制颜色
                            }
                        }
                    }],
                markLine: markLineSetting,
                z: 10
            },
            {
                // 设置背景底色，不同的情况用这个
                name: 'full',
                type: 'pictorialBar', //异型柱状图 图片、SVG PathData
                symbolBoundingData: bodyMax,
                animationDuration: 0,
                barWidth: '45',
                itemStyle: {
                    normal: {
                        color: '#ccc' //设置全部颜色，统一设置
                    }
                },
                z: 10,
                data: [{
                    itemStyle: {
                        normal: {
                            color: 'rgba(99,184,255,0.30)' //单独控制颜色
                        }
                    },
                    value: 400,
                    symbol: symbols[0]
                },
                    {
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,128,98,0.30)' //单独控制颜色
                            }
                        },
                        value: 400,
                        symbol: symbols[1]
                    }
                ]
            }
        ]
    }
    myChart.setOption(option);
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
      myChart.resize();
    });
};
export {fun_sexchart}