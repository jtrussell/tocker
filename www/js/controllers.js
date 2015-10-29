angular.module('tock.controllers', ['tock.factories'])

.controller('AppCtrl', function(settings) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var self = this;
  self.settings = settings;

  self.players = []
  self.players.length = self.settings.playerCount;
})
