'use strict';

/**
 * Created by JasonD on 16/12/8.
 */
define(['jquery', 'swiper'], function ($, swiper) {
    var pageSwipers = {
        index: {
            initialed: false
        }
    };
    function initIndexSwp() {
        pageSwipers.index = {
            initialed: true,
            banner: new swiper('#swiper_banner', {
                speed: 800,
                effect: 'fade',
                fade: {
                    crossFade: false
                },
                // autoplay: 5000,
                paginationClickable: true,
                pagination: '.swiper-pagination'
                // simulateTouch : false,
                // nextButton: '.bannerswiper-button-next',
                // prevButton: '.bannerswiper-button-prev',
            }),
            pro_recommends: new swiper('#pro_swiper_recommend', {
                speed: 800,
                initialSlide: 1,
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween: 950,
                coverflow: {
                    rotate: 0,
                    stretch: 5,
                    depth: 900,
                    modifier: 1,
                    slideShadows: false
                },
                breakpoints: {
                    // 1920: {
                    //     slidesPerView: 4,
                    //     slidesPerColumn: 1
                    // },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        effect: ''
                    }
                },
                // autoplay: 5000,
                simulateTouch: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            })
            // ,video_recommends: new swiper('#video_swiper_recommend',{
            //     speed: 800,
            //     paginationClickable: true,
            //     pagination: '.swiper-pagination',
            //     nextButton: '.swiper-button-next',
            //     prevButton: '.swiper-button-prev',
            //     onInit: function(swiper){
            //         //Swiper初始化了
            //         $('#video_swiper_recommend').on('click','.video_play_btn',function () {
            //             var $this = $(this);
            //             $this.addClass('active')
            //             $this.siblings('iframe').addClass('active');
            //         })
            //     }
            // })
        };
        return pageSwipers.index;
    }
    return {
        index: function index() {
            return pageSwipers.index.initialed ? pageSwipers.index : initIndexSwp();
        }
    };
});