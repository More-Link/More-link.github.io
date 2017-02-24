/**
 * Created by liling on 2016/12/10.
 */


define(['jquery'], function ($) {
  return {
    //控制规格参数盒子统一高度
    setHeight:function(){
      var screenWidth = $(window).width();
      if (screenWidth >= 1174) {
        var s = $('.prama_body_wrap').find('.col-xs-12');
        s.height('auto');
        var heightArr = [];
        s.each(function (i, v) {
          heightArr.push($(v).height());
        });
        var height = Math.max.apply(null, heightArr);
        s.height(height);
      }else{
        var s = $('.prama_body_wrap').find('.col-xs-12');
        s.height('auto');
      }
    }
  }
});



