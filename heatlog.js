$(document).ready(function(){


  $('.submit-button').on(click, function(){
    debugger;
  })


  function ajaxCall() {
    var input = $("#text-field").val();

    $.ajax({
      url: "/widget",
      data: { search_keyword: input },
    })
      .done(function( youTubeWidget ) {
        // replace with the new video
        $("#search-results").html(youTubeWidget);
      });
  }

});