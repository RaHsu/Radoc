const fs = require("fs");
const json = require("./parse");
const re = require("./re");
const md = require("markdown-it")();

// 读取配置文件并解析配置项
const prime_config = json.readConfig('site-config.json');
const config = json.analysis_config(prime_config);


// 将配置项替换好写入一个md文件
exports.writeMd = function(file_name){

     const source_path = "./source/";
     const publish_path = "./publish/";
     let out_file_name = file_name.slice(0,-3) + ".html";

     //首先读取模板文件
     let template = fs.readFileSync("./static/template/md.html").toString();

     // 将模板文件中配置项替换掉
     let writeStream = re.replace(template,"theme",config.theme);
     writeStream = re.replace(writeStream,"code_theme",config.code_theme);

     // 读取md正文内容并解析为html
     let prime_content = fs.readFileSync(source_path+file_name).toString();
     let content = md.render(prime_content);

     // 替换掉模板中的content
     writeStream = re.replace(writeStream,"content",content);

     //写入文件
     fs.writeFile(publish_path+out_file_name,writeStream,function(err){
         if(err){
             console.log(err);
         }
         else{
             console.log(out_file_name+"写入成功");
         }
     })
 }
