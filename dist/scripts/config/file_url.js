'use strict';

/**
 * Created by JasonD on 16/12/9.
 */
define(function () {
    //File Path
    var _filePath = {
        en: {
            data: '/data/en/',
            pro_img: '/images/img/product/'
        },
        cn: {
            data: '/data/cn/',
            pro_img: '/images/img/product/'
        }
    };
    return {
        filePath: function filePath(lang) {
            return _filePath[lang];
        }
    };
});