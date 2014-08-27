'use strict';

/**
 * @ngdoc function
 * @name gifApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gifApp
 */
angular.module('gifApp')
  .controller('MainCtrl', function ($scope) {
    $scope.images = [
      'https://media.giphy.com/media/5xtDarFy9hJzFnau6KQ/giphy.gif',
      'https://media.giphy.com/media/ToMjGpwKIkAhewfNL3y/giphy.gif',
      'http://media.giphy.com/media/f1Gpa9nYrXLfa/giphy.gif',
      'http://media1.giphy.com/media/JAXV2X8uVt9XG/200.gif'
    ];
  });