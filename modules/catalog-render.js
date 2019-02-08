// 此模块用于解析和插入目录
const re = require('./re');
const fs = require('fs');
const cheerio = require('cheerio');
const pa = require("./parse");

const prime_config = require('./../site-config.json');
const site_config = pa.analysis_config(prime_config);

// 加载模板
// 将模板加载为dom树
let $ = cheerio.load(fs.readFileSync('./static/template/guide.html'));

exports.renderCatalog = function(){
   let catalog = site_config.catalog;

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
   
   fs.writeFileSync("./publish/out1.html",writeStream);
}