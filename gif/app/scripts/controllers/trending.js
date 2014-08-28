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


    $scope.thisTrend = function(clicked){
    $scope.trendLinks(clicked);
    //should remove sample images
    $scope.sampleImages = [];
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
      $scope.sampleImages.push(data[key][rando]);
      }
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


  // {
  //   "Dylan Thompson": ["http://media2.giphy.com/media/jxEKQpVjjl0l2/giphy.gif","http://media4.giphy.com/media/LYLsDwYa9QG6Q/giphy.gif","http://media2.giphy.com/media/qkWqu00upwU1i/giphy.gif","http://media4.giphy.com/media/xVD0Wg3irGg3C/giphy.gif"],
  //   "Texas A&M":["http://media3.giphy.com/media/UhExrT9HW5lMQ/giphy.gif","http://media1.giphy.com/media/M3hdAWbqRiNJm/giphy.gif","http://media3.giphy.com/media/AVmSXD28nCzSw/giphy.gif","http://media0.giphy.com/media/QwniILsroKSJi/giphy.gif","http://media4.giphy.com/media/Tdo4EzOHXu86c/giphy.gif","http://media2.giphy.com/media/uwxQ7KCXNnKwg/giphy.gif","http://media4.giphy.com/media/PUFE7FRTWIBCo/giphy.gif","http://media3.giphy.com/media/TJ5DmW4WLHOog/giphy.gif","http://media1.giphy.com/media/vJ4YulytaCE6s/giphy.gif","http://media4.giphy.com/media/DwuMPElnanQ3K/giphy.gif","http://media3.giphy.com/media/PhrQHUNHFP8NG/giphy.gif","http://media4.giphy.com/media/FsP2jLc27b0je/giphy.gif","http://media4.giphy.com/media/ETeazlJtl8TRu/giphy.gif","http://media1.giphy.com/media/KglB6VMeiQSwE/giphy.gif","http://media0.giphy.com/media/hu01NrqTyeq3e/giphy.gif","http://media4.giphy.com/media/nNWirmrdGVj7a/giphy.gif","http://media2.giphy.com/media/X5Bvspk1Trag0/giphy.gif","http://media1.giphy.com/media/xwdALzc8BtX8Y/giphy.gif","http://media2.giphy.com/media/zemjnjfF1d90k/giphy.gif","http://media4.giphy.com/media/WCCikmhQJpG6s/giphy.gif","http://media3.giphy.com/media/L7xHBtt1gMI0M/giphy.gif","http://media4.giphy.com/media/asbme77P0rYkM/giphy.gif","http://media0.giphy.com/media/LB13n0ZeLwhOM/giphy.gif"],
  //   "Mike Davis":["http://media0.giphy.com/media/11CEb3Dw0oDZlK/giphy.gif","http://media0.giphy.com/media/IwwpnUberZFvi/giphy.gif","http://media1.giphy.com/media/yf0LdV14CpN5K/giphy.gif","http://media3.giphy.com/media/L1VZQE05QX6FO/giphy.gif"],
  //   "Jesse Palmer":["http://media0.giphy.com/media/JWxFL74AM2GGY/giphy.gif","http://media2.giphy.com/media/12fB5O8NT8WtHi/giphy.gif"]
  // }