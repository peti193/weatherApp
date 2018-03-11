var app = angular.module("app", []);

app.controller("getWeather", ["$scope", "$http", "$window", function($scope, $http, $window) {
  if (navigator.geolocation) {
    $window.navigator.geolocation.getCurrentPosition(function(position) {

      // Variables declaration
      var baseurl, lat, lng, appid, currenttemp

      // Default variables for build the correct URL
      baseurl = 'https://api.openweathermap.org/data/2.5/weather?';
      lat = "lat=" + position.coords.latitude;
      lng = "&lon=" + position.coords.longitude;
      appid = '&appid=56f91a6f5831546eeddcab188de47796';
      celsius = "&units=metric";

      $http({
        method: 'get', 
        url: baseurl + lat + lng + appid + celsius
        }).then(function (response) {

            // Open weather map current weather response 
            $scope.data = response;

            // Weather conditions
            $scope.weatherStatus = $scope.data.data.weather[0].description;

            // Weather Condition Icon code
            wcon = $scope.data.data.weather[0].icon

            // User can able to set weather condition
            $scope.weather_status = ["Rain", "Snow", "Fog", "Sunny"];

            $scope.wcon = wcon;

            $scope.windSpeed = $scope.data.data.wind.speed

            // The nice temperature range: nice_temp calculation
            curr_temp = $scope.data.data.main.temp;
            min_temp = 15;
            max_temp = 40;
            nice_temp = curr_temp > min_temp && curr_temp < max_temp ? true : false;

            // The nice humidity range: nice_hum calculation
            curr_hum = $scope.data.data.main.humidity;
            min_hum = 50;
            max_hum = 100;
            nice_hum = curr_hum >= min_hum && curr_hum <= max_hum ? true : false;

            // Calculate the normal wind speed
            curr_wind_speed = $scope.data.data.wind.speed;
            maxWindSpeed = 10
            optimalWindSpeed = curr_wind_speed < maxWindSpeed ? true : false;

            $scope.userNiceDayMsg = "Please fill the form";

            // Watch temperature changes: By user input
            $scope.$watch('niceDayTemp', function(newValue) {
              if (newValue <= max_temp && newValue >= min_temp) {
                  $scope.niceTemp = true;

              } else {
                 $scope.niceTemp = false;
                 $scope.userNiceDayMsg = "Not a nice day";
              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                $scope.userNiceDayMsg = "Nice day";
              }
              else {
                $scope.userNiceDayMsg = "Not a nice day";
              }
            });

            // Watch humidity changes: By user input
            $scope.$watch('niceDayHum', function(newValue) {
              if (newValue <= max_hum && newValue >= min_hum) {
                  $scope.niceHum = true;
              } else {
                 $scope.niceHum = false;
                 $scope.userNiceDayMsg = "Not a nice day";

              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                 $scope.userNiceDayMsg = "Nice day";
              }
              else {
                $scope.userNiceDayMsg = "Not a nice day";
              }
            });

            // Watch weather condittion changes: By user input
            $scope.$watch('w_status', function (newValue) {
              if (newValue ==  "Sunny") {
                $scope.userNiceDayMsg = "Nice day";
                $scope.niceCon = true;
              }
              else {
                $scope.niceCon = false;
                 $scope.userNiceDayMsg = "Not a nice day";

              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                $scope.userNiceDayMsg = "Nice day";
              }
              else {
                $scope.userNiceDayMsg = "Not a nice day";
              }
            });

            // Windspeed 
            $scope.$watch('windSpeedU', function (newValue) {
              if (newValue <= 10 && newValue >= 0) {
                $scope.userNiceDayMsg = "Nice day";
                $scope.niceWind = true;
              }
              else {
                $scope.niceWind = false;
                 $scope.userNiceDayMsg = "Not a nice day";

              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                $scope.userNiceDayMsg = "Nice day";
              }
              else {
                $scope.userNiceDayMsg = "Not a nice day";
              }
            });

            // User value 
            $scope.$watch('userNiceDayMsg', function (newValue) {
              body = $("body");
              if (newValue == "Nice day") {
                body.addClass("animate");
              } else {
                body.removeClass("animate");
              }
            });

            // If the weather condition icon code is in the list
            if (wcon == "01d" || wcon == "01n" || wcon == "02d" || wcon == "02n" || wcon == "03d" || wcon == "04d" || wcon == "04n") {
              // And the temperature is nice 
              if (nice_temp && nice_hum && optimalWindSpeed) {
                   $scope.niceDayMsg = "Nice day";
              }
              else {
                 $scope.niceDayMsg = "Not a nice day";
              }
            } else {
                $scope.niceDayMsg = "Not a nice day";
            }

        },function (error){
            console.log(error, 'can not get data.');
        });
      });
    } 
    else {
      console.log("Error message");
  }
}]);
