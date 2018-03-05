const fs = require('fs');
const cheerio = require('cheerio');
const home_config = require('./../home-config.json');

let template = {
    basic:{
        p:'<p></p>',
    },
    header:{
        self:'<header id="header"></header>',
        logo:'<div class="logo"></div>'
    }
};

// 将模板加载为dom树
let $ = cheerio.load(fs.readFileSync('./../static/template/home.html'));


// 对各个模块的解析
// 对header部分的解析
(function hearderAnalysis(){
    if(home_config.header){
        if(home_config.header.logo){
            console.log("logo");
        }
    }
})();
$('body').append(template.header.self);
//console.log(home_config);
