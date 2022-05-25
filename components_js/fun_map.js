import {gdpChart} from './fun_gdpchart.js'
let mapChart;
// 右盒子_左下角_热力图模块
function fun_map(data_map){
    // 1.实例化对象
    mapChart = echarts.init(document.querySelector(".map .chart"));
    //2.指定配置和数据
    let option = {
      tooltip: { 
        trigger: 'item', 
        formatter: function (params) { 
            if(params.value){ 
              return params.name + ' : ' + params.value; 
            }else{ 
              return params.name + ' : 0'; 
            } 
        } 
      },
      legend: {
          orient: 'vertical',
          x:'left',
          left:5,
          top:30,
          itemWidth: 8,
          itemHeight: 5, 
          textStyle: {
            color: '#1089E7', // 图例文字颜色
            fontSize: 10,
          },
      },
      layoutCenter: ['63%', '50%'],//距离左右，上下距离的百分比
      layoutSize:'125%',//map百分比大小
      dataRange: {
          x: 'left',
          y: 'bottom',
          itemWidth: 15,
          itemHeight: 8,
          textStyle:{
            fontSize:10,
            color:'#1089E7'
          },
          splitList: [
              {start: 70},
              {start: 40, end: 70},
              {start: 20, end: 40},
              {start: 10, end: 20},
              {start: 0, end: 10},
              {start: 0, end: 0},
          ],
          color: ['#ff3333','#ff6633','#ff9933','#ffcc33','#ffff33','white'],
      },
      series : [
          {
              name: '各省人数',
              type: 'map',
              mapType: 'china',
              roam: true,
              showLegendSymbol: false,
              labelLayout:{
                show:false,
                fontSize:8,
              },
              data:data_map,
          }
      ]
    };  
    // 3.把配置给实例对象
    mapChart.setOption(option);
    mapChart.on('mouseover',function (params) {
      gdpChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        // dataIndex:params.dataIndex,//能触发
        name:params.name//不能触发
    })
    });
    mapChart.on('mouseout',function (params) {
      gdpChart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        // dataIndex:params.dataIndex,//能触发
        name:params.name//不能触发
    })
    });
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
        mapChart.resize();
    });
};
export {fun_map,mapChart}