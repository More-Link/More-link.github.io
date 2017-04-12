/**
 * Created by JasonD on 16/12/12.
 */
define(['cf/site_config'],(site_config)=>({
    cn: {
        //路由转换源引入
        route: site_config.routeSource.cn,
        //页面公共HEADER转换
        header: {
            index: '首页',
            product: {
                title:'产品',
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
                recommend: '其他解决方案',
            },
            //产品页面
            product: {
	            headTitle: '产品详情-MORELINK官方网站',
                featureTitle: '功能特点',
                param:{
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
                lineFirst: '产品',
            }
        },
        //页面公共FOOTER转换
        footer: {
            navTitle: '导航',
            sell: `<h5 class="column_title">中国区域</h5>
                <div class="contact_area">
                  <span>
                  <b>商务合作</b>
                  </span>
                  <!--<span>-->
                    <!--<b>联系方式: </b>-->
                    <!--(+86)130-0883-6312-->
                  <!--</span>-->
                  <span>
                    <b>邮箱地址: </b>
                    oversea001@more-link.com.hk
                  </span>
                  </span>
                  <span>
                    <b>公司地址: </b>
                    中国广东省深圳市南山区高新南四道深圳软件园W1-A六层612
                  </span>
                </div>`,
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
                title:'PRODUCT',
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
                recommend: 'Recommends',
            },
            product: {
	            headTitle: 'Products-MORELINK Official Site',
                featureTitle: 'The Features',
                param:{
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
            sell: `<h5 class="column_title">CONTACT US</h5>
                <div class="contact_area">
                  <span><b>Business Cooperation</b></span>
                  <!--<span>(010)231238490</span>-->
                  <span>
                    <b>E-mail: </b>
                    oversea001@more-link.com.hk
                  </span>
                  <span>
                    <b>Address: </b>
                    No.612, W1-A, Shenzhen Software Park, High-tech South 4th Road, Nanshan, Shenzhen, Guangdong, China
                  </span>
                </div>`,
            weChat: {
                codeImage: 'images/img/index/img_code.jpg',
                title: 'Please scan the qr code'
            }
        }
    }


}))
