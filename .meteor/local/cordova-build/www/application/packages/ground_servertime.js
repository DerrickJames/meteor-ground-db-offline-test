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
var Store = Package['ground:store'].Store;

/* Package-scope variables */
var ServerTime;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/ground_servertime/packages/ground_servertime.js                            //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
(function () {                                                                         // 1
                                                                                       // 2
///////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                               //    // 4
// packages/ground:servertime/client.js                                          //    // 5
//                                                                               //    // 6
///////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                 //    // 8
////////////////////////// GET SERVER TIME DIFFERENCE ////////////////////////// // 1  // 9
                                                                                 // 2  // 10
ServerTime = {};                                                                 // 3  // 11
                                                                                 // 4  // 12
ServerTime._serverTimeDiff = 0; // Time difference in ms                         // 5  // 13
                                                                                 // 6  // 14
ServerTime.now = function() {                                                    // 7  // 15
  return Date.now() + ServerTime._serverTimeDiff;                                // 8  // 16
};                                                                               // 9  // 17
                                                                                 // 10
// At server startup we figure out the time difference between server and        // 11
// client time - this includes lag and timezone                                  // 12
                                                                                 // 13
// Use the ground store to handle storage for us                                 // 14
var _storage = Store.create({                                                    // 15
  name: 'ServerTime',                                                            // 16
  version: 1.0                                                                   // 17
})                                                                               // 18
                                                                                 // 19
// Initialize the ServerTime._serverTimeDiff                                     // 20
_storage.getItem('diff', function(err, time) {                                   // 21
  if (err) {                                                                     // 22
                                                                                 // 23
  } else {                                                                       // 24
                                                                                 // 25
    // Set the time                                                              // 26
    ServerTime._serverTimeDiff = time || 0;                                      // 27
  }                                                                              // 28
                                                                                 // 29
});                                                                              // 30
                                                                                 // 31
// Call the server method an get server time                                     // 32
// XXX: Use http call instead creating less overhead                             // 33
Meteor.call('getServerTime', function(error, result) {                           // 34
  if (!error) {                                                                  // 35
    // Update our server time diff                                               // 36
    ServerTime._serverTimeDiff = result - Date.now();// - lag or/and timezone    // 37
    // Update the localstorage                                                   // 38
    _storage.setItem('diff', ServerTime._serverTimeDiff, function(err, result) { // 39
      // XXX:                                                                    // 40
    });                                                                          // 41
  }                                                                              // 42
}); // EO Server call                                                            // 43
///////////////////////////////////////////////////////////////////////////////////    // 52
                                                                                       // 53
}).call(this);                                                                         // 54
                                                                                       // 55
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:servertime'] = {
  ServerTime: ServerTime
};

})();
