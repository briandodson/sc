var app = angular.module('BriansApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
  //Navigation
  $scope.jsUrl = '../js/';
  $scope.cssUrl = '../css/';
 
}]);