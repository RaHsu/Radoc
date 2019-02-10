// 本模块用于对首页配置文件的解析
const fs = require('fs');
const cheerio = require('cheerio');
const pa = require("./parse");
const prime_config = require('./../site-config.json');
const home_config = require('./../home-config.json');
const site_config = pa.analysis_config(prime_config);

exports.renderHome = function(){
    let template = {
        basic:{
            p:'<p></p>',
            img:'<img>',
            i:'<i></i>',
            span:'<span></span>',
            a:'<a></a>',
            ul:'<ul></ul>',
            h1:'<h1></h1>',
            h3:'<h3></h3>'
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
            button_area:'<div class="button-area"></div>',
            datas:'<div class="datas"></div>'
        },
        content:{
            self:'<div id="content"></div>',
            features:'<div class="features"></div>',
            feature:'<div class="feature"></div>',
            button:'<div class="button"></div>'
        },
        footer:{
            self:'<div id="footer"></div>',
            links:'<div class="links"></div>'
        }
    };
    
    // 将模板加载为dom树
    let $ = cheerio.load(fs.readFileSync('./static/template/home.html'));
    
    
    // 对各个模块的解析
    function render(){
        setTitle();
        setHeader();
        setBanner();
        setContent();
        setFooter();
    }
    
    // title部分
    function setTitle(){
        $('title').text(site_config.title);
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
            setBannerDatas();
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
                    $('#banner .button-area').append(button);
                }
                if(i.type === 'github'){
                    let button = `<a href="${i.href}"><i class="fa fa-github fa-3x"></i><span>Github</span></a>`;
                    $('#banner .button-area').append(button);
                }
            }
    
        }
    }
    
    // banner的datas解析
    function setBannerDatas(){
        if(home_config.banner.datas){
            $('#banner').append(template.banner.datas);
            let datas = home_config.banner.datas;
            for(let i of datas){
                let data = `<div>
                    <span class="number">${i.data}</span>
                    <span class="label">${i.label}</span>
                </div>`;
                $('#banner .datas').append(data);
            }
        }
    }

    // content部分
    function setContent(){
        if(home_config.content){
            $('body').append(template.content.self);
            for(let i of home_config.content){
                setContentTitle(i);
                setContentSubtitle(i);
                setContentFeatures(i.features);
                setContentButton(i);
            }
        }
    }

    // content的title部分
    function setContentTitle(content){
        if(content.title){
            let title = `<h1 class="title">${content.title}</h1>`;
            $('#content').append(title);
        }
    }

    // content的subtitle部分
    function setContentSubtitle(content){
        if(content.subtitle){
            let subtitle = `<p class="subtitle">${content.subtitle}</p>`;
            $('#content').append(subtitle);
        }
    }

    // content的features部分
    function setContentFeatures(features){
        let featuresDiv = cheerio.load(template.content.features);
        
        for(let i of features){
            featuresDiv('.features').append(getContentFeature(i));
        }

        $('#content').append(featuresDiv.html());
    }
    function getContentFeature(feature){
        let featureDiv = cheerio.load(template.content.feature);

        if(feature.image){
            if(feature.image.type === 'icon'){
                let icon = cheerio.load('<h1><i></i></h1>');
                icon('i').addClass('fa fa-2x fa-' + feature.image.name);
                featureDiv('.feature').append(icon.html());
            }
            if(feature.image.type === 'img'){
                let img = cheerio.load(template.basic.img);
                img('img').attr('src',template.image.src);
                featureDiv('.feature').append(img.html());
            }
        }
        if(feature.title){
            let title = cheerio.load(template.basic.h3);
            title('h3').text(feature.title);
            featureDiv('.feature').append(title.html());
        }
        if(feature.description){
            let description = cheerio.load(template.basic.p);
            description('p').text(feature.description);
            featureDiv('.feature').append(description.html());
        }
        return featureDiv.html();
    }

    // content的button部分
    function setContentButton(content){
        if(content.button){
            let button = `<div class="button">
                            <a href="${content.button.href}"><button>${content.button.text}</button></a>
                          </div>`;
            $('#content').append(button);
        }
    }

    function setFooter(){
        if(home_config.footer){
            $('body').append(template.footer.self);
            setFooterLinks();
            setFooterInstruction();
            setFooterCopyright();
        }
    }

    function setFooterLinks(){
        
        if(home_config.footer.links){
            for(let i of home_config.footer.links){
                let linksDiv = cheerio.load(template.footer.links);

                if(i.type === 'icon'){
                    for(let j of i.link){
                        let link = `<a href="${j.href}"><span class="fa fa-${j.name}"></a>`;
                        linksDiv('.links').append(link);
                    }
                }
                if(i.type === 'text'){
                    for(let j of i.link){
                        let link = `<a href="${j.href}">${j.text}</a>`;
                        linksDiv('.links').append(link);
                    }
                }

                $('#footer').append(linksDiv.html());
            }
        }
    }

    function setFooterInstruction(){
        if(home_config.footer.instruction){
            for(let i of home_config.footer.instruction){
                if(i.href){
                    let a = `<p class="text"><a href="${i.href}">${i.text}</a></p>`;
                    $('#footer').append(a);
                }else{
                    let p = `<p class="text">${i.text}</p>`;
                    $('#footer').append(p);
                }
            }
        }
    }

    function setFooterCopyright(){
        if(home_config.footer.copyright){
            
            for(let i of home_config.footer.copyright){
                if(i.href){
                    let a = `<p class="copyright"><a href="${i.href}">${i.text}</a></p>`;
                    $('#footer').append(a);
                }else{
                    let p = ` <p class="copyright">${i.text}</p>`;
                    $('#footer').append(p);
                }
            }
        }
    }


    render();
    
    //console.log($.html());
    
    // 写入文件
    //console.log(home_config.header.logo[0].src);
    
    let writeStream = $.html();
    fs.writeFileSync("./out.html",writeStream);
    
}

