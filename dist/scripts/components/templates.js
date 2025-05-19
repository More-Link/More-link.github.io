'use strict';

/**
 * Created by JasonD on 16/12/9.
 */
define(['cf/site_config', 'cf/file_url', 'i18n/controller', 'i18n/config'], function (site_config, file_url, i18n_controller, i18n_config) {
  return {
    header: {
      product: '{{#each nav_products}}\n                    <li>\n                        {{#safe list}}{{/safe}}\n                    </li>\n                    {{/each}}',
      solution: '{{#each nav_solutions}}\n                    <li>\n                        {{#safe list}}{{/safe}}\n                    </li>\n                    {{/each}}'
    },
    product_compare: {
      item_info: function item_info() {
        return '<img src="{{image}}" alt="{{name}}">\n                    <h6>{{name}}</h6>\n                    <span class="operate_btn pro_item_remove">' + i18n_controller.config[i18n_controller.getLanguage()].page.compare.btn_remove + '</span>';
      },
      item_option: '<li value="{{id}}">{{name}}</li>',
      params_tr: '<tr class="pro_params pro_{{param}}">\n                <th>{{param_name}}</th>\n                <td title="{{param_name}}"></td>\n                <td></td>\n                <td></td>\n                <td></td>\n            </tr>'
    },
    footer: {
      main: '<div class="footer_box_top">\n          <style>\n              .contact_area > span {\n                  color: #999 !important;\n                  padding-bottom: 5px;\n              }\n              .contact_area > span b {\n                  color: #ccc;\n              }\n          </style>\n          <div class="row">\n            <div class="col-sm-12 col-md-6 hidden-xs">\n              <div class="row">\n                <div class="col-xs-4">\n                  <h5 class="column_title" i18n-morelink="footer.navTitle">\u5BFC\u822A</h5>\n                  <nav class="footer_nav_list">\n                    <li><a i18n-morelink="header.index,route.index.href|href">\u9996\u9875</a></li>\n                    <li><a i18n-morelink="header.about,route.about.href|href">\u516C\u53F8\u7B80\u4ECB</a></li>\n                    <li><a i18n-morelink="header.contact,route.contact.href|href">\u8054\u7CFB\u6211\u4EEC</a></li>\n                  </nav>\n                </div>\n                <div class="col-xs-4">\n                  <h5 class="column_title" i18n-morelink="header.product1.title">\u4EA7\u54C1</h5>\n                  <ul class="footer_profile_list" id="footer_products">\n\n                  </ul>\n                </div>\n                <div class="col-xs-4">\n                  <h5 class="column_title" i18n-morelink="header.solution.title">\u89E3\u51B3\u65B9\u6848</h5>\n                  <ul class="footer_profile_list" id="footer_solutions">\n\n                  </ul>\n                </div>\n              </div>\n            </div>\n            <div class="col-sm-12 col-md-6">\n              <div i18n-morelink="footer.sell" class="col-xs-12 col-sm-6"></div>\n              <div class="col-xs-12 col-sm-6">\n                <div class="wechat_code_area">\n                  <img i18n-morelink="footer.weChat.codeImage|src,footer.weChat.title|alt" src="images/img/index/img_code.jpg" alt="">\n                  <label i18n-morelink="footer.weChat.title">\u626B\u63CF\u5173\u6CE8\u5FAE\u4FE1\u516C\u4F17\u53F7</label>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="footer_box_bottom">\n          COPYRIGHT &COPY; 2016 <a i18n-morelink="route.site_url|href">MORELINK.COM</a> ALL RIGHTS RESERVED\n        </div>',
      product: function product() {
        return '{{#each foot_products}}\n                <label>{{type_name}}</label>\n                    {{#each list}}\n                    <li><a href="' + i18n_controller.route().product.path + '?type={{path}}&id={{id}}">{{name}}</a></li>\n                    {{/each}}\n                {{/each}}';
      },
      solution: function solution() {
        return '{{#each foot_solutions}}\n                <label>{{type_name}}</label>\n                    {{#each list}}\n                    <li><a href="' + i18n_controller.route().solution.path + '?type={{path}}&id={{id}}">{{name}}</a></li>\n                    {{/each}}\n                {{/each}}';
      }
    },
    product: {
      summary: function summary() {
        return '<div class="swiper-slide" style="background-image: url(\'' + file_url.filePath(i18n_controller.getLanguage()).pro_img + '{{image.cover}}\')">\n            <div class="banner_content_wraper">\n              <div class="banner_content_box">\n                <h1 class="content_title">{{name}}</h1>\n                <article class="content_summary">\n                  {{summary}}\n                </article>\n              </div>\n            </div>\n          </div>';
      },
      features: function features() {
        return '<h1 class="recommend_header">' + i18n_controller.config[i18n_controller.getLanguage()].page.product.featureTitle + '</h1>\n            <div class="product_function_box">\n                {{#each features}}\n                <p>{{this}}</p>\n                {{/each}}\n            </div>';
      },
      params: function params() {
        var config = i18n_controller.config[i18n_controller.getLanguage()];
        return '<div class="param_title_wrap clearfix">\n              <div class="prama_title col-xs-12 col-sm-6">' + config.page.product.param.paramTitle + '</div>\n              <div class="prama_contrast col-xs-12 col-sm-6"><a href="' + i18n_controller.route().product_compare.path + '?type={{path}}&id={{id}}">' + config.page.product.param.compareTitle + '</a></div>\n            </div>\n            <div class="prama_body_wrap">\n              <div class="row">\n                {{#if params}}\n                <div class="col-xs-12 col-lg-3">\n                  <div class="pro_title">\n                    <p>' + config.page.product.param.hardware + '</p>\n                  </div>\n                  <div class="pro_body">\n                    {{#each params.for_hardware}}\n                    <p class="pro_body_item">{{this}}</p>\n                    {{/each}}\n                  </div>\n                </div>\n                <div class="col-xs-12 col-lg-3">\n                  <div class="pro_title">\n                    <p>' + config.page.product.param.network + '</p>\n                  </div>\n                  <div class="pro_body">\n                    {{#each params.for_network}}\n                    <p class="pro_body_item">{{this}}</p>\n                    {{/each}}\n                  </div>\n                </div>\n                <div class="col-xs-12 col-lg-3">\n                  <div class="pro_title wifi">\n                    <p>' + config.page.product.param.software + '</p>\n                  </div>\n                  <div class="pro_body">\n                    {{#each params.for_software}}\n                    <p class="pro_body_item">{{this}}</p>\n                    {{/each}}\n                  </div>\n                </div>\n                <div class="col-xs-12 col-lg-3">\n                  <div class="pro_title">\n                    <p>' + config.page.product.param.others + '</p>\n                  </div>\n                  <div class="pro_body">\n                    {{#each params.for_others}}\n                    <p class="pro_body_item">{{this}}</p>\n                    {{/each}}\n                  </div>\n                </div>\n                {{/if}}\n              </div>\n            </div>';
      }
    },
    solution: function solution() {
      return '<article class="solution_content">\n                {{#each summary}}\n                <p>{{this}}</p>\n                {{/each}}\n              </article>\n            <div class="other_solution_box">\n              <ul class="other_solution">\n                <li class="t" i18n-morelink="page.solution.recommend">' + i18n_controller.config[i18n_controller.getLanguage()].page.solution.recommend + '</li>\n                {{#each recommends}}\n                <li><a href="' + i18n_controller.route().solution.path + '?type={{path}}&id={{id}}">{{name}}</a></li>\n                {{/each}}\n              </ul>\n            </div>';
    }
  };
});