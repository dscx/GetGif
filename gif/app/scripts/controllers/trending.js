'use strict';

/**
 * @ngdoc function
 * @name gifApp.controller:MainCtrl
 * @description
 * # trendCtrl
 * Controller of the gifApp
 */
angular.module('gifApp')
  .controller('TrendCtrl', function ($scope, $http) {
    $scope.trends = [];

    $scope.submit = function(form){
      $scope.trends = [];
      $scope.submitted = true;
      $http.post('/', [$scope.val]).success(function(results){
        console.log(results, "results");
        for (var i = 0; i < 6; i++) {
        var rando = Math.floor(Math.random() * results.giphy.length);
        console.log(rando);
          $scope.trends.push(results.); //update me
        };
        
      });
      
    }
  });