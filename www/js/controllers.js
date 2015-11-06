angular.module('tock.controllers', ['tock.factories'])

.controller('AppCtrl', function($scope, settings) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var self = this
    , isPaused = true
    , isTimedOut = false;

  self.settings = settings;

  self.restart = function() {
    isTimedOut = false;
    $scope.$broadcast('tockerEvent_restart');
  };

  $scope.$on('tockerEvent_click', function(event, tIndex, tRunning) {
    if(isTimedOut) { return; }
    if(tRunning) {
        $scope.$broadcast('tockerEvent_start', 1 - tIndex);
        $scope.$broadcast('tockerEvent_pause', tIndex);
    } else {
      if(isPaused) {
        isPaused = false;
        $scope.$broadcast('tockerEvent_start', 1 - tIndex);
      } else {
        isPaused = true;
        $scope.$broadcast('tockerEvent_pause', 0);
        $scope.$broadcast('tockerEvent_pause', 1);
      }
    }
  });

  $scope.$on('tockerEvent_timeout', function() {
    isTimedOut = true;
    $scope.$broadcast('tockerEvent_pause', 0);
    $scope.$broadcast('tockerEvent_pause', 1);
  });
})
