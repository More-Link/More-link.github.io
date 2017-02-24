/**
 * Created by JasonD on 16/12/9.
 */
define(['jquery','handlebars','part/templates','util','cf/file_url','i18n/controller'],
    ($,handlebars,templates,util,filePath,i18n_controller)=>{
    var product_compare_table = $('.product_compare_table'),
        product_table_body = product_compare_table.children('tbody'),
        product_tableTr = product_table_body.children('tr'),
        //第一列标题栏
        pro_select = $('.pro_select');
    //暂存对比字段数据
    var product_params = {},product_list = {},params_map = {
        // size: "pro_size"
    };
    //标示列表加载
    var pro_list_loaded = false,pro_params_loaded = false;
    //当前操作栏目暂存
    var currentColumn = -1;

    var compareWidthID = null;

    //清楚当前产品数据
    var currentColumnClear = function () {
        for (var i = 0;i < product_params.length; i++){
            product_tableTr.filter('.'+params_map[util.paramKeyFormat(product_params[i])])
                .children().eq(currentColumn).html('');
        }
    }

    //生成当前选中产品参数数据
    var generateCurrentProduct = function (id,info_box) {
        var img = info_box.children('img'),
            hd = info_box.children('h6');
        var data = product_list['pro_'+id];
        var currentLanguage = i18n_controller.getLanguage();
        img.attr('src',filePath.filePath(currentLanguage).pro_img + data.image.comp);
        hd.text(data.name);
        var params = {};
        //获取当前产品的所有参数
        for (var k in data.params) util.extend.Obj(params,data.params[k]);
        //遍历所有需要比对的参数
        for (var i = 0;i < product_params.length; i++){
            product_tableTr.filter('.'+params_map[util.paramKeyFormat(product_params[i])])
                .children().eq(currentColumn).html(function () {
                var pvArr = params[product_params[i]],_ht = '';
                $.each(pvArr,function (i,v) {
                    _ht += `<p>${v}</p>`;
                })
                return _ht;
            })
        }
    };

    var compareProWith = function(id){
        currentColumn = 1;
        var pro_item_info = pro_select.children().eq(currentColumn).find('.pro_item_info').addClass('active');
        pro_item_info.siblings('.pro_item_selection').removeClass('active');
        generateCurrentProduct(id, pro_item_info);
    }

    var compareInitial = function (compareID) {
        compareWidthID = compareID;
        //选择下来点击
        product_compare_table.on('click','.item_placeholder',function () {
            if (!pro_list_loaded) {
                alert('产品列表获取失败，请刷新重试！');
                return;
            }
            var $this = $(this);
            //获取当前操作列
            currentColumn = $this.parents('td').index();
            $this.toggleClass('active');
            $this.siblings('.item_options').toggleClass('active');
        }).on('click','.item_options>li',function () {//选择操作
            var $this = $(this),p_id = $this.attr('value');
            $this.parent().data('p_id',p_id).toggleClass('active')
                .siblings('.item_placeholder').text($this.text()).toggleClass('active');
            $this.hide().siblings().show();
            if ($(window).width()<=768){
                $this.parents('.pro_item_selection').removeClass('active').siblings('.pro_item_info').addClass('active');
                generateCurrentProduct(p_id,$this.parents('.pro_item_selection').siblings('.pro_item_info'));
            }
        }).on('click','.pro_item_add',function () {//新增选中操作
            if (!pro_params_loaded){
                alert('产品对比参数初始化失败，请重试！');
                return;
            }
            var $this = $(this),proID = $this.siblings('.item_options').data('p_id');
            if (proID){
                //显示切换
                $this.parent().removeClass('active').siblings('.pro_item_info').addClass('active');
                //生成数据
                generateCurrentProduct(proID,$this.parent().siblings('.pro_item_info'));
            }
        }).on('click','.pro_item_remove',function () {//移除当前操作
            var $this = $(this);
            //获取当前操作列
            currentColumn = $this.parents('td').index();
            //显示切换
            $this.parent().removeClass('active').siblings('.pro_item_selection').addClass('active')
                .children('.item_placeholder').text(i18n_controller.config[i18n_controller.getLanguage()].page.compare.selectHolder)
                .next().children('li').show();
            //清楚数据
            currentColumnClear();
        });

        generateCompare();
    };

    var generateCompare = function () {
        //生成对比参数列表
        util.getJSON('/data/product_params.json', function (param) {
            util.extend.Arr(param.hardware,param.software,param.network);
            param = param.hardware;
            product_params = param;
            var wrap = '';
            for (var i=0;i<param.length;i++){
                wrap += templates.product_compare.params_tr.replace(/\{\{param_name\}\}/g,param[i])
                    .replace(/\{\{param\}\}/g,util.paramKeyFormat(param[i]));
                params_map[util.paramKeyFormat(param[i])] = 'pro_' + util.paramKeyFormat(param[i]);
            }
            product_table_body.append(wrap);
            // 生成之后重置
            product_tableTr = product_table_body.children('tr');
            pro_params_loaded = true;

            //生成产品列表
            i18n_controller.translateJSONGetter('products_all',function (data) {
                var all_pros = [];
                util.extend.Arr(all_pros,data.finished,data.unfinished);
                var all_pro_li = '',i = 0;
                for (;i<all_pros.length;i++) {
                    product_list['pro_'+all_pros[i].id] = all_pros[i];
                    all_pro_li += util.generateHtml(templates.product_compare.item_option,all_pros[i]);
                }
                pro_select.find('.item_options').each(function (i,ele) {
                    ele = $(ele);
                    ele.html(all_pro_li);
                });
                pro_list_loaded = true;
                //加载完成之后执行的
                if (compareWidthID) compareProWith(compareWidthID);
            });
        });
        //绑定事件
    }

    return {
        /**
         * 需要初始对比的产品ID
         * @param compareID
         */
        initial(compareID){
            i18n_controller.registerUpdateEvent(generateCompare);
            return compareInitial(compareID);
        }
    }
})
