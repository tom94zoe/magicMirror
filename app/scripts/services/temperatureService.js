/**
 * Created by thzo on 03.08.16.
 */
'use strict';
angular.module('magicMirrorAppApp')
  .service('temperatureService', function () {
    function convertKelvinToCelsius(kelvin) {
      return parseFloat(kelvin) - 273.15;
    };

    return {
      convertKelvinToCelsius: convertKelvinToCelsius
    }
  });
