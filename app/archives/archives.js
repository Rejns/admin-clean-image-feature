'use strict';

angular.module('myApp.archives', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/archives', {
    templateUrl: 'archives/archives.html',
    controller: 'ArchivesCtrl'
  });
}])

.controller('ArchivesCtrl', ['$scope', '$http', function($scope, $http) {

   $scope.archivedPhotos = [];
   $http.get("/archives")
       .then(function (response) {
       for(var i = 0; i < response.data.length; i++)
       $scope.archivedPhotos.push(response.data[i]);
   });

}]);