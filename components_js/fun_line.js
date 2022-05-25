import{fun_hotwords} from './fun_hotwords.js'
//导入本地数据
// 深拷贝函数
// 类型判断
function judgeType (data) {
	return Object.prototype.toString.call(data).slice(8, -1)
}
// 递归实现深拷贝
function deepCopy (param) {
	let np = judgeType(param) === 'Array'? []:{}
	for (let i in param) {
		if (['Array','Object'].includes(judgeType(param[i]))) {
			np[i] = deepCopy(param[i])
		} else {
			// 包括函数，也在此直接赋值
			np[i] = param[i]
		}
	}
	return np
}
var hotwordsData;
$.ajaxSetup({async:false});//将getJson函数的执行方式改为同步执行，即可对外面的变量进行赋值操作
$.getJSON('../data/data_hotwords.json',data=>{
    hotwordsData=deepCopy(data);
})
$.ajaxSetup({async:true});//将执行方式改回异步执行即可
// 为了防止变量命名污染，可以使用立即执行函数
// 左盒子_上面_折线图模块
function fun_line(obj_student){
    //以下是后台送过来数据（ajax请求过来的)
    var data_line = [
        // 四个数组是因为有两条线，两个柱子
        [124, 240, 201, 134,256],
        [230, 164, 191, 324,235],
        [46, 48, 55, 50,60],
        [54, 52, 45, 50,40],
      ];
    const xAxisData =['2017', '2018', '2019', '2020', '2021'];
    // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".leftbox .left_upper_part .chart"));
    // 2.指定配置和数据
    let option = {
        // 通过这里直接设置颜色
        color: ['#00f2f1', '#ed3f35',"#0E7CE2","#ffc72b"],
        emphasis: {
          itemStyle: {
            color: "white",//柱条颜色，设置为柱图颜色则取消高亮
        }
        },
        tooltip: {
          trigger: 'axis',
          // 判断是否会显示出百分比
          formatter: function (params) {
            let html=params[0].name+"<br>";
            for(let i=0;i<params.length;i++){
              html+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+params[i].color+';"></span>'
              if(params[i].seriesName=="就业率"||params[i].seriesName=="深造率"){
                html+=params[i].seriesName+":"+params[i].value+"%<br>";
              }else{
                html+=params[i].seriesName+":"+params[i].value+"<br>";
              }
            }
            return html;
          }
        },
         // 图例组件
        legend: {
            // 如果series有name属性，则legend可以不用写data值
            // data:['新增粉丝','新增游客'],
            textStyle: {
              color: '#4c9bfd', // 图例文字颜色
              fontSize: 8,
            },
            itemHeight: 8,//图例大小
            right: '10%' // 距离右边10%
        },
        // 设置网格样式
        grid: { 
            top: '15%',
            left: '3%',
            right: '3%',
            bottom: '3%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,//不用去除轴间距
          triggerEvent: true,
          data: ['2017', '2018', '2019', '2020', '2021'],
          axisTick: {
            show: false // 去除刻度线
          },
          axisLabel: {
            color: function (value) {
              return (value === obj_student.year) ? '#00ff7f' : '#4c9bfd';
          },
            interval:0//使横坐标显示完全
          },
          axisLine: {
            show: false // 去除轴线
          },
        },
        yAxis: [
        {
          type: 'value',
          min: 0,
          max: 400,
          interval:50,
          axisTick: {
            show: false,  // 去除刻度
          },
          axisLabel: {
            color: 
            '#4c9bfd', // 文字颜色
          },
          splitLine: {
            lineStyle: {
              color: '#012f4a' // 分割线颜色
            }
          }
        },
        {
          type: 'value',
          min: 0,
          max: 100,
          interval: 25,
          axisLabel: {
              color: '#4c9bfd', // 文字颜色
          },
          axisTick: {
            show: false,  // 去除刻度
          },
          splitLine: {
            show:false
          }
        }
        ],
        series: [
          {
            name: '就业人数',
            type: 'bar',
            barWidth:12,
            data: data_line[0]
          },
          {
            name: '深造人数',
            type: 'bar',
            barWidth:12,
            data: data_line[1]
          },
          {
            name: '就业率',
            type: 'line',
            smooth:true,
            yAxisIndex:1,//对齐右边Y轴
            data: data_line[3]
          },
          {
            name: '深造率',
            type: 'line',
            smooth:true,
            yAxisIndex:1,//对齐右边Y轴
            data: data_line[2]
          }
        ]
    };
    // 3.把配置给实例对象
    myChart.setOption(option);
    window.addEventListener("mouseup", function(){
      myChart.setOption(option);
    })
    // 注册 mouseover 事件，类目轴名称切换为自定义颜色
    myChart.on('mouseover', params => {
      if (params.componentType === 'xAxis') {
          const xAxisName = params.value
          const xAxisItem = {
            value: xAxisName,
            textStyle: {
              color: '#00ff7f'
            }
          }
          const index = xAxisData.findIndex(item => {
            return item === xAxisName || item.value === xAxisName
          })
          var hot_words_part=document.getElementsByClassName("hot_words_part");    
          for (var i = 0; i<hot_words_part.length;i++) {
            hot_words_part[i].style.display="block";
          };
          fun_hotwords(hotwordsData[index].data);
          xAxisData.splice(index, 1, xAxisItem)
          option.xAxis.data = JSON.parse(JSON.stringify(xAxisData))
          myChart.setOption(option)
      }
    })
    // 注册 mouseout 事件，类目轴名称恢复默认颜色
    myChart.on('mouseout', params => {
      if (params.componentType === 'xAxis') {
        const xAxisName = params.value
        const index = xAxisData.findIndex(item => {
          return item === xAxisName || item.value === xAxisName
        })
        var hot_words_part=document.getElementsByClassName("hot_words_part");
        for (var i = 0; i<hot_words_part.length;i++) {
          hot_words_part[i].style.display="none";
        };
        xAxisData.splice(index, 1, xAxisName)
        option.xAxis.data = JSON.parse(JSON.stringify(xAxisData))
        myChart.setOption(option)
      }
    })
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
        myChart.resize();
    });
};
export {fun_line}