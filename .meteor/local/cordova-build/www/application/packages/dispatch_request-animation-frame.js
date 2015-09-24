//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/dispatch_request-animation-frame/packages/dispatch_request-animation-frame.js                //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
(function () {                                                                                           // 1
                                                                                                         // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                                 //    // 4
// packages/dispatch:request-animation-frame/request-animation-frame.js                            //    // 5
//                                                                                                 //    // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                                   //    // 8
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/                            // 1  // 9
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating        // 2  // 10
                                                                                                   // 3  // 11
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel            // 4  // 12
                                                                                                   // 5  // 13
// MIT license                                                                                     // 6  // 14
                                                                                                   // 7  // 15
(function() {                                                                                      // 8  // 16
    var lastTime = 0;                                                                              // 9  // 17
    var vendors = ['ms', 'moz', 'webkit', 'o'];                                                    // 10
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {                     // 11
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];                 // 12
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']                    // 13
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];            // 14
    }                                                                                              // 15
                                                                                                   // 16
    if (!window.requestAnimationFrame)                                                             // 17
        window.requestAnimationFrame = function requestAnimationFrameFallback(callback, element) { // 18
            var currTime = new Date().getTime();                                                   // 19
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));                              // 20
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },            // 21
              timeToCall);                                                                         // 22
            lastTime = currTime + timeToCall;                                                      // 23
            return id;                                                                             // 24
        };                                                                                         // 25
                                                                                                   // 26
    if (!window.cancelAnimationFrame)                                                              // 27
        window.cancelAnimationFrame = function cancelAnimationFrameFallback(id) {                  // 28
            clearTimeout(id);                                                                      // 29
        };                                                                                         // 30
}());                                                                                              // 31
                                                                                                   // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////    // 41
                                                                                                         // 42
}).call(this);                                                                                           // 43
                                                                                                         // 44
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dispatch:request-animation-frame'] = {};

})();
