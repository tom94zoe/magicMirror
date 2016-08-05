'use strict';

/**
 * @ngdoc function
 * @name magicMirrorAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the magicMirrorAppApp
 */
angular.module('magicMirrorAppApp')
  .controller('MainCtrl', function ($http, $interval, weatherService, commonService, $filter) {
    var ctrl = this;


    var oneSecond = 1000;
    const fiveSeconds = 5000;
    const tenMinutes = 600000;
    var viennaLinesUTwoRequestUrl = "http://127.0.0.1:8080/http://www.wienerlinien.at/ogd_realtime/monitor?rbl=4259&sender=GDxCvVKMAfrXja1F";
    var weatherRequestUrl = 'http://api.openweathermap.org/data/2.5/forecast/city?id=2761369&APPID=6a4d617c69c294370112b0f7174124b2';

    $interval(function () {
      ctrl.date = new Date();
    }, oneSecond);


    $interval(function () {
      $http.get(viennaLinesUTwoRequestUrl)
        .then(function success(response) {
          if (!ctrl.uTwoData || (ctrl.uTwoData.data.monitors[0].lines[0].departures.departure[0].departureTime.countdown !==
            response.data.data.monitors[0].lines[0].departures.departure[0].departureTime.countdown)) {
            ctrl.uTwoData = response.data;
          }
        })
    }, fiveSeconds);

    function loadWeatherDataFromBackend () {
      weatherService.loadWeather().then(function(response){
        //ctrl.weatherData = response.data;
        ctrl.todaysWeatherDataList = response.data.list.slice(0, 8);
        ctrl.chartData = [commonService.getArrayOfPropertyOfArray(response.data.list, ['main','temp_max_celsius']),
          commonService.getArrayOfPropertyOfArray(response.data.list,['main','temp_min_celsius'])];
        ctrl.series = ['Maximale Temperatur', 'Minimale Temperatur'];
        ctrl.labels = [];
        var milliseconds = commonService.getArrayOfPropertyOfArray(response.data.list,['dt']);

        for(var i = 0; i < milliseconds.length; i++){
          ctrl.labels.push(i%4 === 0 ? $filter('date')((milliseconds[i]*1000), "dd/MM HH") : "");
        }

      });
    }
    ctrl.options = {showXLabels: 10};

    loadWeatherDataFromBackend();
    $interval(loadWeatherDataFromBackend(), tenMinutes);


  });
