'use strict'

var app = app || {};

app.landing = (function(w,d,$) {
    var dateObject = new Date();
    var currentMonth = dateObject.getMonth() + 1;
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
        var $temperatureInfo = $('#temperature-info');
        var $isNotHeatSeason = $('#is-not-heat-season');
        var $tooHotOutside = $('#too-hot-outside');
        var insideTemperature = insideMinTemp(currentTemp);


        if (currentMonth > 5 && currentMonth < 10) {
          $isNotHeatSeason.removeClass('hidden');
        } 
        else if (insideTemperature) {
          currentTemp += "˚F";
          $('.time').text(theTime);
          $('.outside-temp').text(currentTemp);
          $('.inside-temp').text(insideTemperature);
          $temperatureInfo.removeClass('hidden');
        }
        else {
          $tooHotOutside.removeClass('hidden');
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
