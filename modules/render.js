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
    },
    banner:{
        self:'<div id="banner"></div>',
        logo:'<div class="logo"></div>',
        intro:'<p class="intro"></p>',
        button_area:'<div class="button-area"></div>'
    }
};

// 将模板加载为dom树
let $ = cheerio.load(fs.readFileSync('./../static/template/home.html'));


// 对各个模块的解析
function render(){
    setHeader();
    setBanner();
}
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
                        let a = `<li><a href="${children.href}">${children.text}</a></li>`;
                        $('#header .links .dropdown ul').append(a);
                    }
                }

            }
        }

    }
}

// banner部分
function setBanner(){
    if(home_config.banner){
        $('body').append(template.banner.self);
        setBannerLogo();
        setBannerIntro();
        setBannerButtonArea();
    }

}
// banner的logo解析
function setBannerLogo(){
    if(home_config.banner.logo){
        $('#banner').append(template.banner.logo);
        let logo = home_config.banner.logo;
        for(let i of logo){
            if(i.type === 'img'){
                $('#banner .logo').append(template.basic.img);
                $('#banner .logo img').attr('src',i.src);
            }
            if(i.type === 'icon'){
                $('#banner .logo').append(template.basic.i);
                $('#banner .logo i').addClass('fa fa-' + i.icon_name);
                if(i.color){
                    $('#banner .logo i').attr('style','color:' + i.color + ';');
                }
            }
            if(i.type === 'text'){
                $('#banner .logo').append(template.basic.p);
                $('#banner .logo p').text(i.content);
            }
        }
    }
}
// banner的intro解析
function setBannerIntro(){
    if(home_config.banner.intro){
        $('#banner').append(template.banner.intro);
        $('#banner .intro').text(home_config.banner.intro);
    }
}

// banner的button-area的解析
function setBannerButtonArea(){
    if(home_config.banner.buttons){
        $('#banner').append(template.banner.button_area);
        let buttons = home_config.banner.buttons;
        for(let i of buttons){
            if(i.type === 'basic'){
                let button = `<a href="${i.href}"><button>${i.text}</button></a>`;
                console.log(button);
                $('#banner .button-area').append(button);
            }
            if(i.type === 'github'){
                let button = `<a href="${i.href}"><i class="fa fa-github fa-3x"></i><span>Github</span></a>`;
                console.log(button);
                $('#banner .button-area').append(button);
            }
        }

    }
}

render();

//console.log($.html());

// 写入文件
//console.log(home_config.header.logo[0].src);

let writeStream = $.html();
fs.writeFileSync("./../out.html",writeStream);
