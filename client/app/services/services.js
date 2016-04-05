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
      return response.data;
    }, function errorCallback(response) {
      console.log('Error recommending track: ', response);
    })
  };
  var recommendChartTrack = function(track) {
    return $http({
      method: 'POST',
      url: '/api/recommend',
      data: {track: {
        id: track.id,
        title: track.title,
        artist: track.artist,
        url: track.url
      }}
    }).then(function successCallback(response) {
      // console.log('RESPONSE from LIKING CHARRT', response.data);
      return response.data;
    }, function errorCallback(response) {
      console.log('Error recommending track: ', response);
    })
  }

  var getAllRecommended = function() {
    return $http({
      method: 'GET',
      url: '/api/recommended',
    }).then(function successCallback(response) {
      // console.log('Response from server is', response);
      return response.data.recommendedTracks;
    }, function errorCallback(response) {
      console.log('Error getting all recommended tracks: ', response);
    })
  };
   return {
     recommendTrack: recommendTrack,
     recommendChartTrack: recommendChartTrack,
     getAllRecommended: getAllRecommended
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
.factory('Auth', function($http, $location) {
  var loginOrSignup = function(username, password) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: {
        username: username,
        password: password
      }
    }).then(function successCallback(response) {
      if (response.data.err) {
        $location.path('/login');
      } else {
        $location.path('/chart');
      }
      return response.data;
    }, function errorCallback(response) {
      console.log('Error signing up or logging in: ', response.data);
    })
  };
  var logout = function() {
    return $http({
      method: 'GET',
      url: '/api/logout',
    })
    .then(function successCallback(response) {
      $location.path('/login');
    }, function errorCallback(response) {
      console.log('Could not log out: ', response.data);
    });
  }

  return {
    loginOrSignup: loginOrSignup,
    logout: logout
  }
});
