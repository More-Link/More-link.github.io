/**
 * Created by JasonD on 16/12/9.
 */
define(['jquery','handlebars','cf/file_url'],($,Handlebars,url)=>{
    //输出html字符串
    Handlebars.registerHelper('safe', function(item, options) {
        return new Handlebars.SafeString(item);
    });

    var JSONDATA = {};

    return {
        extend: {
            Obj: function (a, b) {
                for (var p in b) if (b.hasOwnProperty(p) && a && !a.hasOwnProperty(p)) a[p] = b[p];
                return a;
            },
            Proto: function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            },
            Arr: function () {
                var m = arguments[0],argu = arguments,i = 0,j = 0;
                if (!m instanceof Array) return m;
                argu = Array.prototype.slice.call(argu,1);
                for (;i < argu.length; i++){
                    if (argu[i]){
	                    j = 0;
	                    for (;j<argu[i].length;j++){
		                    m.push(argu[i][j]);
	                    }
                    }
                }
            }
        },
        /**
         *
         * @param template sting or node
         * @param data Object
         * @param translate boolean
         * @return {*}
         */
        generateHtml: function(template, data) {
            template = template && typeof template == 'string' ? template :
                (typeof template == 'function' ? template() : (template.nodeName && $(template).html()))
            var compile = Handlebars.compile(template);
            return compile(data);
        },
        paramKeyFormat: function (key) {
            return key.toLowerCase().replace(/\s/g,'').replace(/\//g,'_');
        },
        showAllJSONData: function () {
            return JSONDATA;
        },
        getJSON: function (path,cb) {
            var tdata = null;
            if (JSONDATA[path]) {
                tdata = JSONDATA[path];
	            cb && cb(tdata);
                return tdata;
            } else {
                return $.getJSON(path, function (data) {
                    tdata = data;
                    JSONDATA[path] = tdata;
                    cb && cb(tdata)
                });
            }
        },
        //获取location pathname
        getPathName: function () {
            return window.location.pathname;
        },
        setPathName: function (pname) {
            window.location.pathname = pname;
        },
	    getHashName: function () {
		    return window.location.hash;
	    },
        //获取search字段下的变量对象{type: string,id: string};
        queryParams: function () {
            var querys = window.location.search.replace(/^\?/,''),kvObj = {};
            if (querys == ''){
                return null;
            } else {
                querys = querys.split('&');
                if (querys.length && querys.length !== 0){
                    querys.forEach((q)=>{
                        var kv = q.split('=');
                        kvObj[kv[0]] = kv[1];
                    })
                }
            }
          console.log(kvObj);
            return kvObj;
        },
        //查询数据
        selectByID: function (data,id) {
            var target = null;
            if(data instanceof Object){
                for (var i in data){
                    if (data[i] instanceof Array){
                        for (var a = 0; a<data[i].length; a++){
                            if (data[i][a].id == id){
                                target = data[i][a];
                            }
                        }
                    }
                }
            }
            return target;
        },
        //获取推荐数据
        getRecommends: function (data,count,exceptID) {
            var _this = this;
            var tarD = [],gather = [];
            for (var l in data){
                _this.extend.Arr(gather,data[l]);
            }
            var len = count < gather.length ? count : gather.length;
            for (var k = 0; k < len; k++) {
                //筛选出不等于某一id的数据
                if (exceptID && gather[k].id == exceptID){
                    len == count ? len ++ : len;
                    continue;
                } else {
                    tarD.push(gather[k]);
                }
            }
            return tarD;
        },
        //获取当前浏览器环境下的语言版本
        getBrowserLanguage: function () {
            return window.navigator.language.toLowerCase();
        },
        //获取本地缓存的语言版本
        getLocalLanguage: function () {
            return window.localStorage && window.localStorage['language'] ? window.localStorage['language'] : null;
        },
        //设置缓存语言
        setLocalLanguage: function (lang) {
            window.localStorage && window.localStorage.setItem('language',lang.toLowerCase());
        }
    }
});
