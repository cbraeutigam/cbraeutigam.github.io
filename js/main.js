"use strict";


$(document).ready(function () {



    var scrollSection = function (hash) {
        $('html,body').animate({
            scrollTop: $(hash).offset().top - 80
        }, 1500, 'easeInOutExpo');
    };



    $(window).on('scroll', function (event) {
        var scrollValue = $(window).scrollTop();
        if (scrollValue > $('.dta__header').height()) {
            $('.dta__header').addClass('affix');
        } else{
            $('.dta__header').removeClass('affix');
        }
    });
    
    
     //Parallax Background on Desktop
    if (!isMobile.any()) {
        $(window).on('scroll', function() {
            parallaxScroll();
        });
    };


    //Finished loader
    Pace.on("done", function() {
        $(".cover").addClass('animated fadeOutRight').fadeOut(1000);
    });

    //Scroll Top
    $('#scroll-top').scrollToTop();


    //WOW Animation init 
    new WOW().init();



});


//Scroll Top 
$.fn.scrollToTop = function() {
    $(this).hide().removeAttr('href');
    if ($(window).scrollTop() != '0') {
        $(this).fadeIn('slow')
    }
    var scrollDiv = $(this);
    $(window).scroll(function() {
        if ($(window).scrollTop() == '0') {
            $(scrollDiv).fadeOut('slow')
        } else {
            $(scrollDiv).fadeIn('slow')
        }
    });
    $(this).on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow')
    })
};

//Detect Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//Parallax Scroll
function parallaxScroll() {
    var scrolledY = $(window).scrollTop();
    var headerImage = $('.ef-parallax-bg');
    headerImage.css('background-position', 'center -' + ((scrolledY * 0.4)) + 'px');
};



//Window Load
/*jQuery(window).load(function($) {
    
    Init Portfolio
    var container = jQuery("#work-grid");
    if (container.length > 0) {
        container.isotope({
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            columnWidth: 60
        });
    };

    //Filter Portfolio
    jQuery('a.filter').on('click', function() {
        var to_filter = jQuery(this).attr('data-filter');
        if (to_filter == 'all') {
            container.isotope({
                filter: '.mix'
            });
        } else {
            container.isotope({
                filter: '.' + to_filter
            });
        }
    });

    //Switch Classes portfolio
    jQuery('.filter').on('click', function() {
        jQuery('a.filter').removeClass('active');
        jQuery(this).addClass('active');
    });
});*/