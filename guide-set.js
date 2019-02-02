// container高度设置
var contianerHeight = document.getElementById('container').style.height;
var clientHeight = window.innerHeight;

document.getElementById('sidebar').style.height = clientHeight - 110 + 'px';
document.getElementById('container').style.height = clientHeight - 110 + 'px';
document.getElementById('doc').style.height = clientHeight - 100 + 'px';

// 使文章与目录对应
var docName =  document.getElementById('doc').src;
var htmlRxp = /publish\/\S*.html/img;
var htmlName = htmlRxp.exec(docName)[0].slice(8,-5);
console.log(htmlName);