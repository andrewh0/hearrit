angular.module('hearrit', [
  'hearrit.services',
  'hearrit.search',
  'hearrit.recommends',
  'hearrit.chart',
  'hearrit.auth',
  'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
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
  .state('login', {
    url: '/login',
    templateUrl: 'app/auth/login.html'
  })
})
