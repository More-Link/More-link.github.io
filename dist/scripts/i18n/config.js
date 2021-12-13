'use strict';

/**
 * Created by JasonD on 16/12/12.
 */
define(['cf/site_config'], function (site_config) {
    return {
        cn: {
            //路由转换源引入
            route: site_config.routeSource.cn,
            //页面公共HEADER转换
            header: {
                index: '首页',
                product: {
                    title: '产品',
                    back_btn: '返回',
                    classify: {
                        finished: '成品',
                        unfinished: '半成品'
                    }
                },
                solution: {
                    title: '解决方案',
                    back_btn: '返回',
                    classify: {
                        software: '软件定制',
                        hardware: '硬件设计'
                    }
                },
                about: '公司介绍',
                contact: '当前语言'
            },
            //各个页面转换
            page: {
                //解决方案页面
                solution: {
                    //页面的title标签显示的字段
                    headTitle: '解决方案-MORELINK官方网站',
                    recommend: '其他解决方案'
                },
                //产品页面
                product: {
                    headTitle: '产品详情-MORELINK官方网站',
                    featureTitle: '功能特点',
                    param: {
                        paramTitle: '规格参数',
                        compareTitle: '产品对比',
                        hardware: '硬件规格',
                        software: '软件功能',
                        network: '3G/4G传感器',
                        others: '其他'
                    }
                },
                //产品对比页面
                compare: {
                    headTitle: '产品参数对比-MORELINK官方网站',
                    title: '参数对比',
                    btn_remove: '移除',
                    btn_add: '添加',
                    selectHolder: '请选择产品型号',
                    lineFirst: '产品'
                }
            },
            //页面公共FOOTER转换
            footer: {
                navTitle: '导航',
                sell: '<h5 class="column_title">\u4E2D\u56FD\u533A\u57DF</h5>\n                <div class="contact_area">\n                  <span>\n                  <b>\u5546\u52A1\u5408\u4F5C</b>\n                  </span>\n                  <!--<span>-->\n                    <!--<b>\u8054\u7CFB\u65B9\u5F0F: </b>-->\n                    <!--(+86)130-0883-6312-->\n                  <!--</span>-->\n                  <span>\n                    <b>\u90AE\u7BB1\u5730\u5740: </b>\n                    oversea001@more-link.com.hk\n                  </span>\n                  </span>\n                  <span>\n                    <b>\u516C\u53F8\u5730\u5740: </b>\n                    \u4E2D\u56FD\u5E7F\u4E1C\u7701\u6DF1\u5733\u5E02\u5357\u5C71\u533A\u9AD8\u65B0\u5357\u56DB\u9053\u6DF1\u5733\u8F6F\u4EF6\u56EDW1-A\u516D\u5C42612\n                  </span>\n                </div>',
                weChat: {
                    codeImage: 'images/img/index/img_code.jpg',
                    title: '扫描关注微信公众号'
                }
            }
        },
        en: {
            route: site_config.routeSource.en,
            header: {
                index: 'HOME',
                product: {
                    title: 'PRODUCT',
                    back_btn: 'Back',
                    classify: {
                        finished: 'ODM Product',
                        unfinished: 'SKD Product'
                    }
                },
                solution: {
                    title: 'SOLUTION',
                    back_btn: 'Back',
                    classify: {
                        software: 'Software',
                        hardware: 'Hardware'
                    }
                },
                about: 'COMPANY',
                contact: 'LANGUAGE'
            },
            page: {
                solution: {
                    headTitle: 'Solutions-MORELINK Official Site',
                    recommend: 'Recommends'
                },
                product: {
                    headTitle: 'Products-MORELINK Official Site',
                    featureTitle: 'The Features',
                    param: {
                        paramTitle: 'Specification',
                        compareTitle: 'Compare the parameters',
                        hardware: 'Hardware specifications',
                        software: 'Software specifications',
                        network: '3G/4G Sensor',
                        others: 'Others'
                    }
                },
                compare: {
                    headTitle: 'Products-Params-Compare-MORELINK Official Site',
                    title: 'Compare the parameters',
                    lineFirst: 'Product',
                    btn_remove: 'Remove',
                    btn_add: 'Add',
                    selectHolder: 'Select models'
                }
            },
            footer: {
                navTitle: 'NAVIGATION',
                sell: '<h5 class="column_title">CONTACT US</h5>\n                <div class="contact_area">\n                  <span><b>Business Cooperation</b></span>\n                  <!--<span>(010)231238490</span>-->\n                  <span>\n                    <b>E-mail: </b>\n                    oversea001@more-link.com.hk\n                  </span>\n                  <span>\n                    <b>Address: </b>\n                    No.612, W1-A, Shenzhen Software Park, High-tech South 4th Road, Nanshan, Shenzhen, Guangdong, China\n                  </span>\n                </div>',
                weChat: {
                    codeImage: 'images/img/index/img_code.jpg',
                    title: 'Please scan the qr code'
                }
            }
        }

    };
});