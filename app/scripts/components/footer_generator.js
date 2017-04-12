/**
 * Created by JasonD on 16/12/10.
 */
define(['jquery','util','cf/site_config','part/templates','i18n/config','i18n/controller'],
    function ($,util,site_config,templates,i18n_config,i18n_controller) {

    var footer_box = $('#footer_box');

        footer_box.empty().html(i18n_controller.translator.nodeString(templates.footer.main));
        var footer_products = $('#footer_products'),
            footer_solutions = $('#footer_solutions');


    function footerGenerator() {
        var footerNavData = {
            foot_products: [],
            foot_solutions: []
        };
        var currentLanguage = i18n_controller.getLanguage(),
            clangData = i18n_config[currentLanguage];
        //获取levelMap
        var levelMap = util.extend.Obj(
            util.extend.Obj(
                {},
                clangData.header.solution.classify
            ),
            clangData.header.product.classify
        );
        i18n_controller.translateJSONGetter('products_all', function (data) {
            let gc = 0;
            for (var type in data){
                if(gc < 2 && data[type].length !== 0){
                    footerNavData.foot_products.push({
                        type_name: levelMap[type],
                        type: type,
                        list: data[type].slice(0,3)
                    });
                }
                gc++;
            }
            i18n_controller.translateJSONGetter('solutions_all', function (sdata) {
                var sgc = 0;
                for (var st in sdata){
                    if(sgc < 2 && sdata[st].length !== 0){
                        footerNavData.foot_solutions.push({
                            type_name: levelMap[st],
                            type: st,
                            list: sdata[st].slice(0,4)
                        });
                    }
                    sgc++;
                };
                footer_products.empty().html(util.generateHtml(templates.footer.product,footerNavData));
                footer_solutions.empty().html(util.generateHtml(templates.footer.solution,footerNavData));
            })
        });
    };

    footerGenerator();
    //注册Reloader
    i18n_controller.registerUpdateEvent(footerGenerator);



})
