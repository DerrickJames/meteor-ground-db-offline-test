(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var _groundUtil = Package['ground:util']._groundUtil;
var Ground = Package['ground:util'].Ground;
var ServerTime = Package['ground:servertime'].ServerTime;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var OneTimeout = Package['raix:onetimeout'].OneTimeout;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var MiniMax = Package['ground:minimax'].MiniMax;
var Store = Package['ground:store'].Store;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var _groundDbConstructor, Ground, GroundDB;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/ground_db/packages/ground_db.js                                                //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
(function () {                                                                             // 1
                                                                                           // 2
//////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                  //     // 4
// packages/ground:db/groundDB.server.js                                            //     // 5
//                                                                                  //     // 6
//////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                    //     // 8
/*                                                                                  // 1   // 9
                                                                                    // 2   // 10
                                                                                    // 3   // 11
TODO:                                                                               // 4   // 12
  `Meteor.default_server` - `Meteor.server`                                         // 5   // 13
                                                                                    // 6   // 14
*/                                                                                  // 7   // 15
///////////////////////////////// TEST SCOPE ///////////////////////////////////    // 8   // 16
                                                                                    // 9   // 17
Meteor.server = Meteor.server || Meteor.default_server;                             // 10  // 18
                                                                                    // 11  // 19
//////////////////////////////// GROUND DATABASE ///////////////////////////////    // 12  // 20
                                                                                    // 13  // 21
_groundDbConstructor = function(collection, options) {                              // 14  // 22
  var self;                                                                         // 15  // 23
  // XXX: Write the grounddb constructor                                            // 16  // 24
                                                                                    // 17  // 25
                                                                                    // 18  // 26
  // // This is the basic interface allowing users easily access for handling       // 19  // 27
  // // method calls, this.super() is the super and this.collection is self         // 20  // 28
  // // TODO: Remove this section to the README                                     // 21  // 29
  // self.conflictHandlers = (options && options.conflictHandlers)?                 // 22  // 30
  //       options.conflictHandlers: {                                              // 23  // 31
  //   'insert': function(doc) {                                                    // 24  // 32
  //     //console.log('insert');                                                   // 25  // 33
  //     //console.log(doc);                                                        // 26  // 34
  //     this.super(doc);                                                           // 27  // 35
  //   },                                                                           // 28  // 36
  //   'update': function(id, modifier) {                                           // 29  // 37
  //     //console.log('update');                                                   // 30  // 38
  //     //console.log(id);                                                         // 31  // 39
  //     //console.log(modifier);                                                   // 32  // 40
  //     this.super(id, modifier);                                                  // 33  // 41
  //   },                                                                           // 34  // 42
  //   'remove': function(id) {                                                     // 35  // 43
  //     //console.log('remove');                                                   // 36  // 44
  //     //console.log(id);                                                         // 37  // 45
  //     this.super(id);                                                            // 38  // 46
  //   }                                                                            // 39  // 47
  // };                                                                             // 40  // 48
                                                                                    // 41  // 49
  // // Create overwrite interface                                                  // 42  // 50
  // _.each(['insert', 'update', 'remove'], function(name) {                        // 43  // 51
  //   // TODO: init default conflict handlers                                      // 44  // 52
  //   //self.conflictHandlers[name] = function() {                                 // 45  // 53
  //   //  this.super.apply(this, arguments);                                       // 46  // 54
  //   //};                                                                         // 47  // 55
                                                                                    // 48  // 56
  //   // Save super                                                                // 49  // 57
  //   var _super = Meteor.default_server.method_handlers['/'+self.name+'/'+name];  // 50  // 58
  //   // Overwrite                                                                 // 51  // 59
  //   Meteor.default_server.method_handlers['/'+self.name+'/'+name] = function() { // 52  // 60
  //     var _this = this;                                                          // 53  // 61
  //     _this.collection = self;                                                   // 54  // 62
  //     _this.super = _super;                                                      // 55  // 63
  //     // Call the conflicthandlers                                               // 56  // 64
  //     self.conflictHandlers[name].apply(_this, arguments);                       // 57  // 65
  //   };                                                                           // 58  // 66
  // });                                                                            // 59  // 67
                                                                                    // 60  // 68
  return self;                                                                      // 61  // 69
};                                                                                  // 62  // 70
                                                                                    // 63  // 71
                                                                                    // 64  // 72
// Global helper for applying grounddb on a collection                              // 65  // 73
Ground.Collection = function(name, options) {                                       // 66  // 74
  var self;                                                                         // 67  // 75
  // Inheritance Meteor Collection can be set by options.collection                 // 68  // 76
  // Accepts smart collections by Arunoda Susiripala                                // 69  // 77
  // Check if user used the "new" keyword                                           // 70  // 78
                                                                                    // 71  // 79
                                                                                    // 72  // 80
  // Make sure we got some options                                                  // 73  // 81
  options = options || {};                                                          // 74  // 82
                                                                                    // 75  // 83
  // Either name is a Meteor collection or we create a new Meteor collection        // 76  // 84
  if (name instanceof _groundUtil.Collection) {                                     // 77  // 85
    self = name;                                                                    // 78  // 86
  } else {                                                                          // 79  // 87
    self = new _groundUtil.Collection(name, options);                               // 80  // 88
  }                                                                                 // 81  // 89
                                                                                    // 82  // 90
  // Throw an error if something went wrong                                         // 83  // 91
  if (!(self instanceof _groundUtil.Collection))                                    // 84  // 92
    throw new Error('Ground.Collection expected a Mongo.Collection');               // 85  // 93
                                                                                    // 86  // 94
  // Add grounddb to the collection, circular reference since self is               // 87  // 95
  // grounddb.collection                                                            // 88  // 96
  self.grounddb = new _groundDbConstructor(self, options);                          // 89  // 97
                                                                                    // 90  // 98
  // Return grounded collection - We dont return this eg if it was an instance      // 91  // 99
  // of Ground.Collection                                                           // 92  // 100
  return self;                                                                      // 93  // 101
};                                                                                  // 94  // 102
                                                                                    // 95  // 103
////////////////////////// TIMESTAMP CONFLICTHANDLER ///////////////////////////    // 96  // 104
                                                                                    // 97  // 105
// TODO:                                                                            // 98  // 106
// When clients make changes the server should track the documents from the         // 99  // 107
// clients to see if the changes are new or old changes.                            // 100
// This could be done in several ways.                                              // 101
// Either by versions or server timestamps - both could work.                       // 102
//                                                                                  // 103
// Conflicting overview:                                                            // 104
// We could cut it down to comparing two documents and keep / broadcast the         // 105
// winning document.                                                                // 106
//                                                                                  // 107
// conflictHandler = function(clientDoc, serverDoc) { return serverDoc; }           // 108
//                                                                                  // 109
//                                                                                  // 110
// There should be found a way of registrating deleted documents - eg. by having    // 111
// a flag set 'active' all nonactive documents should then be removed from          // 112
// published documents.                                                             // 113
//                                                                                  // 114
// This could be a standalone package since it would introduce conflict             // 115
// handling in generel                                                              // 116
//                                                                                  // 117
// Regz. RaiX                                                                       // 118
                                                                                    // 119
//////////////////////////////////////////////////////////////////////////////////////     // 128
                                                                                           // 129
}).call(this);                                                                             // 130
                                                                                           // 131
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:db'] = {
  Ground: Ground,
  GroundDB: GroundDB
};

})();

//# sourceMappingURL=ground_db.js.map
