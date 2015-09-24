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
var _ = Package.underscore._;
var MongoID = Package['mongo-id'].MongoID;
var Mongo = Package.mongo.Mongo;
var DDP = Package['ddp-client'].DDP;
var Random = Package.random.Random;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var MiniMax = Package['ground:minimax'].MiniMax;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;

/* Package-scope variables */
var _groundUtil, Ground;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ground_util/util.common.js                                                              //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
/* global _groundUtil:true */                                                                       // 1
/* global Ground:true */                                                                            // 2
// Define the utillity scope                                                                        // 3
_groundUtil = {};                                                                                   // 4
                                                                                                    // 5
// New ground scope                                                                                 // 6
Ground = {};                                                                                        // 7
                                                                                                    // 8
// Meteor.Collection or Mongo.Collection                                                            // 9
_groundUtil.Collection = (typeof Mongo !== 'undefined')?                                            // 10
        Mongo.Collection: Meteor.Collection;                                                        // 11
                                                                                                    // 12
                                                                                                    // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ground_util/util.client.js                                                              //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
/* global _groundUtil:false */                                                                      // 1
////////////////////////////////////////////////////////////////////////////////                    // 2
// MAP METEOR API's                                                                                 // 3
////////////////////////////////////////////////////////////////////////////////                    // 4
                                                                                                    // 5
// Access the DDP connection class                                                                  // 6
var _DDP;                                                                                           // 7
                                                                                                    // 8
try {                                                                                               // 9
  _DDP = Package.ddp.LivedataTest;                                                                  // 10
  _DDP = _DDP.Connection;                                                                           // 11
                                                                                                    // 12
} catch(err) {                                                                                      // 13
  _DDP = Meteor.connection.constructor;                                                             // 14
}                                                                                                   // 15
                                                                                                    // 16
_groundUtil.Connection = _DDP;                                                                      // 17
                                                                                                    // 18
if (!_DDP) {                                                                                        // 19
  throw new Error('GroundDB cannot access the DDP.Connection class');                               // 20
}                                                                                                   // 21
                                                                                                    // 22
// Meteor connection                                                                                // 23
_groundUtil.connection = _groundUtil.connection || Meteor.default_connection; // jshint ignore:line
                                                                                                    // 25
// ParseId function                                                                                 // 26
_groundUtil.idParse = LocalCollection && LocalCollection._idParse ||                                // 27
        Meteor.idParse || MongoID.idParse;                                                          // 28
                                                                                                    // 29
// Get the database map                                                                             // 30
_groundUtil.getDatabaseMap = function(col) {                                                        // 31
  // XXX: Suport older styles?                                                                      // 32
  return col._collection._docs._map;                                                                // 33
};                                                                                                  // 34
                                                                                                    // 35
_groundUtil.setDatabaseMap = function(col, map) {                                                   // 36
  // XXX: Suport older styles?                                                                      // 37
  col._collection._docs._map = map;                                                                 // 38
};                                                                                                  // 39
                                                                                                    // 40
_groundUtil.invalidateDb = function(col) {                                                          // 41
  // We need to invalidate all listening queries                                                    // 42
  _.each(col._collection.queries, function(query) {                                                 // 43
    // This db has changed big time...                                                              // 44
    query.changed();                                                                                // 45
  });                                                                                               // 46
};                                                                                                  // 47
                                                                                                    // 48
// State of all subscriptions in meteor                                                             // 49
var _subscriptionsReady = new ReactiveVar(false);                                                   // 50
                                                                                                    // 51
//////////////////////////// ALL SUBSCRIPTIONS READY ///////////////////////////                    // 52
                                                                                                    // 53
_groundUtil.allSubscriptionsReady = function() {                                                    // 54
  return _subscriptionsReady.get();                                                                 // 55
};                                                                                                  // 56
                                                                                                    // 57
// Could be nice to have a Meteor.allSubscriptionsReady                                             // 58
var readyInterval = Meteor.setInterval(function() {                                                 // 59
  if (DDP._allSubscriptionsReady()) {                                                               // 60
    // Stop this madness                                                                            // 61
    Meteor.clearInterval(readyInterval);                                                            // 62
    // Set the reactive var                                                                         // 63
    _subscriptionsReady.set(true);                                                                  // 64
  }                                                                                                 // 65
}, 1000);                                                                                           // 66
                                                                                                    // 67
//////////////////////////////// UNDERSCORE DEPS ///////////////////////////////                    // 68
                                                                                                    // 69
_groundUtil.each = _.each;                                                                          // 70
                                                                                                    // 71
_groundUtil.toArray = _.toArray;                                                                    // 72
                                                                                                    // 73
_groundUtil.extend = _.extend;                                                                      // 74
                                                                                                    // 75
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:util'] = {
  _groundUtil: _groundUtil,
  Ground: Ground
};

})();
