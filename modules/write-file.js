const fs = require("fs");
const json = require("./parse");
const re = require("./re");
const md = require("markdown-it")();

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



// 复制文件夹
exports.copyDir = function(src, dst){
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
                fs.mkdirSync(_dst);
                
                copyDir(_src, _dst);
            }
        })
    })
}

// 复制文件
exports.copyFile = function(src, dst){
    fs.copyFileSync(src, dst);
}


// // 复制文件夹
// exports.copyDir = function(src, dst, callback){
//     fs.exists(det, function(exists){
//        if(exists){
//            callback(src, dst);
//        }else {
//            fs.mkdir(dst, function(){
//                callback(src, dst);
//            });
//         }
//     });
// };

// // 复制文件函数
// exports.copy = function(src, dst){
//     fs.readdir(src, function(err, paths){
//         if(err){
//             console.log(src+'复制失败');
//             console.log(err);
//         }
//         paths.forEach(function(path){
//             let _src = src + '/' + path,
//                 _dst = dst + '/' + path,
//                 readable,writable;

//             status(_src, function(err, st){
//                 if(err){
//                     throw err;
//                 }
//                 if(st.isFile){
//                     readable = fs.createReadStream(_src);
//                     writable = fs.createWriteStream(_dst);
//                     readable.pipe(writable);
//                 }
//                 else if(st.isDirectory()){
//                     exports.copyDir(_src, _dst, copy);
//                 }
//             })
//         });
//     })
// }

