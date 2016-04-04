angular.module('hearrit.search', [])
.controller('searchController', function($scope, Search) {
  $scope.query = '';
  $scope.searchResults = [];

  $scope.search = function() {
    Search.searchSoundCloud($scope.query)
    .then(function(results) {
      $scope.searchResults = results;
    })
  };

});
