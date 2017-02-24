
/**
 * Created by liling on 2017/1/3.
 */


define(['jquery','util','part/templates','cf/site_config','i18n/controller','i18n/config','part/nav_control'],
  ($,util,templates,site_config,i18n_controller,i18n_config,nav_controller)=> {

    //提交
    $('button.btn-default').on('click',function(){
      var flag=true;    //true为填写正确,可以提交;false为错误;
      var msgBox=$('.submit_sussful');
      if(flag){
        msgBox.find('p').html('<i class="submit_icon_t"></i>提交成功');
      }else{
        msgBox.find('p').html('<i class="submit_icon_f"></i>提交失败');
      }
      msgBox.addClass('active');

      setTimeout(function(){
        msgBox.removeClass('active');
      },2000);
    });

    //滑动
    function isAbout(){
      var flag=true;
      if(location.href.indexOf('contact_us')>-1){
        scrollTo();
      }
    }

    function scrollTo(){
      var contactBox=$('.contact_container'),
        body=$('body'),
        offsetHeight=contactBox.offset().top;
      body.animate({'scrollTop':offsetHeight-50});
      // body.scrollTop(offsetHeight);
    }
    isAbout();

    $('.nav_contact').on('click',function(){
      scrollTo();
    });
  })
