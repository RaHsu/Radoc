const fs = require("fs");
const json = require("./json");
const re = require("./re");

// 读取配置文件并解析配置项
const prime_config = json.readConfig('site-config.json');
const config = json.analysis_config(prime_config);
console.log(prime_config);
exports.writeMd = function(){
     //首先读取模板文件
     let template = fs.readFileSync("./../Radoc/static/template/md.html");

     console.log(config);
     // 将模板文件中配置项替换掉
 }
