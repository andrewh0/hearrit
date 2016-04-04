angular.module('hearrit.services', [])
.factory('Search', function($http) {
  var searchSoundCloud = function(query) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: {query: {q: query}}
    }).then(function successCallback(response) {
      console.log(response);
      return response.data;
    }, function errorCallback(response) {
      console.log('Error searching SoundCloud:', response);
    });
  };
  return {
    searchSoundCloud: searchSoundCloud
  }
})
.factory('Recommends', function($http) {
  var recommendTrack = function(trackID) {
    return $http({
      method: 'POST',
      url: '/api/recommend',
      data: {trackID: trackID}
    }).then(function successCallback(response) {
      console.log(response);
      return response.data;
    }, function errorCallback(response) {
      console.log('Error recommending track: ', response);
    })
  };
   return {
     recommendTrack: recommendTrack
   }
});
