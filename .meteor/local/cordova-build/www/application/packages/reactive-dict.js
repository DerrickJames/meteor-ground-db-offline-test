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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var ReactiveDict;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/reactive-dict/packages/reactive-dict.js                                            //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
(function(){                                                                                   // 1
                                                                                               // 2
//////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                      //     // 4
// packages/reactive-dict/reactive-dict.js                                              //     // 5
//                                                                                      //     // 6
//////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                        //     // 8
// XXX come up with a serialization method which canonicalizes object key               // 1   // 9
// order, which would allow us to use objects as values for equals.                     // 2   // 10
var stringify = function (value) {                                                      // 3   // 11
  if (value === undefined)                                                              // 4   // 12
    return 'undefined';                                                                 // 5   // 13
  return EJSON.stringify(value);                                                        // 6   // 14
};                                                                                      // 7   // 15
var parse = function (serialized) {                                                     // 8   // 16
  if (serialized === undefined || serialized === 'undefined')                           // 9   // 17
    return undefined;                                                                   // 10  // 18
  return EJSON.parse(serialized);                                                       // 11  // 19
};                                                                                      // 12  // 20
                                                                                        // 13  // 21
var changed = function (v) {                                                            // 14  // 22
  v && v.changed();                                                                     // 15  // 23
};                                                                                      // 16  // 24
                                                                                        // 17  // 25
// XXX COMPAT WITH 0.9.1 : accept migrationData instead of dictName                     // 18  // 26
ReactiveDict = function (dictName) {                                                    // 19  // 27
  // this.keys: key -> value                                                            // 20  // 28
  if (dictName) {                                                                       // 21  // 29
    if (typeof dictName === 'string') {                                                 // 22  // 30
      // the normal case, argument is a string name.                                    // 23  // 31
      // _registerDictForMigrate will throw an error on duplicate name.                 // 24  // 32
      ReactiveDict._registerDictForMigrate(dictName, this);                             // 25  // 33
      this.keys = ReactiveDict._loadMigratedDict(dictName) || {};                       // 26  // 34
      this.name = dictName;                                                             // 27  // 35
    } else if (typeof dictName === 'object') {                                          // 28  // 36
      // back-compat case: dictName is actually migrationData                           // 29  // 37
      this.keys = dictName;                                                             // 30  // 38
    } else {                                                                            // 31  // 39
      throw new Error("Invalid ReactiveDict argument: " + dictName);                    // 32  // 40
    }                                                                                   // 33  // 41
  } else {                                                                              // 34  // 42
    // no name given; no migration will be performed                                    // 35  // 43
    this.keys = {};                                                                     // 36  // 44
  }                                                                                     // 37  // 45
                                                                                        // 38  // 46
  this.allDeps = new Tracker.Dependency;                                                // 39  // 47
  this.keyDeps = {}; // key -> Dependency                                               // 40  // 48
  this.keyValueDeps = {}; // key -> Dependency                                          // 41  // 49
};                                                                                      // 42  // 50
                                                                                        // 43  // 51
_.extend(ReactiveDict.prototype, {                                                      // 44  // 52
  // set() began as a key/value method, but we are now overloading it                   // 45  // 53
  // to take an object of key/value pairs, similar to backbone                          // 46  // 54
  // http://backbonejs.org/#Model-set                                                   // 47  // 55
                                                                                        // 48  // 56
  set: function (keyOrObject, value) {                                                  // 49  // 57
    var self = this;                                                                    // 50  // 58
                                                                                        // 51  // 59
    if ((typeof keyOrObject === 'object') && (value === undefined)) {                   // 52  // 60
      self._setObject(keyOrObject);                                                     // 53  // 61
      return;                                                                           // 54  // 62
    }                                                                                   // 55  // 63
    // the input isn't an object, so it must be a key                                   // 56  // 64
    // and we resume with the rest of the function                                      // 57  // 65
    var key = keyOrObject;                                                              // 58  // 66
                                                                                        // 59  // 67
    value = stringify(value);                                                           // 60  // 68
                                                                                        // 61  // 69
    var oldSerializedValue = 'undefined';                                               // 62  // 70
    if (_.has(self.keys, key)) oldSerializedValue = self.keys[key];                     // 63  // 71
    if (value === oldSerializedValue)                                                   // 64  // 72
      return;                                                                           // 65  // 73
    self.keys[key] = value;                                                             // 66  // 74
                                                                                        // 67  // 75
    self.allDeps.changed();                                                             // 68  // 76
    changed(self.keyDeps[key]);                                                         // 69  // 77
    if (self.keyValueDeps[key]) {                                                       // 70  // 78
      changed(self.keyValueDeps[key][oldSerializedValue]);                              // 71  // 79
      changed(self.keyValueDeps[key][value]);                                           // 72  // 80
    }                                                                                   // 73  // 81
  },                                                                                    // 74  // 82
                                                                                        // 75  // 83
  setDefault: function (key, value) {                                                   // 76  // 84
    var self = this;                                                                    // 77  // 85
    // for now, explicitly check for undefined, since there is no                       // 78  // 86
    // ReactiveDict.clear().  Later we might have a ReactiveDict.clear(), in which case        // 87
    // we should check if it has the key.                                               // 80  // 88
    if (self.keys[key] === undefined) {                                                 // 81  // 89
      self.set(key, value);                                                             // 82  // 90
    }                                                                                   // 83  // 91
  },                                                                                    // 84  // 92
                                                                                        // 85  // 93
  get: function (key) {                                                                 // 86  // 94
    var self = this;                                                                    // 87  // 95
    self._ensureKey(key);                                                               // 88  // 96
    self.keyDeps[key].depend();                                                         // 89  // 97
    return parse(self.keys[key]);                                                       // 90  // 98
  },                                                                                    // 91  // 99
                                                                                        // 92  // 100
  equals: function (key, value) {                                                       // 93  // 101
    var self = this;                                                                    // 94  // 102
                                                                                        // 95  // 103
    // Mongo.ObjectID is in the 'mongo' package                                         // 96  // 104
    var ObjectID = null;                                                                // 97  // 105
    if (Package.mongo) {                                                                // 98  // 106
      ObjectID = Package.mongo.Mongo.ObjectID;                                          // 99  // 107
    }                                                                                   // 100
                                                                                        // 101
    // We don't allow objects (or arrays that might include objects) for                // 102
    // .equals, because JSON.stringify doesn't canonicalize object key                  // 103
    // order. (We can make equals have the right return value by parsing the            // 104
    // current value and using EJSON.equals, but we won't have a canonical              // 105
    // element of keyValueDeps[key] to store the dependency.) You can still use         // 106
    // "EJSON.equals(reactiveDict.get(key), value)".                                    // 107
    //                                                                                  // 108
    // XXX we could allow arrays as long as we recursively check that there             // 109
    // are no objects                                                                   // 110
    if (typeof value !== 'string' &&                                                    // 111
        typeof value !== 'number' &&                                                    // 112
        typeof value !== 'boolean' &&                                                   // 113
        typeof value !== 'undefined' &&                                                 // 114
        !(value instanceof Date) &&                                                     // 115
        !(ObjectID && value instanceof ObjectID) &&                                     // 116
        value !== null) {                                                               // 117
      throw new Error("ReactiveDict.equals: value must be scalar");                     // 118
    }                                                                                   // 119
    var serializedValue = stringify(value);                                             // 120
                                                                                        // 121
    if (Tracker.active) {                                                               // 122
      self._ensureKey(key);                                                             // 123
                                                                                        // 124
      if (! _.has(self.keyValueDeps[key], serializedValue))                             // 125
        self.keyValueDeps[key][serializedValue] = new Tracker.Dependency;               // 126
                                                                                        // 127
      var isNew = self.keyValueDeps[key][serializedValue].depend();                     // 128
      if (isNew) {                                                                      // 129
        Tracker.onInvalidate(function () {                                              // 130
          // clean up [key][serializedValue] if it's now empty, so we don't             // 131
          // use O(n) memory for n = values seen ever                                   // 132
          if (! self.keyValueDeps[key][serializedValue].hasDependents())                // 133
            delete self.keyValueDeps[key][serializedValue];                             // 134
        });                                                                             // 135
      }                                                                                 // 136
    }                                                                                   // 137
                                                                                        // 138
    var oldValue = undefined;                                                           // 139
    if (_.has(self.keys, key)) oldValue = parse(self.keys[key]);                        // 140
    return EJSON.equals(oldValue, value);                                               // 141
  },                                                                                    // 142
                                                                                        // 143
  all: function() {                                                                     // 144
    this.allDeps.depend();                                                              // 145
    var ret = {};                                                                       // 146
    _.each(this.keys, function(value, key) {                                            // 147
      ret[key] = parse(value);                                                          // 148
    });                                                                                 // 149
    return ret;                                                                         // 150
  },                                                                                    // 151
                                                                                        // 152
  clear: function() {                                                                   // 153
    var self = this;                                                                    // 154
                                                                                        // 155
    var oldKeys = self.keys;                                                            // 156
    self.keys = {};                                                                     // 157
                                                                                        // 158
    self.allDeps.changed();                                                             // 159
                                                                                        // 160
    _.each(oldKeys, function(value, key) {                                              // 161
      changed(self.keyDeps[key]);                                                       // 162
      changed(self.keyValueDeps[key][value]);                                           // 163
      changed(self.keyValueDeps[key]['undefined']);                                     // 164
    });                                                                                 // 165
                                                                                        // 166
  },                                                                                    // 167
                                                                                        // 168
  _setObject: function (object) {                                                       // 169
    var self = this;                                                                    // 170
                                                                                        // 171
    _.each(object, function (value, key){                                               // 172
      self.set(key, value);                                                             // 173
    });                                                                                 // 174
  },                                                                                    // 175
                                                                                        // 176
  _ensureKey: function (key) {                                                          // 177
    var self = this;                                                                    // 178
    if (!(key in self.keyDeps)) {                                                       // 179
      self.keyDeps[key] = new Tracker.Dependency;                                       // 180
      self.keyValueDeps[key] = {};                                                      // 181
    }                                                                                   // 182
  },                                                                                    // 183
                                                                                        // 184
  // Get a JSON value that can be passed to the constructor to                          // 185
  // create a new ReactiveDict with the same contents as this one                       // 186
  _getMigrationData: function () {                                                      // 187
    // XXX sanitize and make sure it's JSONible?                                        // 188
    return this.keys;                                                                   // 189
  }                                                                                     // 190
});                                                                                     // 191
                                                                                        // 192
//////////////////////////////////////////////////////////////////////////////////////////     // 201
                                                                                               // 202
}).call(this);                                                                                 // 203
                                                                                               // 204
                                                                                               // 205
                                                                                               // 206
                                                                                               // 207
                                                                                               // 208
                                                                                               // 209
(function(){                                                                                   // 210
                                                                                               // 211
//////////////////////////////////////////////////////////////////////////////////////////     // 212
//                                                                                      //     // 213
// packages/reactive-dict/migration.js                                                  //     // 214
//                                                                                      //     // 215
//////////////////////////////////////////////////////////////////////////////////////////     // 216
                                                                                        //     // 217
ReactiveDict._migratedDictData = {}; // name -> data                                    // 1   // 218
ReactiveDict._dictsToMigrate = {}; // name -> ReactiveDict                              // 2   // 219
                                                                                        // 3   // 220
ReactiveDict._loadMigratedDict = function (dictName) {                                  // 4   // 221
  if (_.has(ReactiveDict._migratedDictData, dictName))                                  // 5   // 222
    return ReactiveDict._migratedDictData[dictName];                                    // 6   // 223
                                                                                        // 7   // 224
  return null;                                                                          // 8   // 225
};                                                                                      // 9   // 226
                                                                                        // 10  // 227
ReactiveDict._registerDictForMigrate = function (dictName, dict) {                      // 11  // 228
  if (_.has(ReactiveDict._dictsToMigrate, dictName))                                    // 12  // 229
    throw new Error("Duplicate ReactiveDict name: " + dictName);                        // 13  // 230
                                                                                        // 14  // 231
  ReactiveDict._dictsToMigrate[dictName] = dict;                                        // 15  // 232
};                                                                                      // 16  // 233
                                                                                        // 17  // 234
if (Meteor.isClient && Package.reload) {                                                // 18  // 235
  // Put old migrated data into ReactiveDict._migratedDictData,                         // 19  // 236
  // where it can be accessed by ReactiveDict._loadMigratedDict.                        // 20  // 237
  var migrationData = Package.reload.Reload._migrationData('reactive-dict');            // 21  // 238
  if (migrationData && migrationData.dicts)                                             // 22  // 239
    ReactiveDict._migratedDictData = migrationData.dicts;                               // 23  // 240
                                                                                        // 24  // 241
  // On migration, assemble the data from all the dicts that have been                  // 25  // 242
  // registered.                                                                        // 26  // 243
  Package.reload.Reload._onMigrate('reactive-dict', function () {                       // 27  // 244
    var dictsToMigrate = ReactiveDict._dictsToMigrate;                                  // 28  // 245
    var dataToMigrate = {};                                                             // 29  // 246
                                                                                        // 30  // 247
    for (var dictName in dictsToMigrate)                                                // 31  // 248
      dataToMigrate[dictName] = dictsToMigrate[dictName]._getMigrationData();           // 32  // 249
                                                                                        // 33  // 250
    return [true, {dicts: dataToMigrate}];                                              // 34  // 251
  });                                                                                   // 35  // 252
}                                                                                       // 36  // 253
                                                                                        // 37  // 254
//////////////////////////////////////////////////////////////////////////////////////////     // 255
                                                                                               // 256
}).call(this);                                                                                 // 257
                                                                                               // 258
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['reactive-dict'] = {
  ReactiveDict: ReactiveDict
};

})();
