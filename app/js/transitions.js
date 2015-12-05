function app() {
  //tracking state
  var sectionStates = {
    "slide-1": true, 
    "slide-2": false,
    "slide-3": false,
    "slide-4": false,
    "slide-5": false,
    "cur" : null
  }


  //References to DOM elements
  var $window = $(window);
  var $document = $(document);
  //Only links that starts with #
  var $navButtons = $(".btn");
  var $navGoPrev = $(".go-prev");
  var $navGoNext = $(".go-next");
  var $slidesContainer = $(".slides-container");
  var $slides = $(".slide");
  sectionStates.cur = $slides.first();

  //Animating flag - is our app animating
  var isAnimating = false;

  //The height of the window
  var pageHeight = $window.innerHeight();

  //Going to the first slide
  goToSlide(sectionStates.cur);

  // Event Listeners

  $window.on("resize", onResize).resize();
  $navButtons.on("click", onNavButtonClick);



  /*
  *   When a button is clicked - first get the button href, and then slide to the container, if there's such a container
  * */
  function onNavButtonClick()
  {
    console.log("I worked");
    //The clicked button
    // var $button = $(this);
    var $button = $(this);

    //The slide the button points to
    var idx = $slides.index(sectionStates.cur);
    idx += 1;
    var next = $slides[idx];

    console.log(idx, next);

    // If the slide exists, we go to it
    if(next)
    {
      goToSlide(next);
      // event.preventDefault();
    }
  }


  /*
  *   Actual transition between slides
  * */
  function goToSlide($slide)
  {
    //If the slides are not changing and there's such a slide
    if(!isAnimating && $slide.length)
    {
      //setting animating flag to true
      isAnimating = true;
      $currentSlide = $slide;

      //Sliding to current slide
      TweenLite.to($slidesContainer, 1, {scrollTo: {y: pageHeight * $currentSlide.index() }, onComplete: onSlideChangeEnd, onCompleteScope: this});

      //Animating menu items
      TweenLite.to($navButtons.filter(".active"), 0.5, {className: "-=active"});

      TweenLite.to($navButtons.filter("[href=#" + $currentSlide.attr("id") + "]"), 0.5, {className: "+=active"});

    }
  }


  /*
    *   Once the sliding is finished, we need to restore "isAnimating" flag.
    *   You can also do other things in this function, such as changing page title
    * */
    function onSlideChangeEnd()
    {
      isAnimating = false;
    }


    /*
    *   When user resize it's browser we need to know the new height, so we can properly align the current slide
    * */
    function onResize(event)
    {

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

}