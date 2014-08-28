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
    $scope.trends ={};

    $scope.trendingImages = [];


    $scope.thisTrend = function(clicked){
    $scope.trendLinks(clicked);
    };

    $scope.trendLinks = function(trend){
      console.log(trend);
      $scope.trendingImages = [];
      $scope.trendingImages = $scope.trends[trend];
        
        
    };

    $scope.trendList = function(){
      $scope.trends =[];
      $http.get('/twitter').success(function(results){
        console.log(results);
        for(var key in results){
        $scope.trends = results;
        }
      });
    };

   $scope.trendList();

  });