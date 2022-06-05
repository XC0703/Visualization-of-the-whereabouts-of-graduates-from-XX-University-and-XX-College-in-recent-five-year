// 右盒子_左上角_饼图模块
function fun_pie(data_pie){
    // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".pie .chart"));  
    // 2.指定配置和数据
    let option = {
      // 也可以通过color数组直接设置颜色
      color: [
        "#ffc72b",
        "#0b5263",
        "#F8456B",
        "#49dff0",
        "#00ffb4",
        "#FF8352",
        "#0E7CE2",
        "#b0a4e3",
        "#d6ecf0",
        "#bce672",
        "#21a675",
        " #8d4bbb"
      ],
      tooltip: {
        // 不是轴触发了，因此改为item
        trigger: 'item',
        // 触发时顺便显示百分比
        formatter:'{b}:{c}({d}%)',
      },
      legend: {
        // 距离底部为0%
        bottom: '0%',
        // 小图标的宽度和高度
        itemWidth: 10,
        itemHeight: 10,
        // 修改图例组件的文字为 12px
        textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "10"
        },
        // // legend 中的data  可省略，因为series里面有name属性了
        // data: ["国有企业", "民营企业", "三资企业", "党政机关", "教育单位","医疗卫生单位","其它"],
      },
      series: [
        {
          type: "pie",
          // 设置饼形图在容器中的位置
          center: ["50%", "40%"],
          // 设置饼形图在容器中的位置，第一个值为内圆半径，第二个值为外圆半径
          // 百分比是相对于容器大小来说
          radius: ["35%", "65%"],
          // avoidLabelOverlap: false,
          // 不显示标签文字
          label: {
            show: false,
            position: 'center'
          },
          // 不显示连接线
          labelLine: {
            show: false
          },
          //  series 中的数据
          data:data_pie,
        }
      ]
    };
    // 3.把配置给实例对象
    myChart.setOption(option);
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
      myChart.resize();
    });
};
export {fun_pie}