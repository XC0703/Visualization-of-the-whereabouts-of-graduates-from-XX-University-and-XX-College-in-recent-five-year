// 右盒子_下面_平均工资模块
function fun_wagechart(data_wage){
    // 随机颜色
    let randcolor=(dataIndex) => {
      const colorAry=[];
      for(let k=0;k<20;k++){
        let r = 100 + ~~(Math.random() * 100);
        let g = 135 + ~~(Math.random() * 100);
        let b = 100 + ~~(Math.random() * 100);
        colorAry.push(`rgb(${r}, ${g}, ${b})`);
      }
      return colorAry[dataIndex];
    };
    // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".right_lower_part .chart"));
    myChart.clear();//记得清除上一次的视图
    // 2.指定配置和数据
    let option = {
      legend: {
        data: ['平均工资(单位:元/年)'],
        left: 'right',
        top:'0%',
        textStyle:{
          color:'#fff'
        }

      },
      grid: {
        show: false,
        top: 10,
        bottom: 10,
      },
      xAxis: [
        {
          gridIndex: 0,
          type: "value",
          show: false,
          min: 2000,
          max: 20000,
          nameLocation: "middle",
          nameGap: 5,
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
          nameLocation: "middle",
          nameGap: 0,
        },
      ],
      tooltip:{
        trigger:'item',
        formatter: function (params) { 
          return params.name + ' : '+params.value[0]; 
        } 
      },
      series: [
        {
          name:'平均工资(单位:元/年)',
          type: "scatter",
          symbol: "circle",
          colorBy:"data",
          symbolSize: (value,params) => {//让工资大小与球的大小挂钩
            return Math.sqrt(value[0]);
          },
          label: {
              show: true,
              formatter: "{b}\n{@0}",
              color: "#fff",
              textStyle: {
                fontSize: "12",
              },
          },
          itemStyle: {
              color:(e)=>{return randcolor(e.dataIndex)},
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
            },
          },
          data: data_wage
        },
      ],
    };
    // 3.把配置给实例对象
    myChart.setOption(option);
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
      myChart.resize();
    });
}
export {fun_wagechart}