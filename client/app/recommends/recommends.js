angular.module('hearrit.recommends', [])
.controller('recommendsController', function($scope, Recommends) {
  $scope.recommendedTracks = [];
  Recommends.getAllRecommended()
  .then(function(recommendedTracks) {
    $scope.recommendedTracks = recommendedTracks;
  });
});
