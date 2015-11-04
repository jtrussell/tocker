
angular.module('tock.factories', [])

.factory('settings', function() {
  return {
    /**
     * Time alloted per player in minutes
     */
    playerTime: 12
  };
});
