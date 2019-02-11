// 此模块用于解析和插入目录
const re = require('./re');
const fs = require('fs');
const cheerio = require('cheerio');
const pa = require("./parse");

const prime_config = require('./../site-config.json');
const site_config = pa.analysis_config(prime_config);
const home_config = require('./../home-config.json');

// 加载模板
// 将模板加载为dom树
let $ = cheerio.load(fs.readFileSync('./static/template/guide.html'));




// 渲染目录
exports.renderCatalog = function(){
   let catalog = site_config.catalog;

   // 渲染title及header
   $('title').text(site_config.title);

   // header部分
   function setHeader(){
      setHeaderLogo();
       setHeaderLinks();
  }
  // 对header中logo的解析
  function setHeaderLogo(){
   if(home_config.header.logo){
       let logo = home_config.header.logo;
       $('#header').append('<div class="logo header-left"></div>');
       for(let i of logo){
           if(i.type === 'img'){
               $('#header .logo').append('<img>');
               $('#header .logo img').attr('src',i.src);
           }
           if(i.type === 'icon'){
               $('#header .logo').append('<i></i>');
               $('#header .logo i').addClass('fa fa-' + i.icon_name);
               if(i.color){
                   $('#header .logo i').attr('style','color:' + i.color + ';');
               }
           }
           if(i.type === 'text'){
               $('#header .logo').append('<span></span>');
               $('#header .logo span').text(i.content);
           }
       }
   }

   }

   // 对header中links的解析
   function setHeaderLinks(){
      if(home_config.header.links){
         let links = home_config.header.links;
         $('#header').append('<div class="links"></div>');
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
                     $('#header .links').append('<div class="dropdown"></div>');
                     let dropdown = `<a class="dropdown-nav">${i.text}</a>`;
                     $('#header .links .dropdown').append(dropdown);
                     $('#header .links .dropdown').append('<ul></ul>');
                     for(let children of i.children){
                        let a = `<li><a href="${children.href}">${children.text}</a></li>`;
                        $('#header .links .dropdown ul').append(a);
                     }
                  }

            }
         }

      }
   }

   setHeader();

   // 解析并生成目录
   for(let i of catalog){
      let title1 = cheerio.load('<div class="title1"></div>');
      if(i.title && i.src){
         let thisTitle = `<h3><span class="doc-link" data-src="${i.src}">${i.title}</span></h3>`;
         title1('.title1').append(thisTitle);
      }else{
         let thisTitle = `<h3><span>${i.title}</span></h3>`;
         title1('.title1').append(thisTitle);
      }
      if(i.children){
         for(let j of i.children){
            let title2 = cheerio.load('<div class="title2"></div>');
            if(j.title && j.src){
               let thisTitle = `<span class="doc-link" data-src="${j.src}">${j.title}</span>`;
               title2('.title2').append(thisTitle);
            }else{
               let thisTitle = `<span>${j.title}</span>`;
               title2('.title2').append(thisTitle);
            }
            if(j.children){
               let title3 = cheerio.load('<div class="title3"></div>');
               for(let k of j.children){
                  if(k.title && k.src){
                     let thisTitle = `<p class="doc-link" data-src="${k.src}">${k.title}</p>`;
                     title3('.title3').append(thisTitle);
                  }else{
                     let thisTitle = `<p>${k.title}</p>`;
                     title3('.title3').append(thisTitle);
                  }
               }
               title2('.title2').append(title3.html());
            }
            title1('.title1').append(title2.html());
         }
         
      }
      $('#catalog').append(title1.html());

   }

   // 设置首个展示的文档
   $('#container').append(`<iframe src="${site_config.first_show}" frameborder="0" id="doc">`)

   let writeStream = $.html();
   
   fs.writeFileSync("./publish/guide.html",writeStream);
}