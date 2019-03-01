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

    //Slider single page
    var owl = $('.single-slider');

    owl.owlCarousel({
        singleItem: true,
        pagination: false,
        autoPlay: 5000,
        slideSpeed: 300
    });

    $('.prev-slide').on('click', function(e) {
        e.preventDefault();
        console.log('click prev')
        owl.trigger('owl.prev');
    });

    $('.next-slide').on('click', function(e) {
        e.preventDefault();
        console.log('click next')
        owl.trigger('owl.next');
    });

    $(window).scroll(function() {
        parallaxFade();
    });



    var content;

    $('.cb__portfolio__item__link').on('click', function(e){
        e.preventDefault();
        $.get('single-project.html', function(data){
            content= data;
            $('#result').prepend(content);
            $('#result').addClass('fadeInUp');
            $('#result').addClass('open');
        });
    });

 $('.cb__single__closebtn').on('click', function(e){
      e.preventDefault();
     $('#result').empty(content);
      $('#result').removeClass('open');
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