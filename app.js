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
            console.log(response);

            // Main weather data, temperature, humidity etc...
            main_data = [];

            // Weather conditions
            weather_data = [];
            $scope.weatherStatus = $scope.data.data.weather[0].description;
            
            // Nice weather condition. False by default.
            nice_weather = false;

            // Weather Condition Icon code
            wcon = "";

            // User can able to set weather condition
            $scope.weather_status = ["Rain", "Snow", "Fog", "Sunny"];

            $scope.windSpeed = $scope.data.data.wind.speed;

            // Iterate through the response object values
            // Than pick up the proper group of data (weather conditions, weather main information)
            angular.forEach($scope.data, function (value) {
              if (value) {
                main_data.push(value.main);
                weather_data.push(value.weather);
                angular.forEach(weather_data[0], function (value) {
                  wcon = (value.icon);
                });
              } else {
                console.log("Error message")
              }
            });

            $scope.wcon = wcon;

            // The nice temperature range: nice_temp calculation
            curr_temp = main_data[0].temp;
            min_temp = 20;
            max_temp = 40;
            nice_temp = curr_temp > min_temp && curr_temp < max_temp ? true : false;

            // The nice humidity range: nice_hum calculation
            curr_hum = main_data[0].humidity;
            min_hum = 50;
            max_hum = 100;
            nice_hum = curr_hum >= min_hum && curr_hum <= max_hum ? true : false;

            // Watch temperature changes: By user input
            $scope.$watch('niceDayTemp', function(newValue) {
              if (newValue <= max_temp && newValue >= min_temp) {
                  $scope.niceTemp = true;
              } else {
                 $scope.niceTemp = false;
                 $scope.niceDayMsg = "Not a nice day";
              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                $scope.niceDayMsg = "Nice day";
              }
              else {
                $scope.niceDayMsg = "Not a nice day";
              }
            });

            // Watch humidity changes: By user input
            $scope.$watch('niceDayHum', function(newValue) {
              if (newValue <= max_hum && newValue >= min_hum) {
                  $scope.niceHum = true;
              } else {
                 $scope.niceHum = false;
                 $scope.niceDayMsg = "Not a nice day";

              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                 $scope.niceDayMsg = "Nice day";
              }
              else {
                $scope.niceDayMsg = "Not a nice day";
              }
            });

            // Watch weather condittion changes: By user input
            $scope.$watch('w_status', function (newValue) {
              if (newValue ==  "Sunny") {
                $scope.niceDayMsg = "Nice day";
                $scope.niceCon = true;
              }
              else {
                $scope.niceCon = false;
                 $scope.niceDayMsg = "Not a nice day";

              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                $scope.niceDayMsg = "Nice day";
              }
              else {
                $scope.niceDayMsg = "Not a nice day";
              }
            });

            // Windspeed 
            $scope.$watch('windSpeedU', function (newValue) {
              if (newValue < 10 && newValue >= 0) {
                $scope.niceDayMsg = "Nice day";
                $scope.niceWind = true;
              }
              else {
                $scope.niceWind = false;
                 $scope.niceDayMsg = "Not a nice day";

              }

              if ($scope.niceTemp && $scope.niceHum && $scope.niceCon && $scope.niceWind) {
                $scope.niceDayMsg = "Nice day";
              }
              else {
                $scope.niceDayMsg = "Not a nice day";
              }
            });
   
            // If the weather condition icon code is in the list
            if (wcon == "01d" || wcon == "01n" || wcon == "02d" || wcon == "02n" || wcon == "03d" || wcon == "04d" || wcon == "04n") {
              // And the temperature is nice 
              if (nice_temp && windspeed < 10) {
                if (nice_hum) {
                   $scope.niceDayMsg = "Nice day";
                }
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

