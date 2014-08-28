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
    // $scope.images = [
    //   'https://media.giphy.com/media/5xtDarFy9hJzFnau6KQ/giphy.gif',
    //   'https://media.giphy.com/media/ToMjGpwKIkAhewfNL3y/giphy.gif',
    //   'http://media.giphy.com/media/f1Gpa9nYrXLfa/giphy.gif',
    //   'http://media1.giphy.com/media/JAXV2X8uVt9XG/200.gif',
    //   'http://media0.giphy.com/media/MAOCuudFBswRq/200.gif',
    //   'http://media1.giphy.com/media/6KGkOwViSUsgg/200.gif'
    // ];
    $scope.images = [];

    //$scope.val;
    $scope.submit = function(form){
      $scope.images = [];
      $scope.submitted = true;
      $http.post('/', [$scope.val]).success(function(results){
        console.log(results, "results");
        for (var i = 0; i < 6; i++) {
        var rando = Math.floor(Math.random() * results.giphy.length);
        console.log(rando);
          $scope.images.push(results.giphy[rando]);
        };
        
      });
      
    }
  });