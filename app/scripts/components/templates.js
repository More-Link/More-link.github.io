/**
 * Created by JasonD on 16/12/9.
 */
define(['cf/site_config','cf/file_url','i18n/controller','i18n/config'],
    (site_config,file_url,i18n_controller,i18n_config)=>({
    header: {
        main: `<li><a i18n-morelink="header.index,route.index.path|href" class="${site_config.inPage(i18n_controller.route().index) ? 'active' : ''}">首页</a></li>
            <li>
                <span i18n-morelink="header.product.title" class="nav_level_tag nav_control nav_product_level_tag ${site_config.inPage(i18n_controller.route().product) || site_config.inPage(i18n_controller.route().product_compare) 
                        ? 'active' : ''}">产品</span>
                <ul class="nav_in_control nav_level_box nav_products" id="nav_products">
                    <h2 class="nav_level_box_title"><span i18n-morelink="header.product.back_btn" class="nav_level_back_btn">返回</span>@{header.product.title|morelink}</h2>
                </ul>
            </li>
            <li>
                <span i18n-morelink="header.solution.title" class="nav_level_tag nav_control nav_solution_level_tag ${site_config.inPage(i18n_controller.route().solution) ? 'active' : ''}"></span>
                <ul class="nav_in_control nav_level_box nav_solutions" id="nav_solutions">
                    <h2 class="nav_level_box_title"><span i18n-morelink="header.solution.back_btn" class="nav_level_back_btn">返回</span>@{header.solution.title|morelink}</h2>
                    
                </ul>
            </li>
            <li><a i18n-morelink="header.about,route.about.href|href" class="${site_config.inPage(i18n_controller.route().about) ? 'active' : ''}" href="${i18n_controller.route().about.href}">公司介绍</a></li>
            <li class="nav_contact"><a i18n-morelink="header.contact,route.contact.href|href" class="${site_config.inPage(i18n_controller.route().contact) ? 'active' : ''}" href="${i18n_controller.route().contact.href}">联系我们</a></li>
            <li class="nav_language">
                ${i18n_controller.switcherHtml()}
            </li>`,
        product:  `{{#each nav_products}}
                    <li>
                        {{#safe list}}{{/safe}}
                    </li> 
                    {{/each}}`,
        solution: `{{#each nav_solutions}}
                    <li>
                        {{#safe list}}{{/safe}}
                    </li> 
                    {{/each}}`
    },
    product_compare: {
        item_info: function () {
            return `<img src="{{image}}" alt="{{name}}">
                    <h6>{{name}}</h6>
                    <span class="operate_btn pro_item_remove">${i18n_controller.config[i18n_controller.getLanguage()].page.compare.btn_remove}</span>`;
        },
        item_option: '<li value="{{id}}">{{name}}</li>',
        params_tr: `<tr class="pro_params pro_{{param}}">
                <th>{{param_name}}</th>
                <td title="{{param_name}}"></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`
    },
    footer: {
        main: `<div class="footer_box_top">
          <div class="row">
            <div class="col-sm-12 col-md-6 hidden-xs">
              <div class="row">
                <div class="col-xs-4">
                  <h5 class="column_title" i18n-morelink="footer.navTitle">导航</h5>
                  <nav class="footer_nav_list">
                    <li><a i18n-morelink="header.index,route.index.href|href">首页</a></li>
                    <li><a i18n-morelink="header.about,route.about.href|href">公司简介</a></li>
                    <li><a i18n-morelink="header.contact,route.contact.href|href">联系我们</a></li>
                  </nav>
                </div>
                <div class="col-xs-4">
                  <h5 class="column_title" i18n-morelink="header.product.title">产品</h5>
                  <ul class="footer_profile_list" id="footer_products">
                    
                  </ul>
                </div>
                <div class="col-xs-4">
                  <h5 class="column_title" i18n-morelink="header.solution.title">解决方案</h5>
                  <ul class="footer_profile_list" id="footer_solutions">
                    
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div i18n-morelink="footer.sell" class="col-xs-12 col-sm-6"></div>
              <div class="col-xs-12 col-sm-6">
                <div class="wechat_code_area">
                  <img i18n-morelink="footer.weChat.codeImage|src,footer.weChat.title|alt" src="images/img/index/img_code.jpg" alt="">
                  <label i18n-morelink="footer.weChat.title">扫描关注微信公众号</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_box_bottom">
          COPYRIGHT &COPY; 2016 <a i18n-morelink="route.site_url|href">MORELINK.COM</a> ALL RIGHTS RESERVED
        </div>`,
        product: function () {
            return `{{#each foot_products}}
                <label>{{type_name}}</label>
                    {{#each list}}
                    <li><a href="${i18n_controller.route().product.path}?type={{path}}&id={{id}}">{{name}}</a></li>
                    {{/each}}
                {{/each}}`;
        },
        solution: function () {
            return `{{#each foot_solutions}}
                <label>{{type_name}}</label>
                    {{#each list}}
                    <li><a href="${i18n_controller.route().solution.path}?type={{path}}&id={{id}}">{{name}}</a></li>
                    {{/each}}
                {{/each}}`;
        }
    },
    product: {
        summary: function () {
            return `<div class="swiper-slide" style="background-image: url('${file_url.filePath(i18n_controller.getLanguage()).pro_img}{{image.cover}}')">
            <div class="banner_content_wraper">
              <div class="banner_content_box">
                <h1 class="content_title">{{name}}</h1>
                <article class="content_summary">
                  {{summary}}
                </article>
              </div>
            </div>
          </div>`;
        },
        features: function () {
            return `<h1 class="recommend_header">${i18n_controller.config[i18n_controller.getLanguage()].page.product.featureTitle}</h1>
            <div class="product_function_box">
                {{#each features}}
                <p>{{this}}</p>
                {{/each}}
            </div>`;
        },
        params: function () {
            var config = i18n_controller.config[i18n_controller.getLanguage()];
            return `<div class="param_title_wrap clearfix">
              <div class="prama_title col-xs-12 col-sm-6">${config.page.product.param.paramTitle}</div>
              <div class="prama_contrast col-xs-12 col-sm-6"><a href="${i18n_controller.route().product_compare.path}?type={{path}}&id={{id}}">${config.page.product.param.compareTitle}</a></div>
            </div>
            <div class="prama_body_wrap">
              <div class="row">
                {{#if params}}
                <div class="col-xs-12 col-lg-3">
                  <div class="pro_title">
                    <p>${config.page.product.param.hardware}</p>
                  </div>
                  <div class="pro_body">
                    {{#each params.for_hardware}}
                    <p class="pro_body_item">{{this}}</p>
                    {{/each}}
                  </div>
                </div>
                <div class="col-xs-12 col-lg-3">
                  <div class="pro_title">
                    <p>${config.page.product.param.network}</p>
                  </div>
                  <div class="pro_body">
                    {{#each params.for_network}}
                    <p class="pro_body_item">{{this}}</p>
                    {{/each}}
                  </div>
                </div>
                <div class="col-xs-12 col-lg-3">
                  <div class="pro_title wifi">
                    <p>${config.page.product.param.software}</p>
                  </div>
                  <div class="pro_body">
                    {{#each params.for_software}}
                    <p class="pro_body_item">{{this}}</p>
                    {{/each}}
                  </div>
                </div>
                <div class="col-xs-12 col-lg-3">
                  <div class="pro_title">
                    <p>${config.page.product.param.others}</p>
                  </div>
                  <div class="pro_body">
                    {{#each params.for_others}}
                    <p class="pro_body_item">{{this}}</p>
                    {{/each}}
                  </div>
                </div>
                {{/if}}
              </div>
            </div>`
        }
    },
    solution: function () {
        return `<article class="solution_content">
                {{#each summary}}
                <p>{{this}}</p>
                {{/each}}
              </article>
            <div class="other_solution_box">
              <ul class="other_solution">
                <li class="t" i18n-morelink="page.solution.recommend">${i18n_controller.config[i18n_controller.getLanguage()].page.solution.recommend}</li>
                {{#each recommends}}
                <li><a href="${i18n_controller.route().solution.path}?type={{path}}&id={{id}}">{{name}}</a></li>
                {{/each}}
              </ul>
            </div>`
    }
}))
