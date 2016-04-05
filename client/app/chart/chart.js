angular.module('hearrit.chart', [])
.controller('chartController', function($scope, Chart) {
  $scope.sortType = 'recommends';
  $scope.sortReverse = true;
  $scope.allTracks = [];

  Chart.getAllTracks()
  .then(function(allTracks) {
    $scope.allTracks = allTracks;
  });
});
