'use strict';

//filter feature module

angular.module('myApp.filter', ['ngRoute', 'exactFilter'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/filter', {
    templateUrl: 'filter/filter.html',
    controller: 'FilterCtrl'
  });
}])
 
.controller('FilterCtrl', ['$http', '$scope', function($http, $scope) {

  $scope.search = "";
  $scope.filter = 'oneOrMore';
  $scope.photos = [];
  buildPhotoSetFromMongo();

  $scope.filters = function(photo) {
    switch($scope.filter) {
      case 'oneOrMore': {
        return photo.points >= 1;
      }
      default:
       return true;
    }
  }

  $scope.changeFilterTo = function(filter) {
    if(filter !== 'choice')
      $scope.search = "";
    $scope.filter = filter;
  }

  function buildPhotoSetFromMongo() {
      $http({
        method: 'GET',
        url: '/images'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          var source;
          for(var i = 0; i < response.data.length; i++) {
            //trim 'assets'
            source = response.data[i].src.substring(7, response.data[i].src.length);
            //no need to trim 'assets' img is archived
            if(response.data[i].archived === true)
              source = response.data[i].src;

            console.log(source);

            $scope.photos.push({ id: response.data[i].id, src: source, points: response.data[i].points.toString(), archived: response.data[i].archived});
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
  }
}]);
