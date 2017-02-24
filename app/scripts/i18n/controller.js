/**
 * Created by JasonD on 16/12/6.
 */
define(['jquery','util','i18n/switch_reload','translate','i18n/config','cf/file_url','cf/site_config'],
    function ($,util,switch_reload,Translate,config,file_url,site_config) {
    //设置注册语言版本
    var langDic = {
            'en': 'EN',
            'cn': '中文'
        };
    var translator = null,translatorName = 'morelink';
    //获取之前设置的语言
    var localLanguage = util.getLocalLanguage();
    //设置默认语言版本
    var defaultLanguage = localLanguage ? localLanguage : 'cn';
    util.setLocalLanguage(defaultLanguage);
    //创建翻译机
    if(translator == null) translator = Translate.createNamespace({
        namespace: translatorName,
        defaultLanguage: defaultLanguage
    }).translations(config);
    //生成语言切换按钮
    var optionTmp = $('<li/>');
    var genOptions = function () {
        var wrap = $('<div/>');
        for (var l in langDic){
            optionTmp.clone().appendTo(wrap).attr({'value':l,'text':langDic[l]}).text(langDic[l]).map(function () {
                if (l == defaultLanguage) $(this).addClass('active');
            });
        };
        return wrap.html();
    };
    var switcherHtml = `<span class="language_switcher">${langDic[defaultLanguage]}</span>
        <ul class="lang_switch_options">
            ${genOptions()}
        </ul>`;

    var languageSwitch = function (lang) {
        if (langDic[lang]){
            defaultLanguage = lang;
            util.setLocalLanguage(lang);
            translator.switch(lang);
            //重定向
            site_config.redirect();
            //重新生成数据
            switch_reload.reloadAll();
        }
    };

    return {
        config: config,
        //切换语言
        switchLanguage: function (lang) {
            languageSwitch(lang);
        },
        //获取当前语言标识
        getLanguage: function () {
            return defaultLanguage;
        },
        //翻译路由
        route: function () {
            // var routeS = site_config.routeSource[defaultLanguage],newR = {};
            // for (var r in routeS){
            //     routeS[r].path ? (newR[r] = routeS[r].path) : (newR[r] = routeS[r]);
            // }
            return site_config.routeSource[defaultLanguage];
        },
        //翻译机接口
        translator: translator,
        //使用注册翻译机调用util.generateHtml接口解析字符串
        translateString: function (template, data) {
            return translator.nodeString(util.generateHtml(template,data));
        },
        //使用翻译机封装util.getJSON接口，使其富有按照不同语言环境请求不同JSON数据的功能
        translateJSONGetter: function (name, cb) {
            return util.getJSON(file_url.filePath(defaultLanguage).data + name + '.json',function (data) {
                cb && cb(data);
            })
        },
        //语言切换按钮的html结构
        switcherHtml: function () {
            return switcherHtml;
        },
        registerUpdateEvent: function (functionName) {
            switch_reload.registerReloader(functionName)
        }
    };
})
