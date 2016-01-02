'use strict'

var app = app || {};

app.landing = (function(w,d,$) {
    var dateObject = new Date();
    var currentMonth = dateObject.getMonth() + 1;
    // var currentMonth = 9;
    var isHeatSeason = true;
    var currentMilitaryHour = dateObject.getHours();
    var currentAmericanHour = convertHoursFromMilitaryTime();
    var currentMinutes = dateObject.getMinutes();
    var formattedMinutes = convertMinutes();
    var theTime = currentAmericanHour + ":" + formattedMinutes;


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

    function insideMinTemp(currentTemp){
      var minTemp = false;
      if (currentMilitaryHour > 6 && currentMilitaryHour < 22 && currentTemp < 55) {
        var minTemp = 68 + "˚F"; 
      }
      else if (currentMilitaryHour > 22 && currentTemp < 40 || currentMilitaryHour < 6 && currentTemp < 40) {
        var minTemp = 55 + "˚F";
      }
      return minTemp;
    }

    function displayTemperatureInfo() {
      $.getJSON("//api.openweathermap.org/data/2.5/weather?q=newyork&units=imperial&APPID=9b7b2c28d9900e12be5ff93fe2677b09", function(data){
        var currentTemp = data.main.temp;
        // currentTemp = 56;
        var $temperatureInfo = $('#temperature-info');
        var insideTemperature = insideMinTemp(currentTemp);

        currentTemp += "˚F";

        if (currentMonth > 5 && currentMonth < 10) {
          $temperatureInfo.html("<h1>According to NYC law, there is no minimum temperature at the moment. The regulations are only in effect from October 1 to May 31.</h1>");
        } 
        else if (insideTemperature) {
          $('.time').text(theTime);
          $('.outside-temp').text(currentTemp);
          $('.inside-temp').text(insideTemperature);
        }
        else {
          $temperatureInfo.html("<h1>According to NYC law, there is no minimum temperature at the moment. It is too warm outside for regulations to take effect.</h1>");
        }
      });
    }

    function init(){
      displayTemperatureInfo();
    }

    return {
      init : init
    };
      
})(window,document,jQuery);
