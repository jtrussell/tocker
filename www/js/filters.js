
angular.module('tock.filters', [])

.filter('tockTime', function() {
  var padLeft = function(i) {
    i = '' + i;
    while(i.length < 2) {
      i = '0' + i;
    }
    return i;
  };

  return function(tIn) {
    if(!angular.isNumber(tIn)) { return ';('; }
    var tSecs = tIn / 1000;

    var hrs = Math.floor(tSecs / 3600);
    tSecs = tSecs % 3600;

    var mins = Math.floor(tSecs / 60)
      , secs = Math.floor(tSecs % 60);
    return hrs + ':' + padLeft(mins) + ':' + padLeft(secs);
  };
});

