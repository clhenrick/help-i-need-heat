$(document).ready(function(){

var heatlogurlprefix = 'https://rstachel.cartodb.com/api/v2/sql?q=';

var heatlogurlsuffix = '&api_key=146d6f56877a3f50678a19387e10fbfda8b0de30';

  
  loadTableData();


  $('.submit-button').on("click", function(e){
    
  });

  // populate the form based on new rows of data



  function heatLogSubmitAjaxCall(data, callback){ 
    $.ajax({
      url: heatlogurlprefix + encodeURI(data) + heatlogurlsuffix,
      data: { }
    })
      .done(function(json){callback(json)} );
  }


  function loadTableData(){
    // https://rstachel.cartodb.com/api/v2/sql?q=SELECT+*+FROM+heatlogstarter&api_key=146d6f56877a3f50678a19387e10fbfda8b0de30'
    var statement = "SELECT cartodb_id, hot_water, indoor_temp, outdoor_temp, witness, _311_number, datetime FROM heatlogstarter"
    heatLogGetAjaxCall(statement)
  }


  function heatLogGetAjaxCall(data, callback){ 
    $.ajax({
      url: heatlogurlprefix + encodeURI(data) + heatlogurlsuffix,
      data: { }
    })
      .success(function(json){ 
        populateTable(json["rows"]);
      });
  }

  function populateTable(jsonArray){
    var datee, timee, splitt;
    for(var i = 0; i < jsonArray.length; i++){
      if(jsonArray[i].datetime != null){
        splitt = jsonArray[i].datetime.split("T");
        datee = splitt[0];
        timee = splitt[1].substr(0, splitt[1].length-1);
      }else{
      };
      
        var htmlstring = "<tr id='"+ jsonArray[i].cartodb_id +"'><td>"+ datee +"</td><td>"+ timee +"</td><td>"+ jsonArray[i]._311_number +"</td><td>"+ jsonArray[i].outdoor_temp +"</td><td>"+ jsonArray[i].indoor_temp +"</td><td>"+ jsonArray[i].hot_water +"</td><td>"+ jsonArray[i].witness +"</td></tr>";
        $("tbody").prepend(htmlstring);
    
    } //end for loop 
  }


});