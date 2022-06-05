// 右盒子_右上角_词云图模块
function fun_wordCloud(data_wordCloud){
    // 随机颜色
  let randcolor = () => {
  let r = 100 + ~~(Math.random() * 100);
  let g = 135 + ~~(Math.random() * 100);
  let b = 100 + ~~(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b})`;
  };
    // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".wordcloud .chart"));  
    
    // // 四分法解决数据分配不均匀的问题
    // const blackcolor = ['#000000', '#2a2a2a', '#545454', '#7e7e7e']
    // const redcolor = ['rgb(249,8,8)', 'rgba(249,8,8, 0.7)', 'rgba(249,8,8, 0.5)', 'rgba(249,8,8, 0.3)']

    // const iterate = (arr, i, j, l) => {
    //   if(l === 0){
    //     for(let k = i; k <= j; k++){
    //       if(k === 0){
    //         arr[k].textStyle = { color: blackcolor[l], fontSize: 60 }
    //       } else if(k < 3) {
    //         if(k % 2 === 0){
    //           arr[k].textStyle = { color: redcolor[l], fontSize: 40 }
    //         } else {
    //           arr[k].textStyle = { color: blackcolor[l], fontSize: 55 }
    //         }
    //       } else {
    //         if(k % 2 === 0){
    //           arr[k].textStyle = { color: redcolor[l], fontSize: 40 -  k }
    //         } else {
    //           arr[k].textStyle = { color: blackcolor[l], fontSize: 40 - k }
    //         }
    //       }
    //     }      
    //   } else {
    //     for(let k = i; k <=j ; k++){
    //       if(k % 2 === 0){
    //         arr[k].textStyle = { color: redcolor[l] }
    //       } else {
    //         arr[k].textStyle = { color: blackcolor[l] }
    //       }
    //     }      
    //   }
    // } 

    // const dealworddata = (data) => {
    //   let len = data.length;
    //   if(len <= 8 ){
    //     let i = 0,j = 0,k = 0
    //     while(k<len){
    //       if( k % 2 === 0){
    //         data[k].textStyle = { color: redcolor[i] }
    //         i++
    //       } else {
    //         data[k].textStyle = { color: blackcolor[j] }
    //         j++
    //       }
    //       k++
    //     }
    //   } else {
    //     let mid = len >> 1
    //     let leftmid = len >> 1
    //     let rightmid = (len - 1 + mid) >> 1
    //     iterate(data, 0, leftmid, 0)
    //     iterate(data, leftmid, mid, 1)
    //     iterate(data, mid, rightmid, 2)
    //     iterate(data, rightmid, len-1, 3)
    //   }
    // }

    // 2.指定配置和数据
    let option = {
      tooltip: {
        trigger: "item",
        padding: [10, 15],
        textStyle: {
          fontSize: 20,
        },
        formatter: (params) => {
          const { name, value } = params;
    
          return `
                        ${name} :${value}
                    `;
        },
      },
      series: [
        {
          type: "wordCloud",
          drawOutOfBound:true,
          gridSize: 15,
          sizeRange: [8, 45],
          rotationRange: [-80, 80],
          // 允许词太大的时候，超出画布的范围
          drawOutOfBound: false,
          shape: "circle",
          textStyle: {
            color: (params) => {
                return randcolor();
              },
            emphasis: {
              shadowBlur: 10,
              shadowColor: "#333",
            },
          },
          data: data_wordCloud,
        },
      ],
    };  
    // // 解决数据权重问题
    // dealworddata(data_wordCloud);           
    // 3.把配置给实例对象
    myChart.setOption(option);
    // 4.让图表跟随窗口缩放
    window.addEventListener("resize", function() {
        myChart.resize();
    }); 
};
export {fun_wordCloud}