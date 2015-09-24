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
var Random = Package.random.Random;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;
var Store = Package['ground:store'].Store;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/ground_localstorage/packages/ground_localstorage.js                                               //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
(function () {                                                                                                // 1
                                                                                                              // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                     //     // 4
// packages/ground:localstorage/client.js                                                              //     // 5
//                                                                                                     //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                       //     // 8
// This function will test localstorage to see if its actually available and                           // 1   // 9
// working.                                                                                            // 2   // 10
var _getLocalStorage = function() {                                                                    // 3   // 11
                                                                                                       // 4   // 12
  // Set storage to localStorage - if test fails storage is set to null                                // 5   // 13
  var storage = window.localStorage;                                                                   // 6   // 14
                                                                                                       // 7   // 15
  // We initialize the fail flag defaulting to true                                                    // 8   // 16
  var fail = true;                                                                                     // 9   // 17
                                                                                                       // 10  // 18
  // In the test we test the localstorage api setItem/getItem/removeItem this                          // 11  // 19
  // uid will hopefully prevent any overwriting of existing data                                       // 12  // 20
  var uid = Random.id();                                                                               // 13  // 21
                                                                                                       // 14  // 22
  try {                                                                                                // 15  // 23
    // Use the setItem api                                                                             // 16  // 24
    storage.setItem(uid, uid);                                                                         // 17  // 25
    // Test the getItem api and check if the value could be set and retrieved                          // 18  // 26
    fail = (storage.getItem(uid) !== uid);                                                             // 19  // 27
    // Test removeItem and clean up the test data                                                      // 20  // 28
    storage.removeItem(uid);                                                                           // 21  // 29
                                                                                                       // 22  // 30
    // If the test failed then set the storage to null                                                 // 23  // 31
    if (fail) storage = null;                                                                          // 24  // 32
                                                                                                       // 25  // 33
  } catch(e) {                                                                                         // 26  // 34
    // Noop, cant do much about it                                                                     // 27  // 35
  }                                                                                                    // 28  // 36
                                                                                                       // 29  // 37
  // Return the tested localstorage                                                                    // 30  // 38
  return storage;                                                                                      // 31  // 39
};                                                                                                     // 32  // 40
                                                                                                       // 33  // 41
// Get storage if available                                                                            // 34  // 42
var _storage = _getLocalStorage();                                                                     // 35  // 43
                                                                                                       // 36  // 44
                                                                                                       // 37  // 45
// Check to see if we got any localstorage to add                                                      // 38  // 46
if (_storage) {                                                                                        // 39  // 47
                                                                                                       // 40  // 48
  // Create a namespace to track storage name spacing                                                  // 41  // 49
  var _localStorageNS = {};                                                                            // 42  // 50
                                                                                                       // 43  // 51
  // Create a noop function                                                                            // 44  // 52
  var noop = function() {};                                                                            // 45  // 53
                                                                                                       // 46  // 54
  // Prefix convention                                                                                 // 47  // 55
  var _prefix = function(name) {                                                                       // 48  // 56
    return '_storage.' + name;                                                                         // 49  // 57
  };                                                                                                   // 50  // 58
                                                                                                       // 51  // 59
  // Prefix database                                                                                   // 52  // 60
  var _prefixDatabase = function(name) {                                                               // 53  // 61
    return _prefix(name) + '.db.';                                                                     // 54  // 62
  };                                                                                                   // 55  // 63
                                                                                                       // 56  // 64
  // Prefix database record                                                                            // 57  // 65
  var _prefixDatabaseRecord = function(name) {                                                         // 58  // 66
    return _prefix(name) + '.record';                                                                  // 59  // 67
  };                                                                                                   // 60  // 68
                                                                                                       // 61  // 69
  // Helper getting and updating the table record                                                      // 62  // 70
  var _setTableRecord = function(SAInstance, migrationCallback) {                                      // 63  // 71
                                                                                                       // 64  // 72
    // Database record name in localstorage                                                            // 65  // 73
    var recordName = _prefixDatabaseRecord(SAInstance.name);                                           // 66  // 74
                                                                                                       // 67  // 75
    // Get the database record                                                                         // 68  // 76
    var oldRecordString = _storage.getItem(recordName);                                                // 69  // 77
                                                                                                       // 70  // 78
    // Set the default empty record object                                                             // 71  // 79
    var record = {};                                                                                   // 72  // 80
                                                                                                       // 73  // 81
    try {                                                                                              // 74  // 82
                                                                                                       // 75  // 83
      // Get old record object                                                                         // 76  // 84
      record = oldRecordString && EJSON.parse(oldRecordString) || {};                                  // 77  // 85
                                                                                                       // 78  // 86
    } catch(err) {                                                                                     // 79  // 87
      // Noop, cant do much about it, we assume that data is lost                                      // 80  // 88
    }                                                                                                  // 81  // 89
                                                                                                       // 82  // 90
    // Set new version helper                                                                          // 83  // 91
    var newVersion = SAInstance.version;                                                               // 84  // 92
                                                                                                       // 85  // 93
    // Set old version helper                                                                          // 86  // 94
    var oldVersion = record.version || 1.0;                                                            // 87  // 95
                                                                                                       // 88  // 96
    // Update the record                                                                               // 89  // 97
    record.version = SAInstance.version;                                                               // 90  // 98
                                                                                                       // 91  // 99
    try {                                                                                              // 92  // 100
                                                                                                       // 93  // 101
      // Create new record as string                                                                   // 94  // 102
      var newRecordString = EJSON.stringify(record);                                                   // 95  // 103
                                                                                                       // 96  // 104
      // Store the new record                                                                          // 97  // 105
      _storage.setItem(recordName, newRecordString);                                                   // 98  // 106
                                                                                                       // 99  // 107
    } catch(err) {                                                                                     // 100
      // Noop, cant do much here                                                                       // 101
    }                                                                                                  // 102
                                                                                                       // 103
    migrationCallback.call(SAInstance, {                                                               // 104
      version: oldVersion                                                                              // 105
    }, {                                                                                               // 106
      version: newVersion                                                                              // 107
    });                                                                                                // 108
  };                                                                                                   // 109
                                                                                                       // 110
  // Yeah, got it - add the api to the Storage global                                                  // 111
  Store.localStorage = function(options) {                                                             // 112
    var self = this;                                                                                   // 113
                                                                                                       // 114
    if (!(self instanceof Store.localStorage))                                                         // 115
      return new Store.localStorage(self.name);                                                        // 116
                                                                                                       // 117
    // Inheritance EventEmitter                                                                        // 118
    self.eventemitter = new EventEmitter();                                                            // 119
                                                                                                       // 120
    // Make sure options is at least an empty object                                                   // 121
    options = options || {};                                                                           // 122
                                                                                                       // 123
    // Set the name on the instance                                                                    // 124
    self.name = options.name;                                                                          // 125
                                                                                                       // 126
    // Check to see if the storage is already defined                                                  // 127
    if (_localStorageNS[self.name])                                                                    // 128
      throw new Error('Storage.localStorage "' + self.name + '" is already in use');                   // 129
                                                                                                       // 130
    // Make sure that the user dont use '.db.'                                                         // 131
    if (/\.db\./.test(self.name))                                                                      // 132
      throw new Error('Storage.localStorage "' + self.name + '" contains ".db." this is not allowed'); // 133
                                                                                                       // 134
    // Set the size of db 0 === disable quota                                                          // 135
    // TODO: Implement                                                                                 // 136
    self.size = options.size || 0;                                                                     // 137
                                                                                                       // 138
    // Set version - if this is bumped then the data is cleared pr. default                            // 139
    // migration                                                                                       // 140
    self.version = options.version || 1.0;                                                             // 141
                                                                                                       // 142
    // Set migration function                                                                          // 143
    var migrationFunction = options.migration || function(oldRecord, newRecord) {                      // 144
                                                                                                       // 145
      // Check storage versions                                                                        // 146
      if (oldRecord.version !== newRecord.version) {                                                   // 147
        // We allow the user to customize a migration algoritme but here we just                       // 148
        // clear the storage if versions mismatch                                                      // 149
        self.clear(noop);                                                                              // 150
      }                                                                                                // 151
    };                                                                                                 // 152
                                                                                                       // 153
    // Store the instance                                                                              // 154
    _localStorageNS[self.name] = self;                                                                 // 155
                                                                                                       // 156
                                                                                                       // 157
    // Set the table record, at the moment this is only handling the version                           // 158
    _setTableRecord(self, migrationFunction);                                                          // 159
                                                                                                       // 160
  };                                                                                                   // 161
                                                                                                       // 162
  // Simple helper to return the storage type name                                                     // 163
  Store.localStorage.prototype.typeName = function() {                                                 // 164
    return 'localStorage';                                                                             // 165
  };                                                                                                   // 166
                                                                                                       // 167
  Store.localStorage.prototype.prefix = function() {                                                   // 168
    var self = this;                                                                                   // 169
    return _prefixDatabase(self.name);                                                                 // 170
  };                                                                                                   // 171
                                                                                                       // 172
  Store.localStorage.prototype.getPrefixedId = function(name) {                                        // 173
    var self = this;                                                                                   // 174
    return self.prefix() + name;                                                                       // 175
  };                                                                                                   // 176
                                                                                                       // 177
  //////////////////////////////////////////////////////////////////////////////                       // 178
  // WRAP LOCALSTORAGE API                                                                             // 179
  //////////////////////////////////////////////////////////////////////////////                       // 180
                                                                                                       // 181
  Store.localStorage.prototype.getItem = function(name, callback) {                                    // 182
    var self = this;                                                                                   // 183
                                                                                                       // 184
    // Check if callback is function                                                                   // 185
    if (typeof callback !== 'function')                                                                // 186
      throw new Error('Storage.localStorage.getItem require a callback function');                     // 187
                                                                                                       // 188
    try {                                                                                              // 189
                                                                                                       // 190
      // Get the string value                                                                          // 191
      var jsonObj = _storage.getItem(self.getPrefixedId(name));                                        // 192
                                                                                                       // 193
      // Try to return the object of the parsed string                                                 // 194
      callback(null, jsonObj && EJSON.parse(jsonObj) || jsonObj);                                      // 195
                                                                                                       // 196
    } catch(err) {                                                                                     // 197
      // Callback with error                                                                           // 198
      callback(err);                                                                                   // 199
                                                                                                       // 200
    }                                                                                                  // 201
                                                                                                       // 202
  };                                                                                                   // 203
                                                                                                       // 204
  Store.localStorage.prototype.setItem = function(name, obj, callback) {                               // 205
    var self = this;                                                                                   // 206
                                                                                                       // 207
    // Check if callback is function                                                                   // 208
    if (typeof callback !== 'function')                                                                // 209
      throw new Error('Storage.localStorage.setItem require a callback function');                     // 210
                                                                                                       // 211
    try {                                                                                              // 212
                                                                                                       // 213
      // Stringify the object                                                                          // 214
      var jsonObj = EJSON.stringify(obj);                                                              // 215
                                                                                                       // 216
      // Try to set the stringified object                                                             // 217
      callback(null, _storage.setItem(self.getPrefixedId(name), jsonObj));                             // 218
                                                                                                       // 219
    } catch(err) {                                                                                     // 220
                                                                                                       // 221
      // Callback with error                                                                           // 222
      callback(err);                                                                                   // 223
                                                                                                       // 224
    }                                                                                                  // 225
  };                                                                                                   // 226
                                                                                                       // 227
  Store.localStorage.prototype.removeItem = function(name, callback) {                                 // 228
    var self = this;                                                                                   // 229
                                                                                                       // 230
    // Check if callback is function                                                                   // 231
    if (typeof callback !== 'function')                                                                // 232
      throw new Error('Storage.localStorage.removeItem require a callback function');                  // 233
                                                                                                       // 234
    try {                                                                                              // 235
                                                                                                       // 236
      // Try to remove the item                                                                        // 237
      callback(null, _storage.removeItem(self.getPrefixedId(name)));                                   // 238
                                                                                                       // 239
    } catch(err) {                                                                                     // 240
                                                                                                       // 241
      // callback with error                                                                           // 242
      callback(err);                                                                                   // 243
                                                                                                       // 244
    }                                                                                                  // 245
  };                                                                                                   // 246
                                                                                                       // 247
  Store.localStorage.prototype.clear = function(callback) {                                            // 248
    var self = this;                                                                                   // 249
                                                                                                       // 250
    // Check if callback is function                                                                   // 251
    if (typeof callback !== 'function')                                                                // 252
      throw new Error('Storage.localStorage.clear require a callback function');                       // 253
                                                                                                       // 254
    try {                                                                                              // 255
                                                                                                       // 256
      // Find all relevant keys for this storage                                                       // 257
      self.keys(function(err, keys) {                                                                  // 258
        if (err) {                                                                                     // 259
                                                                                                       // 260
          // On error we just callback                                                                 // 261
          callback(err);                                                                               // 262
                                                                                                       // 263
        } else {                                                                                       // 264
                                                                                                       // 265
          // Iterate over keys and removing them one by one                                            // 266
          for (var i=0; i < keys.length; i++)                                                          // 267
            self.removeItem(keys[i], noop);                                                            // 268
                                                                                                       // 269
          // Callback                                                                                  // 270
          callback(null, keys.length);                                                                 // 271
        }                                                                                              // 272
      });                                                                                              // 273
                                                                                                       // 274
    } catch(err) {                                                                                     // 275
                                                                                                       // 276
      // callback with error                                                                           // 277
      callback(err);                                                                                   // 278
                                                                                                       // 279
    }                                                                                                  // 280
  };                                                                                                   // 281
                                                                                                       // 282
  Store.localStorage.prototype.keys = function(callback) {                                             // 283
    var self = this;                                                                                   // 284
                                                                                                       // 285
    // Check if callback is function                                                                   // 286
    if (typeof callback !== 'function')                                                                // 287
      throw new Error('Storage.localStorage.keys require a callback function');                        // 288
                                                                                                       // 289
    // Result to return                                                                                // 290
    var result = [];                                                                                   // 291
                                                                                                       // 292
    try {                                                                                              // 293
                                                                                                       // 294
      // Create the prefix test                                                                        // 295
      var regex = new RegExp('^' + self.prefix());                                                     // 296
                                                                                                       // 297
      for (var i = 0; i < _storage.length; i++) {                                                      // 298
                                                                                                       // 299
        // Test if the key is relevant to this store                                                   // 300
        if (regex.test(_storage.key(i)))                                                               // 301
          // Add the name                                                                              // 302
          result.push(_storage.key(i).replace(regex, ''));                                             // 303
      }                                                                                                // 304
                                                                                                       // 305
      // Return the result                                                                             // 306
      callback(null, result);                                                                          // 307
                                                                                                       // 308
    } catch(err) {                                                                                     // 309
                                                                                                       // 310
      // callback with error                                                                           // 311
      callback(err);                                                                                   // 312
                                                                                                       // 313
    }                                                                                                  // 314
  };                                                                                                   // 315
                                                                                                       // 316
  Store.localStorage.prototype.length = function(callback) {                                           // 317
    var self = this;                                                                                   // 318
                                                                                                       // 319
    // Check if callback is function                                                                   // 320
    if (typeof callback !== 'function')                                                                // 321
      throw new Error('Storage.localStorage.length require a callback function');                      // 322
                                                                                                       // 323
    try {                                                                                              // 324
                                                                                                       // 325
      // Get the keys                                                                                  // 326
      self.keys(function(error, keys) {                                                                // 327
                                                                                                       // 328
        // Return the length                                                                           // 329
        callback(error, keys && keys.length || null);                                                  // 330
                                                                                                       // 331
      });                                                                                              // 332
                                                                                                       // 333
    } catch(err) {                                                                                     // 334
                                                                                                       // 335
      // callback with error                                                                           // 336
      callback(err);                                                                                   // 337
                                                                                                       // 338
    }                                                                                                  // 339
  };                                                                                                   // 340
                                                                                                       // 341
  Store.localStorage.prototype.toObject = function(callback) {                                         // 342
    var self = this;                                                                                   // 343
                                                                                                       // 344
    // Check if callback is function                                                                   // 345
    if (typeof callback !== 'function')                                                                // 346
      throw new Error('Storage.localStorage.toObject require a callback function');                    // 347
                                                                                                       // 348
    // Result to return                                                                                // 349
    var result = {};                                                                                   // 350
                                                                                                       // 351
    try {                                                                                              // 352
                                                                                                       // 353
      // Create the prefix test                                                                        // 354
      var regex = new RegExp('^' + self.prefix());                                                     // 355
                                                                                                       // 356
      for (var i = 0; i < _storage.length; i++) {                                                      // 357
        // Helper                                                                                      // 358
        var key = _storage.key(i);                                                                     // 359
                                                                                                       // 360
        // Test if the key is relevant to this store                                                   // 361
        if (regex.test(key)) {                                                                         // 362
          try {                                                                                        // 363
                                                                                                       // 364
            // Get the string value                                                                    // 365
            var jsonObj = _storage.getItem(key);                                                       // 366
                                                                                                       // 367
            // Try to return the object of the parsed string                                           // 368
            result[key.replace(regex, '')] = jsonObj && EJSON.parse(jsonObj) || jsonObj;               // 369
                                                                                                       // 370
          } catch(err) {                                                                               // 371
            // NOOP                                                                                    // 372
          }                                                                                            // 373
        }                                                                                              // 374
                                                                                                       // 375
      }                                                                                                // 376
                                                                                                       // 377
      // Return the result                                                                             // 378
      callback(null, result);                                                                          // 379
                                                                                                       // 380
    } catch(err) {                                                                                     // 381
                                                                                                       // 382
      // callback with error                                                                           // 383
      callback(err);                                                                                   // 384
                                                                                                       // 385
    }                                                                                                  // 386
  };                                                                                                   // 387
                                                                                                       // 388
  //////////////////////////////////////////////////////////////////////////////                       // 389
  // WRAP EVENTEMITTER API                                                                             // 390
  //////////////////////////////////////////////////////////////////////////////                       // 391
                                                                                                       // 392
  // Wrap the Event Emitter Api "on"                                                                   // 393
  Store.localStorage.prototype.on = function(/* arguments */) {                                        // 394
    this.eventemitter.on.apply(this.eventemitter, _.toArray(arguments));                               // 395
  };                                                                                                   // 396
                                                                                                       // 397
  // Wrap the Event Emitter Api "once"                                                                 // 398
  Store.localStorage.prototype.once = function(/* arguments */) {                                      // 399
    this.eventemitter.once.apply(this.eventemitter, _.toArray(arguments));                             // 400
  };                                                                                                   // 401
                                                                                                       // 402
  // Wrap the Event Emitter Api "off"                                                                  // 403
  Store.localStorage.prototype.off = function(/* arguments */) {                                       // 404
    this.eventemitter.off.apply(this.eventemitter, _.toArray(arguments));                              // 405
  };                                                                                                   // 406
                                                                                                       // 407
  // Wrap the Event Emitter Api "emit"                                                                 // 408
  Store.localStorage.prototype.emit = function(/* arguments */) {                                      // 409
    this.eventemitter.emit.apply(this.eventemitter, _.toArray(arguments));                             // 410
  };                                                                                                   // 411
                                                                                                       // 412
                                                                                                       // 413
  // Add api helpers                                                                                   // 414
  Store.localStorage.prototype.addListener = Store.localStorage.prototype.on;                          // 415
  Store.localStorage.prototype.removeListener = Store.localStorage.prototype.off;                      // 416
  Store.localStorage.prototype.removeAllListeners = Store.localStorage.prototype.off;                  // 417
                                                                                                       // 418
  // Add jquery like helpers                                                                           // 419
  Store.localStorage.prototype.one = Store.localStorage.prototype.once;                                // 420
  Store.localStorage.prototype.trigger = Store.localStorage.prototype.emit;                            // 421
                                                                                                       // 422
                                                                                                       // 423
                                                                                                       // 424
  //////////////////////////////////////////////////////////////////////////////                       // 425
  // WRAP LOCALSTORAGE EVENTHANDLER                                                                    // 426
  //////////////////////////////////////////////////////////////////////////////                       // 427
                                                                                                       // 428
  // This will be a quick test to see if we have any relations to the data                             // 429
  var _prefixedByUs = new RegExp('^' + _prefix(''));                                                   // 430
                                                                                                       // 431
  // Add event handlers                                                                                // 432
  if (typeof window.addEventListener !== 'undefined') {                                                // 433
      // Add support for multiple tabs                                                                 // 434
      window.addEventListener('storage', function(e) {                                                 // 435
      // Data changed in another tab, it would have updated localstorage, I'm                          // 436
      // outdated so reload the tab and localstorage - but we test the prefix on the                   // 437
      // key - since we actually make writes in the localstorage feature test                          // 438
                                                                                                       // 439
      // First of lets make sure that it was actually prefixed by us                                   // 440
      if (e.key && _prefixedByUs.test(e.key)) {                                                        // 441
                                                                                                       // 442
        // Okay, this looks familiar, now we try to lookup the storage instance                        // 443
        // to emit an event on...                                                                      // 444
                                                                                                       // 445
        // Remove the prefix                                                                           // 446
        var noPrefix = e.key.replace(_prefixedByUs, '');                                               // 447
                                                                                                       // 448
        // So we know that the name dont contain suffix ".db."                                         // 449
        var elements = noPrefix.split('.db.');                                                         // 450
                                                                                                       // 451
        var storageName = elements.shift();                                                            // 452
                                                                                                       // 453
        // Get the remaining key                                                                       // 454
        var key = elements.join('.db.');                                                               // 455
                                                                                                       // 456
        // Get the affected storage                                                                    // 457
        var storageAdapter = _localStorageNS[storageName];                                             // 458
                                                                                                       // 459
        if (storageAdapter) {                                                                          // 460
                                                                                                       // 461
          // Emit the event on the storage                                                             // 462
          storageAdapter.emit('storage', {                                                             // 463
            key: key,                                                                                  // 464
            newValue: e.newValue && EJSON.parse(e.newValue) || e.newValue,                             // 465
            oldValue: e.oldValue && EJSON.parse(e.oldValue) || e.oldValue,                             // 466
            originalKey: e.key,                                                                        // 467
            updatedAt: new Date(e.timeStamp),                                                          // 468
            url: e.url,                                                                                // 469
            storage: storageAdapter                                                                    // 470
          });                                                                                          // 471
        }                                                                                              // 472
                                                                                                       // 473
      }                                                                                                // 474
                                                                                                       // 475
    }, false);                                                                                         // 476
}                                                                                                      // 477
                                                                                                       // 478
}                                                                                                      // 479
                                                                                                       // 480
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 489
                                                                                                              // 490
}).call(this);                                                                                                // 491
                                                                                                              // 492
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:localstorage'] = {};

})();
