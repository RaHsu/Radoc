## 首页自定义组件
Radoc提供丰富的组件让你可以自定义你的首页，这些组件你可以在json文件中配置，而不需要编写HTML文件。

### Layout 布局
首页布局采用header-banner-content-footer布局，如下面展示的布局所示，在每个部分会提供相应的组件，你只需要在json文件中配置内容就好。

所有的组件都是可选的，你可以按照自己的需要去组合它们。

#### 设计规则

### Color 主题颜色
你可以设置符合你自己喜好的主题颜色，主题颜色会在组件中有所体现。
> 注意：在选择主题颜色时，请尽量选择与白色具有对比度的颜色，这样在视觉的展示上会更为合理。

主题颜色默认为：#f00（红色）

### Icon 关于图标
Radoc使用的是[Font Awesome](http://fontawesome.dashgame.com/)中的图标，你可以到[它们的官方网站](http://fontawesome.dashgame.com/)中选择你要使用的图标，那里有很多丰富多彩的图标，在使用图标的时候，你只需要在Json文件中输入页面上展示出的图标名字就可以了。

### Iamge 关于图片
首页中要使用的图片（如logo图片等）请置于./static/img目录中。

### Header组件
Header为首页的导航栏，在这里可以提供一些链接信息。


#### Logo 标识
Logo在header的左侧，你可以选择使用图片（img），图标（icon）或文字（text）来作为你的logo，当然也可以图标与文字结合或图片与文字结合。

Logo用一个数组表示，你可以自己定义其中的组件。

示例：
```json
"header":{
    "logo":[
        {
            "type":"img",
            "src":"img/trecer.jpg"
        },{
            "type":"text",
            "content":"Radoc"
        }
    ]
}
```
**"type"："img"（图片）**

属性 | 说明 | 类型 |
:-|:-|:-
src|当logo类型为img时，图片的路径。|string

**"type":"text"（文字）**

属性 | 说明 | 类型 |
:-|:-|:-
content|当logo类型为text时，其显示的文字。|string

**"type":"icon"（图标）**

属性 | 说明 | 类型 |
:-|:-|:-
icon_name|图标的名称，请到[Font Awesome](http://fontawesome.dashgame.com/)官网查阅。|string
color|图标的颜色，默认为主题颜色，设置时你可以使用颜色名称或16进制颜色。|string

#### links 链接
链接可以显示在header的左侧或右侧，你可以选择单个的链接或是下拉的链接。
示例：
```json
"links":{
    "position":"right",
    "children":[
        {
            "type":"link",
            "href":"#",
            "text":"学习"
        },
        {
            "type":"link",
            "href":"#",
            "text":"团队"
        },{
            "type":"dropdown",
            "text":"多语言",
            "children":[
                {
                    "href":"#",
                    "text":"中文"
                },{
                    "href":"#",
                    "text":"英文"
                },{
                    "href":"#",
                    "text":"法语"
                }
            ]
        }

    ]
}
```
属性 | 说明 | 类型 |
:-|:-|:-
links.position|链接显示的位置，你可以选择左边（left）或右边（right）|string
links.children|要显示的链接，你可以选择单链接或下拉链接|array

**"type":"link"（单链接）**

属性 | 说明 | 类型 |
:-|:-|:-
href|链接的指向|string
text|链接显示的文本|string

**"type":"dropdown"(下拉链接)**

属性 | 说明 | 类型 |
:-|:-|:-
text|链接显示的文本|string
children|下拉菜单中要显示的链接（其属性与单链接相同）|array

### banner组件

#### Logo标识

作为网站的标志，它会被显示在banner最显眼的地方，你可以选择使用文字或者图片。

#### intro 简介

用一句话简单的介绍你的项目。

#### button 按钮

按钮可以由文字或图标组成，或是由它们一起组成，并提供一个链接，你可以用它链接到你想要的地方。

属性 | 说明 | 类型 
:-|:-|:-
type|type值为basic时显示普通按钮，其他icon值时显示icon。|string
text|按钮的文字说明|string
href|按钮的链接地址|string

#### datas 数据

这里用来显示项目的数据，比如下载量，当前版本，star数量等等。

| 属性  | 说明     | 类型   |
| ----- | -------- | ------ |
| data  | 具体数据 | string |
| label | 数据名称 | string |

banner示例：

```json
"banner":{
        "logo":[
            {
                "type":"text",
                "content":"Radoc"
            }
        ],
        "intro":"简洁，高效，快捷的文档框架。",
        "buttons":[
            {
                "type":"basic",
                "text":"快速入门",
                "href":"http://www.qq.com"
            },{
                "type":"github",
                "href":"https://github.com/RaHsu/Radoc"
            }
        ],
        "datas":[
            {
                "data":"1000+",
                "label":"stars"
            },{
                "data":"1000+",
                "label":"stars"
            },{
                "data":"1000+",
                "label":"stars"
            },{
                "data":"1000+",
                "label":"stars"
            }
        ]
    }
```

### content 内容组件

在content中你可以介绍网站的特性。

content为一个数组，你可以添加想要的许多特性。

#### title 特性标题

将你项目的特性和优点尽情展示出来吧。

#### subtitle 特性副标题

用一句话简单的介绍你的特性。

#### features 特性

特性为一个数组，你可以尽情的展示网站的优点，features可使用图片或图标，并提供标题和描述来介绍你的特性。

#### button 按钮

提供一个按钮来为你提供链接。

| 属性 | 说明     | 类型   |
| ---- | -------- | ------ |
| href | 链接地址 | string |
| text | 链接文字 | string |

content示例：

```json
"content":[
        {
            "title":"特性",
            "subtitle":"Radoc拥有令人期待的所有特性。",
            "features":[
                {
                    "image":{
                        "type":"icon",
                        "name":"bath"
                    },
                    "title":"使用简单",
                    "description":"只需要少量的配置，你就可以建立起一个自己的文档网站，不需要再去编写HTML或服务器程序。"
                },
                {
                    "image":{
                        "type":"icon",
                        "name":"bed"
                    },
                    "title":"使用简单",
                    "description":"只需要少量的配置，你就可以建立起一个自己的文档网站，不需要再去编写HTML或服务器程序。"
                },
                {
                    "image":{
                        "type":"icon",
                        "name":"bomb"
                    },
                    "title":"使用简单",
                    "description":"只需要少量的配置，你就可以建立起一个自己的文档网站，不需要再去编写HTML或服务器程序。"
                }
            ],
            "button":{
                "href":"https://github.com/RaHsu/Radoc",
                "text":"文档"
            }
        }
    ]
```

## footer组件

#### links 链接

你可以使用icon或是文字来作为你的链接。

#### instruction 引导

一些引导文字，也可以是链接。

#### copyright 版权

这里是用来放置你的版权信息。

footer示例：

```
"footer":{
        "links":[
            {
                "type":"icon",
                "link":[
                    {
                        "name":"qq",
                        "href":"http://www.baidu.com"
                    },{
                        "name":"steam",
                        "href":"http://www.baidu.com"
                    },{
                        "name":"apple",
                        "href":"http://www.baidu.com"
                    }
                ]
            },{
                "type":"text",
                "link":[
                    {
                        "text":"文档",
                        "href":"http://www.baidu.com"
                    },{
                        "text":"文档",
                        "href":"http://www.baidu.com"
                    },{
                        "text":"文档",
                        "href":"http://www.baidu.com"
                    },{
                        "text":"文档",
                        "href":"http://www.baidu.com"
                    }
                ]
            }
        ],
        "instruction":[
            {
                "text":"遵循  MIT 开源协议",
                "href":"http://www.baidu.com"
            }
        ],
        "copyright":[
            {
                "text":"Copyright © 2018 Ra Hsu. This website is open source. "
            },
            {
                "text":"京ICP备15031610号",
                "href":"https://github.com/RaHsu/Radoc"
            }
        ]
    }
```

