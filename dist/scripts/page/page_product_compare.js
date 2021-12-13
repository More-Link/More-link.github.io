'use strict';

/**
 * Created by JasonD on 16/12/10.
 */
define(['jquery', 'part/templates', 'util', 'part/pros_compare'], function ($, templates, util, pros_compare) {
    var product_summary = $('#product_summary'),
        product_features = $('#product_features'),
        product_params = $('#product_params');
    var querys = util.queryParams();
    if (querys == null) pros_compare.initial();else pros_compare.initial(querys.id);
});