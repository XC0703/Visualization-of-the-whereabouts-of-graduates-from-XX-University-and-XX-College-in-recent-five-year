import {gdpChart} from './fun_gdpchart.js'

//这段代码是为了解决地图中不能使用name属性来识别触发另一个图表dispatchAction的问题，
//只能使用dataIndex触发，通过多方考证，发现完全是echarts自身的问题，
//已经向echarts官网提交issue了，不知道什么时候解决
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
var gdpData;
$.ajaxSetup({async:false});//将getJson函数的执行方式改为同步执行，即可对外面的变量进行赋值操作
$.getJSON('../data/data_gdp.json',data=>{
  gdpData=deepCopy(data);
})
$.ajaxSetup({async:true});//将执行方式改回异步执行即可
// gdp数据初始化
var obj_gdp=gdpData[4];
// 将省份gdp数组提取(即改成函数需要的参数格式)
function getgdp(){
  var data_gdp_name = new Array();
  obj_gdp.data.sort((a,  b)  =>  {  //使按照gdp大小进行排序
    return  b.value-a.value 
  })
  for(let key in obj_gdp.data){
    data_gdp_name.push(obj_gdp.data[key].name);
  }
  return data_gdp_name
}
// 点击切换效果-年份
$(".footlist").on("mousedown","li",function(){
  if($(this).index()!=0){
    obj_gdp = gdpData[$(this).index()-1];
  }
});
// 查找柱状图中对应的索引值
function findIndex(data,name){
  for (var i = 0; i < data.length; i++) {
    if(data[i]==name){
      return i;
    }
  }
}

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
      // console.log(gdpChart._chartsViews[0].type)
      if(gdpChart._chartsViews[0].type=="bar"){//这行判断是为了解决联动时和散点图也联动的问题
        gdpChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex:findIndex(getgdp(),params.name),//能触发
          // name:params.name//不能触发
      })
      }
    });
    mapChart.on('mouseout',function (params) {
      gdpChart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        dataIndex:findIndex(getgdp(),params.name),//能触发
        // name:params.name//不能触发
    })
    });
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
        mapChart.resize();
    });
};
export {fun_map,mapChart}