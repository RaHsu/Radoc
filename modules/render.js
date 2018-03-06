const fs = require('fs');
const cheerio = require('cheerio');
const home_config = require('./../home-config.json');

let template = {
    basic:{
        p:'<p></p>',
        img:'<img>',
        i:'<i></i>',
        span:'<span></span>'
    },
    header:{
        self:'<header id="header"></header>',
        logo:'<div class="logo header-left"></div>'
    }
};

// 将模板加载为dom树
let $ = cheerio.load(fs.readFileSync('./../static/template/home.html'));


// 对各个模块的解析
// header部分
function setHeader(){
    if(home_config.header){
        $('body').append(template.header.self);
        setHeaderLogo();
    }

}
// 对header中logo的解析
function setHeaderLogo(){
    if(home_config.header.logo){
        let logo = home_config.header.logo;
        $('#header').append(template.header.logo);
        for(let i in logo){
            if(logo[i].type === 'img'){
                $('#header .logo').append(template.basic.img);
                $('#header .logo img').attr('src',logo[i].src);
            }
            if(logo[i].type === 'icon'){
                $('#header .logo').append(template.basic.i);
                $('#header .logo i').addClass('fa fa-' + logo[i].icon_name);
                if(logo[i].color){
                    $('#header .logo i').attr('style','color:' + logo[i].color + ';');
                }
            }
            if(logo[i].type === 'text'){
                $('#header .logo').append(template.basic.span);
                $('#header .logo span').text(logo[i].content);
            }
        }
    }

}

setHeader();

//console.log($.html());

// 写入文件
//console.log(home_config.header.logo[0].src);

let writeStream = $.html();
fs.writeFileSync("./../out.html",writeStream);
