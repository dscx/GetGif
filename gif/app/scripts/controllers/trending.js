'use strict';

/**
 * @ngdoc function
 * @name gifApp.controller:TrendCtrl
 * @description
 * # trendCtrl
 * Controller of the gifApp
 */
angular.module('gifApp')
  .controller('TrendCtrl', function ($scope, $http) {
    $scope.trends = [
      'fun','girls','water','muscles'
    ];

    $scope.trendingImages = [
      'http://media0.giphy.com/media/7CONpA54Lmk6Y/200_s.gif',
      'http://media3.giphy.com/media/Bg7RqTLZmSUQU/200_s.gif',
      'http://media2.giphy.com/media/cbG9wtoO8QScw/200.gif',
      'http://media3.giphy.com/media/eXWj7i637pDYk/200.gif',
    ];
    $scope.thisTrend = function(button){
      alert(button + "trend")
    }

    $scope.whatsTrend = function(form){
      $scope.trends = [];
      $scope.submitted = true;
      $http.post('/', [$scope.val]).success(function(results){
        console.log(results, "results");
          $scope.trends.push(results); //update me
        });
    };
  });