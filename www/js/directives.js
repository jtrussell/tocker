
angular.module('tock.directives', ['tock.factories'])

.directive('tocker', function() {
  return {
    restrict: 'AE',
    scope: {
      tockerIndex: '=',
      tockerTime: '='
    },
    template: [
      '<span class="tocker-text">',
        '{{tckr.time | tockTime}}',
      '</span>'
    ].join('\n'),
    link: function(scope, element, attrs) {
      var index = scope.tockerIndex
        , timeInitial = scope.tockerTime
        , timeLeft = timeInitial;

      var t = scope.tckr = {};
      t.isRunning = false;

      t.time = timeLeft;

      element.on('click', function() {
        scope.$apply(function() {
          scope.$emit('tockerEvent_click', index, t.isRunning);
        });
      });

      scope.$on('tockerEvent_pause', function(event, tIndex) {
        if(tIndex === index) {
          t.isRunning = false;
          element.removeClass('active');
        }
      });

      scope.$on('tockerEvent_start', function(event, tIndex) {
        if(tIndex === index) {
          t.isRunning = true;
          element.addClass('active');
        }
      });
    }
  };
});
