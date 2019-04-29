$(document).ready(function () {

    var scrollSection = function (hash) {
        $('html,body').animate({
            scrollTop: $(hash).offset().top - 80
        }, 1500, 'easeInOutExpo');
    };

    $(window).on('scroll', function (event) {
        var scrollValue = $(window).scrollTop();
        if (scrollValue > $('.cb__header').height()) {
            $('.cb__header').addClass('affix');
        } else{
            $('.cb__header').removeClass('affix');
        }
    });


    //Finished loader
    Pace.on("done", function() {
        $(".cb__cover").addClass('animated fadeOutRight').fadeOut(1000);
    });

    //Scroll Top
    $('#scroll-top').scrollToTop();


    //WOW Animation init
    new WOW().init();

    // Slider single page
    $('.single-slider').each(function() {
        $(this).owlCarousel({
            autoplay: true,
            autoplayHoverPause: true,
            rewind: true,
            // animateIn: 'linear',
            // animateOut: 'linear',
            items:1,
            smartSpeed: 750,
              margin:30,
    stagePadding:30
        });
    });


    $('.prev-slide').on('click', function(e) {
        e.preventDefault();
        console.log('click prev')
        $('.single-slider').trigger('prev.owl.carousel');
    });

    $('.next-slide').on('click', function(e) {
        e.preventDefault();
        console.log('click next')
        $('.single-slider').trigger('next.owl.carousel');
    });

    $(window).scroll(function() {
        parallaxFade();
    });


    $('.cb__portfolio__item__link').on('click', function(e){
        e.preventDefault();
        var target = parseInt($(this).attr('data-id'));
        $('#cb__main__slider').carousel(target);

        setTimeout(function(){
            $('.cb__singlepage__wrapper').addClass('open');
        }, 400);
    });

    $('.cb__single__closebtn').on('click', function(e){
        e.preventDefault();
        $('.cb__singlepage__wrapper').removeClass('open');
    });

});


function parallaxFade() {
    scrollPos = $(this).scrollTop();
    $('.cb__heroheader').css({
        'background-position' : '50% ' + (-scrollPos/4)+"px"
    });
    $('.cb__heroheader__headline').css({
        'margin-top': (scrollPos/4)+"px",
        'opacity': 1-(scrollPos/100)
    });
}

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
    $(this).on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 'slow')
    })
};