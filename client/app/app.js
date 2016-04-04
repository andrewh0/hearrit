angular.module('hearrit', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('chart', {
    url: '/chart',
    templateUrl: 'app/chart/chart.html'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'app/search/search.html'
  })
  .state('recommends', {
    url: '/recommends',
    templateUrl: 'app/recommends/recommends.html'
  })
})