
angular.module('tock.directives', ['tock.factories'])

.directive('tocker', function() {
  return {
    restrict: 'AE',
    template: 'tocker'
  };
});
