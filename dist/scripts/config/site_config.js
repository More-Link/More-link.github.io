'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by JasonD on 16/12/9.
 */
define(['util'], function (util) {
    //获取默认语言
    //各个语言版本对应路由
    var languagesRoute = {
        en: {
            site_url: window.location.protocol + '//' + window.location.host,
            index: {
                static: true, //是否是单页翻译转换
                language: 'en',
                attribute: 'index', //路径中的唯一标识，能通过indexOf在href中查询到一次的
                hash: '',
                href: '/index-en.html', //完整的链接
                path: '/index-en.html'
            },
            product1: {
                static: false,
                language: 'en',
                attribute: 'product',
                hash: '',
                href: '/cdn-cdn.html',
                path: '/cdn-cdn.html'
            },
            product2: {
                static: false,
                language: 'en',
                attribute: 'product',
                hash: '',
                href: '/pcdn.html',
                path: '/pcdn.html'
            },
            product_compare: {
                static: false,
                language: 'en',
                attribute: 'pros_compare',
                hash: '',
                href: '/pros_compare.html',
                path: '/pros_compare.html'
            },
            solution: {
                static: false,
                language: 'en',
                attribute: 'solution',
                hash: '',
                href: '/solution.html',
                path: '/solution.html'
            },
            about: {
                static: true,
                language: 'en',
                attribute: 'about',
                hash: '',
                href: '/about-en.html',
                path: '/about-en.html'
            },
            contact: {
                static: true,
                language: 'en',
                attribute: 'contact',
                hash: '',
                href: '#',
                path: ''
            }
        },
        cn: {
            site_url: window.location.protocol + '//' + window.location.host,
            index: {
                static: true,
                language: 'cn',
                attribute: 'index',
                hash: '',
                href: '/index-cn.html',
                path: '/index-cn.html'
            },
            product1: {
                static: false,
                language: 'cn',
                attribute: 'product',
                hash: '',
                href: '/cdn-cdn.html',
                path: '/cdn-cdn.html'
            },
            product2: {
                static: false,
                language: 'cn',
                attribute: 'product',
                hash: '',
                href: '/pcdn.html',
                path: '/pcdn.html'
            },
            product_compare: {
                static: false,
                language: 'cn',
                attribute: 'pros_compare',
                hash: '',
                href: '/pros_compare.html',
                path: '/pros_compare.html'
            },
            solution: {
                static: false,
                language: 'cn',
                attribute: 'solution',
                hash: '',
                href: '/solution.html',
                path: '/solution.html'
            },
            about: {
                static: true,
                language: 'cn',
                attribute: 'about',
                hash: '',
                href: '/about.html',
                path: '/about.html'
            },
            contact: {
                static: true,
                language: 'cn',
                attribute: 'contact',
                hash: '',
                href: '#',
                path: ''
            }
        }
    };

    var redirection = function redirection() {
        if (currentRoute && currentRoute.static) {
            //仅对静态路由进行重定向
            var croute = languagesRoute[util.getLocalLanguage()];
            for (var r in croute) {
                if (currentRoute.attribute && croute[r].attribute == currentRoute.attribute) {
                    window.location.href = croute[r].href;
                    break;
                }
            }
        }
    };

    var currentRoute = null,
        currentRouteMatched = false;
    var matchCurrentPath = function matchCurrentPath(force) {
        //非强制型的更改
        if (!force) {
            //如果运行了则不再运行
            if (currentRouteMatched) return currentRoute;
        }
        var targetRoute = null,
            cuPath = util.getPathName(),
            cHash = util.getHashName();
        for (var k in languagesRoute) {
            var allRoute = languagesRoute[k];
            for (var i in allRoute) {
                if (allRoute[i].path && (allRoute[i].attribute === 'index' && (cuPath === '/index.html' || cuPath === allRoute[i].path) || allRoute[i].path === cuPath)) {
                    if (cHash) {
                        console.log('检测到hash');
                        if (allRoute[i].hash == cHash) {
                            targetRoute = currentRoute = allRoute[i];
                            break;
                        }
                    } else {
                        targetRoute = currentRoute = allRoute[i];
                        break;
                    }
                }
            }
        };
        targetRoute !== null && (currentRouteMatched = true);
        return targetRoute;
    };

    window.addEventListener('popstate', function (e) {
        //popstate状态下重启路由更新
        matchCurrentPath(true);
    });

    //返回接口
    return {
        routeSource: languagesRoute,
        //验证当前路径的处于哪一注册route环境下
        inRoute: function inRoute(route) {
            var matchRoute = matchCurrentPath();
            //仅对静态页面做重定向处理
            if (matchRoute && matchRoute.static && route.language !== matchRoute.language) {
                //初始化，如果不是当前语言的静态页面，则直接重定向
                return redirection(matchRoute);
            }
            return route.href == matchRoute.href;
        },
        //验证是否在某个路径下
        inPage: function inPage(route, language) {
            var flag = false,
                lang = language || util.getLocalLanguage();
            if ((typeof route === 'undefined' ? 'undefined' : _typeof(route)) == 'object') {
                if (route.language === lang) {
                    if (route.attribute === 'index' && route.path == '/') {
                        if (window.location.pathname == route.path || window.location.pathname == route.href) {
                            flag = true;
                        }
                    } else {
                        if (route.static) {
                            if (window.location.pathname + window.location.search + window.location.hash == route.href) {
                                flag = true;
                            }
                        } else if (window.location.pathname == route.path) {
                            flag = true;
                        }
                    }
                } else {
                    console.error('Language version incorrect!');
                }
            } else {
                console.info('Match Route Should Be An Object!  [&{route}]');
                flag = window.location.pathname == route;
            }

            return flag;
        },
        getCurrentRoute: function getCurrentRoute() {
            return currentRoute;
        },
        redirect: function redirect(route, lang) {
            redirection(route, lang);
        }
    };
});