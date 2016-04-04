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

  $scope.recommend = function(trackID) {
    Recommends.recommendTrack(trackID)
    .then(function(result) {
      return result;
    })
  }

});
