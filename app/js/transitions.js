var app = app || {};

// References to DOM elements
var $window, $document, $navButtons, $navGoPrev, $navGoNext, $slidesContainer, $slides, isAnimating, pageHeight;
// functions
var goToSlide, goToNextSlide, goToPrevSlide, goToFirstSlide;

app.slides = (function(w,d,$,TweenLite) {
  
  // for tracking the app's state
  appState = {
    "slide-1": false, 
    "slide-2": false,
    "slide-3": false,
    "slide-4": false,
    "slide-5": false,
    "cur" : null
  };

  $window = $(w);
  $document = $(d);
  $navButtons = $("nav a").filter("[href^=#]");
  $navGoPrev = $(".go-prev");
  $navGoNext = $(".go-next");
  $navGoFirst = $('.go-first');
  $slidesContainer = $(".slides-container");
  $slides = $(".slide");
  
  $currentSlide = $slides.first();

  // isAnimating flag - is our app animating?
  isAnimating = false;

  // The height of the window, minus the fixed navbar
  pageHeight = $window.innerHeight() - 60;

  // for the "on key down" event
  var keyCodes = {
    UP  : 38,
    DOWN: 40
  }

  // When a nav button is clicked - first get the button href, 
  // and then slide to the container, if there's such a container
  function onNavButtonClick(event) {
    // The clicked button
    var $button = $(this);

    // The slide the button points to
    var $slide = $($button)

    // If the slide exists, we go to it
    if($slide.length) {
      goToSlide($slide);
      event.preventDefault();
    }
  }


  // Actual transition between slides
  goToSlide = function($slide) {

    console.log($slide, $slidesContainer);

    //If the slides are not changing and there's such a slide
    if(!isAnimating && $slide.length){
      //setting animating flag to true
      isAnimating = true;
      $currentSlide = $slide;

      console.log(pageHeight * $currentSlide.index());

      // Sliding to current slide
      TweenLite.to($slidesContainer, 1, { scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});
      // TweenLite.to($slidesContainer, 1, {
      //     scrollTo: { y: pageHeight * $currentSlide.index() }, 
      //     onComplete: onSlideChangeEnd, 
      //     onCompleteScope: this
      //   });

      // Animating menu items
      // TweenLite.to($navButtons.filter(".active"), 0.5, {className: "-=active"});
      // TweenLite.to($navButtons.filter("[href=#" + $currentSlide.attr("id") + "]"), 0.5, {className: "+=active"});

    }
  };

  // If there's a previous slide, slide to it
  goToPrevSlide = function () {
    if($currentSlide.prev().length)
    {
      goToSlide($currentSlide.prev());
    }
  };

  // If there's a next slide, slide to it
  goToNextSlide = function() {
    if($currentSlide.next().length)
    {
      goToSlide($currentSlide.next());
    }
  };

  goToFirstSlide = function() {
    if ($currentSlide.index() === $slidesContainer.children().length -1) {
      goToSlide($('#slide-1'));
    }
  }

  // Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide 
  // and prevent default behaviour
  // This way, if there's text input, the user is still able to fill it
  function onKeyDown(event)
  {

    var PRESSED_KEY = event.keyCode;

    if(PRESSED_KEY == keyCodes.UP)
    {
      goToPrevSlide();
      event.preventDefault();
    }
    else if(PRESSED_KEY == keyCodes.DOWN)
    {
      goToNextSlide();
      event.preventDefault();
    }

  }

  // When user scrolls with the mouse, we have to change slides
  function onMouseWheel(event) {
    //Normalize event wheel delta
    var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

    //If the user scrolled up, it goes to previous slide, otherwise - to next slide
    if(delta < -1)
    {
      goToNextSlide();
    }
    else if(delta > 1)
    {
      goToPrevSlide();
    }

    event.preventDefault();
  }

  // Once the sliding is finished, we need to restore "isAnimating" flag.
  // essentially a callback function for when the slide is finished animating
  function onSlideChangeEnd() {
    isAnimating = false;
  }

  // When user resize it's browser we need to know the new height, so we can properly align the current slide
  function onResize(event) {

    //This will give us the new height of the window
    var newPageHeight = $window.innerHeight();

    /*
    *   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
    * */
    if(pageHeight !== newPageHeight)
    {
      pageHeight = newPageHeight;

      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      TweenLite.set([$slidesContainer, $slides], {height: pageHeight + "px"});

      //The current slide should be always on the top
      TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
    }

  }

  // gets the app going
  init = function() {
    // Go to the first slide
    goToSlide($currentSlide);

    // Event Listeners
    $window.on("resize", onResize).resize();
    $window.on("mousewheel DOMMouseScroll", onMouseWheel);
    $document.on("keydown", onKeyDown);
    $navButtons.on("click", onNavButtonClick);
    $navGoNext.on("click", goToNextSlide);
    $navGoPrev.on("click", goToPrevSlide);
    $navGoFirst.on("click", goToFirstSlide);
  };

  // the init function is returned within an object so that it is accessible outside of the app object
  return {
    init : init
  };

})(window, document, jQuery, TweenLite);