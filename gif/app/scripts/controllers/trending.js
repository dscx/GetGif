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
    $scope.sampleImages = [];
    $scope.sampleImageText = {};


    $scope.thisTrend = function(clicked){
    $scope.trendLinks(clicked);
    $scope.sampleImages = [];
    $scope.sampleImageText = {};
    };

    $scope.trendLinks = function(trend){
      $scope.trendingImages = [];
      $scope.trendingImages = $scope.trends[trend]; 
      console.log($scope.trendingImages, "new set");
    };

    $scope.showSample = function(data){
      $scope.sampleImages = [];
      for(var key in data){
      // var rando = Math.floor(Math.random() * data[key].length);
      // $scope.sampleImageText = data;
      $scope.sampleImageText[key] = data[key][0];
      console.log($scope.sampleImageText, 'line37');
      }
    };

    $scope.trendList = function(){
      $scope.trends =[];
      $http.get('/twitter').success(function(results){
        $scope.trends = results;
        console.log(results, 'original result');
      $scope.showSample(results);
      });
    };

   $scope.trendList();

  });


  //back button to reload trending page?