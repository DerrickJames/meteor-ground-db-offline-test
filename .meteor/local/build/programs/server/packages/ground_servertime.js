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
// packages/ground:servertime/server.js                                          //    // 5
//                                                                               //    // 6
///////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                 //    // 8
////////////////////////// GET SERVER TIME DIFFERENCE ////////////////////////// // 1  // 9
                                                                                 // 2  // 10
ServerTime = {};                                                                 // 3  // 11
                                                                                 // 4  // 12
// XXX: TODO use a http rest point instead - creates less overhead               // 5  // 13
Meteor.methods({                                                                 // 6  // 14
  'getServerTime': function() {                                                  // 7  // 15
    return Date.now();                                                           // 8  // 16
  }                                                                              // 9  // 17
});                                                                              // 10
                                                                                 // 11
// Unify client / server api                                                     // 12
ServerTime.now = function() {                                                    // 13
  return Date.now();                                                             // 14
};                                                                               // 15
///////////////////////////////////////////////////////////////////////////////////    // 24
                                                                                       // 25
}).call(this);                                                                         // 26
                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:servertime'] = {
  ServerTime: ServerTime
};

})();

//# sourceMappingURL=ground_servertime.js.map
