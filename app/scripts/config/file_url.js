/**
 * Created by JasonD on 16/12/9.
 */
define(()=>{
    //File Path
    var filePath = {
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
        filePath: function (lang) {
            return filePath[lang];
        }
    }
})
