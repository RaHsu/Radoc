const md = require("markdown-it")();
const fs = require("fs");

//生成目录

var href, name, a;
fs.readdir('source/', function (err, files) {
    var dir = "";
    for (let i = 0; i < files.length; i++) {

        if (files[i].slice(-3, -1) === '.m') {
            href = files[i].slice(0, -3) + '.html';
            name = files[i].slice(0, -3);
            a = `<a href="${href}">${name}</a></br>`;

            dir += a;
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
    fs.writeFile('publish/index.html', index, function (err, data) {
        if (err) {
            console.log('目录文件写入失败');
        }
        else {
            console.log('目录文件成功生成！');
        }
    })
})


//生成文件
fs.readdir('source/', function (err, files) {
    for (let i = 0; i < files.length; i++) {
        fs.stat("source/" + files[i], function (err, stat) {
            if (stat.isFile()) {
                console.log('publish/' + files[i].slice(0, -3) + '.html');
                write("source/" + files[i], 'publish/' + files[i].slice(0, -3) + '.html');
            }
        });
    }
});

function write(source, outfile) {
    fs.readFile(source, function (err, data) {
        if (err) {
            return console.error('文件读取失败');
        }
        var out = md.render(data.toString());

        // 读模板文件并将内容存在变量中

        var tmp = `<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="stylesheets/apollo.css">
</head>
<body>
	${out}
</body>
</html>`;

        //开始写文件
        fs.writeFile(outfile, tmp, function (err, data) {
            if (err) {
                return console.error('文件写入失败');
            }
            else {
                console.log("写入成功");
            }


        })
    });
}

