import {fun_sunburst} from '../components_js/fun_sunburst.js'
import {fun_pie} from '../components_js/fun_pie.js'
import {fun_wordCloud} from '../components_js/fun_wordCloud.js'
import {fun_map} from '../components_js/fun_map.js'
import {fun_sexchart} from '../components_js/fun_sexchart.js'
import {fun_gdpchart} from '../components_js/fun_gdpchart.js'
import {fun_wagechart} from '../components_js/fun_wagechart.js'
import {fun_line} from'../components_js/fun_line.js'

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
var studentData;
var gdpData;
var wageData;
$.ajaxSetup({async:false});//将getJson函数的执行方式改为同步执行，即可对外面的变量进行赋值操作
$.getJSON('../data/data_student.json',data=>{
  studentData=deepCopy(data);
})
$.getJSON('../data/data_gdp.json',data=>{
  gdpData=deepCopy(data);
})
$.getJSON('../data/data_wage.json',data=>{
  wageData=deepCopy(data);
})
$.ajaxSetup({async:true});//将执行方式改回异步执行即可

// 学生数据初始化
var obj_student=studentData[5];
fun_line(obj_student);
fun_pie(obj_student.data_pie);
fun_map(obj_student.data_map);
fun_wordCloud(obj_student.data_wordCloud);
fun_sexchart(obj_student.data_sexchart);
fun_sunburst(obj_student.data_sunburst,obj_student);

// gdp数据初始化
var obj_gdp=gdpData[4];
// 将省份gdp数组提取(即改成函数需要的参数格式)
function getgdp(){
  var data_gdp_name = new Array();
  var data_gdp_value = new Array();
  obj_gdp.data.sort((a,  b)  =>  {  //使按照gdp大小进行排序
    return  b.value-a.value 
  })
  for(let key in obj_gdp.data){
    data_gdp_name.push(obj_gdp.data[key].name);
    data_gdp_value.push(obj_gdp.data[key].value)
  }
  return {data_gdp_name,data_gdp_value}
}
fun_gdpchart(getgdp().data_gdp_name,getgdp().data_gdp_value);

// 平均工资数据初始化
var obj_wage=wageData[4];
// 将平均工资提取(即改成函数需要的参数格式)
function getwage(){
  console.log(obj_wage)
  const obj_wage_clone = JSON.parse(JSON.stringify(obj_wage));//记录原本的对象，深拷贝
  var data_wage_value = new Array();
  let len = obj_wage_clone.data.length;
  for(let i=0;i<len;i++){
    data_wage_value[i] = new Array();
  }
  for(let key in obj_wage_clone.data){
    data_wage_value[key][0]=obj_wage.data[key].value;
    data_wage_value[key][1]=parseInt(Math.random()*(90-10+1)+10);//随机产生纵坐标，更有层次感
  }
  for(let key in obj_wage_clone.data){
    obj_wage_clone.data[key].value=data_wage_value[key];
  }
  var data_wage=obj_wage_clone.data;
  return data_wage
}

// 点击切换效果-年份
var lis1 = document.querySelectorAll('.footlist li');
$(".footlist").on("mousedown","li",function(){
  // 设置下标为i的项有cur
  for (var i = 0; i < lis1.length; i++) {
    if (i == $(this).index()) {
        lis1[i].className = 'current';
    } else {
        lis1[i].className = '';
    }
  }
  lis2[0].className = 'current';
  lis2[1].className = '';
  obj_student = studentData[$(this).index()];
  if($(this).index()!=0){
    obj_gdp = gdpData[$(this).index()-1];
    obj_wage = wageData[$(this).index()-1];
  }
  fun_line(obj_student);
  fun_pie(obj_student.data_pie);
  fun_map(obj_student.data_map);
  fun_wordCloud(obj_student.data_wordCloud);
  fun_sexchart(obj_student.data_sexchart);
  fun_sunburst(obj_student.data_sunburst,obj_student);
  fun_gdpchart(getgdp().data_gdp_name,getgdp().data_gdp_value);
});

// 点击切换效果-gdp/平均工资
var lis2 = document.querySelectorAll('.right_lower_part li');
$(".rlplist").on("click","li",function(){
  // 设置下标为i的项有cur
  for (var i = 0; i < lis2.length; i++) {
    if (i == $(this).index()) {
        lis2[i].className = 'current';
    } else {
        lis2[i].className = '';
    }
  }
  if($(this).index()==0){
    fun_gdpchart(getgdp().data_gdp_name,getgdp().data_gdp_value);
  }else{
    fun_wagechart(getwage());
  }
});
// console.log(echarts.version)//echarts版本











