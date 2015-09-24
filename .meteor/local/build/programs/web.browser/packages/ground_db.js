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
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var _groundUtil = Package['ground:util']._groundUtil;
var Ground = Package['ground:util'].Ground;
var ServerTime = Package['ground:servertime'].ServerTime;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var OneTimeout = Package['raix:onetimeout'].OneTimeout;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Kernel = Package['dispatch:kernel'].Kernel;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
var check = Package.check.check;
var Match = Package.check.Match;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var MiniMax = Package['ground:minimax'].MiniMax;
var Store = Package['ground:store'].Store;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var GroundDB, Ground;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/ground_db/packages/ground_db.js                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ground:db/groundDB.client.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/*                                                                                                                   // 1
               ______                           ______  ____                                                         // 2
              / ____/________  __  ______  ____/ / __ \/ __ )                                                        // 3
             / / __/ ___/ __ \/ / / / __ \/ __  / / / / __  |                                                        // 4
            / /_/ / /  / /_/ / /_/ / / / / /_/ / /_/ / /_/ /                                                         // 5
            \____/_/   \____/\__,_/_/ /_/\__,_/_____/_____/                                                          // 6
                                                                                                                     // 7
                                                                                                                     // 8
GroundDB is a thin layer providing Meteor offline database and methods                                               // 9
                                                                                                                     // 10
Concept, localstorage is simple wide spread but slow                                                                 // 11
                                                                                                                     // 12
GroundDB saves outstanding methods and minimongo into localstorage at window                                         // 13
unload, but can be configured to save at any changes and at certain interval(ms)                                     // 14
                                                                                                                     // 15
When the app loads GroundDB resumes methods and database changes                                                     // 16
                                                                                                                     // 17
Regz. RaiX                                                                                                           // 18
                                                                                                                     // 19
*/                                                                                                                   // 20
                                                                                                                     // 21
/* global Ground: true */                                                                                            // 22
/* global GroundDB: true */       // This global is deprecating */                                                   // 23
/* global MiniMax: false */       // ground:minimax */                                                               // 24
/* global _groundUtil: false */   // ground:util */                                                                  // 25
/* global OneTimeout: false */    // ground:util - use _.debounce instead */                                         // 26
/* global Store: false */         // ground:store */                                                                 // 27
/* global EventEmitter: false */  // raix:eventemitter */                                                            // 28
/* global Kernel: false */        // dispatch:kernel */                                                              // 29
                                                                                                                     // 30
///////////////////////////////// TEST BED /////////////////////////////////////                                     // 31
                                                                                                                     // 32
var test;                                                                                                            // 33
                                                                                                                     // 34
try {                                                                                                                // 35
  test = Package['ground:test'].GroundTest;                                                                          // 36
  console.warn('## IN TEST MODE');                                                                                   // 37
} catch(err) {                                                                                                       // 38
  // Production noop                                                                                                 // 39
  test = {                                                                                                           // 40
    log: function() {},                                                                                              // 41
    debug: function() {},                                                                                            // 42
    isMain: false                                                                                                    // 43
  };                                                                                                                 // 44
}                                                                                                                    // 45
                                                                                                                     // 46
//////////////////////////////// GROUND DATABASE ///////////////////////////////                                     // 47
                                                                                                                     // 48
// XXX: This usage of minimax could be extended to letting the user add more                                         // 49
// words to the dictionary - but its not without danger and should prop. trigger                                     // 50
// some warning if no migration scheme is setup...                                                                   // 51
var MiniMaxDB = new MiniMax({                                                                                        // 52
  // We add the most general words in databases                                                                      // 53
 dictionary: ['_id', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']                                             // 54
});                                                                                                                  // 55
                                                                                                                     // 56
var MiniMaxMethods = new MiniMax({                                                                                   // 57
  // We add the most general words in databases                                                                      // 58
  dictionary: ['method', 'args', 'options', 'wait', '_id']                                                           // 59
});                                                                                                                  // 60
                                                                                                                     // 61
// Status of app reload                                                                                              // 62
var _isReloading = false;                                                                                            // 63
                                                                                                                     // 64
// Add a pointer register of grounded databases                                                                      // 65
var _groundDatabases = {};                                                                                           // 66
                                                                                                                     // 67
var noop = function noop() {};                                                                                       // 68
                                                                                                                     // 69
// This function will add a emitter for the "changed" event                                                          // 70
var _addChangedEmitter = function _addChangedEmitter() {                                                             // 71
  var self = this;                                                                                                   // 72
  // Reactive deps for when data changes                                                                             // 73
  var _dataChanged = new Tracker.Dependency();                                                                       // 74
                                                                                                                     // 75
  var _changeData = function _changeData() { _dataChanged.changed(); };                                              // 76
                                                                                                                     // 77
  Tracker.autorun(function _changeDataAutorun() {                                                                    // 78
    // Depend on data change                                                                                         // 79
    _dataChanged.depend();                                                                                           // 80
    // Emit changed                                                                                                  // 81
    self.collection.emit('changed');                                                                                 // 82
  });                                                                                                                // 83
                                                                                                                     // 84
  // Observe all changes and rely on the less agressive observer system for                                          // 85
  // providing a reasonable update frequens                                                                          // 86
  self.collection.find().observe({                                                                                   // 87
    'added': _changeData,                                                                                            // 88
    'changed': _changeData,                                                                                          // 89
    'removed': _changeData                                                                                           // 90
  });                                                                                                                // 91
};                                                                                                                   // 92
                                                                                                                     // 93
// Clean up the local data and align to the subscription                                                             // 94
var _cleanUpLocalData = function _cleanUpLocalData() {                                                               // 95
  var self = this;                                                                                                   // 96
  // Flag marking if the local data is cleaned up to match the subscription                                          // 97
  self.isCleanedUp = false;                                                                                          // 98
                                                                                                                     // 99
  Tracker.autorun(function _cleanUpLocalDataAutorun(computation) {                                                   // 100
    if (Ground.ready() && !self.isCleanedUp) {                                                                       // 101
      // If all subscriptions have updated the system then remove all local only                                     // 102
      // data?                                                                                                       // 103
      // console.log('Clean up ' + self.name);                                                                       // 104
      self.isCleanedUp = true;                                                                                       // 105
      _removeLocalOnly.call(self);                                                                                   // 106
                                                                                                                     // 107
      // Stop this listener                                                                                          // 108
      computation.stop();                                                                                            // 109
    }                                                                                                                // 110
  });                                                                                                                // 111
};                                                                                                                   // 112
                                                                                                                     // 113
// Setup the syncronization of tabs                                                                                  // 114
var _setupTabSyncronizer = function _setupTabSyncronizer() {                                                         // 115
  var self = this;                                                                                                   // 116
  // We check to see if database sync is supported, if so we sync the database                                       // 117
  // if data has changed in other tabs                                                                               // 118
  if (typeof _syncDatabase === 'function') {                                                                         // 119
                                                                                                                     // 120
    // Listen for data changes                                                                                       // 121
    self.storage.addListener('storage', function _setupTabSyncronizerListener() {                                    // 122
                                                                                                                     // 123
      // Database changed in another tab - sync this db                                                              // 124
      _syncDatabase.call(self);                                                                                      // 125
                                                                                                                     // 126
    });                                                                                                              // 127
                                                                                                                     // 128
  }                                                                                                                  // 129
};                                                                                                                   // 130
                                                                                                                     // 131
// Rig the change listener and make sure to store the data to local storage                                          // 132
var _setupDataStorageOnChange = function _setupDataStorageOnChange() {                                               // 133
  var self = this;                                                                                                   // 134
                                                                                                                     // 135
  // Add listener, is triggered on data change                                                                       // 136
  self.collection.addListener('changed', function _setupDataStorageOnChangeListener() {                              // 137
                                                                                                                     // 138
    // Store the database in store when ever theres a change                                                         // 139
    // the _saveDatabase will throttle to optimize                                                                   // 140
    _saveDatabase.call(self);                                                                                        // 141
                                                                                                                     // 142
  });                                                                                                                // 143
};                                                                                                                   // 144
                                                                                                                     // 145
// This is the actual grounddb instance                                                                              // 146
var _groundDbConstructor = function _groundDbConstructor(collection, options) {                                      // 147
  var self = this;                                                                                                   // 148
                                                                                                                     // 149
  // Check if user used the "new" keyword                                                                            // 150
  if (!(self instanceof _groundDbConstructor)) {                                                                     // 151
    throw new Error('_groundDbConstructor expects the use of the "new" keyword');                                    // 152
  }                                                                                                                  // 153
                                                                                                                     // 154
  self.collection = collection;                                                                                      // 155
                                                                                                                     // 156
  // Set Ground.Collection prefix for localstorage                                                                   // 157
  var _prefix = options && options.prefix || '';                                                                     // 158
                                                                                                                     // 159
  // Set helper to connection                                                                                        // 160
  self.connection = collection._connection;                                                                          // 161
                                                                                                                     // 162
  // Set helper to minimongo collection                                                                              // 163
  self._collection = collection._collection;                                                                         // 164
                                                                                                                     // 165
  // Is this an offline client only database?                                                                        // 166
  self.offlineDatabase = (self.connection === null);                                                                 // 167
                                                                                                                     // 168
  // Initialize collection name                                                                                      // 169
  // XXX: Using null as a name is a problem - only one may be called null                                            // 170
  self.name = (collection._name)? collection._name : 'null';                                                         // 171
                                                                                                                     // 172
  /////// Finally got a name... and rigged                                                                           // 173
                                                                                                                     // 174
  // One timeout pointer for database saves                                                                          // 175
  self._saveDatabaseTimeout = new OneTimeout(200);                                                                   // 176
                                                                                                                     // 177
  // Rig resume for this collection                                                                                  // 178
  if (!self.offlineDatabase && options.resume !== false) {                                                           // 179
                                                                                                                     // 180
    Ground.methodResume([                                                                                            // 181
      '/' + self.name + '/insert',                                                                                   // 182
      '/' + self.name + '/remove',                                                                                   // 183
      '/' + self.name + '/update'                                                                                    // 184
    ], self.connection);                                                                                             // 185
                                                                                                                     // 186
  }                                                                                                                  // 187
                                                                                                                     // 188
  // Get the best storage available                                                                                  // 189
  self.storage = Store.create({                                                                                      // 190
    // We allow the user to set a prefix for the storage. Its mainly ment for                                        // 191
    // testing purposes, since the prefixing allows the tests to simulate more                                       // 192
    // complex scenarios                                                                                             // 193
    name: _prefix + self.name,                                                                                       // 194
    // Default version is 1.0 - if different from the one in storage record it                                       // 195
    // would trigger a migration                                                                                     // 196
    version: options.version || 1.1,                                                                                 // 197
    // migration can be set to overwrite the default behaviour on the storage.                                       // 198
    // the options.migration should be a function(oldRecord, newRecord)                                              // 199
    // one can compare the oldRecord.version and the new version to ensure                                           // 200
    // correct migration steps.                                                                                      // 201
    // That said the default behaviour simply clears the storage.                                                    // 202
    migration: options.migration                                                                                     // 203
  });                                                                                                                // 204
                                                                                                                     // 205
  // Rig an event handler on Meteor.Collection                                                                       // 206
  collection.eventemitter = new EventEmitter();                                                                      // 207
                                                                                                                     // 208
  // Add to pointer register                                                                                         // 209
  // XXX: should we throw an error if already found?                                                                 // 210
  // Store.create will prop. throw an error before...                                                                // 211
  _groundDatabases[ self.name ] = self;                                                                              // 212
                                                                                                                     // 213
  // We have to allow the minimongo collection to contain data before                                                // 214
  // subscriptions are ready                                                                                         // 215
  _hackMeteorUpdate.call(self);                                                                                      // 216
                                                                                                                     // 217
  // Flag true/false depending if database is loaded from local                                                      // 218
  self._databaseLoaded = false;                                                                                      // 219
                                                                                                                     // 220
  // Map local-only - this makes sure that localstorage matches remote loaded db                                     // 221
  self._localOnly = {};                                                                                              // 222
                                                                                                                     // 223
  // Clean up the database and align to subscription - we dont do this for                                           // 224
  // pure offline databases                                                                                          // 225
  if (options.cleanupLocalData && !self.offlineDatabase) {                                                           // 226
    _cleanUpLocalData.call(self);                                                                                    // 227
  }                                                                                                                  // 228
                                                                                                                     // 229
  // Add api for Clean up local only data                                                                            // 230
  self.collection.removeLocalOnly = function removeLocalOnly() {                                                     // 231
    self.isCleanedUp = true;                                                                                         // 232
    _removeLocalOnly.call(self);                                                                                     // 233
  };                                                                                                                 // 234
                                                                                                                     // 235
  self.collection.clear = function clear(callback) {                                                                 // 236
                                                                                                                     // 237
    if (typeof callback !== 'function') { callback = noop; }                                                         // 238
                                                                                                                     // 239
    // Clean storage                                                                                                 // 240
    self.storage.clear(callback);                                                                                    // 241
                                                                                                                     // 242
    // Empty collection                                                                                              // 243
    self._collection.remove({});                                                                                     // 244
    // // Set empty map                                                                                              // 245
    // _groundUtil.setDatabaseMap(self, {});                                                                         // 246
                                                                                                                     // 247
    // // Invalidate the database                                                                                    // 248
    // _groundUtil.invalidateDb(self);                                                                               // 249
  };                                                                                                                 // 250
                                                                                                                     // 251
  // Add the emitter of "changed" events                                                                             // 252
  _addChangedEmitter.call(self);                                                                                     // 253
                                                                                                                     // 254
  // The data changes should be stored in storage                                                                    // 255
  _setupDataStorageOnChange.call(self);                                                                              // 256
                                                                                                                     // 257
  // Load the database as soon as possible                                                                           // 258
  _loadDatabase.call(self);                                                                                          // 259
                                                                                                                     // 260
  // Add tab syncronizer                                                                                             // 261
  _setupTabSyncronizer.call(self);                                                                                   // 262
                                                                                                                     // 263
};                                                                                                                   // 264
                                                                                                                     // 265
// Global helper for applying grounddb on a collection                                                               // 266
Ground.Collection = function groundCollection(name, options) {                                                       // 267
  var self;                                                                                                          // 268
                                                                                                                     // 269
  // Inheritance Meteor Collection can be set by options.collection                                                  // 270
  // Accepts smart collections by Arunoda Susiripala                                                                 // 271
  // Check if user used the "new" keyword                                                                            // 272
                                                                                                                     // 273
                                                                                                                     // 274
  // Make sure we got some options                                                                                   // 275
  options = _.extend({                                                                                               // 276
    // By default local data is cleaned up when all subscriptions are ready                                          // 277
    // but thats not what we would do always                                                                         // 278
    cleanupLocalData: true                                                                                           // 279
  }, options);                                                                                                       // 280
                                                                                                                     // 281
  // Either name is a Meteor collection or we create a new Meteor collection                                         // 282
  if (name instanceof _groundUtil.Collection) {                                                                      // 283
    self = name;                                                                                                     // 284
  } else {                                                                                                           // 285
    self = new _groundUtil.Collection(name, options);                                                                // 286
  }                                                                                                                  // 287
                                                                                                                     // 288
  // Throw an error if something went wrong                                                                          // 289
  if (!(self instanceof _groundUtil.Collection)) {                                                                   // 290
    throw new Error('Ground.Collection expected a Mongo.Collection');                                                // 291
  }                                                                                                                  // 292
                                                                                                                     // 293
  // Add grounddb to the collection, circular reference since self is                                                // 294
  // grounddb.collection                                                                                             // 295
  self.grounddb = new _groundDbConstructor(self, options);                                                           // 296
                                                                                                                     // 297
  // Return grounded collection - We dont return this eg if it was an instance                                       // 298
  // of Ground.Collection                                                                                            // 299
  return self;                                                                                                       // 300
};                                                                                                                   // 301
                                                                                                                     // 302
////////////////////////////////////////////////////////////////////////////////                                     // 303
// Private Methods                                                                                                   // 304
////////////////////////////////////////////////////////////////////////////////                                     // 305
                                                                                                                     // 306
/*                                                                                                                   // 307
                                                                                                                     // 308
TODO: Implement conflict resoultion                                                                                  // 309
                                                                                                                     // 310
The _hackMeteorUpdate should be modified to resolve conflicts via default or                                         // 311
custom conflict handler.                                                                                             // 312
                                                                                                                     // 313
The first thing we have to do is to solve the "remove" operation - Its quite                                         // 314
tricky and there are a couple of patterns we could follow:                                                           // 315
                                                                                                                     // 316
1. Create a register for removed docs - but how long should we store this data?                                      // 317
2. Stop the real remove, add a removedAt serverStamp in an empty doc instead                                         // 318
3. Find a way to get a removedAt timestamp in another way                                                            // 319
                                                                                                                     // 320
So we cant trust that having the data at the server makes everything ok,                                             // 321
                                                                                                                     // 322
---                                                                                                                  // 323
The scenario or question to answer is:                                                                               // 324
                                                                                                                     // 325
clientA creates a document and goes offline                                                                          // 326
clientB removes the document                                                                                         // 327
after a day, a month or years?:                                                                                      // 328
clientA edits the document and goes online                                                                           // 329
                                                                                                                     // 330
So what should happen?                                                                                               // 331
---                                                                                                                  // 332
                                                                                                                     // 333
If we want the newest change to win, then the document should be restored                                            // 334
                                                                                                                     // 335
If clientA and clientB is the same user we would assume they kinda know what                                         // 336
they are doing, but if you edit the docuemnt after you removed it - it seems                                         // 337
like an user error removing the document.                                                                            // 338
                                                                                                                     // 339
But now time comes into play, if it was 6 month ago the user removed the document,                                   // 340
and now edits it offline then going online would still restore the document?                                         // 341
This raises the question of how long time should we store details about removed                                      // 342
documents... and where?                                                                                              // 343
                                                                                                                     // 344
Should destructive actions be comprimised, rather dont remove?                                                       // 345
                                                                                                                     // 346
Now if the user updates a document - should we try to merge the data, sometimes                                      // 347
yes, sometimes no.                                                                                                   // 348
                                                                                                                     // 349
Never the less - this is an example of the power a custom conflict handler                                           // 350
should have. So the task is to provide the tooling and data for the conflict                                         // 351
handlers.                                                                                                            // 352
                                                                                                                     // 353
A conflict handler is really a question about strategy, how the app should                                           // 354
act in the situation. This is why we are going to have the client-side do this                                       // 355
work - I mean we could have a strategy for letting the user decide what should                                       // 356
happen.                                                                                                              // 357
                                                                                                                     // 358
The conflict handler should be provided the localVersion and remoteVersion,                                          // 359
it should then return the winning result - might be in a callback allowing                                           // 360
sync + async behaviours?                                                                                             // 361
                                                                                                                     // 362
So this is focused on servertime stamps - but the interesting thing here could                                       // 363
also be the focus on versions instead. Much like OT and github does.                                                 // 364
                                                                                                                     // 365
But OT will prop. only make sense when all online?                                                                   // 366
                                                                                                                     // 367
---                                                                                                                  // 368
                                                                                                                     // 369
Should it be the server that handles conflicts? All the data is available there                                      // 370
we cant be sure about subscriptions + we could have OT records for each collection                                   // 371
Creating a conflict resoultion package could be isolated and would work on all                                       // 372
collections - grounded or not...                                                                                     // 373
                                                                                                                     // 374
We could wait until OT is supported in core?                                                                         // 375
                                                                                                                     // 376
*/                                                                                                                   // 377
var _hackMeteorUpdate = function _hackMeteorUpdate() {                                                               // 378
  var self = this;                                                                                                   // 379
                                                                                                                     // 380
  // Super container                                                                                                 // 381
  var _super;                                                                                                        // 382
                                                                                                                     // 383
  // Overwrite the store update                                                                                      // 384
  if (self.connection && self.connection._stores[ self.name ]) {                                                     // 385
    // Set super                                                                                                     // 386
    _super = self.connection._stores[ self.name ].update;                                                            // 387
    // Overwrite                                                                                                     // 388
    self.connection._stores[ self.name ].update = function groundUpdate(msg) {                                       // 389
      // console.log('GOT UPDATE');                                                                                  // 390
      var mongoId = msg.id && _groundUtil.idParse(msg.id);                                                           // 391
      var doc = msg.id && self._collection.findOne(mongoId);                                                         // 392
      // We check that local loaded docs are removed before remote sync                                              // 393
      // otherwise it would throw an error                                                                           // 394
        // When adding and doc allready found then we remove it                                                      // 395
      if (msg.msg === 'added' && doc) {                                                                              // 396
          // We mark the data as remotely loaded TODO:                                                               // 397
          delete self._localOnly[mongoId];                                                                           // 398
          // Solve the conflict - server wins                                                                        // 399
          // Then remove the client document                                                                         // 400
          self._collection.remove(mongoId);                                                                          // 401
      }                                                                                                              // 402
      // If message wants to remove the doc but allready removed locally then                                        // 403
      // fix this before calling super                                                                               // 404
      if (msg.msg === 'removed' && !doc) {                                                                           // 405
        self._collection.insert({_id: mongoId});                                                                     // 406
      }                                                                                                              // 407
      // Call super and let it do its thing                                                                          // 408
      _super(msg);                                                                                                   // 409
    };                                                                                                               // 410
  }                                                                                                                  // 411
};                                                                                                                   // 412
                                                                                                                     // 413
                                                                                                                     // 414
// We dont trust the localstorage so we make sure it doesn't contain                                                 // 415
// duplicated id's - primary a problem i FF                                                                          // 416
var _checkDocs = function _checkDocs(a) {                                                                            // 417
  var c = {};                                                                                                        // 418
  // // We create c as an object with no duplicate _id's                                                             // 419
  // for (var i = 0, keys = Object.keys(a); i < keys.length; i++) {                                                  // 420
  //   // Extract key/value                                                                                          // 421
  //   var key = keys[i];                                                                                            // 422
  //   var doc = a[key];                                                                                             // 423
  //   // set value in c                                                                                             // 424
  //   c[key] = doc;                                                                                                 // 425
  // }                                                                                                               // 426
                                                                                                                     // 427
  _groundUtil.each(a, function iterateDoc(doc, key) {                                                                // 428
    c[key] = doc;                                                                                                    // 429
  });                                                                                                                // 430
  return c;                                                                                                          // 431
};                                                                                                                   // 432
                                                                                                                     // 433
// At some point we can do a remove all local-only data? Making sure that we                                         // 434
// Only got the same data as the subscription                                                                        // 435
var _removeLocalOnly = function _removeLocalOnly() {                                                                 // 436
  var self = this;                                                                                                   // 437
                                                                                                                     // 438
  _groundUtil.each(self._localOnly, function _loadDatabaseEach(isLocalOnly, id) {                                    // 439
    if (isLocalOnly) {                                                                                               // 440
      self._collection.remove({ _id: id });                                                                          // 441
      delete self._localOnly[id];                                                                                    // 442
    }                                                                                                                // 443
  });                                                                                                                // 444
};                                                                                                                   // 445
                                                                                                                     // 446
// Bulk Load database from local to memory                                                                           // 447
var _loadDatabase = function _loadDatabase() {                                                                       // 448
  var self = this;                                                                                                   // 449
  // Then load the docs into minimongo                                                                               // 450
                                                                                                                     // 451
  // Emit event                                                                                                      // 452
  self.collection.emit('resume', { type: 'database' });                                                              // 453
  Ground.emit('resume', { type: 'database', collection: self.name });                                                // 454
                                                                                                                     // 455
  // Load object from localstorage                                                                                   // 456
  self.storage.getItem('data', function storageGetItem(err, data) {                                                  // 457
    if (!err) {                                                                                                      // 458
                                                                                                                     // 459
      self.collection.emit('resumed', { type: 'database', data: data });                                             // 460
      Ground.emit('resumed', { type: 'database', collection: self.name });                                           // 461
                                                                                                                     // 462
      // Maxify the data                                                                                             // 463
      var docs = data && MiniMaxDB.maxify(data) || {};                                                               // 464
                                                                                                                     // 465
      // Initialize client documents                                                                                 // 466
      Kernel                                                                                                         // 467
      .each(_checkDocs.call(self, docs || {} ), function kernelEach(doc) {                                           // 468
        // Test if document allready exists, this is a rare case but accounts                                        // 469
        // sometimes adds data to the users database, eg. if "users" are grounded                                    // 470
        var exists = self._collection.findOne(doc._id);                                                              // 471
        // If collection is populated before we get started then the data in                                         // 472
        // memory would be considered latest therefor we dont load from local                                        // 473
        if (!exists) {                                                                                               // 474
          if (!self.offlineDatabase) {                                                                               // 475
            // If online database then mark the doc as local only TODO:                                              // 476
            self._localOnly[doc._id] = true;                                                                         // 477
          }                                                                                                          // 478
          self._collection.insert(doc);                                                                              // 479
        }                                                                                                            // 480
      })                                                                                                             // 481
      .then(function afterKernelEach() {                                                                             // 482
        // Setting database loaded, this allows minimongo to be saved into local                                     // 483
        self._databaseLoaded = true;                                                                                 // 484
      });                                                                                                            // 485
                                                                                                                     // 486
    }                                                                                                                // 487
                                                                                                                     // 488
  });                                                                                                                // 489
};                                                                                                                   // 490
                                                                                                                     // 491
// Bulk Save database from memory to local, meant to be as slim, fast and                                            // 492
// realiable as possible                                                                                             // 493
var _saveDatabase = function _saveDatabase() {                                                                       // 494
  var self = this;                                                                                                   // 495
  // If data loaded from localstorage then its ok to save - otherwise we                                             // 496
  // would override with less data                                                                                   // 497
  if (self._databaseLoaded && _isReloading === false) {                                                              // 498
    self._saveDatabaseTimeout(function _saveDatabaseTimeout() {                                                      // 499
      // We delay the operation a bit in case of multiple saves - this creates                                       // 500
      // a minor lag in terms of localstorage updating but it limits the num                                         // 501
      // of saves to the database                                                                                    // 502
      // Make sure our database is loaded                                                                            // 503
      self.collection.emit('cache', { type: 'database' });                                                           // 504
      Ground.emit('cache', { type: 'database', collection: self.name });                                             // 505
      var minifiedDb = MiniMaxDB.minify(_groundUtil.getDatabaseMap(self));                                           // 506
      // Save the collection into localstorage                                                                       // 507
      self.storage.setItem('data', minifiedDb, function storageCache(err) {                                          // 508
        // Emit feedback                                                                                             // 509
        if (err) {                                                                                                   // 510
          // Emit error                                                                                              // 511
          self.collection.emit('error', { error: err });                                                             // 512
          Ground.emit('error', { collection: self.name, error: err });                                               // 513
        } else {                                                                                                     // 514
          // Emit cached event                                                                                       // 515
          self.collection.emit('cached', { type: 'database', data: minifiedDb });                                    // 516
          Ground.emit('cached', { type: 'database', collection: self.name });                                        // 517
        }                                                                                                            // 518
      });                                                                                                            // 519
                                                                                                                     // 520
    });                                                                                                              // 521
  }                                                                                                                  // 522
};                                                                                                                   // 523
                                                                                                                     // 524
                                                                                                                     // 525
// Reactive variable containing a boolean flag, true == all subscriptions have                                       // 526
// been loaded                                                                                                       // 527
// XXX: this should be a bit more finegrained eg. pr. collection, but thats not                                      // 528
// possible yet                                                                                                      // 529
Ground.ready = _groundUtil.allSubscriptionsReady;                                                                    // 530
                                                                                                                     // 531
Ground.lookup = function groundLookup(collectionName) {                                                              // 532
  return _groundDatabases[collectionName];                                                                           // 533
};                                                                                                                   // 534
                                                                                                                     // 535
var _allowMethodResumeMap = {};                                                                                      // 536
var _methodResumeConnections = [];                                                                                   // 537
                                                                                                                     // 538
var addConnectionToResume = function addConnectionToResume(connection) {                                             // 539
  if (_methodResumeConnections.indexOf(connection) < 0) {                                                            // 540
    _methodResumeConnections.push(connection);                                                                       // 541
  }                                                                                                                  // 542
};                                                                                                                   // 543
                                                                                                                     // 544
Ground.methodResume = function methodResume(names, connection) {                                                     // 545
  // Allow string or array of strings                                                                                // 546
  if (names === ''+names) {                                                                                          // 547
    names = [names];                                                                                                 // 548
  }                                                                                                                  // 549
                                                                                                                     // 550
  // Default to the default connection...                                                                            // 551
  connection = connection || _groundUtil.connection;                                                                 // 552
                                                                                                                     // 553
  // This index comes in handy when we use getMethodList                                                             // 554
  addConnectionToResume(connection);                                                                                 // 555
                                                                                                                     // 556
  // Add methods to resume                                                                                           // 557
  _groundUtil.each(names, function(name) {                                                                           // 558
    _allowMethodResumeMap[name] = connection;                                                                        // 559
  });                                                                                                                // 560
  // console.log(_allowMethodResumeMap);                                                                             // 561
};                                                                                                                   // 562
                                                                                                                     // 563
// Add settings for methods to skip or not when caching methods                                                      // 564
Ground.skipMethods = function skipMethods() {                                                                        // 565
  throw new Error('Ground.skipMethods is deprecated, use Ground.methodResume instead');                              // 566
};                                                                                                                   // 567
                                                                                                                     // 568
Ground.OneTimeout = OneTimeout;                                                                                      // 569
                                                                                                                     // 570
///////////////////////////// RESUME METHODS ///////////////////////////////////                                     // 571
                                                                                                                     // 572
// Is methods resumed?                                                                                               // 573
var _methodsResumed = false;                                                                                         // 574
var _methodsResumedDeps = new Tracker.Dependency();                                                                  // 575
                                                                                                                     // 576
                                                                                                                     // 577
Ground.isResumed = function isResumed() {                                                                            // 578
  _methodsResumedDeps.depend();                                                                                      // 579
  return _methodsResumed;                                                                                            // 580
};                                                                                                                   // 581
                                                                                                                     // 582
// Get a nice array of current methods                                                                               // 583
var _getMethodsList = function _getMethodsList() {                                                                   // 584
  // Array of outstanding methods                                                                                    // 585
  var methods = [];                                                                                                  // 586
  // Made a public API to disallow caching of some method calls                                                      // 587
  // Convert the data into nice array                                                                                // 588
                                                                                                                     // 589
  // We iterate over the connections that have resumable methods                                                     // 590
  _groundUtil.each(_methodResumeConnections, function resumeEachConnection(connection) {                             // 591
    // We run through the method invokers                                                                            // 592
    _groundUtil.each(connection._methodInvokers, function resumeEachInvoker(method) {                                // 593
      // Get the method name                                                                                         // 594
      var name = method._message.method;                                                                             // 595
      // Check that this method is resumeable and on the correct connection                                          // 596
      if (_allowMethodResumeMap[name] === connection) {                                                              // 597
        // Push the method                                                                                           // 598
        methods.push({                                                                                               // 599
          // Format the data                                                                                         // 600
          method: name,                                                                                              // 601
          args: method._message.params,                                                                              // 602
          options: { wait: method._wait }                                                                            // 603
        });                                                                                                          // 604
                                                                                                                     // 605
      }                                                                                                              // 606
                                                                                                                     // 607
    });                                                                                                              // 608
  });                                                                                                                // 609
                                                                                                                     // 610
  return methods;                                                                                                    // 611
};                                                                                                                   // 612
                                                                                                                     // 613
// Flush in memory methods, its a dirty trick and could have some edge cases                                         // 614
// that would throw an error? Eg. if flushed in the middle of waiting for                                            // 615
// a method call to return - the returning call would not be able to find the                                        // 616
// method callback. This could happen if the user submits a change in one window                                     // 617
// and then switches to another tab and submits a change there before the first                                      // 618
// method gets back?                                                                                                 // 619
var _flushInMemoryMethods = function _flushInMemoryMethods() {                                                       // 620
  var didFlushSome = false;                                                                                          // 621
  // TODO: flush should be rewritten to - we should do method proxy stuff...                                         // 622
  // This code is a bit dirty                                                                                        // 623
  if (_groundUtil.connection && _groundUtil.connection._outstandingMethodBlocks &&                                   // 624
          _groundUtil.connection._outstandingMethodBlocks.length) {                                                  // 625
                                                                                                                     // 626
    // Clear the in memory outstanding methods TODO: Check if this is enough                                         // 627
    // Check to see if we should skip methods                                                                        // 628
    for (var i = 0; i < _groundUtil.connection._outstandingMethodBlocks.length; i++) {                               // 629
      var method = _groundUtil.connection._outstandingMethodBlocks[i];                                               // 630
      if (method && method._message && _allowMethodResumeMap[method._message.method]) {                              // 631
        // Clear invoke callbacks                                                                                    // 632
//    _groundUtil.connection._outstandingMethodBlocks = [];                                                          // 633
        delete _groundUtil.connection._outstandingMethodBlocks[i];                                                   // 634
//    _groundUtil.connection._methodInvokers = {};                                                                   // 635
        delete _groundUtil.connection._methodInvokers[i];                                                            // 636
        // Set the flag to call back                                                                                 // 637
        didFlushSome = true;                                                                                         // 638
      }                                                                                                              // 639
    }                                                                                                                // 640
    if (didFlushSome) {                                                                                              // 641
      // Call the event callback                                                                                     // 642
      Ground.emit('flush', { type: 'methods' });                                                                     // 643
    }                                                                                                                // 644
                                                                                                                     // 645
  }                                                                                                                  // 646
};                                                                                                                   // 647
                                                                                                                     // 648
// Extract only newly added methods from localstorage                                                                // 649
var _getMethodUpdates = function _getMethodUpdates(newMethods) {                                                     // 650
  var result = [];                                                                                                   // 651
  if (newMethods && newMethods.length > 0) {                                                                         // 652
    // Get the old methods allready in memory                                                                        // 653
    // We could have done an optimized slice version or just starting at                                             // 654
    // oldMethods.length, but this tab is not in focus                                                               // 655
    var oldMethods = _getMethodsList();                                                                              // 656
    // We do a check to see if we should flush our in memory methods if allready                                     // 657
    // run on an other tab - an odd case - the first item would not match in                                         // 658
    // old methods and new methods, its only valid to make this test if both                                         // 659
    // methods arrays are not empty allready                                                                         // 660
    if (oldMethods.length &&                                                                                         // 661
            EJSON.stringify(oldMethods[0]) !== EJSON.stringify(newMethods[0])) {                                     // 662
      // Flush the in memory / queue methods                                                                         // 663
      _flushInMemoryMethods();                                                                                       // 664
      // We reset the oldMethods array of outstanding methods                                                        // 665
      oldMethods = [];                                                                                               // 666
    }                                                                                                                // 667
    // Iterate over the new methods, old ones should be ordered in beginning of                                      // 668
    // newMethods we do a simple test an throw an error if thats not the case                                        // 669
    for (var i=0; i < newMethods.length; i++) {                                                                      // 670
                                                                                                                     // 671
      if (i < oldMethods.length) {                                                                                   // 672
        // Do a hard slow test to make sure all is in sync                                                           // 673
        if (EJSON.stringify(oldMethods[i]) !== EJSON.stringify(newMethods[i])) {                                     // 674
          // The client data is corrupted, throw error or force the client to                                        // 675
          // reload, does not make sense to continue?                                                                // 676
          throw new Error('The method database is corrupted or out of sync at position: ' + i);                      // 677
        }                                                                                                            // 678
      } else {                                                                                                       // 679
        // Ok out of oldMethods this is a new method call                                                            // 680
        result.push(newMethods[i]);                                                                                  // 681
                                                                                                                     // 682
        Ground.emit('methodcall', newMethods[i]);                                                                    // 683
      }                                                                                                              // 684
    } // EO for iteration                                                                                            // 685
                                                                                                                     // 686
  } else {                                                                                                           // 687
    // If new methods are empty this means that the other client / tap has                                           // 688
    // Allready sendt and recieved the method calls - so we flush our in mem                                         // 689
    // Flush the in memory / queue methods                                                                           // 690
    _flushInMemoryMethods();                                                                                         // 691
  }                                                                                                                  // 692
                                                                                                                     // 693
  // return the result                                                                                               // 694
  return result;                                                                                                     // 695
};                                                                                                                   // 696
                                                                                                                     // 697
///////////////////////////// LOAD & SAVE METHODS //////////////////////////////                                     // 698
// Create the storage for methods                                                                                    // 699
var _methodsStorage = Store.create({                                                                                 // 700
  name: '_methods_',                                                                                                 // 701
  version: 1.1                                                                                                       // 702
});                                                                                                                  // 703
                                                                                                                     // 704
var _sendMethod = function _sendMethod(method, connection) {                                                         // 705
  // Send a log message first to the test                                                                            // 706
  test.log('SEND', JSON.stringify(method));                                                                          // 707
                                                                                                                     // 708
  if (test.isMain) {                                                                                                 // 709
    console.warn('Main test should not send methods...');                                                            // 710
  }                                                                                                                  // 711
                                                                                                                     // 712
  connection.apply(                                                                                                  // 713
    method.method, method.args, method.options, function resumeMethodCallback(err, result) {                         // 714
      // We cant fix the missing callbacks made at runtime the                                                       // 715
      // last time the app ran. But we can emit data                                                                 // 716
                                                                                                                     // 717
      if (err) {                                                                                                     // 718
        test.log('RETURNED ERROR', JSON.stringify(method), err.message);                                             // 719
      } else {                                                                                                       // 720
        test.log('RETURNED METHOD', JSON.stringify(method));                                                         // 721
      }                                                                                                              // 722
                                                                                                                     // 723
      // Emit the data we got back here                                                                              // 724
      Ground.emit('method', { method: method, error: err, result: result });                                         // 725
    }                                                                                                                // 726
  );                                                                                                                 // 727
};                                                                                                                   // 728
                                                                                                                     // 729
var waitingMethods = [];                                                                                             // 730
                                                                                                                     // 731
// We may end in a situation where things have changed eg. if collections are                                        // 732
// renamed or left out in the app. We make sure that ground db will try 5 time                                       // 733
// times and then have the missing methods die.                                                                      // 734
// The correct thing in the future would prop. be to have the conflict resolution                                    // 735
// create patch calls instead of resume.                                                                             // 736
var resumeAttemptsLeft = 5;                                                                                          // 737
                                                                                                                     // 738
var resumeWaitingMethods = function resumeWaitingMethods() {                                                         // 739
  var missing = [];                                                                                                  // 740
                                                                                                                     // 741
  resumeAttemptsLeft--;                                                                                              // 742
                                                                                                                     // 743
  // Resume each method                                                                                              // 744
  _groundUtil.each(waitingMethods, function eachWaitingMethods(method) {                                             // 745
    if (method) {                                                                                                    // 746
                                                                                                                     // 747
      // name helper for the method                                                                                  // 748
      var name = method.method;                                                                                      // 749
                                                                                                                     // 750
      if (name) {                                                                                                    // 751
                                                                                                                     // 752
        test.log('RESUME', 'Load method "' + name + '"');                                                            // 753
        // Get the connection from the allow method resume                                                           // 754
        var methodConnection = _allowMethodResumeMap[name];                                                          // 755
        // Run it in fenced mode since the changes have already been applied                                         // 756
        // locally                                                                                                   // 757
        if (methodConnection) {                                                                                      // 758
                                                                                                                     // 759
          _groundUtil.connection.stubFence(name, function runFencedMethod() {                                        // 760
            // Add method to connection                                                                              // 761
            _sendMethod(method, methodConnection);                                                                   // 762
          });                                                                                                        // 763
                                                                                                                     // 764
        } else {                                                                                                     // 765
          // XXX: make sure we keep order                                                                            // 766
          // TODO: Check if we should use push or unshift                                                            // 767
          missing.push(method);                                                                                      // 768
          test.log('RESUME', 'Missing method "' + name + '" - retry later');                                         // 769
          console.warn('Ground method resume: Cannot resume "' + name + '" connection not rigged yet, retry later'); // 770
        }                                                                                                            // 771
                                                                                                                     // 772
      }                                                                                                              // 773
                                                                                                                     // 774
    }                                                                                                                // 775
  });                                                                                                                // 776
                                                                                                                     // 777
  // Keep track of missing methods                                                                                   // 778
  waitingMethods = missing;                                                                                          // 779
                                                                                                                     // 780
  // If no waiting methods - then we must be done?                                                                   // 781
  if (!_methodsResumed && !waitingMethods.length || !resumeAttemptsLeft) {                                           // 782
    // Methods have resumed                                                                                          // 783
    _methodsResumed = true;                                                                                          // 784
    _methodsResumedDeps.changed();                                                                                   // 785
  }                                                                                                                  // 786
                                                                                                                     // 787
};                                                                                                                   // 788
                                                                                                                     // 789
                                                                                                                     // 790
var loadMissingMethods = function loadMissingMethods(callback) {                                                     // 791
  _methodsStorage.getItem('methods', function storageLoadMissingMethods(err, data) {                                 // 792
    test.log('RESUME', 'methods loaded into memory');                                                                // 793
    if (err) {                                                                                                       // 794
      // XXX:                                                                                                        // 795
      callback(err);                                                                                                 // 796
    } else if (data) {                                                                                               // 797
      // Maxify the data from storage                                                                                // 798
      // We are only going to submit the diff                                                                        // 799
      // Set missing methods                                                                                         // 800
      waitingMethods = _getMethodUpdates(MiniMaxMethods.maxify(data));                                               // 801
    }                                                                                                                // 802
                                                                                                                     // 803
    callback();                                                                                                      // 804
  });                                                                                                                // 805
};                                                                                                                   // 806
                                                                                                                     // 807
// load methods from localstorage and resume the methods                                                             // 808
var _loadMethods = function _loadMethods() {                                                                         // 809
                                                                                                                     // 810
  loadMissingMethods(function loadMissingMethods(err) {                                                              // 811
    if (err) {                                                                                                       // 812
      test.log('RESUME', 'Could not load missing methods into memory', err);                                         // 813
    } else {                                                                                                         // 814
                                                                                                                     // 815
      // Try to resume missing methods now                                                                           // 816
      resumeWaitingMethods();                                                                                        // 817
                                                                                                                     // 818
      // If not all methods are resumed then try until success                                                       // 819
      if (!_methodsResumed) {                                                                                        // 820
                                                                                                                     // 821
        var interval = Meteor.setInterval(function loadMissingMethodsInterval() {                                    // 822
          // Try to resume missing methods                                                                           // 823
          resumeWaitingMethods();                                                                                    // 824
                                                                                                                     // 825
          // If methods are resumed then stop this                                                                   // 826
          if (_methodsResumed) {                                                                                     // 827
            Meteor.clearInterval(interval);                                                                          // 828
          }                                                                                                          // 829
        }, 1000);                                                                                                    // 830
                                                                                                                     // 831
      }                                                                                                              // 832
                                                                                                                     // 833
    }                                                                                                                // 834
  });                                                                                                                // 835
                                                                                                                     // 836
}; // EO load methods                                                                                                // 837
                                                                                                                     // 838
// Save the methods into the localstorage                                                                            // 839
var _saveMethods = function _saveMethods() {                                                                         // 840
  if (_methodsResumed) {                                                                                             // 841
                                                                                                                     // 842
    // Ok memory is initialized                                                                                      // 843
    Ground.emit('cache', { type: 'methods' });                                                                       // 844
                                                                                                                     // 845
    // Save outstanding methods to localstorage                                                                      // 846
    var methods = _getMethodsList();                                                                                 // 847
//test.log('SAVE METHODS', JSON.stringify(methods));                                                                 // 848
    _methodsStorage.setItem('methods', MiniMaxMethods.minify(methods), function storage_saveMethods() {              // 849
      // XXX:                                                                                                        // 850
    });                                                                                                              // 851
                                                                                                                     // 852
  }                                                                                                                  // 853
};                                                                                                                   // 854
                                                                                                                     // 855
//////////////////////////// STARTUP METHODS RESUME ////////////////////////////                                     // 856
                                                                                                                     // 857
Meteor.startup(function startupMethodResume() {                                                                      // 858
  // Wait some not to conflict with accouts login                                                                    // 859
  // TODO: Do we have a better way, instead of depending on time should depend                                       // 860
  // on en event.                                                                                                    // 861
  Meteor.setTimeout(function loadMethods() {                                                                         // 862
    test.log('INIT LOAD METHODS');                                                                                   // 863
    _loadMethods();                                                                                                  // 864
  }, 500);                                                                                                           // 865
});                                                                                                                  // 866
                                                                                                                     // 867
/////////////////////////// SYNC TABS METHODS DATABSE //////////////////////////                                     // 868
                                                                                                                     // 869
var syncDatabaseTimeout = new OneTimeout(150);                                                                       // 870
                                                                                                                     // 871
// Offline client only databases will sync a bit different than normal                                               // 872
// This function is a bit hard - but it works - optimal solution could be to                                         // 873
// have virtual method calls it would complicate things                                                              // 874
var _syncDatabase = function _syncDatabase() {                                                                       // 875
  var self = this;                                                                                                   // 876
  // We set a small delay in case of more updates within the wait                                                    // 877
  syncDatabaseTimeout(function syncDatabaseTimeout() {                                                               // 878
//    if (self && (self.offlineDatabase === true || !Meteor.status().connected)) {                                   // 879
    if (self) {                                                                                                      // 880
      // Add event hook                                                                                              // 881
      self.collection.emit('sync');                                                                                  // 882
      Ground.emit('sync', { type: 'database', collection: self.name });                                              // 883
      // Hard reset database?                                                                                        // 884
      self.storage.getItem('data', function storageSyncFetch(err, data) {                                            // 885
        if (err) {                                                                                                   // 886
          //                                                                                                         // 887
          throw err;                                                                                                 // 888
        } else {                                                                                                     // 889
          // Get the data back in size                                                                               // 890
          var newDocs = MiniMaxDB.maxify(data) || {};                                                                // 891
                                                                                                                     // 892
          self.collection.find().forEach(function storageSyncFetchEach(doc) {                                        // 893
            // Remove document                                                                                       // 894
            self._collection.remove(doc._id);                                                                        // 895
            // If found in new documents then hard update                                                            // 896
            if (typeof newDocs[doc._id] !== 'undefined') {                                                           // 897
              // Update doc                                                                                          // 898
              self._collection.insert(newDocs[doc._id]);                                                             // 899
              delete newDocs[doc._id];                                                                               // 900
            }                                                                                                        // 901
          });                                                                                                        // 902
                                                                                                                     // 903
          _groundUtil.each(newDocs, function storageSyncFetchEachNew(doc) {                                          // 904
            // insert doc                                                                                            // 905
            self._collection.insert(doc);                                                                            // 906
          });                                                                                                        // 907
                                                                                                                     // 908
        }                                                                                                            // 909
      });                                                                                                            // 910
                                                                                                                     // 911
    }                                                                                                                // 912
  });                                                                                                                // 913
};                                                                                                                   // 914
                                                                                                                     // 915
var syncMethodsTimeout = new OneTimeout(500);                                                                        // 916
                                                                                                                     // 917
// Syncronize tabs via method calls                                                                                  // 918
var _syncMethods = function _syncMethods() {                                                                         // 919
  // We are going to into reload, stop all access to localstorage                                                    // 920
  _isReloading = true;                                                                                               // 921
  // We are not master and the user is working on another tab, we are not in                                         // 922
  // a hurry to spam the browser with work, plus there are typically acouple                                         // 923
  // of db access required in most operations, we wait a sec?                                                        // 924
  syncMethodsTimeout(function _syncMethodsTimeout() {                                                                // 925
    // Add event hook                                                                                                // 926
    Ground.emit('sync', { type: 'methods' });                                                                        // 927
    // Load the offline data into our memory                                                                         // 928
    _groundUtil.each(_groundDatabases, function syncMethodsTimeoutEach(collection, name) {                           // 929
      test.log('SYNC DB', name);                                                                                     // 930
      _loadDatabase.call(collection);                                                                                // 931
    });                                                                                                              // 932
    // Resume methods                                                                                                // 933
    test.log('SYNC METHODS');                                                                                        // 934
    _loadMethods();                                                                                                  // 935
    // Resume normal writes                                                                                          // 936
    _isReloading = false;                                                                                            // 937
  });                                                                                                                // 938
};                                                                                                                   // 939
                                                                                                                     // 940
/////////////////////// ADD TRIGGERS IN LIVEDATACONNECTION /////////////////////                                     // 941
                                                                                                                     // 942
if (!test.isMain) {                                                                                                  // 943
                                                                                                                     // 944
  // Add hooks method hooks                                                                                          // 945
  // We need to know when methods are added and when they have returned                                              // 946
                                                                                                                     // 947
  var _superApply = _groundUtil.Connection.prototype.apply;                                                          // 948
  var _superOutstandingMethodFinished = _groundUtil.Connection.prototype._outstandingMethodFinished;                 // 949
                                                                                                                     // 950
  _groundUtil.Connection.prototype.apply = function applyHook(name /* , args, options, callback */) {                // 951
    // Intercept grounded databases                                                                                  // 952
    if (_allowMethodResumeMap[name]) {                                                                               // 953
      test.debug('APPLY', JSON.stringify(_groundUtil.toArray(arguments)));                                           // 954
    }                                                                                                                // 955
    // Call super                                                                                                    // 956
    var result = _superApply.apply(this, _groundUtil.toArray(arguments));                                            // 957
    // Save methods                                                                                                  // 958
    if (_allowMethodResumeMap[name]) {                                                                               // 959
      _saveMethods();                                                                                                // 960
    }                                                                                                                // 961
    // return the result                                                                                             // 962
    return result;                                                                                                   // 963
  };                                                                                                                 // 964
                                                                                                                     // 965
  _groundUtil.Connection.prototype._outstandingMethodFinished = function _outstandingMethodFinished() {              // 966
      // Call super                                                                                                  // 967
      _superOutstandingMethodFinished.apply(this);                                                                   // 968
      // We save current status of methods                                                                           // 969
      _saveMethods();                                                                                                // 970
      // _outstandingMethodFinished dont return anything                                                             // 971
    };                                                                                                               // 972
                                                                                                                     // 973
}                                                                                                                    // 974
                                                                                                                     // 975
/////////////////////// LOAD CHANGES FROM OTHER TABS ///////////////////////////                                     // 976
                                                                                                                     // 977
// The main test mode should not interfere with tab sync                                                             // 978
if (!test.isMain) {                                                                                                  // 979
                                                                                                                     // 980
  // Sync Methods if changed                                                                                         // 981
  _methodsStorage.addListener('storage', function storageEventListener() {                                           // 982
    // Method calls are delayed a bit for optimization                                                               // 983
    _syncMethods('mehods');                                                                                          // 984
                                                                                                                     // 985
  });                                                                                                                // 986
                                                                                                                     // 987
}                                                                                                                    // 988
                                                                                                                     // 989
////////////////////////// ADD DEPRECATION NOTICE //////////////////////////////                                     // 990
if (typeof GroundDB === 'undefined') {                                                                               // 991
  GroundDB = function deprecatedGroundDB(name, options) {                                                            // 992
    // Deprecation notice                                                                                            // 993
    console.warn('The GroundDB scope is deprecating!! Use Ground.Collection instead');                               // 994
    return new Ground.Collection(name, options);                                                                     // 995
  };                                                                                                                 // 996
}                                                                                                                    // 997
                                                                                                                     // 998
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1008
}).call(this);                                                       // 1009
                                                                     // 1010
                                                                     // 1011
                                                                     // 1012
                                                                     // 1013
                                                                     // 1014
                                                                     // 1015
(function () {                                                       // 1016
                                                                     // 1017
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ground:db/wrap.collection.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//////////////////////////////////////////////////////////////////////////////                                       // 1
// WRAP MONGO COLLECTION API on prototype                                                                            // 2
//////////////////////////////////////////////////////////////////////////////                                       // 3
                                                                                                                     // 4
// Why do we need to overwrite the default insert function?                                                          // 5
//                                                                                                                   // 6
// We set _id manually if not already set, this is due to the "optimization"                                         // 7
// added in Meteor and the fact that we cant rely on connection or method                                            // 8
// invocations in grounddb:                                                                                          // 9
// "Don't generate the id if we're the client and the 'outermost' call                                               // 10
//  This optimization saves us passing both the randomSeed and the id                                                // 11
//  Passing both is redundant."                                                                                      // 12
//  // Mongo->collection.js                                                                                          // 13
                                                                                                                     // 14
// XXX: This is a bit strange - its the only way of making sure the _id is                                           // 15
// sent to the server. We want the id to the server if we are doing offline                                          // 16
// resume - grounddb cannot regenerate the invocation callbacks if browser                                           // 17
// was closed.                                                                                                       // 18
                                                                                                                     // 19
var _super = _groundUtil.Collection.prototype.insert;                                                                // 20
                                                                                                                     // 21
// Overwrite insert                                                                                                  // 22
_groundUtil.Collection.prototype.insert = function(/* arguments */) {                                                // 23
  /*************************************************************************                                         // 24
   *  This function is overwritten by GroundDB - Sorry! but we need an _id *                                         // 25
   *************************************************************************/                                        // 26
                                                                                                                     // 27
  // Convert arguments object into real array                                                                        // 28
  var args = _.toArray(arguments);                                                                                   // 29
                                                                                                                     // 30
  // Only make sure _id is set if grounddb is mounted                                                                // 31
  if (this.grounddb)                                                                                                 // 32
    args[0]._id = args[0]._id || this._makeNewID();                                                                  // 33
                                                                                                                     // 34
  // Call super                                                                                                      // 35
  return _super.apply(this, args);                                                                                   // 36
};                                                                                                                   // 37
                                                                                                                     // 38
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1063
}).call(this);                                                       // 1064
                                                                     // 1065
                                                                     // 1066
                                                                     // 1067
                                                                     // 1068
                                                                     // 1069
                                                                     // 1070
(function () {                                                       // 1071
                                                                     // 1072
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ground:db/wrap.eventemitter.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//////////////////////////////////////////////////////////////////////////////                                       // 1
// WRAP EVENTEMITTER API on Ground                                                                                   // 2
//////////////////////////////////////////////////////////////////////////////                                       // 3
                                                                                                                     // 4
// Add a top level event emitter                                                                                     // 5
Ground.eventemitter = new EventEmitter();                                                                            // 6
                                                                                                                     // 7
// Wrap the Event Emitter Api "on"                                                                                   // 8
Ground.on = function(/* arguments */) {                                                                              // 9
  Ground.eventemitter.on.apply(Ground.eventemitter, _.toArray(arguments));                                           // 10
};                                                                                                                   // 11
                                                                                                                     // 12
// Wrap the Event Emitter Api "once"                                                                                 // 13
Ground.once = function(/* arguments */) {                                                                            // 14
  Ground.eventemitter.once.apply(Ground.eventemitter, _.toArray(arguments));                                         // 15
};                                                                                                                   // 16
                                                                                                                     // 17
// Wrap the Event Emitter Api "off"                                                                                  // 18
Ground.off = function(/* arguments */) {                                                                             // 19
  Ground.eventemitter.off.apply(Ground.eventemitter, _.toArray(arguments));                                          // 20
};                                                                                                                   // 21
                                                                                                                     // 22
// Wrap the Event Emitter Api "emit"                                                                                 // 23
Ground.emit = function(/* arguments */) {                                                                            // 24
  Ground.eventemitter.emit.apply(Ground.eventemitter, _.toArray(arguments));                                         // 25
};                                                                                                                   // 26
                                                                                                                     // 27
                                                                                                                     // 28
// Add api helpers                                                                                                   // 29
Ground.addListener = Ground.on;                                                                                      // 30
Ground.removeListener = Ground.off;                                                                                  // 31
Ground.removeAllListeners = Ground.off;                                                                              // 32
                                                                                                                     // 33
// Add jquery like helpers                                                                                           // 34
Ground.one = Ground.once;                                                                                            // 35
Ground.trigger = Ground.emit;                                                                                        // 36
                                                                                                                     // 37
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1117
}).call(this);                                                       // 1118
                                                                     // 1119
                                                                     // 1120
                                                                     // 1121
                                                                     // 1122
                                                                     // 1123
                                                                     // 1124
(function () {                                                       // 1125
                                                                     // 1126
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ground:db/wrap.proto.eventemitter.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//////////////////////////////////////////////////////////////////////////////                                       // 1
// WRAP EVENTEMITTER API on prototype                                                                                // 2
//////////////////////////////////////////////////////////////////////////////                                       // 3
                                                                                                                     // 4
// Wrap the Event Emitter Api "on"                                                                                   // 5
_groundUtil.Collection.prototype.on = function(/* arguments */) {                                                    // 6
  return this.eventemitter.on.apply(this.eventemitter, _.toArray(arguments));                                        // 7
};                                                                                                                   // 8
                                                                                                                     // 9
// Wrap the Event Emitter Api "once"                                                                                 // 10
_groundUtil.Collection.prototype.once = function(/* arguments */) {                                                  // 11
  return this.eventemitter.once.apply(this.eventemitter, _.toArray(arguments));                                      // 12
};                                                                                                                   // 13
                                                                                                                     // 14
// Wrap the Event Emitter Api "off"                                                                                  // 15
_groundUtil.Collection.prototype.off = function(/* arguments */) {                                                   // 16
  return this.eventemitter.off.apply(this.eventemitter, _.toArray(arguments));                                       // 17
};                                                                                                                   // 18
                                                                                                                     // 19
// Wrap the Event Emitter Api "emit"                                                                                 // 20
_groundUtil.Collection.prototype.emit = function(/* arguments */) {                                                  // 21
  return this.eventemitter.emit.apply(this.eventemitter, _.toArray(arguments));                                      // 22
};                                                                                                                   // 23
                                                                                                                     // 24
                                                                                                                     // 25
// Add api helpers                                                                                                   // 26
_groundUtil.Collection.prototype.addListener = _groundUtil.Collection.prototype.on;                                  // 27
_groundUtil.Collection.prototype.removeListener = _groundUtil.Collection.prototype.off;                              // 28
_groundUtil.Collection.prototype.removeAllListeners = _groundUtil.Collection.prototype.off;                          // 29
                                                                                                                     // 30
// Add jquery like helpers                                                                                           // 31
_groundUtil.Collection.prototype.one = _groundUtil.Collection.prototype.once;                                        // 32
_groundUtil.Collection.prototype.trigger = _groundUtil.Collection.prototype.emit;                                    // 33
                                                                                                                     // 34
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1168
}).call(this);                                                       // 1169
                                                                     // 1170
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:db'] = {
  Ground: Ground,
  GroundDB: GroundDB
};

})();
