// container高度设置
var contianerHeight = document.getElementById('container').style.height;
var clientHeight = window.innerHeight;

document.getElementById('sidebar').style.height = clientHeight - 110 + 'px';
document.getElementById('container').style.height = clientHeight - 110 + 'px';
document.getElementById('doc').style.height = clientHeight - 100 + 'px';

// 点击链接ifream中出现文档以及文字高亮
var links = document.getElementsByClassName('doc-link');
for(var i = 0;i < links.length;i++){
    console.log(links[i].getAttribute('data-src'));
    links[i].onclick = function(e){
        document.getElementById('doc').src = this.getAttribute('data-src');
        // 使其他所有的active标签失灵
        for(var j =0;j < links.length;j++){
            links[j].className = 'doc-link';
        }
        console.log(this);
        this.classList.add('active');
        // 使父元素高亮
        console.log(this.parentNode.parentNode.className);
        if(this.parentNode.parentNode.className === 'title1'){
            console.log("active");
            this.parentNode.parentNode.classList.add('active');
        }
    }
}

// // 使文章与目录对应
// var docName =  document.getElementById('doc').src;
// //var htmlRxp = /publish\/\S*.html/img;
// var htmlRxp = /\/\S*.html/img;
// console.log(docName);
// console.log(htmlRxp.exec(docName));
// var htmlName = htmlRxp.exec(docName)[0].slice(8,-5);
// console.log(htmlName);

// logo点击事件
var logo = document.getElementsByClassName("logo")[0];
logo.onclick = function(){
    window.location = "/home.html";
}
