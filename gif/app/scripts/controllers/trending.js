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
      'fun','men','water','muscles'
    ];

    $scope.trendingImages = [
      'http://media0.giphy.com/media/7CONpA54Lmk6Y/200_s.gif',
      'http://media3.giphy.com/media/Bg7RqTLZmSUQU/200_s.gif',
      'http://media2.giphy.com/media/cbG9wtoO8QScw/200.gif',
      'http://media3.giphy.com/media/eXWj7i637pDYk/200.gif',
    ];
    $scope.thisTrend = function(clicked){
      $scope.val = clicked;
      alert(clicked + "trend");
    //should call trendLinks
    //should display images only related to clicked trend

    };

    $scope.trendLinks = function(data){
      $scope.trendingImages = [];
      $http.post('/twitter', [$scope.val]).success(function(data){
        console.log(data, "data");
        //should write links to trendingimages array for clicked item
        //should get data from trends
        for(var val in data){


          $scope.trendingImages.push(data); //update me
        }
        });
    };

    $scope.trendList = function(){
      $scope.trends =[];
      $http.post('/twitter').success(function(results){
        console.log(results);
        for(var key in results){
        $scope.trends.push(results);
        }
      })
      trendLinks($scope.trends);
    };

  });