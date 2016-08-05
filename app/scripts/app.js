'use strict';

/**
 * @ngdoc overview
 * @name magicMirrorAppApp
 * @description
 * # magicMirrorAppApp
 *
 * Main module of the application.
 */
angular
  .module('magicMirrorAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }).config( function(ChartJsProvider) {
    ChartJsProvider.setOptions({ colors : [ '#000000', '#000000']});
  });

