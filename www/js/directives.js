
angular.module('tock.directives', ['tock.factories'])

.directive('tocker', function($timeout) {
  return {
    restrict: 'AE',
    scope: {
      tockerIndex: '=',
      tockerTime: '='
    },
    template: [
      '<span class="tocker-text">',
        '{{tckr.time | tockTime}}',
      '</span>',
      '<span class="tocker-progress"></span>'
    ].join('\n'),
    link: function(scope, element, attrs) {
      var index = scope.tockerIndex
        , timeInitial
        , dateLastRun;

      var t = scope.tckr = {};

      var tInit = function() {
        t.isRunning = false;
        timeInitial = scope.tockerTime * 60 * 1000
        t.time = timeInitial;
      };

      var tStart = function() {
        t.isRunning = true;
        element.addClass('active');
        dateLastRun = dateLastRun || Date.now();
        tRun();
      };

      var tStop = function() {
        t.isRunning = false;
        element.removeClass('active');
        dateLastRun = null;
      };

      var tProg = function() {
        var $elProg = element.children().eq(1)
          , prog = Math.floor(100 * t.time / timeInitial);
        $elProg.css('width', prog + '%');
      };

      var tRun = function() {
        if(!t.isRunning) { return; }
        var now = Date.now();
        t.time = Math.max(t.time - (now - dateLastRun), 0);
        dateLastRun = now;
        tProg();
        if(!t.time) {
          element.addClass('dead');
        }
        $timeout(tRun, 100);
      };

      tInit();

      element.on('click', function() {
        scope.$apply(function() {
          scope.$emit('tockerEvent_click', index, t.isRunning);
        });
      });

      scope.$on('tockerEvent_pause', function(event, tIndex) {
        if(tIndex === index) {
          tStop();
        }
      });

      scope.$on('tockerEvent_start', function(event, tIndex) {
        if(tIndex === index) {
          tStart();
        }
      });

      scope.$on('tockerEvent_restart', function(event) {
        tStop();
        tInit();
      });
    }
  };
});
