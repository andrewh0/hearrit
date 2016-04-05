angular.module('hearrit.chart', [])
.controller('chartController', function($scope, Chart) {
  $scope.allTracks = [];

  Chart.getAllTracks()
  .then(function(allTracks) {
    $scope.allTracks = allTracks;
  });
});
