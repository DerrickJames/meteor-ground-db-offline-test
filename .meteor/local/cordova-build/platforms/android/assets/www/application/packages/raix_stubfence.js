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
var Mongo = Package.mongo.Mongo;
var DDP = Package['ddp-client'].DDP;

/* Package-scope variables */
var _DDP;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/raix_stubfence/packages/raix_stubfence.js                                  //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
(function () {                                                                         // 1
                                                                                       // 2
///////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                               //    // 4
// packages/raix:stubfence/util.js                                               //    // 5
//                                                                               //    // 6
///////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                 //    // 8
/* global _DDP:true */                                                           // 1  // 9
/* global Package: true */                                                       // 2  // 10
/* global Meteor: true */                                                        // 3  // 11
                                                                                 // 4  // 12
_DDP = Package.ddp.LivedataTest;                                                 // 5  // 13
                                                                                 // 6  // 14
if (_DDP) {                                                                      // 7  // 15
  _DDP = _DDP.Connection && _DDP.Connection.prototype;                           // 8  // 16
} else {                                                                         // 9  // 17
  _DDP = Meteor.connection.__proto__;                                            // 10
}                                                                                // 11
                                                                                 // 12
if (!_DDP) {                                                                     // 13
  throw new Error('Arg! Meteor just broke raix:stubfence! Please report to @raix at github, and he will work his butt off trying to fix this');
}                                                                                // 15
                                                                                 // 16
///////////////////////////////////////////////////////////////////////////////////    // 25
                                                                                       // 26
}).call(this);                                                                         // 27
                                                                                       // 28
                                                                                       // 29
                                                                                       // 30
                                                                                       // 31
                                                                                       // 32
                                                                                       // 33
(function () {                                                                         // 34
                                                                                       // 35
///////////////////////////////////////////////////////////////////////////////////    // 36
//                                                                               //    // 37
// packages/raix:stubfence/nostub.js                                             //    // 38
//                                                                               //    // 39
///////////////////////////////////////////////////////////////////////////////////    // 40
                                                                                 //    // 41
var inFence = 0;                                                                 // 1  // 42
                                                                                 // 2  // 43
_DDP.stubFence = function(names, f) {                                            // 3  // 44
  var self = this;                                                               // 4  // 45
                                                                                 // 5  // 46
  if (++inFence !== 1) {                                                         // 6  // 47
    inFence--;                                                                   // 7  // 48
    throw new Error('stubFence cannot lock since another stubFence is running'); // 8  // 49
  }                                                                              // 9  // 50
                                                                                 // 10
  // Take string or array of string                                              // 11
  if (names === ''+names) names = [names];                                       // 12
                                                                                 // 13
  // Carrier for super of methods                                                // 14
  var supers = {};                                                               // 15
                                                                                 // 16
  // Store supers                                                                // 17
  _.each(names, function(name) {                                                 // 18
                                                                                 // 19
    // Check that the method exists                                              // 20
    if (self._methodHandlers[name]) {                                            // 21
      supers[name] = self._methodHandlers[name];                                 // 22
    } else {                                                                     // 23
      throw new Error('stubFence could not find method "' + name + '"');         // 24
    }                                                                            // 25
                                                                                 // 26
  });                                                                            // 27
                                                                                 // 28
  // Check that we got any supers to stubFence                                   // 29
  if (names.length) {                                                            // 30
                                                                                 // 31
    // Remove the stub                                                           // 32
    _.each(supers, function(f, name) {                                           // 33
      self._methodHandlers[name] = null;                                         // 34
    });                                                                          // 35
                                                                                 // 36
    // Run the code                                                              // 37
    f();                                                                         // 38
                                                                                 // 39
    // Insert the stub again                                                     // 40
    _.each(supers, function(f, name) {                                           // 41
      self._methodHandlers[name] = f;                                            // 42
    });                                                                          // 43
  } else {                                                                       // 44
    throw new Error('stubFence, no methods found');                              // 45
  }                                                                              // 46
                                                                                 // 47
  inFence--;                                                                     // 48
};                                                                               // 49
                                                                                 // 50
Mongo.Collection.prototype.stubFence = function(f) {                             // 51
  var self = this;                                                               // 52
                                                                                 // 53
  // Make sure we got a collection name                                          // 54
  if (!self._name)                                                               // 55
    throw new Error('Dont run stubFence on an annonymous collection');           // 56
                                                                                 // 57
  // Make sure we got a connection                                               // 58
  if (self._connection) {                                                        // 59
    // The main collection methods                                               // 60
    var collectionMethods = [                                                    // 61
      '/' + self._name + '/insert',                                              // 62
      '/' + self._name + '/remove',                                              // 63
      '/' + self._name + '/update'                                               // 64
    ];                                                                           // 65
                                                                                 // 66
    // Run the connection stubFence                                              // 67
    self._connection.stubFence(collectionMethods, f);                            // 68
                                                                                 // 69
  } else {                                                                       // 70
    throw new Error('Dont run stubFence on a collection with no connection');    // 71
  }                                                                              // 72
};                                                                               // 73
                                                                                 // 74
///////////////////////////////////////////////////////////////////////////////////    // 116
                                                                                       // 117
}).call(this);                                                                         // 118
                                                                                       // 119
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['raix:stubfence'] = {};

})();
