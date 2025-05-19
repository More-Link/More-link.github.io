/**
 * Created by JasonD on 16/12/10.
 */
define(['jquery','util','part/templates','cf/site_config','i18n/controller','i18n/config'],
    ($,util,templates,site_config,i18n_controller,i18n_config,nav_controller)=> {
    var navBox = {
        product: {},
        solution: {}
    };
    var levelMap = {};

    //生成header头部主导航
    navBox.product = $('#nav_products');
    navBox.solution = $('#nav_solutions');
    //事件初始化

    var generateHeader = function () {
        //初始化数据仓库
        var navigationData = {
            nav_products: [],
            nav_solutions: []
        };
        var currentLanguage = i18n_controller.getLanguage(),
            clangData = i18n_config[currentLanguage];
        //获取levelMap
        levelMap = util.extend.Obj(
                util.extend.Obj(
                    {},
                    clangData.header.solution.classify
                ),
                clangData.header.product1.classify,
                clangData.header.product2.classify
            );
	    util.getJSON('/data/product_params.json');
        i18n_controller.translateJSONGetter('products_all', function (data) {

            // for (var type in data){
            //     navigationData.nav_products.push({
            //         list: generateNavList(data[type],type,'product')
            //     });
            // }
            i18n_controller.translateJSONGetter('solutions_all', function (sdata) {
                for (var st in sdata){
                    navigationData.nav_solutions.push({
                        list: generateNavList(sdata[st],st,'solution')
                    });
                };
                //生成头部
                navBox.solution.children('li').remove().end()
                    .append(util.generateHtml(templates.header.solution,navigationData,true));
                navBox.product.children('li').remove().end()
                    .append(util.generateHtml(templates.header.product,navigationData,true));





              // //生成解决方案列表
              var laptopSols = generateProductLaptop(sdata,'solution');
              $('#product_recommend_menu_box').html(laptopSols);

              if($('#crumbs_container').length!=0){
                //生成面包屑导航
                crumbsNav(data,sdata);
              }
            });
            //生成产品列表
            var laptopPros = generateProductLaptop(data,'product');
            $('#product_laptop_menu_box').addClass('active').html(laptopPros);

        });
    }

    generateHeader();

    //生成产品PC端二级导航
    function generateProductLaptop(data,category) {
        var shead = '',sbody = '',count = 0;
        for (var c in data){
            shead += `<span class="switch_title ${count == 0 ? 'active' : ''}" index="s_${c}" data-classify="${c}" data-id="0">${levelMap[c]}</span>`;
            var _data = data[c];
            sbody += `<div class="switch_slide ${count == 0 ? 'active' : ''}" index="s_${c}">`;
            for (var i = 0; i < _data.length; i++){
                var __data = _data[i];
              if(category=='solution'){

                if(sbody.indexOf(`${__data.path}`)==-1){
                  sbody += __data.path ? `<a class="switch_pro_name" data-classify="${c}" data-id="${i}">${__data.path}</a>` : '';
                }else {
                  continue;
                }
              }else{
                sbody += __data.name ? `<a href="${i18n_controller.route()[category].path}?type=${__data.path}&id=${__data.id}" class="switch_pro_name" data-classify="${c}" data-id="${i}">${__data.name}</a>` : '';
              }
            }
            sbody += '</div>';
            count ++;
        }


        return `<div class="switch_box">
            <div class="switch_head">
              ${shead}
            </div>
            <div class="switch_body">
              ${sbody}
            </div>
          </div>
          <div class="product_summary_show_box"></div>`;
    }

      //生成面包屑导航
      function crumbsNav(data,sdata){
        var crumbsArr=[],obj,_id,_path,i;
        _id=util.queryParams().id;
        _path=data._id;
        if(util.getPathName().indexOf('product')>-1){
          var pro=getPro(_id,data);
          i=pro.classify;
          obj={
            'href':'#',
            'name':i18n_controller.config[i18n_controller.getLanguage()].header.product.title
          };
          crumbsArr[0]=obj;   //产品
          crumbsArr.push({    //成品
            'href':'#' ,
            'name':i18n_controller.config[i18n_controller.getLanguage()].header.product.classify[i].toUpperCase()
          });

          crumbsArr.push({    //产品型号
            'href':'/product.html'+'?type='+pro.path+'&id='+ _id ,
            'name':pro.proName
          });
        }else if(util.getPathName().indexOf('pros_compare')>-1){
          var pro=getPro(_id,data);
          i=pro.classify;
          obj={
            'href':'#',
            'name':i18n_controller.config[i18n_controller.getLanguage()].header.product.title
          };
          crumbsArr[0]=obj;
          crumbsArr.push({    //成品
            'href':'#' ,
            'name':i18n_controller.config[i18n_controller.getLanguage()].header.product.classify[i].toUpperCase()
          });
          crumbsArr.push({
            'href':'/product.html'+'?type='+pro.path+'&id='+ _id ,
            'name':pro.proName
          })
          crumbsArr.push({
            'href':'/pros_compare.html'+'?type='+pro.path+'&id='+ _id ,
            'name':i18n_controller.config[i18n_controller.getLanguage()].page.product.param.compareTitle
          });

        }else if(util.getPathName().indexOf('solution')>-1){
          var pro=getPro(_id,sdata);
          i=pro.classify;
          obj={
            'href':'#',
            'name':i18n_controller.config[i18n_controller.getLanguage()].header.solution.title
          };
          crumbsArr[0]=obj;
          crumbsArr.push({    //成品
            'href':'#' ,
            'name':i18n_controller.config[i18n_controller.getLanguage()].header.solution.classify[i].toUpperCase()
          });
          crumbsArr.push({
            'href':'#',
            'name':pro.path
          })

          crumbsArr.push({
            'href':'/solution.html'+'?type='+pro.path+'&id='+ _id ,
            'name':pro.proName
          })
        }
        $('#crumbs_container nav').html(driveCrumbsNav(crumbsArr));
      }

      //画面包屑导航
      function driveCrumbsNav(arr){
        var len=arr.length;
        var str='';
        for(var i =0;i<len;i++){

          str +='<a href="'+ arr[i].href+'">'+arr[i].name+'</a>';
        }
        return str;
      }

      //使用id获得产品或解决方案中的其他信息
      function getPro(id,data){
        var pro={};
        $(data).each(function(i,v){
          for(var p in v){
            $(v[p]).each(function(i1,v1){
              if(v1.id==id){
                pro.classify=p;
                pro.proName=v1.name;
                pro.path=v1.path;
              }
            });
          }
        });
        return pro;
      }


    function generateNavList(data,base,category) {
        var baseLevel = $(`<div><span class="nav_control" for="nav_solute_class_1">${levelMap[base]}</span>
                            <ul class="nav_in_control nav_level_1 " id="${base}"/></div>`),      //创建结构
            _base = baseLevel.find(`#${base}`);   //获取ul
        for(var d = 0; d < data.length; d++) {    //data为solution所有的对象,software&hardware,遍历2次
            var _data = data[d];     //software或hardware
            var index = 0, levels = _data.path.split('/');
            var matchChild = function (ul, level) {
                var _level = util.paramKeyFormat(level), _ul = null,_li = level != '' ? ul.children(`#${_level}`) : null;
                if (index == levels.length - 1) {   //没有层级
                    if (level == '') {
                        ul.append(`<li><a href="${i18n_controller.route()[category].path}?type=${_data.path}&id=${_data.id}">${_data.name}</a></li>`);
                        return;
                    } else {
                        if(_li.length == 0){
                            ul.append(`<li id="${_level}">
                            <span class="nav_control">${level}</span>
                            <ul class="nav_in_control nav_level_2 " id="ul-${_level}">
                                <li><a href="${i18n_controller.route()[category].path}?type=${_data.path}&id=${_data.id}">${_data.name}</a></li>
                            </ul>
                           </li>`);
                        } else {
                            _li.children(`#ul-${_level}`).append(`<li><a href="${i18n_controller.route()[category].path}?type=${_data.path}&id=${_data.id}">${_data.name}</a></li>`);
                        }
                        return;
                    }
                } else {
                    if (_li.length == 0) {
                        ul.append(`<li id="${_level}">
                        <span class="nav_control">${level}</span>
                        <ul class="nav_in_control nav_level_${index < 1 ? index + 2 : 'etc'} " id="ul-${_level}"></ul>
                       </li>`);
                    }
                    _ul = ul.children(`#${_level}`).children(`#ul-${_level}`);
                }
                index++;
                return matchChild(_ul, levels[index]);
            }

            matchChild(_base, levels[index]);

        }
        return baseLevel.html();
    }

    //注册一个reloader
    i18n_controller.registerUpdateEvent(generateHeader);

})
