angular.module('hearrit.search', [])
.controller('searchController', function($scope, Search, Recommends) {
  $scope.query = '';
  $scope.searchResults = [];

  $scope.search = function() {
    Search.searchSoundCloud($scope.query)
    .then(function(results) {
      $scope.searchResults = results;
    })
  };

  $scope.recommend = function(track) {
    Recommends.recommendTrack(track)
    .then(function(result) {
      return result;
    })
  }

});
