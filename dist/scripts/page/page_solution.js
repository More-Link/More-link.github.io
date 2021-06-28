'use strict';

/**
 * Created by JasonD on 16/12/10.
 */
define(['jquery', 'part/templates', 'util', 'i18n/controller'], function ($, templates, util, i18n_controller) {
    var solution_content_box = $('#solution_content_box'),
        name_box = $('#name_box');
    var querys = util.queryParams();
    function pageSolution() {
        i18n_controller.translateJSONGetter('solutions_all', function (data) {
            var noQuery = querys == null ? true : false;
            var targetData = null;
            if (noQuery) {
                //获取第一个数据
                targetData = util.getRecommends(data, 1)[0];
                targetData['recommends'] = util.getRecommends(data, 5, targetData.id);
            } else {
                targetData = util.selectByID(data, querys.id);
                targetData['recommends'] = util.getRecommends(data, 5, querys.id);
            }
            name_box.html('<p class="about_morelink">' + targetData.name + '<p>');
            solution_content_box.html(util.generateHtml(templates.solution, targetData));
        });
    };

    pageSolution();

    i18n_controller.registerUpdateEvent(pageSolution);
});