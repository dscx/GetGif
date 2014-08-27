'use strict';

/**
 * @ngdoc function
 * @name gifApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gifApp
 */
angular.module('gifApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
