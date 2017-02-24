**READ ME**
#站点说明
`站点为纯静态数据管理站点，[产品、解决方案、产品参数对比]这三个页面为静态数据生成页面，
这三个页面的国际化切换不需要进行静态页面的切换。`
`其他静态页面的切换是需要给出对应版本额静态页面的，如：中文index.html --对应-- 英文index-en.html页面。`

#站点数据编辑添加须知

````
仅有产品和解决方案存在静态数据，数据按照语言版本的不同，分别放入{app/data/cn}和{app/data/en}两个版本的语言目录。
且两个语言版本的数据文件名称完全相同，以便于在不同语言环境下访问不同版本的数据。

产品和解决方案的json数据文件编辑格式请参见{app/data}目录下的 'products_temp.js'和'solution_temp.js'两个模板文件进行编辑或新增。
````
> 切记[cn]和[en]两个版本的数据结构必须完全一样，否则将发生解析错误！！！

###### app/data目录下存在一个'product_params.js'的文件，此文件为产品参数对比配置文件，需要对比的参数按照类型完全列入该文件中。如需增删请直接修改此文件，修改前请做备份！

#站点国际化配置方法
> 站点默认为中文站点，如需修改默认语言配置：
    
    //设置默认语言版本
    var defaultLanguage = localLanguage ? localLanguage : 'cn';
    
    <!--将 "cn" 更改为 "en" 则修改默认语言版本为英文-->

> 国际化配置分为两点：
一、 数据生成型国际化配置：
    ---
    这类国际化配置的编辑修改在 {app/scripts/i18n}目录下的config.js文件中，该文件根据不同的语言对不同的字段进行配置，配合使用[i18n插件](https://github.com/JasonDRZ/i18n_translate/)进行配置。如有需要需更改本地页面模板生成文件{app/scripts/components/templates.js}，配置方法请联系源开发人员，[JasonD]{邮箱：1071115676@qq.com}。
二、静态页面型配置
    ---
    这一类的静态文件需直接生成两个版本的html文件，如：index.html文件为中文站首页文件，其对应的英文站点首页文件则为index-en.html文件，'-en'为语言文件后缀，且必须为已注册语言。
    如果新增页面，请在{app/scripts/config}目录下的site_config.js文件中增加相应的静态路由。
    




#站点源码调试须知
_此站点使用require.js管理模块依赖，所有依赖模块的js均放在app/lib目录下，bower安装的依赖将自动同步到该目录。
加载新的依赖需要在app/scripts/main.js中进行配置引用。_

**安装依赖**
```text
$ npm install

$ bower install
```
**添加前端依赖库**
```text
$ bower install @component
依赖库将自动拷贝到app目录下的lib目录中
```

**启动服务器**
````text
$ gulp serve
````

**程序线上运行目录及发布命令**

```text
//站点服务使用目录为 ./dist
//发布代码命令
$ gulp build
//代码做了修改之后，请运行此命令来生成发布程序，否则dist目录的程序部分无法自动更新
```
****

#HTML templates

````text
app/scripts/components/templates.js
````
#资源路径配置

````text
app/scripts/config/file_url.js
````
#站点路由配置

````text
app/scripts/config/site_config.js
````
#i18n 数据配置

````text
app/scripts/i18n/config.js
````


