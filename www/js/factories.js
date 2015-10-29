
angular.module('tock.factories', [])

.factory('settings', function() {
  return {
    playerCount: 2,
    playerTime: 12 * 60 * 1000,
    countDown: true
  };
});
