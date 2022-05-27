import {fun_pie} from './fun_pie.js'
import {fun_wordCloud} from './fun_wordCloud.js'
import {fun_map} from './fun_map.js'
import {fun_sexchart} from './fun_sexchart.js'

// 左盒子_下面_旭日图模块
function fun_sunburst(data_sunburst,obj_student){
    // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".leftbox .left_lower_part .chart")); 
    // 2.指定配置和数据
    let option = {
      tooltip: {
        show: true,
        formatter: function (item) {
          // console.log(item);
          return `${item.name}:${item.value}`;
        },
      },
      series: [
        {
          type: "sunburst",
          center: ["50%", "50%"],
          data: data_sunburst,
          // nodeClick:false,
          // 对于鼠标所在的扇形块，会使用 emphasis 样式；对于其他相关扇形块，则会使用 highlight 样式
          // 占据的位置 文字设置
          label: {
            minAngle:6,//当小于该角度时不显示
            position: 'center',
            distance:10,
            rotate: "radial",
            color: "#fff",
            fontSize: 14,
          },
          // 旭日图的分割线
          itemStyle: {
            borderColor: '#024366',
            borderWidth: 2,
          },
          levels: [
            // 这里是设置 每一层的样式，层级低于单独在data里面的
            // 第一个空数据是 占据下钻的位置
            {
              r0:0,
              r:10,
              itemStyle: {
                color:'#4F94CD'
              },
            },
            {
              r0:0,
              r:30,
              label: {
                rotate: 0
              },
              itemStyle: {
                color:'#F98862'
              },
            },
            {
              r0: 30,
              r: 80,
              itemStyle: {
                color:'#AEC48F'
              },
            },
            {
              r0: 80,
              r:255,
              itemStyle: {
                color: 	'#FFDB5C',
              },
            },
            {
              r0:255,
              r:260,
              label: {
                show:false,
              },
              itemStyle:{
                color:'orange',
                borderWidth: 0,
              },
            }
          ],
        },
      ],
    }; 
    // 3.点击旭日图板块  
    myChart.off("click");//解决多次触发叠加
    myChart.on("click", function(item) {
        if(item.dataIndex!=1){
          // console.log(obj_student);
          fun_pie(item.data.data_pie);
          fun_map(item.data.data_map);
          fun_wordCloud(item.data.data_wordCloud);
          fun_sexchart(item.data.data_sexchart);
        }else{
          // console.log(obj_student);
          fun_pie(obj_student.data_pie);
          fun_map(obj_student.data_map);
          fun_wordCloud(obj_student.data_wordCloud);
          fun_sexchart(obj_student.data_sexchart);
        }
    });
    // 4.把配置给实例对象
    myChart.setOption(option);
    // 5.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
        myChart.resize();
    }); 
};
export {fun_sunburst}