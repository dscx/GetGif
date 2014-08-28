'use strict';

/**
 * @ngdoc overview
 * @name gifApp
 * @description
 * # gifApp
 *
 * Main module of the application.
 */
angular
  .module('gifApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/trending', {
        templateUrl: 'views/trending.html',
        controller: 'TrendCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
