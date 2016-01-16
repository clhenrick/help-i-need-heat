'use strict'

var app = app || {};

app.landing = (function(w,d,$) {
    var dateObject,
        currentMonth,
        currentMilitaryHour,
        currentAmericanHour,
        currentMinutes,
        formattedMinutes,
        theTime,
        timeInterval,
        tempInterval;

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

    function amPm() {
      if (currentMilitaryHour > 12) {
        return "PM";
      } else {
        return "AM";
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

    function displayCurrentTime() {
      dateObject = new Date();
      currentMonth = dateObject.getMonth() + 1;
      currentMilitaryHour = dateObject.getHours();
      currentAmericanHour = convertHoursFromMilitaryTime();
      currentMinutes = dateObject.getMinutes();
      formattedMinutes = convertMinutes();
      theTime = currentAmericanHour + ":" + formattedMinutes + " " + amPm();
      $('.time').text(theTime);
    }

    function displayTemperatureInfo() {
      $.getJSON("//api.openweathermap.org/data/2.5/weather?q=newyork&units=imperial&APPID=9b7b2c28d9900e12be5ff93fe2677b09", function(data){
        var currentTemp = data.main.temp;
        var $temperatureInfo = $('#temperature-info');
        var $isNotHeatSeason = $('#is-not-heat-season');
        var $tooHotOutside = $('#too-hot-outside');
        var insideTemperature = insideMinTemp(currentTemp);

        currentTemp += "˚F";
        $('.outside-temp').text(currentTemp);
        $('.inside-temp').text(insideTemperature);


        if (currentMonth > 5 && currentMonth < 10) {
          $isNotHeatSeason.removeClass('hidden');
          $temperatureInfo.addClass('hidden');
          $tooHotOutside.addClass('hidden');
        } 
        else if (insideTemperature) {
          $temperatureInfo.removeClass('hidden');
          $tooHotOutside.addClass('hidden');
          $isNotHeatSeason.addClass('hidden');
        }
        else {
          $tooHotOutside.removeClass('hidden');
          temperatureInfo.addClass('hidden');
          isNotHeatSeason.addClass('hidden');
        }

      });
    }

    function init(){
      displayCurrentTime();
      displayTemperatureInfo();
      // update our clock ever 10 seconds and the weather every hour
      timeInterval = setInterval(displayCurrentTime, 10000);
      tempInterval = setInterval(displayTemperatureInfo, 3600000);
    }

    return {
      init : init,
      displayCurrentTime : displayCurrentTime,
      displayTemperatureInfo : displayTemperatureInfo,
      timeInterval : timeInterval,
      tempInterval : tempInterval
    };
      
})(window,document,jQuery);
