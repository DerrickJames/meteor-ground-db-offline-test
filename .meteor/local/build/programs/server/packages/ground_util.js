(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var MongoID = Package['mongo-id'].MongoID;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Random = Package.random.Random;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var MiniMax = Package['ground:minimax'].MiniMax;

/* Package-scope variables */
var _groundUtil, Ground;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/ground_util/util.common.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
/* global _groundUtil:true */                                        // 1
/* global Ground:true */                                             // 2
// Define the utillity scope                                         // 3
_groundUtil = {};                                                    // 4
                                                                     // 5
// New ground scope                                                  // 6
Ground = {};                                                         // 7
                                                                     // 8
// Meteor.Collection or Mongo.Collection                             // 9
_groundUtil.Collection = (typeof Mongo !== 'undefined')?             // 10
        Mongo.Collection: Meteor.Collection;                         // 11
                                                                     // 12
                                                                     // 13
///////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/ground_util/util.server.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// Define server specifics                                           // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:util'] = {
  _groundUtil: _groundUtil,
  Ground: Ground
};

})();

//# sourceMappingURL=ground_util.js.map
