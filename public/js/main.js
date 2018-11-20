(function ($) {
 "use strict";


    // WOW Js
    new WOW().init();


    // sticky js
     var s = $("#sticker");
     var pos = s.position();
     $(window).scroll(function() {
      var windowpos = $(window).scrollTop();
      if (windowpos > pos.top) {
      s.addClass("stick");
      } else {
       s.removeClass("stick");
      }
     });

    // Handle click on toggle search button
    $('#toggle-search').on('click', function() {
        $('.search').toggleClass('open');
        return false;
    });

    // Handle click on search submit button
    // $('#search-form input[type=submit]').on('click', function() {
    //     $('.search').toggleClass('open');
    //     return true;
    // });


    //Category Toggle Menu
   /* $('.show-submenu').on('click', function() {
        $(this).parent().find('.submenu').toggleClass('submenu-active');
        $(this).toggleClass('submenu-active');
        return false;
    });
    */



/*--
    10. Category menu Activation
------------------------------*/
$('.widget_categories li > a.show-submenu').on('click', function () {
    $(this).removeAttr('href');
    var element = $(this).parent('li');
    if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp();
    } else {
        element.addClass('open');
        element.children('ul').slideDown();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp();
    }
});






    // Trend Owl Carousel
    $('.trend_item_slider').owlCarousel({
        items: 4,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation:true,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,3],
        itemsTablet : [767,1],
        itemsMobile : [480,1]
    });


    // Store Owl Carousel
    $('.store_item_slider').owlCarousel({
        items: 5,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        itemsTablet : [767,1],
        itemsMobile : [480,1]
    });


    // Store Owl Carousel ten
    $('.store_item_slider_ten').owlCarousel({
        items: 4,
        loop:true,
        pagination: false,
        responsiveClass:true,
        theme: "featured_theme_ten",
        autoPlay: false,
        slideSpeed:2000,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });


    // Featured Owl Carousel
    $('.featured_owl_wrapper').owlCarousel({
        items: 5,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation:true,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });


    // Featured Owl Carousel Glasses
    $('.featured_owl_wrapper_glasses').owlCarousel({
        items: 4,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation:true,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });


    // Fashion Owl Carousel
    $('.fashion_owl_wrapper').owlCarousel({
        items: 4,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation:true,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,2],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });


    // Featured Owl Carousel ten
    $('.featured_owl_wrapper_ten').owlCarousel({
        items: 4,
        loop:true,
        pagination: false,
        theme: "featured_theme_ten",
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation:true,
        navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,2],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });


    // Love Look Owl Carousel
    $('.love_look_owl_wrapper').owlCarousel({
        items: 5,
        loop:true,
        pagination: true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        navigation:true,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });


    // Blog News Owl Carousel
    $('.blog_news_wrapper').owlCarousel({
        items: 3,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        controlsclass: "blog-controls",
        navigation:false,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,2],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });

    // Blog News Owl Carousel
    $('.blog_details_wrapper').owlCarousel({
        items: 3,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        controlsclass: "blog-controls",
        navigation:false,
        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        itemsDesktop : [1199,2],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });

    // Clien Owl Carousel
    $('.client_owl').owlCarousel({
        items: 5,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });


    // Clien Owl Carousel Brand
    $('.client_owl_brand').owlCarousel({
        items: 5,
        loop:true,
        pagination: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,4],
        itemsTablet : [768,3],
        itemsMobile : [480,1]
    });


    // Clien Owl Carousel ten
    $('.client_owl_ten').owlCarousel({
        items: 5,
        loop:true,
        pagination: false,
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        theme: "featured_theme_ten",
        responsiveClass:true,
        autoPlay: true,
        slideSpeed:2000,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,3],
        itemsMobile : [480,1]
    });

    // Tenstimonial Owl Carousel
    $('.client_says_owl').owlCarousel({
        items: 1,
        loop:true,
        navigation: false,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });

    // Single Blog News Owl Carousel
    $('.single_blog_news_owl_wrapper').owlCarousel({
        items: 1,
        loop:true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });

    // Collection Owl Carousel
    $('.collection_item').owlCarousel({
        items: 5,
        loop:true,
        pagination:true,
        navigation:false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });

    // Classic Blog Owl Carousel
    $('.post_slider').owlCarousel({
        items: 1,
        loop:true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });


    // Port Slider Owl Carousel
    $('.port_slider').owlCarousel({
        items: 1,
        loop:true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });


    // Single Offers Owl Carousel
    $('.single-offers-carousel').owlCarousel({
        items: 1,
        loop:true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        pagination:false,
        navigation:true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [979,2],
        itemsTablet : [768,1],
        itemsMobile : [480,1]
    });


    // Single Offers Owl Carousel
    $('.sidebar-tab-carousel').owlCarousel({
        items: 4,
        loop:true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        pagination:false,
        navigation:true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });

    // Tab Owl Carousel Twenty
    $('.tab-carousel-twenty').owlCarousel({
        items: 5,
        loop:true,
        responsiveClass:true,
        autoPlay: false,
        slideSpeed:2000,
        pagination:false,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768,2],
        itemsMobile : [480,1]
    });


    // lightbox
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true
    })


    // mixitup
    $('.mixitup_items').mixItUp();


    // bar filler
    $('#bar1').barfiller();
    $('#bar2').barfiller();
    $('#bar3').barfiller();
    $('#bar4').barfiller();
    $('#bar5').barfiller();
    $('#bar6').barfiller();
    $('#bar7').barfiller();
    $('#bar8').barfiller();



    // price slider
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 8000,
        values: [ 0, 8000 ],
        slide: function( event, ui ) {
            $("#min-amount").val("฿" + ui.values[0]);
            $("#max-amount").val("฿" + ui.values[1]);
        }
    });
    $("#min-amount").val("฿" + $("#slider-range").slider("values", 0));
    $("#max-amount").val("฿" + $("#slider-range").slider("values", 1));


    // ScollUp
    $.scrollUp({
        scrollName: 'scrollUp',
        scrollText: '<i class="fa fa-angle-up"></i>BACK',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade',
        animationInSpeed: 2000
    });


    // Elevatezoom
    $("#zoom_01").elevateZoom();
    $("#zoom_02").elevateZoom();
    $("#zoom_03").elevateZoom();


      /* MeanMenu Js */
        jQuery('nav#dropdown').meanmenu();




})(jQuery);
