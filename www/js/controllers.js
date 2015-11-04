angular.module('tock.controllers', ['tock.factories'])

.controller('AppCtrl', function($scope, settings) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var self = this;
  self.settings = settings;

  self.isPaused = true;

  self.restart = function() {
    $scope.$broadcast('tockerEvent_restart');
  };

  $scope.$on('tockerEvent_click', function(event, tIndex, tRunning) {
    if(tRunning) {
        $scope.$broadcast('tockerEvent_start', 1 - tIndex);
        $scope.$broadcast('tockerEvent_pause', tIndex);
    } else {
      if(self.isPaused) {
        $scope.$broadcast('tockerEvent_start', 1 - tIndex);
        self.isPaused = false;
      } else {
        $scope.$broadcast('tockerEvent_pause', 0);
        $scope.$broadcast('tockerEvent_pause', 1);
        self.isPaused = true;
      }
    }
  });
})
