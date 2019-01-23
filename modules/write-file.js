const fs = require("fs");
const json = require("./parse");
const re = require("./re");
const md = require("markdown-it")();
const less = require('less');

// 读取配置文件并解析配置项
const prime_config = require('./../site-config.json');
const config = json.analysis_config(prime_config);


// 将配置项替换好写入一个md文件
exports.writeMd = function(file_name){

     const source_path = "./post_source/";
     const publish_path = "./publish/";
     let out_file_name = file_name.slice(0,-3) + ".html";

     //首先读取模板文件
     let template = fs.readFileSync("./static/template/md.html").toString();

     // 读取md正文内容并解析为html
     let prime_content = fs.readFileSync(source_path+file_name).toString();
     let content = md.render(prime_content);

     // 设置配置替换项
     const md_config = [
         {
             replace_pattern:"theme",
             value:config.theme
         },{
             replace_pattern:"code_theme",
             value:config.code_theme
         },{
             replace_pattern:"content",
             value:content
         }
     ];

     // 将模板文件中配置项替换掉
     let writeStream = re.replaceAll(template,md_config);


     //写入文件
     fs.writeFile(publish_path + out_file_name,writeStream,function(err){
         if(err){
             console.log(out_file_name+'写入失败');
             console.log(err);
         }
         else{
             console.log(out_file_name+"写入成功");
         }
     })
 }

 // 将一个文件夹中的所有md文件转换为html
 exports.writeAllMd = function(){
    const source_path = "./post_source/";
    //const publish_path = "./publish/";

    let files = fs.readdirSync(source_path);
    for(let i of files){
        if(i.slice(-3) === '.md'){
            exports.writeMd(i);
        }
    }

 }



// 复制文件夹
exports.copyDir = function(src, dst){
    console.log('复制' + src + '到' + 'dst' + '...');
    if(!fs.existsSync(dst)){
        fs.mkdirSync(dst);
    }
    
    fs.readdir(src, function(err, paths){
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            let _src = src + '/' + path,
                _dst = dst + '/' + path,
                st = fs.statSync(_src);

            if(st.isFile()){
                fs.copyFileSync(_src, _dst);
            }else if(st.isDirectory()){
                if(!fs.existsSync(dst)){
                    fs.mkdirSync(_dst);
                }
                exports.copyDir(_src, _dst);
            }
        })
    })
}

// 复制文件(删除原来的文件)
exports.copyFile = function(src, dst){
    // if(fs.accessSync(dst)){
    //     fs.unlinkSync(dst);
    // }
    // fs.copyFileSync(src, dst);
    try{
        fs.copyFileSync(src, dst);
    }catch(e){
        fs.unlinkSync(dst);
    }
}

// 将一个文件夹中的html文件原样复制
exports.copyHtml = function(src, dst){
    let _src = src + '/',
        _dst = dst + '/';
    let files = fs.readdirSync(src);
    for (let i of files){
        if(i.slice(-5) === '.html'){
            exports.copyFile(_src + i, _dst + i);
        }
    }
}

// 生成theme-color的函数
exports.generateThemeColor = function(file,color){
    let template = `@theme-color: ${color};`;

    fs.writeFileSync(file,template);
    console.log('theme-color文件已生成...');
}

// 将less转换为css
exports.less = function(src, dst){
    console.log('编译less为css...');
    let lessFile = fs.readFileSync(src,'utf8');

    less.render(lessFile,function(e,output){
        fs.writeFileSync(dst,output.css);
        console.log('less编译完成...');
    })
    

}


