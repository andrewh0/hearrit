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
  var recommendTrack = function(track) {
    return $http({
      method: 'POST',
      url: '/api/recommend',
      data: {track: {
        id: track.id,
        title: track.title,
        artist: track.user.username,
        url: track.permalink_url
      }}
    }).then(function successCallback(response) {
      console.log('Server responded with', response);
      return response.data;
    }, function errorCallback(response) {
      console.log('Error recommending track: ', response);
    })
  };
   return {
     recommendTrack: recommendTrack
   }
})
.factory('Chart', function($http) {
  var getAllTracks = function() {
    return $http({
      method: 'POST',
      url: '/api/chart',
      data: {}
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log('Error recommending track: ', response);
    })
  };
  return {
    getAllTracks: getAllTracks
  }
})
.factory('Auth', function($http) {
  var loginOrSignup = function() {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: {}
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log('Error signing up or logging in: ', response);
    })
  };
  return {
    loginOrSignup: loginOrSignup
  }
});
