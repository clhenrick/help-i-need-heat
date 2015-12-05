$(document).ready(function(){

var heatlogurlprefix = 'https://rstachel.cartodb.com/api/v2/sql?q=';

var heatlogurlsuffix = '&api_key=146d6f56877a3f50678a19387e10fbfda8b0de30';


  $('.submit-button').on(click, function(){
    debugger;
  })


  function heatLogSubmitAjaxCall(data, callback) 

    $.ajax({
      url: heatlogurlprefix + encodeURI(data) + heatlogurlsuffix;
      data: { },
    })
      .done(function(json){callback(json)} );
  }

});
