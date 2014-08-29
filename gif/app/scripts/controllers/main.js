'use strict';

/**
 * @ngdoc function
 * @name gifApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gifApp
 */
angular.module('gifApp')
  .controller('MainCtrl', function ($scope, $http) {
  
    $scope.images = [];
    $scope.last = null;
    $scope.cache = null;

  $scope.submit = function(form){
    $scope.submitted = true;
    if($scope.last === $scope.val){
      return;
    }
    else { 
      $scope.images = [];
      $http.post('/', [$scope.val]).success(function(results){
        if($scope.val === undefined){
          //$scope.loadRandom();
        }
        else {
          for (var i = 0; i < 24; i++) {
            var rando = Math.floor(Math.random() * results.giphy.length);
            console.log(rando);
            $scope.images.push(results.giphy[rando]);
          }
          $scope.last = $scope.val;
        }
      });
    }
  };

  $scope.loadMore = function(){
    $scope.images = [];
    consooe.log('more!')
    for (var k = 0; k < 8; k++) {
        var rando = Math.floor(Math.random() * $scope.cache.giphy.length); 
        $scope.images.push($scope.cache.giphy[rando]);
    };
  };

  $scope.loadPopular = function(){
    $scope.images = [];
    $http.get('/popular').success(function(results){

      $scope.cache = results;
      for (var j = 0; j < 8; j++) {
        var rando = Math.floor(Math.random() * results.giphy.length); 
        $scope.images.push(results.giphy[rando]);
      }
    });
  };

  $scope.loadRandom = function(){
    $scope.images = [];
    $http.get('/random').success(function(results){
      var rando = Math.floor(Math.random() * results.giphy.length); 
        $scope.images.push(results.giphy[rando]);
    });
  };

  $scope.loadPopular();

  });