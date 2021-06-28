'use strict';

/**
 * Created by JasonD on 16/12/6.
 */
define(['jquery', 'i18n/controller', 'cf/file_url', 'util'], function ($, i18n_controller, file_url, util) {

    return {
        bindEvents: function bindEvents() {
            var main_nav_box = $('#main_nav_box'),
                laptop_nav_box = $('#product_laptop_menu_box'),
                recommend_nav_box = $('#product_recommend_menu_box'),
                laptop_product_nav = $('.laptop_product_nav');
            $('.nav_control_btn').on('click', function () {
                var $this = $(this);
                $this.toggleClass('active');
                $this.next('.main_nav_box').toggleClass('active');
            });
            main_nav_box.on('click', '.nav_control', function () {
                var $this = $(this);
                if ($(window).width() < 769) {
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $this.next('ul.nav_in_control').find('.nav_control').each(function (i, ele) {
                            ele = $(ele);
                            ele.removeClass('active');
                            ele.next('ul.nav_in_control').removeClass('active');
                        });
                    } else {
                        $this.addClass('active');
                        $this.next('ul.nav_in_control').addClass('active');
                    }
                }
            }).on('click', '.nav_control', function () {
                var $this = $(this);
                $this.next('.nav_level_box').addClass('active');
            }).on('click', 'a', function () {
                var $this = $(this);
                $this.parent().siblings().children('a').removeClass('active');
                $this.addClass('active');
                main_nav_box.removeClass('active');
                $('.nav_control_btn').removeClass('active');
            }).on('click', '.nav_level_back_btn', function () {
                var $this = $(this),
                    parent_level_box = $this.parents('.nav_level_box');
                parent_level_box.removeClass('active');
                parent_level_box.prev('.nav_level_tag').removeClass('active');
            }).on('click', '.language_switcher', function () {
                var $this = $(this);
                $this.toggleClass('active');
                $this.next().toggleClass('active');
            }).on('click', '.lang_switch_options>li', function () {
                var $this = $(this),
                    langTxt = $this.text(),
                    langTag = $this.attr('value');
                if ($this.hasClass('active')) return;
                var languageSwitcher = $('.language_switcher');
                languageSwitcher.text(langTxt);
                $this.siblings().removeClass('active');
                $this.addClass('active');
                languageSwitcher.toggleClass('active');
                $this.parent().toggleClass('active');

                i18n_controller.switchLanguage(langTag);
            }).on('click mouseenter', '.nav_product_level_tag', function () {
                var switch_slide = laptop_nav_box.find('.switch_slide'),
                    noEmpSlide = switch_slide.filter(function () {
                    return $(this).children().length !== 0;
                }),
                    getfirst = noEmpSlide.children().first();
                noEmpSlide.addClass('active').siblings().removeClass('active');
                laptop_nav_box.find('.switch_title').filter(function () {
                    return $(this).attr('index') == noEmpSlide.attr('index');
                }).addClass('active').siblings().removeClass('active');
                generateShowBox(getfirst);
                recommend_nav_box.removeClass('active');
                $('.switch_body .switch_slide:first-child').addClass('active');
                laptop_nav_box.addClass('active').parent().addClass('active');
            }).on('click mouseenter', '.nav_solution_level_tag', function () {
                var switch_slide = recommend_nav_box.find('.switch_slide'),
                    noEmpSlide = switch_slide.filter(function () {
                    return $(this).children().length !== 0;
                }),
                    getfirst = noEmpSlide.children().first();
                noEmpSlide.addClass('active').siblings().removeClass('active');
                recommend_nav_box.find('.switch_title').filter(function () {
                    return $(this).attr('index') == noEmpSlide.attr('index');
                }).addClass('active').siblings().removeClass('active');
                generateShowBox(getfirst);
                laptop_nav_box.removeClass('active');
                $('.switch_body .switch_slide:first-child').addClass('active');
                recommend_nav_box.addClass('active').parent().addClass('active');
            });

            $('body').not('.laptop_product_nav_container,.nav_solution_level_tag,.nav_product_level_tag').on('mouseout', function () {
                $('.laptop_product_nav_container').removeClass('active');
            });
            //PC版产品二级导航栏
            laptop_nav_box.on('click mouseenter', '.switch_title', function (e) {
                // $(".product_summary_show_box").empty();
                var $this = $(this),
                    index = $this.attr('index');
                $this.addClass('active').siblings().removeClass('active');
                $('.switch_body>.switch_slide').filter(function () {
                    return $(this).attr('index') == index;
                }).addClass('active').siblings().removeClass('active');
                var getfirst = laptop_nav_box.find('.switch_body .switch_slide.active .switch_pro_name:first-child');
                generateShowBox(getfirst);
            }).on('mouseenter', '.switch_pro_name', function () {
                generateShowBox(this);
            });

            recommend_nav_box.on('click mouseenter', '.switch_title', function (e) {
                // $(".product_summary_show_box").empty();
                var $this = $(this),
                    index = $this.attr('index');
                $this.addClass('active').siblings().removeClass('active');
                $('.switch_body>.switch_slide').filter(function () {
                    return $(this).attr('index') == index;
                }).addClass('active').siblings().removeClass('active');
                var getfirst = recommend_nav_box.find('.switch_body .switch_slide.active .switch_pro_name:first-child');
                generateShowBox(getfirst);
            }).on('mouseenter', '.switch_pro_name', function () {
                generateShowBox(this);
            }).on('click mouseenter', '.params_list a', function () {
                var $this = $(this);
                var t = $this.html();
                $('.params_list').prev('h3').html(t).end().find('a').removeClass('active');
                console.log($('.params_list').prev('h3').html(t).end().children());
                $this.addClass('active');
                var id = $this.data('id'),
                    classify = $this.data('classify');
                getSummary(id, classify);
            });

            function generateShowBox(target) {
                var $this = $(target),
                    classify = $this.data('classify'),
                    id = $this.data('id'),

                //只要初始数据加载后，数据肯定是有的
                proData = i18n_controller.translateJSONGetter('products_all')[classify],
                    solData = i18n_controller.translateJSONGetter('solutions_all')[classify],
                    //software的所有对象
                i18nConfig = i18n_controller.config[i18n_controller.getLanguage()];
                $this.addClass('active').siblings().removeClass('active');
                $('.product_summary_show_box').empty().html(function () {
                    var _data;
                    var plist = '';
                    if (classify == undefined) return;
                    if (classify == 'software' | classify == 'hardware') {
                        _data = solData;
                        var len = solData.length;
                        var firstShow = '';
                        var count = 0;
                        for (var p = 0; p < len; p++) {
                            if (_data[p].path == $this.html()) {
                                if (firstShow == '') {
                                    firstShow = '' + _data[p].name;
                                }
                                plist += '<li><a class="' + (count == 0 ? 'active' : '') + '" href="' + i18n_controller.route()['solution'].path + '?type=' + _data[p].path + '&id=' + _data[p].id + '" data-id="' + _data[p].id + '" data-classify="' + classify + '">' + _data[p].name + '</a></li>';
                            }
                            count = 1;
                        }

                        var summary_content = typeof _data[0].summary_short !== 'undefined' && _data[0].summary_short !== null ? _data[0].summary_short[0] : _data[0].summary[0];
                        var summary_content_box = _data[0].image == null || _data[0].image == '' ? '<p class="col-md-12">' + summary_content + '</p>' : '\n                <img class="col-md-4" src="/images/img/solute/' + _data[0].image + '" style="max-width:150px;margin-bottom:10px;">\n                <p class="col-md-8">' + summary_content + '</p>\n            ';
                        return '<span class="summary_content_box">\n                          <h3>' + firstShow + '</h3>\n                          <ul class="params_list">\n\t                         ' + plist + '\n                          </ul>\n                        </span>\n                        <a class="solution_content_summary row" href="' + i18n_controller.route()['solution'].path + '?type=' + _data[0].path + '&id=' + _data[0].id + '">\n                        ' + summary_content_box + '\n                        </a>';
                    } else {
                        _data = proData[id];
                        //for (var p in _data.params) {
                        //    plist += i18nConfig.page.product.param[p] ? `<li>${i18nConfig.page.product.param[p]}</li>` : '';
                        //}
                        //Object.keys()，该方法返回一个数组传入对象，返回属性名
                        Object.keys(_data.groups).forEach(function (val) {
                            plist += '<li>' + val + '</li> ';
                        });

                        return '<a href="' + i18n_controller.route()['product'].path + '?type=' + _data.path + '&id=' + _data.id + '" class="summary_content_box">\n                          <h3>' + _data.name + '</h3>\n                          <ul class="params_list">\n\t                         ' + plist + '\n                          </ul>\n                        </a>\n                        <a href="' + i18n_controller.route()['product'].path + '?type=' + _data.path + '&id=' + _data.id + '" class="summary_image">\n                          <img src="' + (file_url.filePath(i18n_controller.getLanguage()).pro_img + _data.image.comp) + '" alt="' + _data.name + '">\n                        </a>';
                    }
                });
            }

            //切换解决方案的摘要
            function getSummary(id, classify) {
                var solData = i18n_controller.translateJSONGetter('solutions_all')[classify],
                    //software的所有对象
                index = getIndex(id, solData);

                var summary_content = typeof solData[index].summary_short !== 'undefined' && solData[index].summary_short !== null ? solData[index].summary_short[0] : solData[index].summary[0];
                $('.solution_content_summary').html(solData[index].image == null || solData[index].image == '' ? '\n            <p class="col-md-12">' + summary_content + '</p>\n        ' : '\n            <img class="col-md-4" src="/images/img/solute/' + solData[index].image + '" style="max-width:150px;margin-bottom:10px;">\n            <p class="col-md-8">' + summary_content + '</p>\n        ').attr({ 'href': i18n_controller.route()['solution'].path + '?type=' + solData[index].path + '&id=' + solData[index].id });
            }

            //通过id得到对象index
            function getIndex(id, data) {
                var index;
                $(data).each(function (i, v) {
                    if (v.id == id) {
                        index = i;
                    }
                });
                return index;
            }
        }
    };
});