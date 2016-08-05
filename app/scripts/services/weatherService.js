/**
 * Created by thzo on 03.08.16.
 */
'use strict';
angular.module('magicMirrorAppApp')
  .service('weatherService', function ($http, temperatureService) {
    var weatherRequestUrl = 'http://api.openweathermap.org/data/2.5/forecast/city?id=2761369&APPID=6a4d617c69c294370112b0f7174124b2';

    function mapEntry(entry) {
      entry.main.temp_max_celsius = temperatureService.convertKelvinToCelsius(entry.main.temp_max);
      entry.main.temp_min_celsius = temperatureService.convertKelvinToCelsius(entry.main.temp_min);
    };

    function mapAllEntries(list) {
      for (var i = 0; i < list.length; i++) {
        mapEntry(list[i]);
      }
    };

    function loadWeather() {
      return $http.get(weatherRequestUrl)
        .then(function success(response) {
          mapAllEntries(response.data.list);
          return response;
        });
    };

    return {
      loadWeather: loadWeather
    }
  });
