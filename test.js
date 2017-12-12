var md = require("markdown-it")();
var fs = require("fs");

//生成目录

var href,name,a;
fs.readdir('source/',function(err,files){
	var dir = "";
	for(let i = 0;i<files.length;i++){
		
		if(files[i].slice(-3,-1) === '.m'){
			href = files[i].slice(0,-3)+'.html';
			name = files[i].slice(0,-3);
			a = `<a href="${href}">${name}</a></br>`;
			
			dir+=a;
		}
		

	}
	//console.log('dir:'+dir);

var index = `<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="stylesheets/apollo.css">
</head>
<body>
	${dir}
</body>
</html>`;
//console.log(index);
	// 写入目录
	fs.writeFile('publish/index.html',index,function(err,data){
		if(err){
			console.log('目录文件写入失败');
		}
		else{
			console.log('目录文件成功生成！');
		}
	})
})
