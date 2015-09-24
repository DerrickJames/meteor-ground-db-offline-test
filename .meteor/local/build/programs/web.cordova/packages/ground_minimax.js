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
var EJSON = Package.ejson.EJSON;
var Dictionary = Package['ground:dictionary'].Dictionary;

/* Package-scope variables */
var MiniMax;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/ground_minimax/packages/ground_minimax.js                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
(function () {                                                                                                   // 1
                                                                                                                 // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                        //     // 4
// packages/ground:minimax/ejson.minimax.js                                                               //     // 5
//                                                                                                        //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                          //     // 8
/*                                                                                                        // 1   // 9
                                                                                                          // 2   // 10
                                                                                                          // 3   // 11
                    __  ____       _ __  ___                                                              // 4   // 12
                   /  |/  (_)___  (_)  |/  /___ __  __                                                    // 5   // 13
                  / /|_/ / / __ \/ / /|_/ / __ `/ |/_/                                                    // 6   // 14
                 / /  / / / / / / / /  / / /_/ />  <                                                      // 7   // 15
                /_/  /_/_/_/ /_/_/_/  /_/\__,_/_/|_|                                                      // 8   // 16
                                                                                                          // 9   // 17
  Minify and Maxify by RaiX aka Morten N.O. Nørgaard Henriksen (mh@gi-software.com)                       // 10  // 18
                                                                                                          // 11  // 19
  MiniMax.minify( Object )                                                                                // 12  // 20
                                                                                                          // 13  // 21
  MiniMax.maxify( array )                                                                                 // 14  // 22
                                                                                                          // 15  // 23
  MiniMax.stringify( object )                                                                             // 16  // 24
                                                                                                          // 17  // 25
  MiniMax.parse( string )                                                                                 // 18  // 26
                                                                                                          // 19  // 27
  // For faster lookup                                                                                    // 20  // 28
  var keywords = {                                                                                        // 21  // 29
    '_id': 0,                                                                                             // 22  // 30
    'test': 1,                                                                                            // 23  // 31
    'comment': 2,                                                                                         // 24  // 32
    'list': 3,                                                                                            // 25  // 33
    'note': 4                                                                                             // 26  // 34
  };                                                                                                      // 27  // 35
                                                                                                          // 28  // 36
  var keywordsList = [ '_id', 'test', 'comment', 'list', 'note' ];                                        // 29  // 37
                                                                                                          // 30  // 38
  var headers = [0, [0, 1, 2], [0, 3, -5] ];                                                              // 31  // 39
                                                                                                          // 32  // 40
  var data = []; */                                                                                       // 33  // 41
                                                                                                          // 34  // 42
  // if(!Array.isArray) {                                                                                 // 35  // 43
  //   Array.isArray = function (vArg) {                                                                  // 36  // 44
  //     return Object.prototype.toString.call(vArg) === '[object Array]';                                // 37  // 45
  //   };                                                                                                 // 38  // 46
  // }                                                                                                    // 39  // 47
                                                                                                          // 40  // 48
  // Create the export scope                                                                              // 41  // 49
  MiniMax = function(options) {                                                                           // 42  // 50
    var self = this;                                                                                      // 43  // 51
                                                                                                          // 44  // 52
    // Make sure we are on an instance                                                                    // 45  // 53
    if (!(self instanceof MiniMax))                                                                       // 46  // 54
      return new MiniMax(options);                                                                        // 47  // 55
                                                                                                          // 48  // 56
    // Make sure options is set                                                                           // 49  // 57
    options = options || {};                                                                              // 50  // 58
                                                                                                          // 51  // 59
    // Setting this true will add all values and dates to the dictionary                                  // 52  // 60
    // This can in some cases save                                                                        // 53  // 61
    self.progressive = (options.progressive === false)? false : true;                                     // 54  // 62
                                                                                                          // 55  // 63
    // Set the default Dictionary                                                                         // 56  // 64
    // If the user added initial dictionary then add those                                                // 57  // 65
    self.dictionary = new Dictionary(_.union([false, true, null, undefined], options.dictionary || [] )); // 58  // 66
  };                                                                                                      // 59  // 67
                                                                                                          // 60  // 68
  MiniMax.prototype.minify = function(maxObj, skipFunctions) {                                            // 61  // 69
    var self = this;                                                                                      // 62  // 70
    var headers = [0];                                                                                    // 63  // 71
                                                                                                          // 64  // 72
    // Start dictionary                                                                                   // 65  // 73
    var dict = new Dictionary(self.dictionary);                                                           // 66  // 74
                                                                                                          // 67  // 75
    var getHeader = function(newHeader) {                                                                 // 68  // 76
      var headerId = null;                                                                                // 69  // 77
      for (var i = 1; i < headers.length; i++) {                                                          // 70  // 78
        var orgHeader = headers[i];                                                                       // 71  // 79
        // We only need to iterate over the intersection to get a match                                   // 72  // 80
        var minLength = Math.min(orgHeader.length, newHeader.length);                                     // 73  // 81
        var isMatch = true;                                                                               // 74  // 82
        for (var a = 0; a < minLength; a++) {                                                             // 75  // 83
          // We break if not a match                                                                      // 76  // 84
          if (orgHeader[a] !== newHeader[a]) {                                                            // 77  // 85
            isMatch = false;                                                                              // 78  // 86
            break;                                                                                        // 79  // 87
          }                                                                                               // 80  // 88
        }                                                                                                 // 81  // 89
        if (isMatch) {                                                                                    // 82  // 90
          // We check to see if                                                                           // 83  // 91
          // We are equal or in another header                                                            // 84  // 92
          // eg. headers = [1, 2, 3] newHeader=[1, 2, 3] return id                                        // 85  // 93
          // eg. headers = [1, 2, 3, 4] newHeader=[1, 2, 3] return id                                     // 86  // 94
          headerId = i;                                                                                   // 87  // 95
          // We could maybe contain another header - so we extend the org. and use                        // 88  // 96
          // that eg. headers = [1, 2, 3] newHeader=[1, 2, 3, 4] then                                     // 89  // 97
          // set headers=newHeader and return id                                                          // 90  // 98
          if (newHeader.length > minLength) {                                                             // 91  // 99
            headers[i] = newHeader;                                                                       // 92  // 100
          }                                                                                               // 93  // 101
        }                                                                                                 // 94  // 102
        // Stop when we found a match                                                                     // 95  // 103
        if (headerId !== null) {                                                                          // 96  // 104
          break;                                                                                          // 97  // 105
        }                                                                                                 // 98  // 106
      }                                                                                                   // 99  // 107
      // Or none of the above we add a new header                                                         // 100
      if (headerId === null) {                                                                            // 101
        headerId = headers.push(newHeader) - 1;                                                           // 102
      }                                                                                                   // 103
      return headerId;                                                                                    // 104
    };                                                                                                    // 105
                                                                                                          // 106
    var minifyHelper = function(maxObj) {                                                                 // 107
      var inArray = !_.isArray(maxObj);                                                                   // 108
      var target = [];                                                                                    // 109
      var header = [];                                                                                    // 110
                                                                                                          // 111
      _.each(maxObj, function(value, key) {                                                               // 112
                                                                                                          // 113
        if (skipFunctions && typeof value === 'function')                                                 // 114
          return;                                                                                         // 115
                                                                                                          // 116
        var minKey = (inArray) ? dict.add(key) : 0;                                                       // 117
                                                                                                          // 118
        if (value !== null && typeof value === 'object' &&                                                // 119
                  !(value instanceof Date)) {                                                             // 120
          // Array or Object                                                                              // 121
          if (inArray) {                                                                                  // 122
            header.push(minKey);                                                                          // 123
          }                                                                                               // 124
                                                                                                          // 125
          // Handle the object                                                                            // 126
          target.push(minifyHelper(value));                                                               // 127
                                                                                                          // 128
        } else {                                                                                          // 129
          // Depending on the progressive settings this will                                              // 130
          // Check if value is found in keywords                                                          // 131
          // Always set the value in keywords dictionary                                                  // 132
          var valueId = (self.progressive) ? dict.add(value) : dict.index(value);                         // 133
                                                                                                          // 134
          if (typeof valueId == 'undefined') {                                                            // 135
            // Not found, we add normal values                                                            // 136
            header.push(minKey);                                                                          // 137
            target.push(value);                                                                           // 138
          } else {                                                                                        // 139
                                                                                                          // 140
            header.push(-minKey);                                                                         // 141
            if (!inArray) {                                                                               // 142
              target.push(value);                                                                         // 143
            } else {                                                                                      // 144
              // Found, make minKey negative and set value to valueId                                     // 145
              target.push(valueId);                                                                       // 146
            }                                                                                             // 147
          }                                                                                               // 148
        }                                                                                                 // 149
      });                                                                                                 // 150
                                                                                                          // 151
      if (inArray) {                                                                                      // 152
        var headerId = getHeader(header);                                                                 // 153
        target.unshift(headerId);                                                                         // 154
      } else {                                                                                            // 155
        target.unshift(0); // 0 marks an array with no headers                                            // 156
      }                                                                                                   // 157
                                                                                                          // 158
                                                                                                          // 159
      return target;                                                                                      // 160
    };                                                                                                    // 161
                                                                                                          // 162
    // If not an object then not much to work on                                                          // 163
    if (typeof maxObj !== 'object') {                                                                     // 164
      return maxObj;                                                                                      // 165
    }                                                                                                     // 166
                                                                                                          // 167
    var data = minifyHelper(maxObj);                                                                      // 168
                                                                                                          // 169
    return [ dict.withoutInitial(), headers, data ];                                                      // 170
  };                                                                                                      // 171
                                                                                                          // 172
                                                                                                          // 173
  // Takes an minify object and maxify to object                                                          // 174
  MiniMax.prototype.maxify = function(minObj) {                                                           // 175
    var self = this;                                                                                      // 176
                                                                                                          // 177
    // We expect an array of 3                                                                            // 178
    if (minObj === null || minObj.length !== 3) {                                                         // 179
      // Return object                                                                                    // 180
      return minObj;                                                                                      // 181
    }                                                                                                     // 182
                                                                                                          // 183
    // Init globals                                                                                       // 184
    var dict = new Dictionary(self.dictionary);                                                           // 185
    dict.addList(minObj[0]);                                                                              // 186
                                                                                                          // 187
    var headers = minObj[1];                                                                              // 188
    var data = minObj[2];                                                                                 // 189
                                                                                                          // 190
    var maxifyHelper = function(minObj) {                                                                 // 191
      // read header reference and fetch the header                                                       // 192
      var headerId = minObj.shift();                                                                      // 193
      var header = (headerId) ? headers[headerId] : null;                                                 // 194
                                                                                                          // 195
      // If header === 0 then we are creating an array otherwise an object                                // 196
      var result = (header === null) ? [] : {};                                                           // 197
      // We launch interation over the minObj                                                             // 198
      if (header === null) {                                                                              // 199
        // Create an array                                                                                // 200
        for (var i = 0; i < minObj.length; i++) {                                                         // 201
          if (_.isArray(minObj[i])) {                                                                     // 202
            result.push(maxifyHelper(minObj[i]));                                                         // 203
          } else {                                                                                        // 204
            result.push(minObj[i]);                                                                       // 205
          }                                                                                               // 206
        }                                                                                                 // 207
      } else {                                                                                            // 208
        // Create object                                                                                  // 209
        for (var i = 0; i < minObj.length; i++) {                                                         // 210
          // Lookup keyword id can be negative for value lookup                                           // 211
          var keyId = header[i];                                                                          // 212
          // Lookup keyword                                                                               // 213
          var key = dict.value(Math.abs(keyId));                                                          // 214
          // Is value an array then dig deeper                                                            // 215
          if (_.isArray(minObj[i])) {                                                                     // 216
            result[key] = maxifyHelper(minObj[i]);                                                        // 217
          } else {                                                                                        // 218
            var value = minObj[i]; // Value or valueId                                                    // 219
            // if keyId is negative then lookup the value in keywords                                     // 220
            if (keyId < 0) {                                                                              // 221
              value = dict.value(value);                                                                  // 222
            }                                                                                             // 223
            result[key] = value;                                                                          // 224
          }                                                                                               // 225
        }                                                                                                 // 226
      }                                                                                                   // 227
      return result;                                                                                      // 228
    };                                                                                                    // 229
                                                                                                          // 230
    return maxifyHelper(data);                                                                            // 231
  };                                                                                                      // 232
                                                                                                          // 233
  MiniMax.prototype.stringify = function(plainObject) {                                                   // 234
    // Compress the object                                                                                // 235
    var minifiedObject = this.minify(plainObject, true);                                                  // 236
    // Convert it into string                                                                             // 237
    return EJSON.stringify(minifiedObject);                                                               // 238
  };                                                                                                      // 239
                                                                                                          // 240
  MiniMax.prototype.parse = function(ejsonString) {                                                       // 241
    // Convert the string into minified object                                                            // 242
    var minifiedObject = EJSON.parse(ejsonString);                                                        // 243
    // Maxify the object                                                                                  // 244
    return this.maxify(minifiedObject);                                                                   // 245
  };                                                                                                      // 246
                                                                                                          // 247
////////////////////////////////////////////////////////////////////////////////                          // 248
//  DEFAULT BEHAVIOUR                                                                                     // 249
////////////////////////////////////////////////////////////////////////////////                          // 250
                                                                                                          // 251
var defaultMiniMax = new MiniMax();                                                                       // 252
                                                                                                          // 253
MiniMax.minify = function(maxObj, skipFunctions) {                                                        // 254
  return defaultMiniMax.minify(maxObj, skipFunctions);                                                    // 255
};                                                                                                        // 256
                                                                                                          // 257
MiniMax.maxify = function(minObj) {                                                                       // 258
  return defaultMiniMax.maxify(minObj);                                                                   // 259
};                                                                                                        // 260
                                                                                                          // 261
MiniMax.stringify = function(obj) {                                                                       // 262
  return defaultMiniMax.stringify(obj);                                                                   // 263
};                                                                                                        // 264
                                                                                                          // 265
MiniMax.parse = function(str) {                                                                           // 266
  return defaultMiniMax.parse(str);                                                                       // 267
};                                                                                                        // 268
                                                                                                          // 269
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 278
                                                                                                                 // 279
}).call(this);                                                                                                   // 280
                                                                                                                 // 281
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:minimax'] = {
  MiniMax: MiniMax
};

})();
