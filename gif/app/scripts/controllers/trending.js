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
    $scope.sampleImageText = [];


    $scope.thisTrend = function(clicked){
    $scope.trendLinks(clicked);
    //should remove sample images
    $scope.sampleImages = [];
    $scope.sampleImageText;
    };

    $scope.trendLinks = function(trend){
      console.log(trend);
      $scope.trendingImages = [];
      $scope.trendingImages = $scope.trends[trend]; 
    };

    $scope.showSample = function(data){
      $scope.sampleImages = [];
      //should select random item from each trend array
      for(var key in data){
      var rando = Math.floor(Math.random() * data[key].length);
      //should build new array in order of trends
      //console.log(data);
      $scope.sampleImageText = data;
      $scope.sampleImageText[key].push(data[key][rando]);
      //$scope.sampleImages.push(data[key][rando]);

      //only push one random item
      }
      console.log($scope.sampleImageText)
      console.log() 
    };

    $scope.trendList = function(){
      $scope.trends =[];
      $http.get('/twitter').success(function(results){
        $scope.trends = results;
      $scope.showSample(results);
      });
    };

   $scope.trendList();

  });


  //back button to reload trending page?