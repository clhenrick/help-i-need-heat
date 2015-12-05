$(document).ready(function() {
    var dateObject = new Date();
    var theDate = "Today is " + (dateObject.getMonth()+1) + "/" + dateObject.getDate() + "/" + dateObject.getFullYear();
    var currentMilitaryHour = dateObject.getHours();

    var currentAmericanHour = convertHoursFromMilitaryTime();
    var currentMinutes = dateObject.getMinutes();
    var formattedMinutes = convertMinutes();
    var theTime = currentAmericanHour + ":" + formattedMinutes;
    $('#dateTime').append(theDate + " and the time is now " + theTime + ".");


    function convertMinutes(){
      if (currentMinutes < 10){
        return "0" + currentMinutes;
      }
      else {
        return currentMinutes;
      }
    }

    function convertHoursFromMilitaryTime(){
      if (currentMilitaryHour > 12){
        return currentMilitaryHour - 12;
      }
      else {
        return currentMilitaryHour
      }
    } 


    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=newyork&units=imperial&APPID=9b7b2c28d9900e12be5ff93fe2677b09", function(data){
      var currentTemp = data.main.temp;
      
      $('#temp').append("It is " + currentTemp + " degrees outside right now." + insideMinTemp());

    function insideMinTemp(){
      if (currentMilitaryHour > 6 && currentMilitaryHour < 22 && currentTemp < 55) {
        var minTemp = 68;
      }
      else if (currentMilitaryHour > 22 && currentTemp < 40 || currentMilitaryHour < 6 && currentTemp < 40) {
        var minTemp = 55;
      }
      return " According to the law, it must be at least " + minTemp + " degrees everywhere in your apartment.";
      }
    });
});
