## 配置项

#### title
网站的title，即显示在浏览器标签页头上的title。

#### theme 主题
主题决定了文档正文的样式。目前提供的主题有：

主题名称|值
:-|:-
apollo（一个类似于Vue文档的主题）|apollo(defualt)
academic（学术主题）|academic
dropbox|dropbox
github（github的官方样式）|github
gothic|gothic
han|han
law|law
lostkeys|lostkeys
minimalism|mini
misty|misty
monomspace|monospace
pixyll|pixyll
quartz|quartz
refine|refine
scribble|scribble

>  具体的样式预览请到[文档主题](/theme-文档主题.html)中查看。

#### theme_color 主题颜色

网站的主题颜色，你可以使用你喜欢的颜色作为主题颜色，支持16进制颜色表示

#### code_theme 代码主题
Radoc也提供了很多代码主题，你可以选择你文档中使用的代码高亮主题，这部分成果来自[highlight.js](https://highlightjs.org/)。目前提供的代码高亮样式有：

主题名称|值（string）
:-|:-
agate|agate
androidstudio|androidstudio
arduino-light|arduino-light
arta|arta
ascetic|ascetic
atelier-cave-dark|atelier-cave-dark
atelier-cave-light|atelier-cave-light
atelier-dune-dark|atelier-dune-dark
atelier-dune-light|atelier-dune-light
atelier-estuary-dark|atelier-estuary-dark
atelier-estuary-light|atelier-estuary-light
atelier-forest-dark|atelier-forest-dark
atelier-forest-light|atelier-forest-light
atelier-heath-dark|atelier-heath-dark
atelier-heath-light|atelier-heath-light
atelier-lakeside-dark|atelier-lakeside-dark
atelier-lakeside-light|atelier-lakeside-light
atelier-plateau-dark|atelier-plateau-dark
atelier-plateau-light|atelier-plateau-light
atelier-savanna-dark|atelier-savanna-dark
atelier-savanna-light|atelier-savanna-light
atelier-seaside-dark|atelier-seaside-dark
atelier-seaside-light|atelier-seaside-light
atelier-sulphurpool-dark|atelier-sulphurpool-dark
atelier-sulphurpool-light|atelier-sulphurpool-light
atom-one-dark|atom-one-dark
atom-one-light|atom-one-light
brown-paper|brown-paper
codepen-embed|codepen-embed
color-brewer|color-brewer
darcula|darcula
dark|dark
darkula|darkula
default|default
docco|docco
dracula|dracula
far|far
foundation|foundation
github-gist|github-gist
github|github
googlecode|googlecode
grayscale|grayscale
gruvbox-dark|gruvbox-dark
gruvbox-light|gruvbox-light
hopscotch|hopscotch
hybrid|hybrid
idea|idea
ir-black|ir-black
kimbie.dark|kimbie.dark
kimbie.light|kimbie.light
magula|magula
mono-blue|mono-blue
monokai-sublime|monokai-sublime
monokai|monokai
obsidian|obsidian
ocean|ocean
paraiso-dark|paraiso-dark
paraiso-light|paraiso-light
pojoaque|pojoaque
purebasic|purebasic
qtcreator_dark|qtcreator_dark
qtcreator_light|qtcreator_light
railscasts|railscasts
rainbow|rainbow
routeros|routeros
school-book|school-book
solarized-dark|solarized-dark
solarized-light|solarized-light
sunburst|sunburst
tomorrow-night-blue|tomorrow-night-blue
tomorrow-night-bright|tomorrow-night-bright
tomorrow-night-eighties|tomorrow-night-eighties
tomorrow-night|tomorrow-night
tomorrow|tomorrow
vs|vs
vs2015|vs2015
xcode|xcode
xt256|xt256
zenburn|zenburn

#### catalog 文档目录
这是你文档目录的配置，在文档页将由你的配置来生成目录，目录最多支持到三级目录。
属性|说明|数据类型
:-|:-|:-
title|在目录页显示的标题|string
src|文档的路径，请保证你将md文件放置到了post_sourse文件夹中，当src不存在时，标题将以文本显示|string
children|子文档(一个或多个)，每个文档也包含title和src|array

完整示例：

```json
{
    "title":"Radoc",
    "theme":"apollo",
    "code_theme":"arduino-light",
    "theme_color":"#f00",
    "catalog":[
        {
            "title":"基础",
            "src":"test.html",
            "children":[
                {
                    "title":"安装",
                    "src":"fun fact about null.html",
                    "children":[
                       {
                        "title":"你不知道的JSON",
                        "src":"你不知道的JSON.html"
                       },
                       {
                        "title":"关于浏览器内核",
                        "src":"关于浏览器内核.html"
                       },
                       {
                        "title":"前端问题总结",
                        "src":"前端问题总结.html"
                       }

                    ]
                }
            ]
        }
    ],
    "first_show":"你不知道的JSON.html"
}

```



