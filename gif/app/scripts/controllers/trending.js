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
    $scope.trends ={
    "Texas A&M": [
        "http://media1.giphy.com/media/UhExrT9HW5lMQ/giphy.gif",
        "http://media4.giphy.com/media/M3hdAWbqRiNJm/giphy.gif",
        "http://media0.giphy.com/media/AVmSXD28nCzSw/giphy.gif",
        "http://media0.giphy.com/media/QwniILsroKSJi/giphy.gif",
        "http://media3.giphy.com/media/Tdo4EzOHXu86c/giphy.gif",
        "http://media4.giphy.com/media/uwxQ7KCXNnKwg/giphy.gif",
        "http://media4.giphy.com/media/PUFE7FRTWIBCo/giphy.gif",
        "http://media3.giphy.com/media/TJ5DmW4WLHOog/giphy.gif",
        "http://media4.giphy.com/media/vJ4YulytaCE6s/giphy.gif",
        "http://media2.giphy.com/media/DwuMPElnanQ3K/giphy.gif",
        "http://media3.giphy.com/media/PhrQHUNHFP8NG/giphy.gif",
        "http://media3.giphy.com/media/FsP2jLc27b0je/giphy.gif",
       
    ],
    "Anthony Brown": [
        "http://media2.giphy.com/media/rQN7lh1aPEzJu/giphy.gif",
        "http://media3.giphy.com/media/M4JigEMkkT73y/giphy.gif"
    ],
    "Adrian Peterson": [
        "http://media4.giphy.com/media/ZFCilpMH3UrkI/giphy.gif",
        "http://media0.giphy.com/media/5WZfIIM3QC2WY/giphy.gif",
        "http://media4.giphy.com/media/rtIKXuYQWlVUk/giphy.gif",
        "http://media3.giphy.com/media/GsARASe1AveBG/giphy.gif",
        "http://media3.giphy.com/media/WThIEt6Dy5CGA/giphy.gif",
        "http://media0.giphy.com/media/zufgpj1Ezm2Mo/giphy.gif",
        "http://media1.giphy.com/media/E4gbk31ktiTQc/giphy.gif",
        "http://media4.giphy.com/media/i1zE9tsozkUcE/giphy.gif",
        "http://media3.giphy.com/media/ZCZXwiwS9bDc4/giphy.gif",
       
    ],
    "Brad and Angelina": [
        "http://media2.giphy.com/media/HRaYNTTIF8JOw/giphy.gif",
        "http://media0.giphy.com/media/XFTxGQxZbzUg8/giphy.gif",
        "http://media4.giphy.com/media/lrwVYMuDW3yhO/giphy.gif",
        "http://media1.giphy.com/media/uOPISxrg0Nrsk/giphy.gif",
        "http://media3.giphy.com/media/sQMt8xR7gU0bS/giphy.gif",
        "http://media2.giphy.com/media/DHRZgdNI4QVtS/giphy.gif",
        "http://media0.giphy.com/media/12RneTpNBzD2EM/giphy.gif",
        "http://media2.giphy.com/media/LVBRp67QVjUNa/giphy.gif",
        "http://media1.giphy.com/media/BKJhpf7LUfmWQ/giphy.gif",
        "http://media1.giphy.com/media/2parUGzWwNaww/giphy.gif",
      
    ]

    };

    $scope.trendingImages = [];


    $scope.thisTrend = function(clicked){
    //should call trendLinks
    
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
      })
    };

   // $scope.trendList();

  });

/*"fun": ['http://media0.giphy.com/media/7CONpA54Lmk6Y/200_s.gif'],
      "girls": ['http://media3.giphy.com/media/Bg7RqTLZmSUQU/200_s.gif'],
      "water": ['http://media2.giphy.com/media/cbG9wtoO8QScw/200.gif'],
      "muscles": ['http://media3.giphy.com/media/eXWj7i637pDYk/200.gif']
      */