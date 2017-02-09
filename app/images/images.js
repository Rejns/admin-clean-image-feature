'use strict';

angular.module('myApp.images', ['ngRoute', 'lazyLoader'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/images', {
    templateUrl: 'images/images.html',
    controller: 'ImagesCtrl'
  });
}])
 
.controller('ImagesCtrl', ['$http', '$scope', function($http, $scope) {


    //filter archived
    $scope.removeArchived = function(photo) {
      return photo.archived === false;
    }

    //remove image from screen when deleted and update database
    $scope.removeLi = function(e, id, photo){

      var index = $scope.photos.indexOf(photo);
      var multiUpdateArray = $scope.photos.slice(0, index);

      $http.post("/images", {params:{ id : id, photos: multiUpdateArray, src: photo.src }})
       .then(function (response) { 
          $scope.photos.splice(index, 1);
          multiUpdateArray.forEach(function(photo) {
            photo.points = photo.points+1;
          })
       });
    }

    $scope.photos = [];
    buildPhotoSetFromMongo();


    function buildPhotoSetFromMongo() {
      $http({
        method: 'GET',
        url: '/images'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          for(var i = 0; i < response.data.length; i++) {
               
                //out app is congigured to serve images from 'assets/images/example.jpg'
                //assets folder is configured to serve static files, so
                //it can be left out img src, we correct src by stripping ... 'images/example.jpg'
            var source = response.data[i].src.substring(7, response.data[i].src.length);
            $scope.photos.push({ id: response.data[i].id, src: source, points: response.data[i].points, archived: response.data[i].archived});
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
    }

}]); 
