angular.module('hearrit.chart', [])
.controller('chartController', function($scope, $location, Chart, Recommends) {
  $scope.sortType = 'recommends';
  $scope.sortReverse = true;
  $scope.allTracks = [];

  Chart.getAllTracks()
  .then(function(allTracks) {
    $scope.allTracks = allTracks;
  });

  $scope.recommend = function(track) {
    Recommends.recommendChartTrack(track)
    .then(Chart.getAllTracks)
    .then(function(allTracks) {
      $scope.allTracks = allTracks;
    });
  }
});
