'use strict';

/**
 * Created by JasonD on 16/12/10.
 */
define(['jquery', 'part/templates', 'util', 'part/pros_de_height', 'i18n/controller'], function ($, templates, util, height, i18n_controller) {
    var product_summary = $('#product_summary'),
        product_features = $('#product_features'),
        product_params = $('#product_params');
    var querys = util.queryParams();
    var prodata = null;
    function pageProduct() {
        i18n_controller.translateJSONGetter('products_all', function (data) {
            prodata = data;
            var noQuery = querys == null ? true : false;
            var targetData = null;
            if (noQuery) {
                //获取第一个数据
                targetData = util.getRecommends(prodata, 1)[0];
            } else {
                targetData = util.selectByID(prodata, querys.id);
            }
            for (var p in targetData.params) {
                if (!targetData.params['for_' + p]) {
                    var arr = [];
                    for (var v in targetData.params[p]) {
                        util.extend.Arr(arr, targetData.params[p][v]);
                    }
                    targetData.params['for_' + p] = arr;
                }
            }
            console.log(targetData);
            product_summary.html(util.generateHtml(templates.product.summary, targetData));
            product_features.html(util.generateHtml(templates.product.features, targetData));
            product_params.html(util.generateHtml(templates.product.params, targetData));

            height.setHeight();
            $(window).resize(function () {
                height.setHeight();
            });
        });
    };

    pageProduct();

    i18n_controller.registerUpdateEvent(pageProduct);
});