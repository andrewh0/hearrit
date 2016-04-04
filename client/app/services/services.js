angular.module('hearrit.services', [])
.factory('Search', function($http) {
  var searchSoundCloud = function(query) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: {query: {q: query}}
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log('Error searching SoundCloud:', response);
    });
  };
  return {
    searchSoundCloud: searchSoundCloud
  }
})
