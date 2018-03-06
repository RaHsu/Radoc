const fs = require('fs');
const cheerio = require('cheerio');
const home_config = require('./../home-config.json');

let template = {
    basic:{
        p:'<p></p>',
        img:'<img>',
        i:'<i></i>',
        span:'<span></span>',
        a:'<a></a>',
        ul:'<ul></ul>',

    },
    header:{
        self:'<header id="header"></header>',
        logo:'<div class="logo header-left"></div>',
        links:'<div class="links"></div>',
        dropdown:'<div class="dropdown"></div>'
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
        setHeaderLinks();
    }

}

// 对header中logo的解析
function setHeaderLogo(){
    if(home_config.header.logo){
        let logo = home_config.header.logo;
        $('#header').append(template.header.logo);
        for(let i of logo){
            if(i.type === 'img'){
                $('#header .logo').append(template.basic.img);
                $('#header .logo img').attr('src',i.src);
            }
            if(i.type === 'icon'){
                $('#header .logo').append(template.basic.i);
                $('#header .logo i').addClass('fa fa-' + i.icon_name);
                if(i.color){
                    $('#header .logo i').attr('style','color:' + i.color + ';');
                }
            }
            if(i.type === 'text'){
                $('#header .logo').append(template.basic.span);
                $('#header .logo span').text(i.content);
            }
        }
    }

}

// 对header中links的解析
function setHeaderLinks(){
    if(home_config.header.links){
        let links = home_config.header.links;
        $('#header').append(template.header.links);
        // 对position进行解析
        if(links.position){
            if(links.position === 'left'){
                $('#header .links').addClass('header-left');
            }else if (links.position === 'right') {
                $('#header .links').addClass('header-right');
            }
        }
        // 对链接的解析
        if(links.children){
            for(let i of links.children){
                // 对单链接的解析
                if(i.type === 'link'){
                    let a = `<a href="${i.href}">${i.text}</a>`;
                    $('#header .links').append(a);
                }
                // 对下拉菜单的解析
                if(i.type === 'dropdown'){
                    $('#header .links').append(template.header.dropdown);
                    let dropdown = `<a class="dropdown-nav">${i.text}</a>`;
                    $('#header .links .dropdown').append(dropdown);
                    $('#header .links .dropdown').append(template.basic.ul);
                    for(let children of i.children){
                        console.log(children);
                        let a = `<li><a href="${children.href}">${children.text}</a></li>`;
                        $('#header .links .dropdown ul').append(a);
                    }
                }

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
