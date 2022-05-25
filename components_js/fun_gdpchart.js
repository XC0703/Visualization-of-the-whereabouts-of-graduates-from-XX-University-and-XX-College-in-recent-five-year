import {mapChart} from './fun_map.js'
let gdpChart;
// 右盒子_下面_GDP模块
function fun_gdpchart(data_gdp_name,data_gpa_value){
    // 1.实例化对象
    gdpChart = echarts.init(document.querySelector(".right_lower_part .chart"));  
    gdpChart.clear();//记得清除上一次的视图
    // 2.指定配置和数据
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        }
      },
      legend: {
          data:['地区生产总值(单位:亿元)'],
          left:'right',
          top:'0%',
          textStyle:{
            color:'#fff'
          }
      },
      grid: {
          left: '0%',
          right: '4%',
          top:'5%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        // show:false,
        data: data_gdp_name,
        fontSize:2
      },
      series: [
        {
          name: '地区生产总值(单位:亿元)',
          type: 'bar',
          data: data_gpa_value,
          realtimeSort:true,
          barGap:0.4,
        }
      ]
    };
    // 3.把配置给实例对象
    gdpChart.setOption(option);
    gdpChart.on('mouseover',function (params) {
      mapChart.dispatchAction({
        type: 'select',
        seriesIndex: 0,
        // dataIndex:params.dataIndex,//能触发
        name:params.name//能触发
    })
    })
    gdpChart.on('mouseover',function (params) {
      mapChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        // dataIndex:params.dataIndex,//能触发
        name:params.name//能触发
    })
    })
    gdpChart.on('mouseout',function (params) {
      mapChart.dispatchAction({
        type: 'mapUnSelect',
        seriesIndex: 0,
        // dataIndex:params.dataIndex,//能触发
        name:params.name//能触发
    })
    })
    gdpChart.on('mouseout',function (params) {
      mapChart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        // dataIndex:params.dataIndex,//能触发
        name:params.name//能触发
    })
    })
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
      gdpChart.resize();
    });
}
export {fun_gdpchart,gdpChart}