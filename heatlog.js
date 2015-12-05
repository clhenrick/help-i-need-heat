$(document).ready(function(){

var heatlogurlprefix = 'https://rstachel.cartodb.com/api/v2/sql?q=';

var heatlogurlsuffix = '&api_key=146d6f56877a3f50678a19387e10fbfda8b0de30';


// code to submit the form data

  $('.submit-button').on("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      var arr = $( "form" ).serializeArray(); 
// ,indoor_temp,outdoor_temp,witness,_311_number,datetime 
      var insert = "INSERT INTO heatlogstarter(";
      var values =  "VALUES(";
      var comma = false;
      var ins = function(field,data)
      {
	   if (comma)
	  {
	       insert += ',';
	       values += ',';
	      }
	  comma = true;
	  insert+= field;
	  values += data
      }
      for (var i= 0 ; i < arr.length; i++)
	  {
	      var key = arr[i].name;
	      switch(key)
	      {
		  case 'hotwater':
		  var hot_water = 'false';
		  if (arr[i].value && arr[i].value.toLowerCase().startsWith('y'))
		  {
		      hot_water='true';
		  }
		  ins("hot_water","'"+hot_water+"'");
		  break;

		  case 'indoortemp':

		  var itemp = parseInt(arr[i].value);
		  
		  if (! (itemp < 120 && itemp > -100))
		  {
		      alert("bad temperature " + itemp);
		      return;
		  }
		  ins("indoor_temp",itemp);
		  break;

		  case 'outdoortemp':

		  var otemp = parseInt(arr[i].value);
		  
		  if ( (otemp < 120 && otemp > -100))
		  {
		      ins("outdoor_temp",otemp);
		  }
		  
		  break;

		  case 'fdate':
		  var dt = arr[i].value;
		  break;

		  case 'ftime':
		  var tm = arr[i].value;
		  break;

		  case '311complainnumber':
		  ins('_311_number',"'"+arr[i].value+"'");
		  break;

		  case 'witness':
		  ins('witness',"'"+arr[i].value+"'");
		  break;
	      }
	  }
      var d = "'"+dt+"T"+tm+"Z'";
      ins('datetime',d);
      insert += ")" + values + ")";
      heatLogSubmitAjaxCall(insert, function(successflag, json) { 
     alert(successflag?"inserted":"error");
 }
);

  })


  function heatLogSubmitAjaxCall(data, callback) 
  {
    $.ajax({
      url: heatlogurlprefix + encodeURI(data) + heatlogurlsuffix,
      data: { }
    })
      .success(function(json){callback(true, json)} )
      .error(function(json){callback(false, json)} );
  }

});
