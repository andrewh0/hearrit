angular.module('hearrit.auth', [])
.controller('loginController', function($scope, $location, Auth) {
  $scope.passwordInvalid = false;
  $scope.loginOrSignup = function() {
    Auth.loginOrSignup($scope.username, $scope.password)
    .then(function(response) {
      if (response.err) {
        $scope.passwordInvalid = true;
      }
    });
  }
});
