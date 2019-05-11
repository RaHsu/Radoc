# quick_start  快速上手

这个文档帮助使用者以最快的速度预览生成的网站。

### 样品网站

如果你想查看样品网站，本网站就是由Radoc生成，如果你想查看运行在本地的样品网站，在目录中运行：

##### `node app`

就可以生成网站，再运行：

`node server`

启动服务器，在localhost:3000就可以看到网站啦。

### 快速生成自己的网站

##### 放入文档

首先准备好你的markdown文档（我推荐你使用markdown来书写你的文档，在这里了解一下[MarkDown](<http://www.markdown.cn/>)）,将文档们放入post_source文件夹中。

如果你的文档中带有图片，将图片放入post_sourse/post_img文件夹中，并且在你的文档中将图片的路径改为post_img/imgName.jpg，例如：

`![imgName](post_img/img.jpg)`

##### 配置网站 

接下来需要对网站做一些简单配置。

打开site-config.json，在title中填入你的网站名称。

`"title":"Radoc"`

然后在catalog中，填入你的文档章节以及对应的文件。最多允许设置三个层次。

```json
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
    ]
```

这里注意，src中文件名就是你的md文件名，但是后缀名统一为.html。想要将文章放在下一级中，则将其写在上一级的children中。

详细的网站配置项请在[网站配置项](/config_items-网站配置项.html)中查看。

##### 配置首页

如果你只是想单纯的看一下效果，那么你可以节省下配置首页的时间，这里提供一个最简首页的配置信息（仅包含logo和按钮）：

```json
{
    "title":"Radoc",
    "header":{
        "logo":[
            {
                "type":"text",
                "content":"Radoc"
            }
        ]
    },
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
                "text":"查看文档",
                "href":"/guide.html"
            }
        ]
    }
}

```

如果你想完全配置，请到[首页自定义组件](/home_config-首页自定义组件.html)中查看详细组件信息。

##### 启动网站

运行命令

`node server`

启动网站，你将在localhost:3000看到它。

