requirejs.config({
    baseUrl: '/scripts',
    paths: {
        i18n: 'i18n',
        lib: '/lib',
        part: 'components',
        cf: 'config',
        page: 'page',
        util: 'util/util',
        jquery: '/lib/jquery/dist/jquery',
        swiper: '/lib/swiper/dist/js/swiper',
        handlebars: '/lib/handlebars/handlebars',
        bootstrap: '/lib/bootstrap-sass/assets/javascripts/bootstrap',
        translate: '/lib/i18n_translate/translate.2.2.3.min'
    },
    shim:{
        'bootstrap':{
            deps:['jquery']
        }
    }
});
requirejs(['require','i18n/controller','jquery','part/swipers'],
    function (require,i18n_controller,$,swipers) {
      $('body').scrollTop(0);
    // page common
    require(['part/header_generator','part/footer_generator']);

    var site_config = require('cf/site_config');
    if (site_config.inRoute(i18n_controller.route().index,i18n_controller.getLanguage())){
        //index actions
        swipers.index();
    }

    if (site_config.inRoute(i18n_controller.route().product_compare,i18n_controller.getLanguage())){
        //product compare
        // pros_compare.initial('f_0')
        require(['page/page_product_compare']);
    }

    if (site_config.inRoute(i18n_controller.route().product,i18n_controller.getLanguage())){
        require(['page/page_product'])
    }

    if (site_config.inRoute(i18n_controller.route().solution,i18n_controller.getLanguage())){
        require(['page/page_solution'])
    }

    //用于定位当前所在页面路由
    if(site_config.inRoute(i18n_controller.route().about,i18n_controller.getLanguage())){
      require(['page/page_about']);
    };

    if (site_config.inRoute(i18n_controller.route().contact,i18n_controller.getLanguage())){
      require(['page/page_about']);
    };

})
