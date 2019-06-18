$(document).ready(function () {

  var scrollSection = function (hash) {
    $('html,body').animate({
      scrollTop: $(hash).offset().top - 80
    }, 1500, 'easeInOutExpo');
  };

  // $(window).on('scroll', function (event) {
  //   var scrollValue = $(window).scrollTop();
  //   if (scrollValue > $('.cb__header').height()) {
  //     $('.cb__header').addClass('affix');
  //   } else {
  //     $('.cb__header').removeClass('affix');
  //   }
  // });


  //Finished loader
  Pace.on("done", function () {
    $(".cb__cover").addClass('animated fadeOutRight').fadeOut(1000);
  });

  //WOW Animation init
  new WOW().init();

  // Slider single page
  var galleryOne = new Swiper('#cb__main__slider', {
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    }
  });

  $(window).scroll(function () {
    parallaxFade();
  });


  $('.cb__portfolio__item__link').on('click', function (e) {
    e.preventDefault();
    var target = parseInt($(this).attr('data-id'));
    galleryOne.slideTo(target);

    setTimeout(function () {
      $('.cb__singlepage__wrapper').addClass('open');
    }, 400);
  });

  $('.cb__single__closebtn').on('click', function (e) {
    e.preventDefault();
    $('.cb__singlepage__wrapper').removeClass('open');
  });

});


function parallaxFade() {
  scrollPos = $(this).scrollTop();
  $('.cb__heroheader').css({
    'background-position': '50% ' + (-scrollPos / 4) + "px"
  });
  $('.cb__heroheader__headline').css({
    'margin-top': (scrollPos / 4) + "px",
    'opacity': 1 - (scrollPos / 100)
  });
}


var circleString =
  '<svg xmlns="http://www.w3.org/2000/svg">' +
  '<circle r="0" fill="rgba(255, 255, 255, 0)"></circle>' +
  '</svg>';

var radiusAnimationString =
  '<svg xmlns="http://www.w3.org/2000/svg">' +
  '<animate attributeType="XML" ' +
  'attributeName="r" ' +
  'dur="7s" ' +
  'values="0; 5; 0" ' +
  'keyTimes="0; .5; 1" ' +
  'repeatCount="indefinite"/>' +
  '</svg>';

var opacityAnimationString =
  '<svg xmlns="http://www.w3.org/2000/svg">' +
  '<animate attributeType="XML" ' +
  'attributeName="fill" ' +
  'dur="7" ' +
  'values="rgba(100, 78, 91, 0.5); rgba(100, 78, 91, 0.7); rgba(100, 78, 91, 0.5)" ' +
  'keyTimes="0; .5; 1" ' +
  'repeatCount="indefinite"/>' +
  '</svg>';

var lineString =
  '<svg xmlns="http://www.w3.org/2000/svg">' +
  '<line stroke="rgba(255, 255, 255, 0.7)" stroke-width="1"/>' +
  '</svg>'

var svg = document.querySelector('#mysvg');
var wh, ww;

var noOfCircles = 100;
var activeRadius = 150;
var circleRadius = 5;
var circles = [];
var parser = new DOMParser();

var mouseX = -1;
var mouseY = -1;
var inRegion = false;
var circlesNearby = [];
var circlesFaraway = [];
var lines = [];

init();

function init() {
  svg.addEventListener('mouseenter', start);
  svg.addEventListener('touchstart', start);
  svg.addEventListener('mouseleave', stop);
  svg.addEventListener('touchend', stop);
  svg.addEventListener('mousemove', move);
  svg.addEventListener('touchmove', move);

  function start() {
    inRegion = true;
  }

  function move(event) {
    mouseX = event.x;
    mouseY = event.y;
  }

  function stop() {
    inRegion = false;
    clearFrame();
  }

  createCircles();
}

function createCircles() {

  wh = window.innerHeight;
  ww = window.innerWidth;
  for (var i = 0; i < noOfCircles; i++) {
    var circleElement = parser.parseFromString(circleString, 'image/svg+xml').querySelector('svg > *');
    var radiusAnimation = parser.parseFromString(radiusAnimationString, "image/svg+xml").querySelector('svg > *');
    var opacityAnimation = parser.parseFromString(opacityAnimationString, "image/svg+xml").querySelector('svg > *');


    circleElement.setAttributeNS(null, 'cx', Math.floor(Math.random() * ww));
    circleElement.setAttributeNS(null, 'cy', Math.floor(Math.random() * wh));

    var animationDelay = Math.floor(Math.random() * 10) + 's';
    radiusAnimation.setAttributeNS(null, 'begin', animationDelay);
    opacityAnimation.setAttributeNS(null, 'begin', animationDelay);

    circleElement.appendChild(radiusAnimation);
    circleElement.appendChild(opacityAnimation);

    svg.appendChild(circleElement);

    circles.push(circleElement);
  }
}

window.requestAnimationFrame(draw);

function draw() {

  if (inRegion) {
    clearFrame();
    segregateCircles();
    makeEffects();
  }

  window.requestAnimationFrame(draw);
}

function clearFrame() {
  for (var i = 0; i < lines.length; i++) {
    lines[i].remove();
  }
  lines = [];
  circlesNearby = [];

  for (var i = 0; i < circles.length; i++) {
    circles[i].setAttributeNS(null, 'stroke', '');;
  }
  circlesFaraway = [];
}

function segregateCircles() {
  for (var i = 0, n = circles.length; i < n; i++) {
    var current = circles[i];
    var circleX = current.getAttribute('cx');
    var circleY = current.getAttribute('cy');

    var dx = mouseX - circleX;
    var dy = mouseY - circleY;

    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance < (activeRadius - circleRadius)) {
      circlesNearby.push(current);
    } else {
      circlesFaraway.push(current);
    }
  }
}

function makeEffects() {
  addBorders();
  drawLines();
}

function addBorders() {
  for (var i = 0;
    (i + 1) < circlesNearby.length; i++) {
    circlesNearby[i].setAttributeNS(null, 'stroke', '#703940');
    circlesNearby[i].setAttributeNS(null, 'stroke-width', '5');
  }
  for (var i = 0;
    (i + 1) < circlesFaraway.length; i++) {
    circlesFaraway[i].setAttributeNS(null, 'stroke', '');
  }
}

function drawLines() {
  for (var i = 0; i < circlesNearby.length; i++) {
    var current = circlesNearby[i];
    var circleX = current.getAttribute('cx');
    var circleY = current.getAttribute('cy');

    var line = drawLine(mouseX, mouseY, circleX, circleY);

    svg.appendChild(line);
    lines.push(line);
  }
}

function drawLine(x1, y1, x2, y2) {
  var line = parser.parseFromString(lineString, 'image/svg+xml').querySelector('svg > *');

  line.setAttributeNS(null, 'x1', x1);
  line.setAttributeNS(null, 'y1', y1);
  line.setAttributeNS(null, 'x2', x2);
  line.setAttributeNS(null, 'y2', y2);

  return line;
}