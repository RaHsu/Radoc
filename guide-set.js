// container高度设置
var contianerHeight = document.getElementById('container').style.height;
var clientHeight = window.innerHeight;

document.getElementById('sidebar').style.height = clientHeight - 110 + 'px';
document.getElementById('container').style.height = clientHeight - 110 + 'px';
document.getElementById('doc').style.height = clientHeight - 100 + 'px';

console.log(clientHeight);