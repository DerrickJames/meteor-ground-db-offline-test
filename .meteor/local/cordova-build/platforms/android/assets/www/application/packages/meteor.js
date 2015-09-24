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
var _ = Package.underscore._;

/* Package-scope variables */
var Meteor;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/meteor/packages/meteor.js                                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
(function(){                                                                                                     // 1
                                                                                                                 // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                        //     // 4
// packages/meteor/client_environment.js                                                                  //     // 5
//                                                                                                        //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                          //     // 8
/**                                                                                                       // 1   // 9
 * @summary The Meteor namespace                                                                          // 2   // 10
 * @namespace Meteor                                                                                      // 3   // 11
 */                                                                                                       // 4   // 12
Meteor = {                                                                                                // 5   // 13
                                                                                                          // 6   // 14
  /**                                                                                                     // 7   // 15
   * @summary Boolean variable.  True if running in client environment.                                   // 8   // 16
   * @locus Anywhere                                                                                      // 9   // 17
   * @static                                                                                              // 10  // 18
   * @type {Boolean}                                                                                      // 11  // 19
   */                                                                                                     // 12  // 20
  isClient: true,                                                                                         // 13  // 21
                                                                                                          // 14  // 22
  /**                                                                                                     // 15  // 23
   * @summary Boolean variable.  True if running in server environment.                                   // 16  // 24
   * @locus Anywhere                                                                                      // 17  // 25
   * @static                                                                                              // 18  // 26
   * @type {Boolean}                                                                                      // 19  // 27
   */                                                                                                     // 20  // 28
  isServer: false,                                                                                        // 21  // 29
  isCordova: false                                                                                        // 22  // 30
};                                                                                                        // 23  // 31
                                                                                                          // 24  // 32
if (typeof __meteor_runtime_config__ === 'object' &&                                                      // 25  // 33
    __meteor_runtime_config__.PUBLIC_SETTINGS) {                                                          // 26  // 34
  /**                                                                                                     // 27  // 35
   * @summary `Meteor.settings` contains deployment-specific configuration options. You can initialize settings by passing the `--settings` option (which takes the name of a file containing JSON data) to `meteor run` or `meteor deploy`. When running your server directly (e.g. from a bundle), you instead specify settings by putting the JSON directly into the `METEOR_SETTINGS` environment variable. If the settings object contains a key named `public`, then `Meteor.settings.public` will be available on the client as well as the server.  All other properties of `Meteor.settings` are only defined on the server.  You can rely on `Meteor.settings` and `Meteor.settings.public` being defined objects (not undefined) on both client and server even if there are no settings specified.  Changes to `Meteor.settings.public` at runtime will be picked up by new client connections.
   * @locus Anywhere                                                                                      // 29  // 37
   * @type {Object}                                                                                       // 30  // 38
   */                                                                                                     // 31  // 39
  Meteor.settings = { 'public': __meteor_runtime_config__.PUBLIC_SETTINGS };                              // 32  // 40
}                                                                                                         // 33  // 41
                                                                                                          // 34  // 42
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 43
                                                                                                                 // 44
}).call(this);                                                                                                   // 45
                                                                                                                 // 46
                                                                                                                 // 47
                                                                                                                 // 48
                                                                                                                 // 49
                                                                                                                 // 50
                                                                                                                 // 51
(function(){                                                                                                     // 52
                                                                                                                 // 53
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 54
//                                                                                                        //     // 55
// packages/meteor/cordova_environment.js                                                                 //     // 56
//                                                                                                        //     // 57
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 58
                                                                                                          //     // 59
/**                                                                                                       // 1   // 60
 * @summary Boolean variable.  True if running in a Cordova mobile environment.                           // 2   // 61
 * @type {Boolean}                                                                                        // 3   // 62
 * @static                                                                                                // 4   // 63
 * @locus Anywhere                                                                                        // 5   // 64
 */                                                                                                       // 6   // 65
Meteor.isCordova = true;                                                                                  // 7   // 66
                                                                                                          // 8   // 67
                                                                                                          // 9   // 68
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 69
                                                                                                                 // 70
}).call(this);                                                                                                   // 71
                                                                                                                 // 72
                                                                                                                 // 73
                                                                                                                 // 74
                                                                                                                 // 75
                                                                                                                 // 76
                                                                                                                 // 77
(function(){                                                                                                     // 78
                                                                                                                 // 79
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 80
//                                                                                                        //     // 81
// packages/meteor/helpers.js                                                                             //     // 82
//                                                                                                        //     // 83
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 84
                                                                                                          //     // 85
if (Meteor.isServer)                                                                                      // 1   // 86
  var Future = Npm.require('fibers/future');                                                              // 2   // 87
                                                                                                          // 3   // 88
if (typeof __meteor_runtime_config__ === 'object' &&                                                      // 4   // 89
    __meteor_runtime_config__.meteorRelease) {                                                            // 5   // 90
  /**                                                                                                     // 6   // 91
   * @summary `Meteor.release` is a string containing the name of the [release](#meteorupdate) with which the project was built (for example, `"1.2.3"`). It is `undefined` if the project was built using a git checkout of Meteor.
   * @locus Anywhere                                                                                      // 8   // 93
   * @type {String}                                                                                       // 9   // 94
   */                                                                                                     // 10  // 95
  Meteor.release = __meteor_runtime_config__.meteorRelease;                                               // 11  // 96
}                                                                                                         // 12  // 97
                                                                                                          // 13  // 98
// XXX find a better home for these? Ideally they would be _.get,                                         // 14  // 99
// _.ensure, _.delete..                                                                                   // 15  // 100
                                                                                                          // 16  // 101
_.extend(Meteor, {                                                                                        // 17  // 102
  // _get(a,b,c,d) returns a[b][c][d], or else undefined if a[b] or                                       // 18  // 103
  // a[b][c] doesn't exist.                                                                               // 19  // 104
  //                                                                                                      // 20  // 105
  _get: function (obj /*, arguments */) {                                                                 // 21  // 106
    for (var i = 1; i < arguments.length; i++) {                                                          // 22  // 107
      if (!(arguments[i] in obj))                                                                         // 23  // 108
        return undefined;                                                                                 // 24  // 109
      obj = obj[arguments[i]];                                                                            // 25  // 110
    }                                                                                                     // 26  // 111
    return obj;                                                                                           // 27  // 112
  },                                                                                                      // 28  // 113
                                                                                                          // 29  // 114
  // _ensure(a,b,c,d) ensures that a[b][c][d] exists. If it does not,                                     // 30  // 115
  // it is created and set to {}. Either way, it is returned.                                             // 31  // 116
  //                                                                                                      // 32  // 117
  _ensure: function (obj /*, arguments */) {                                                              // 33  // 118
    for (var i = 1; i < arguments.length; i++) {                                                          // 34  // 119
      var key = arguments[i];                                                                             // 35  // 120
      if (!(key in obj))                                                                                  // 36  // 121
        obj[key] = {};                                                                                    // 37  // 122
      obj = obj[key];                                                                                     // 38  // 123
    }                                                                                                     // 39  // 124
                                                                                                          // 40  // 125
    return obj;                                                                                           // 41  // 126
  },                                                                                                      // 42  // 127
                                                                                                          // 43  // 128
  // _delete(a, b, c, d) deletes a[b][c][d], then a[b][c] unless it                                       // 44  // 129
  // isn't empty, then a[b] unless it isn't empty.                                                        // 45  // 130
  //                                                                                                      // 46  // 131
  _delete: function (obj /*, arguments */) {                                                              // 47  // 132
    var stack = [obj];                                                                                    // 48  // 133
    var leaf = true;                                                                                      // 49  // 134
    for (var i = 1; i < arguments.length - 1; i++) {                                                      // 50  // 135
      var key = arguments[i];                                                                             // 51  // 136
      if (!(key in obj)) {                                                                                // 52  // 137
        leaf = false;                                                                                     // 53  // 138
        break;                                                                                            // 54  // 139
      }                                                                                                   // 55  // 140
      obj = obj[key];                                                                                     // 56  // 141
      if (typeof obj !== "object")                                                                        // 57  // 142
        break;                                                                                            // 58  // 143
      stack.push(obj);                                                                                    // 59  // 144
    }                                                                                                     // 60  // 145
                                                                                                          // 61  // 146
    for (var i = stack.length - 1; i >= 0; i--) {                                                         // 62  // 147
      var key = arguments[i+1];                                                                           // 63  // 148
                                                                                                          // 64  // 149
      if (leaf)                                                                                           // 65  // 150
        leaf = false;                                                                                     // 66  // 151
      else                                                                                                // 67  // 152
        for (var other in stack[i][key])                                                                  // 68  // 153
          return; // not empty -- we're done                                                              // 69  // 154
                                                                                                          // 70  // 155
      delete stack[i][key];                                                                               // 71  // 156
    }                                                                                                     // 72  // 157
  },                                                                                                      // 73  // 158
                                                                                                          // 74  // 159
  // wrapAsync can wrap any function that takes some number of arguments that                             // 75  // 160
  // can't be undefined, followed by some optional arguments, where the callback                          // 76  // 161
  // is the last optional argument.                                                                       // 77  // 162
  // e.g. fs.readFile(pathname, [callback]),                                                              // 78  // 163
  // fs.open(pathname, flags, [mode], [callback])                                                         // 79  // 164
  // For maximum effectiveness and least confusion, wrapAsync should be used on                           // 80  // 165
  // functions where the callback is the only argument of type Function.                                  // 81  // 166
                                                                                                          // 82  // 167
  /**                                                                                                     // 83  // 168
   * @memberOf Meteor                                                                                     // 84  // 169
   * @summary Wrap a function that takes a callback function as its final parameter. The signature of the callback of the wrapped function should be `function(error, result){}`. On the server, the wrapped function can be used either synchronously (without passing a callback) or asynchronously (when a callback is passed). On the client, a callback is always required; errors will be logged if there is no callback. If a callback is provided, the environment captured when the original function was called will be restored in the callback.
   * @locus Anywhere                                                                                      // 86  // 171
   * @param {Function} func A function that takes a callback as its final parameter                       // 87  // 172
   * @param {Object} [context] Optional `this` object against which the original function will be invoked        // 173
   */                                                                                                     // 89  // 174
  wrapAsync: function (fn, context) {                                                                     // 90  // 175
    return function (/* arguments */) {                                                                   // 91  // 176
      var self = context || this;                                                                         // 92  // 177
      var newArgs = _.toArray(arguments);                                                                 // 93  // 178
      var callback;                                                                                       // 94  // 179
                                                                                                          // 95  // 180
      for (var i = newArgs.length - 1; i >= 0; --i) {                                                     // 96  // 181
        var arg = newArgs[i];                                                                             // 97  // 182
        var type = typeof arg;                                                                            // 98  // 183
        if (type !== "undefined") {                                                                       // 99  // 184
          if (type === "function") {                                                                      // 100
            callback = arg;                                                                               // 101
          }                                                                                               // 102
          break;                                                                                          // 103
        }                                                                                                 // 104
      }                                                                                                   // 105
                                                                                                          // 106
      if (! callback) {                                                                                   // 107
        if (Meteor.isClient) {                                                                            // 108
          callback = logErr;                                                                              // 109
        } else {                                                                                          // 110
          var fut = new Future();                                                                         // 111
          callback = fut.resolver();                                                                      // 112
        }                                                                                                 // 113
        ++i; // Insert the callback just after arg.                                                       // 114
      }                                                                                                   // 115
                                                                                                          // 116
      newArgs[i] = Meteor.bindEnvironment(callback);                                                      // 117
      var result = fn.apply(self, newArgs);                                                               // 118
      return fut ? fut.wait() : result;                                                                   // 119
    };                                                                                                    // 120
  },                                                                                                      // 121
                                                                                                          // 122
  // Sets child's prototype to a new object whose prototype is parent's                                   // 123
  // prototype. Used as:                                                                                  // 124
  //   Meteor._inherits(ClassB, ClassA).                                                                  // 125
  //   _.extend(ClassB.prototype, { ... })                                                                // 126
  // Inspired by CoffeeScript's `extend` and Google Closure's `goog.inherits`.                            // 127
  _inherits: function (Child, Parent) {                                                                   // 128
    // copy Parent static properties                                                                      // 129
    for (var key in Parent) {                                                                             // 130
      // make sure we only copy hasOwnProperty properties vs. prototype                                   // 131
      // properties                                                                                       // 132
      if (_.has(Parent, key))                                                                             // 133
        Child[key] = Parent[key];                                                                         // 134
    }                                                                                                     // 135
                                                                                                          // 136
    // a middle member of prototype chain: takes the prototype from the Parent                            // 137
    var Middle = function () {                                                                            // 138
      this.constructor = Child;                                                                           // 139
    };                                                                                                    // 140
    Middle.prototype = Parent.prototype;                                                                  // 141
    Child.prototype = new Middle();                                                                       // 142
    Child.__super__ = Parent.prototype;                                                                   // 143
    return Child;                                                                                         // 144
  }                                                                                                       // 145
});                                                                                                       // 146
                                                                                                          // 147
var warnedAboutWrapAsync = false;                                                                         // 148
                                                                                                          // 149
/**                                                                                                       // 150
 * @deprecated in 0.9.3                                                                                   // 151
 */                                                                                                       // 152
Meteor._wrapAsync = function(fn, context) {                                                               // 153
  if (! warnedAboutWrapAsync) {                                                                           // 154
    Meteor._debug("Meteor._wrapAsync has been renamed to Meteor.wrapAsync");                              // 155
    warnedAboutWrapAsync = true;                                                                          // 156
  }                                                                                                       // 157
  return Meteor.wrapAsync.apply(Meteor, arguments);                                                       // 158
};                                                                                                        // 159
                                                                                                          // 160
function logErr(err) {                                                                                    // 161
  if (err) {                                                                                              // 162
    return Meteor._debug(                                                                                 // 163
      "Exception in callback of async function",                                                          // 164
      err.stack ? err.stack : err                                                                         // 165
    );                                                                                                    // 166
  }                                                                                                       // 167
}                                                                                                         // 168
                                                                                                          // 169
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 255
                                                                                                                 // 256
}).call(this);                                                                                                   // 257
                                                                                                                 // 258
                                                                                                                 // 259
                                                                                                                 // 260
                                                                                                                 // 261
                                                                                                                 // 262
                                                                                                                 // 263
(function(){                                                                                                     // 264
                                                                                                                 // 265
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 266
//                                                                                                        //     // 267
// packages/meteor/setimmediate.js                                                                        //     // 268
//                                                                                                        //     // 269
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 270
                                                                                                          //     // 271
// Chooses one of three setImmediate implementations:                                                     // 1   // 272
//                                                                                                        // 2   // 273
// * Native setImmediate (IE 10, Node 0.9+)                                                               // 3   // 274
//                                                                                                        // 4   // 275
// * postMessage (many browsers)                                                                          // 5   // 276
//                                                                                                        // 6   // 277
// * setTimeout  (fallback)                                                                               // 7   // 278
//                                                                                                        // 8   // 279
// The postMessage implementation is based on                                                             // 9   // 280
// https://github.com/NobleJS/setImmediate/tree/1.0.1                                                     // 10  // 281
//                                                                                                        // 11  // 282
// Don't use `nextTick` for Node since it runs its callbacks before                                       // 12  // 283
// I/O, which is stricter than we're looking for.                                                         // 13  // 284
//                                                                                                        // 14  // 285
// Not installed as a polyfill, as our public API is `Meteor.defer`.                                      // 15  // 286
// Since we're not trying to be a polyfill, we have some                                                  // 16  // 287
// simplifications:                                                                                       // 17  // 288
//                                                                                                        // 18  // 289
// If one invocation of a setImmediate callback pauses itself by a                                        // 19  // 290
// call to alert/prompt/showModelDialog, the NobleJS polyfill                                             // 20  // 291
// implementation ensured that no setImmedate callback would run until                                    // 21  // 292
// the first invocation completed.  While correct per the spec, what it                                   // 22  // 293
// would mean for us in practice is that any reactive updates relying                                     // 23  // 294
// on Meteor.defer would be hung in the main window until the modal                                       // 24  // 295
// dialog was dismissed.  Thus we only ensure that a setImmediate                                         // 25  // 296
// function is called in a later event loop.                                                              // 26  // 297
//                                                                                                        // 27  // 298
// We don't need to support using a string to be eval'ed for the                                          // 28  // 299
// callback, arguments to the function, or clearImmediate.                                                // 29  // 300
                                                                                                          // 30  // 301
"use strict";                                                                                             // 31  // 302
                                                                                                          // 32  // 303
var global = this;                                                                                        // 33  // 304
                                                                                                          // 34  // 305
                                                                                                          // 35  // 306
// IE 10, Node >= 9.1                                                                                     // 36  // 307
                                                                                                          // 37  // 308
function useSetImmediate() {                                                                              // 38  // 309
  if (! global.setImmediate)                                                                              // 39  // 310
    return null;                                                                                          // 40  // 311
  else {                                                                                                  // 41  // 312
    var setImmediate = function (fn) {                                                                    // 42  // 313
      global.setImmediate(fn);                                                                            // 43  // 314
    };                                                                                                    // 44  // 315
    setImmediate.implementation = 'setImmediate';                                                         // 45  // 316
    return setImmediate;                                                                                  // 46  // 317
  }                                                                                                       // 47  // 318
}                                                                                                         // 48  // 319
                                                                                                          // 49  // 320
                                                                                                          // 50  // 321
// Android 2.3.6, Chrome 26, Firefox 20, IE 8-9, iOS 5.1.1 Safari                                         // 51  // 322
                                                                                                          // 52  // 323
function usePostMessage() {                                                                               // 53  // 324
  // The test against `importScripts` prevents this implementation                                        // 54  // 325
  // from being installed inside a web worker, where                                                      // 55  // 326
  // `global.postMessage` means something completely different and                                        // 56  // 327
  // can't be used for this purpose.                                                                      // 57  // 328
                                                                                                          // 58  // 329
  if (!global.postMessage || global.importScripts) {                                                      // 59  // 330
    return null;                                                                                          // 60  // 331
  }                                                                                                       // 61  // 332
                                                                                                          // 62  // 333
  // Avoid synchronous post message implementations.                                                      // 63  // 334
                                                                                                          // 64  // 335
  var postMessageIsAsynchronous = true;                                                                   // 65  // 336
  var oldOnMessage = global.onmessage;                                                                    // 66  // 337
  global.onmessage = function () {                                                                        // 67  // 338
      postMessageIsAsynchronous = false;                                                                  // 68  // 339
  };                                                                                                      // 69  // 340
  global.postMessage("", "*");                                                                            // 70  // 341
  global.onmessage = oldOnMessage;                                                                        // 71  // 342
                                                                                                          // 72  // 343
  if (! postMessageIsAsynchronous)                                                                        // 73  // 344
    return null;                                                                                          // 74  // 345
                                                                                                          // 75  // 346
  var funcIndex = 0;                                                                                      // 76  // 347
  var funcs = {};                                                                                         // 77  // 348
                                                                                                          // 78  // 349
  // Installs an event handler on `global` for the `message` event: see                                   // 79  // 350
  // * https://developer.mozilla.org/en/DOM/window.postMessage                                            // 80  // 351
  // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages       // 81  // 352
                                                                                                          // 82  // 353
  // XXX use Random.id() here?                                                                            // 83  // 354
  var MESSAGE_PREFIX = "Meteor._setImmediate." + Math.random() + '.';                                     // 84  // 355
                                                                                                          // 85  // 356
  function isStringAndStartsWith(string, putativeStart) {                                                 // 86  // 357
    return (typeof string === "string" &&                                                                 // 87  // 358
            string.substring(0, putativeStart.length) === putativeStart);                                 // 88  // 359
  }                                                                                                       // 89  // 360
                                                                                                          // 90  // 361
  function onGlobalMessage(event) {                                                                       // 91  // 362
    // This will catch all incoming messages (even from other                                             // 92  // 363
    // windows!), so we need to try reasonably hard to avoid letting                                      // 93  // 364
    // anyone else trick us into firing off. We test the origin is                                        // 94  // 365
    // still this window, and that a (randomly generated)                                                 // 95  // 366
    // unpredictable identifying prefix is present.                                                       // 96  // 367
    if (event.source === global &&                                                                        // 97  // 368
        isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {                                              // 98  // 369
      var index = event.data.substring(MESSAGE_PREFIX.length);                                            // 99  // 370
      try {                                                                                               // 100
        if (funcs[index])                                                                                 // 101
          funcs[index]();                                                                                 // 102
      }                                                                                                   // 103
      finally {                                                                                           // 104
        delete funcs[index];                                                                              // 105
      }                                                                                                   // 106
    }                                                                                                     // 107
  }                                                                                                       // 108
                                                                                                          // 109
  if (global.addEventListener) {                                                                          // 110
    global.addEventListener("message", onGlobalMessage, false);                                           // 111
  } else {                                                                                                // 112
    global.attachEvent("onmessage", onGlobalMessage);                                                     // 113
  }                                                                                                       // 114
                                                                                                          // 115
  var setImmediate = function (fn) {                                                                      // 116
    // Make `global` post a message to itself with the handle and                                         // 117
    // identifying prefix, thus asynchronously invoking our                                               // 118
    // onGlobalMessage listener above.                                                                    // 119
    ++funcIndex;                                                                                          // 120
    funcs[funcIndex] = fn;                                                                                // 121
    global.postMessage(MESSAGE_PREFIX + funcIndex, "*");                                                  // 122
  };                                                                                                      // 123
  setImmediate.implementation = 'postMessage';                                                            // 124
  return setImmediate;                                                                                    // 125
}                                                                                                         // 126
                                                                                                          // 127
                                                                                                          // 128
function useTimeout() {                                                                                   // 129
  var setImmediate = function (fn) {                                                                      // 130
    global.setTimeout(fn, 0);                                                                             // 131
  };                                                                                                      // 132
  setImmediate.implementation = 'setTimeout';                                                             // 133
  return setImmediate;                                                                                    // 134
}                                                                                                         // 135
                                                                                                          // 136
                                                                                                          // 137
Meteor._setImmediate =                                                                                    // 138
  useSetImmediate() ||                                                                                    // 139
  usePostMessage() ||                                                                                     // 140
  useTimeout();                                                                                           // 141
                                                                                                          // 142
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 414
                                                                                                                 // 415
}).call(this);                                                                                                   // 416
                                                                                                                 // 417
                                                                                                                 // 418
                                                                                                                 // 419
                                                                                                                 // 420
                                                                                                                 // 421
                                                                                                                 // 422
(function(){                                                                                                     // 423
                                                                                                                 // 424
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 425
//                                                                                                        //     // 426
// packages/meteor/timers.js                                                                              //     // 427
//                                                                                                        //     // 428
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 429
                                                                                                          //     // 430
var withoutInvocation = function (f) {                                                                    // 1   // 431
  if (Package.ddp) {                                                                                      // 2   // 432
    var _CurrentInvocation = Package.ddp.DDP._CurrentInvocation;                                          // 3   // 433
    if (_CurrentInvocation.get() && _CurrentInvocation.get().isSimulation)                                // 4   // 434
      throw new Error("Can't set timers inside simulations");                                             // 5   // 435
    return function () { _CurrentInvocation.withValue(null, f); };                                        // 6   // 436
  }                                                                                                       // 7   // 437
  else                                                                                                    // 8   // 438
    return f;                                                                                             // 9   // 439
};                                                                                                        // 10  // 440
                                                                                                          // 11  // 441
var bindAndCatch = function (context, f) {                                                                // 12  // 442
  return Meteor.bindEnvironment(withoutInvocation(f), context);                                           // 13  // 443
};                                                                                                        // 14  // 444
                                                                                                          // 15  // 445
_.extend(Meteor, {                                                                                        // 16  // 446
  // Meteor.setTimeout and Meteor.setInterval callbacks scheduled                                         // 17  // 447
  // inside a server method are not part of the method invocation and                                     // 18  // 448
  // should clear out the CurrentInvocation environment variable.                                         // 19  // 449
                                                                                                          // 20  // 450
  /**                                                                                                     // 21  // 451
   * @memberOf Meteor                                                                                     // 22  // 452
   * @summary Call a function in the future after waiting for a specified delay.                          // 23  // 453
   * @locus Anywhere                                                                                      // 24  // 454
   * @param {Function} func The function to run                                                           // 25  // 455
   * @param {Number} delay Number of milliseconds to wait before calling function                         // 26  // 456
   */                                                                                                     // 27  // 457
  setTimeout: function (f, duration) {                                                                    // 28  // 458
    return setTimeout(bindAndCatch("setTimeout callback", f), duration);                                  // 29  // 459
  },                                                                                                      // 30  // 460
                                                                                                          // 31  // 461
  /**                                                                                                     // 32  // 462
   * @memberOf Meteor                                                                                     // 33  // 463
   * @summary Call a function repeatedly, with a time delay between calls.                                // 34  // 464
   * @locus Anywhere                                                                                      // 35  // 465
   * @param {Function} func The function to run                                                           // 36  // 466
   * @param {Number} delay Number of milliseconds to wait between each function call.                     // 37  // 467
   */                                                                                                     // 38  // 468
  setInterval: function (f, duration) {                                                                   // 39  // 469
    return setInterval(bindAndCatch("setInterval callback", f), duration);                                // 40  // 470
  },                                                                                                      // 41  // 471
                                                                                                          // 42  // 472
  /**                                                                                                     // 43  // 473
   * @memberOf Meteor                                                                                     // 44  // 474
   * @summary Cancel a repeating function call scheduled by `Meteor.setInterval`.                         // 45  // 475
   * @locus Anywhere                                                                                      // 46  // 476
   * @param {Number} id The handle returned by `Meteor.setInterval`                                       // 47  // 477
   */                                                                                                     // 48  // 478
  clearInterval: function(x) {                                                                            // 49  // 479
    return clearInterval(x);                                                                              // 50  // 480
  },                                                                                                      // 51  // 481
                                                                                                          // 52  // 482
  /**                                                                                                     // 53  // 483
   * @memberOf Meteor                                                                                     // 54  // 484
   * @summary Cancel a function call scheduled by `Meteor.setTimeout`.                                    // 55  // 485
   * @locus Anywhere                                                                                      // 56  // 486
   * @param {Number} id The handle returned by `Meteor.setTimeout`                                        // 57  // 487
   */                                                                                                     // 58  // 488
  clearTimeout: function(x) {                                                                             // 59  // 489
    return clearTimeout(x);                                                                               // 60  // 490
  },                                                                                                      // 61  // 491
                                                                                                          // 62  // 492
  // XXX consider making this guarantee ordering of defer'd callbacks, like                               // 63  // 493
  // Tracker.afterFlush or Node's nextTick (in practice). Then tests can do:                              // 64  // 494
  //    callSomethingThatDefersSomeWork();                                                                // 65  // 495
  //    Meteor.defer(expect(somethingThatValidatesThatTheWorkHappened));                                  // 66  // 496
  defer: function (f) {                                                                                   // 67  // 497
    Meteor._setImmediate(bindAndCatch("defer callback", f));                                              // 68  // 498
  }                                                                                                       // 69  // 499
});                                                                                                       // 70  // 500
                                                                                                          // 71  // 501
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 502
                                                                                                                 // 503
}).call(this);                                                                                                   // 504
                                                                                                                 // 505
                                                                                                                 // 506
                                                                                                                 // 507
                                                                                                                 // 508
                                                                                                                 // 509
                                                                                                                 // 510
(function(){                                                                                                     // 511
                                                                                                                 // 512
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 513
//                                                                                                        //     // 514
// packages/meteor/errors.js                                                                              //     // 515
//                                                                                                        //     // 516
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 517
                                                                                                          //     // 518
// Makes an error subclass which properly contains a stack trace in most                                  // 1   // 519
// environments. constructor can set fields on `this` (and should probably set                            // 2   // 520
// `message`, which is what gets displayed at the top of a stack trace).                                  // 3   // 521
//                                                                                                        // 4   // 522
Meteor.makeErrorType = function (name, constructor) {                                                     // 5   // 523
  var errorClass = function (/*arguments*/) {                                                             // 6   // 524
    var self = this;                                                                                      // 7   // 525
                                                                                                          // 8   // 526
    // Ensure we get a proper stack trace in most Javascript environments                                 // 9   // 527
    if (Error.captureStackTrace) {                                                                        // 10  // 528
      // V8 environments (Chrome and Node.js)                                                             // 11  // 529
      Error.captureStackTrace(self, errorClass);                                                          // 12  // 530
    } else {                                                                                              // 13  // 531
      // Firefox                                                                                          // 14  // 532
      var e = new Error;                                                                                  // 15  // 533
      e.__proto__ = errorClass.prototype;                                                                 // 16  // 534
      if (e instanceof errorClass)                                                                        // 17  // 535
        self = e;                                                                                         // 18  // 536
    }                                                                                                     // 19  // 537
    // Safari magically works.                                                                            // 20  // 538
                                                                                                          // 21  // 539
    constructor.apply(self, arguments);                                                                   // 22  // 540
                                                                                                          // 23  // 541
    self.errorType = name;                                                                                // 24  // 542
                                                                                                          // 25  // 543
    return self;                                                                                          // 26  // 544
  };                                                                                                      // 27  // 545
                                                                                                          // 28  // 546
  Meteor._inherits(errorClass, Error);                                                                    // 29  // 547
                                                                                                          // 30  // 548
  return errorClass;                                                                                      // 31  // 549
};                                                                                                        // 32  // 550
                                                                                                          // 33  // 551
// This should probably be in the livedata package, but we don't want                                     // 34  // 552
// to require you to use the livedata package to get it. Eventually we                                    // 35  // 553
// should probably rename it to DDP.Error and put it back in the                                          // 36  // 554
// 'livedata' package (which we should rename to 'ddp' also.)                                             // 37  // 555
//                                                                                                        // 38  // 556
// Note: The DDP server assumes that Meteor.Error EJSON-serializes as an object                           // 39  // 557
// containing 'error' and optionally 'reason' and 'details'.                                              // 40  // 558
// The DDP client manually puts these into Meteor.Error objects. (We don't use                            // 41  // 559
// EJSON.addType here because the type is determined by location in the                                   // 42  // 560
// protocol, not text on the wire.)                                                                       // 43  // 561
                                                                                                          // 44  // 562
/**                                                                                                       // 45  // 563
 * @summary This class represents a symbolic error thrown by a method.                                    // 46  // 564
 * @locus Anywhere                                                                                        // 47  // 565
 * @class                                                                                                 // 48  // 566
 * @param {String} error A string code uniquely identifying this kind of error.                           // 49  // 567
 * This string should be used by callers of the method to determine the                                   // 50  // 568
 * appropriate action to take, instead of attempting to parse the reason                                  // 51  // 569
 * or details fields. For example:                                                                        // 52  // 570
 *                                                                                                        // 53  // 571
 * ```                                                                                                    // 54  // 572
 * // on the server, pick a code unique to this error                                                     // 55  // 573
 * // the reason field should be a useful debug message                                                   // 56  // 574
 * throw new Meteor.Error("logged-out",                                                                   // 57  // 575
 *   "The user must be logged in to post a comment.");                                                    // 58  // 576
 *                                                                                                        // 59  // 577
 * // on the client                                                                                       // 60  // 578
 * Meteor.call("methodName", function (error) {                                                           // 61  // 579
 *   // identify the error                                                                                // 62  // 580
 *   if (error && error.error === "logged-out") {                                                         // 63  // 581
 *     // show a nice error message                                                                       // 64  // 582
 *     Session.set("errorMessage", "Please log in to post a comment.");                                   // 65  // 583
 *   }                                                                                                    // 66  // 584
 * });                                                                                                    // 67  // 585
 * ```                                                                                                    // 68  // 586
 *                                                                                                        // 69  // 587
 * For legacy reasons, some built-in Meteor functions such as `check` throw                               // 70  // 588
 * errors with a number in this field.                                                                    // 71  // 589
 *                                                                                                        // 72  // 590
 * @param {String} [reason] Optional.  A short human-readable summary of the                              // 73  // 591
 * error, like 'Not Found'.                                                                               // 74  // 592
 * @param {String} [details] Optional.  Additional information about the error,                           // 75  // 593
 * like a textual stack trace.                                                                            // 76  // 594
 */                                                                                                       // 77  // 595
Meteor.Error = Meteor.makeErrorType(                                                                      // 78  // 596
  "Meteor.Error",                                                                                         // 79  // 597
  function (error, reason, details) {                                                                     // 80  // 598
    var self = this;                                                                                      // 81  // 599
                                                                                                          // 82  // 600
    // String code uniquely identifying this kind of error.                                               // 83  // 601
    self.error = error;                                                                                   // 84  // 602
                                                                                                          // 85  // 603
    // Optional: A short human-readable summary of the error. Not                                         // 86  // 604
    // intended to be shown to end users, just developers. ("Not Found",                                  // 87  // 605
    // "Internal Server Error")                                                                           // 88  // 606
    self.reason = reason;                                                                                 // 89  // 607
                                                                                                          // 90  // 608
    // Optional: Additional information about the error, say for                                          // 91  // 609
    // debugging. It might be a (textual) stack trace if the server is                                    // 92  // 610
    // willing to provide one. The corresponding thing in HTTP would be                                   // 93  // 611
    // the body of a 404 or 500 response. (The difference is that we                                      // 94  // 612
    // never expect this to be shown to end users, only developers, so                                    // 95  // 613
    // it doesn't need to be pretty.)                                                                     // 96  // 614
    self.details = details;                                                                               // 97  // 615
                                                                                                          // 98  // 616
    // This is what gets displayed at the top of a stack trace. Current                                   // 99  // 617
    // format is "[404]" (if no reason is set) or "File not found [404]"                                  // 100
    if (self.reason)                                                                                      // 101
      self.message = self.reason + ' [' + self.error + ']';                                               // 102
    else                                                                                                  // 103
      self.message = '[' + self.error + ']';                                                              // 104
  });                                                                                                     // 105
                                                                                                          // 106
// Meteor.Error is basically data and is sent over DDP, so you should be able to                          // 107
// properly EJSON-clone it. This is especially important because if a                                     // 108
// Meteor.Error is thrown through a Future, the error, reason, and details                                // 109
// properties become non-enumerable so a standard Object clone won't preserve                             // 110
// them and they will be lost from DDP.                                                                   // 111
Meteor.Error.prototype.clone = function () {                                                              // 112
  var self = this;                                                                                        // 113
  return new Meteor.Error(self.error, self.reason, self.details);                                         // 114
};                                                                                                        // 115
                                                                                                          // 116
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 635
                                                                                                                 // 636
}).call(this);                                                                                                   // 637
                                                                                                                 // 638
                                                                                                                 // 639
                                                                                                                 // 640
                                                                                                                 // 641
                                                                                                                 // 642
                                                                                                                 // 643
(function(){                                                                                                     // 644
                                                                                                                 // 645
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 646
//                                                                                                        //     // 647
// packages/meteor/fiber_stubs_client.js                                                                  //     // 648
//                                                                                                        //     // 649
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 650
                                                                                                          //     // 651
// This file is a partial analogue to fiber_helpers.js, which allows the client                           // 1   // 652
// to use a queue too, and also to call noYieldsAllowed.                                                  // 2   // 653
                                                                                                          // 3   // 654
// The client has no ability to yield, so noYieldsAllowed is a noop.                                      // 4   // 655
//                                                                                                        // 5   // 656
Meteor._noYieldsAllowed = function (f) {                                                                  // 6   // 657
  return f();                                                                                             // 7   // 658
};                                                                                                        // 8   // 659
                                                                                                          // 9   // 660
// An even simpler queue of tasks than the fiber-enabled one.  This one just                              // 10  // 661
// runs all the tasks when you call runTask or flush, synchronously.                                      // 11  // 662
//                                                                                                        // 12  // 663
Meteor._SynchronousQueue = function () {                                                                  // 13  // 664
  var self = this;                                                                                        // 14  // 665
  self._tasks = [];                                                                                       // 15  // 666
  self._running = false;                                                                                  // 16  // 667
  self._runTimeout = null;                                                                                // 17  // 668
};                                                                                                        // 18  // 669
                                                                                                          // 19  // 670
_.extend(Meteor._SynchronousQueue.prototype, {                                                            // 20  // 671
  runTask: function (task) {                                                                              // 21  // 672
    var self = this;                                                                                      // 22  // 673
    if (!self.safeToRunTask())                                                                            // 23  // 674
      throw new Error("Could not synchronously run a task from a running task");                          // 24  // 675
    self._tasks.push(task);                                                                               // 25  // 676
    var tasks = self._tasks;                                                                              // 26  // 677
    self._tasks = [];                                                                                     // 27  // 678
    self._running = true;                                                                                 // 28  // 679
                                                                                                          // 29  // 680
    if (self._runTimeout) {                                                                               // 30  // 681
      // Since we're going to drain the queue, we can forget about the timeout                            // 31  // 682
      // which tries to run it.  (But if one of our tasks queues something else,                          // 32  // 683
      // the timeout will be correctly re-created.)                                                       // 33  // 684
      clearTimeout(self._runTimeout);                                                                     // 34  // 685
      self._runTimeout = null;                                                                            // 35  // 686
    }                                                                                                     // 36  // 687
                                                                                                          // 37  // 688
    try {                                                                                                 // 38  // 689
      while (!_.isEmpty(tasks)) {                                                                         // 39  // 690
        var t = tasks.shift();                                                                            // 40  // 691
        try {                                                                                             // 41  // 692
          t();                                                                                            // 42  // 693
        } catch (e) {                                                                                     // 43  // 694
          if (_.isEmpty(tasks)) {                                                                         // 44  // 695
            // this was the last task, that is, the one we're calling runTask                             // 45  // 696
            // for.                                                                                       // 46  // 697
            throw e;                                                                                      // 47  // 698
          } else {                                                                                        // 48  // 699
            Meteor._debug("Exception in queued task: " + (e.stack || e));                                 // 49  // 700
          }                                                                                               // 50  // 701
        }                                                                                                 // 51  // 702
      }                                                                                                   // 52  // 703
    } finally {                                                                                           // 53  // 704
      self._running = false;                                                                              // 54  // 705
    }                                                                                                     // 55  // 706
  },                                                                                                      // 56  // 707
                                                                                                          // 57  // 708
  queueTask: function (task) {                                                                            // 58  // 709
    var self = this;                                                                                      // 59  // 710
    self._tasks.push(task);                                                                               // 60  // 711
    // Intentionally not using Meteor.setTimeout, because it doesn't like runing                          // 61  // 712
    // in stubs for now.                                                                                  // 62  // 713
    if (!self._runTimeout) {                                                                              // 63  // 714
      self._runTimeout = setTimeout(_.bind(self.flush, self), 0);                                         // 64  // 715
    }                                                                                                     // 65  // 716
  },                                                                                                      // 66  // 717
                                                                                                          // 67  // 718
  flush: function () {                                                                                    // 68  // 719
    var self = this;                                                                                      // 69  // 720
    self.runTask(function () {});                                                                         // 70  // 721
  },                                                                                                      // 71  // 722
                                                                                                          // 72  // 723
  drain: function () {                                                                                    // 73  // 724
    var self = this;                                                                                      // 74  // 725
    if (!self.safeToRunTask())                                                                            // 75  // 726
      return;                                                                                             // 76  // 727
    while (!_.isEmpty(self._tasks)) {                                                                     // 77  // 728
      self.flush();                                                                                       // 78  // 729
    }                                                                                                     // 79  // 730
  },                                                                                                      // 80  // 731
                                                                                                          // 81  // 732
  safeToRunTask: function () {                                                                            // 82  // 733
    var self = this;                                                                                      // 83  // 734
    return !self._running;                                                                                // 84  // 735
  }                                                                                                       // 85  // 736
});                                                                                                       // 86  // 737
                                                                                                          // 87  // 738
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 739
                                                                                                                 // 740
}).call(this);                                                                                                   // 741
                                                                                                                 // 742
                                                                                                                 // 743
                                                                                                                 // 744
                                                                                                                 // 745
                                                                                                                 // 746
                                                                                                                 // 747
(function(){                                                                                                     // 748
                                                                                                                 // 749
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 750
//                                                                                                        //     // 751
// packages/meteor/startup_client.js                                                                      //     // 752
//                                                                                                        //     // 753
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 754
                                                                                                          //     // 755
var queue = [];                                                                                           // 1   // 756
var loaded = !Meteor.isCordova &&                                                                         // 2   // 757
  (document.readyState === "loaded" || document.readyState == "complete");                                // 3   // 758
                                                                                                          // 4   // 759
var awaitingEventsCount = 1;                                                                              // 5   // 760
var ready = function() {                                                                                  // 6   // 761
  awaitingEventsCount--;                                                                                  // 7   // 762
  if (awaitingEventsCount > 0)                                                                            // 8   // 763
    return;                                                                                               // 9   // 764
                                                                                                          // 10  // 765
  loaded = true;                                                                                          // 11  // 766
  var runStartupCallbacks = function () {                                                                 // 12  // 767
    if (Meteor.isCordova) {                                                                               // 13  // 768
      if (! cordova.plugins || ! cordova.plugins.CordovaUpdate) {                                         // 14  // 769
        // XXX This timeout should not be necessary.                                                      // 15  // 770
        // Cordova indicates that all the cordova plugins files have been loaded                          // 16  // 771
        // and plugins are ready to be used when the "deviceready" callback                               // 17  // 772
        // fires. Even though we wait for the "deviceready" event, plugins                                // 18  // 773
        // have been observed to still not be ready (likely a Cordova bug).                               // 19  // 774
        // We check the availability of the Cordova-Update plugin (the only                               // 20  // 775
        // plugin that we always include for sure) and retry a bit later if it                            // 21  // 776
        // is nowhere to be found. Experiments have found that either all                                 // 22  // 777
        // plugins are attached or none.                                                                  // 23  // 778
        Meteor.setTimeout(runStartupCallbacks, 20);                                                       // 24  // 779
        return;                                                                                           // 25  // 780
      }                                                                                                   // 26  // 781
    }                                                                                                     // 27  // 782
                                                                                                          // 28  // 783
    while (queue.length)                                                                                  // 29  // 784
      (queue.shift())();                                                                                  // 30  // 785
  };                                                                                                      // 31  // 786
  runStartupCallbacks();                                                                                  // 32  // 787
};                                                                                                        // 33  // 788
                                                                                                          // 34  // 789
if (document.addEventListener) {                                                                          // 35  // 790
  document.addEventListener('DOMContentLoaded', ready, false);                                            // 36  // 791
                                                                                                          // 37  // 792
  if (Meteor.isCordova) {                                                                                 // 38  // 793
    awaitingEventsCount++;                                                                                // 39  // 794
    document.addEventListener('deviceready', ready, false);                                               // 40  // 795
  }                                                                                                       // 41  // 796
                                                                                                          // 42  // 797
  window.addEventListener('load', ready, false);                                                          // 43  // 798
} else {                                                                                                  // 44  // 799
  document.attachEvent('onreadystatechange', function () {                                                // 45  // 800
    if (document.readyState === "complete")                                                               // 46  // 801
      ready();                                                                                            // 47  // 802
  });                                                                                                     // 48  // 803
  window.attachEvent('load', ready);                                                                      // 49  // 804
}                                                                                                         // 50  // 805
                                                                                                          // 51  // 806
/**                                                                                                       // 52  // 807
 * @summary Run code when a client or a server starts.                                                    // 53  // 808
 * @locus Anywhere                                                                                        // 54  // 809
 * @param {Function} func A function to run on startup.                                                   // 55  // 810
 */                                                                                                       // 56  // 811
Meteor.startup = function (cb) {                                                                          // 57  // 812
  var doScroll = !document.addEventListener &&                                                            // 58  // 813
    document.documentElement.doScroll;                                                                    // 59  // 814
                                                                                                          // 60  // 815
  if (!doScroll || window !== top) {                                                                      // 61  // 816
    if (loaded)                                                                                           // 62  // 817
      cb();                                                                                               // 63  // 818
    else                                                                                                  // 64  // 819
      queue.push(cb);                                                                                     // 65  // 820
  } else {                                                                                                // 66  // 821
    try { doScroll('left'); }                                                                             // 67  // 822
    catch (e) {                                                                                           // 68  // 823
      setTimeout(function() { Meteor.startup(cb); }, 50);                                                 // 69  // 824
      return;                                                                                             // 70  // 825
    };                                                                                                    // 71  // 826
    cb();                                                                                                 // 72  // 827
  }                                                                                                       // 73  // 828
};                                                                                                        // 74  // 829
                                                                                                          // 75  // 830
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 831
                                                                                                                 // 832
}).call(this);                                                                                                   // 833
                                                                                                                 // 834
                                                                                                                 // 835
                                                                                                                 // 836
                                                                                                                 // 837
                                                                                                                 // 838
                                                                                                                 // 839
(function(){                                                                                                     // 840
                                                                                                                 // 841
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 842
//                                                                                                        //     // 843
// packages/meteor/debug.js                                                                               //     // 844
//                                                                                                        //     // 845
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 846
                                                                                                          //     // 847
var suppress = 0;                                                                                         // 1   // 848
                                                                                                          // 2   // 849
// replacement for console.log. This is a temporary API. We should                                        // 3   // 850
// provide a real logging API soon (possibly just a polyfill for                                          // 4   // 851
// console?)                                                                                              // 5   // 852
//                                                                                                        // 6   // 853
// NOTE: this is used on the server to print the warning about                                            // 7   // 854
// having autopublish enabled when you probably meant to turn it                                          // 8   // 855
// off. it's not really the proper use of something called                                                // 9   // 856
// _debug. the intent is for this message to go to the terminal and                                       // 10  // 857
// be very visible. if you change _debug to go someplace else, etc,                                       // 11  // 858
// please fix the autopublish code to do something reasonable.                                            // 12  // 859
//                                                                                                        // 13  // 860
Meteor._debug = function (/* arguments */) {                                                              // 14  // 861
  if (suppress) {                                                                                         // 15  // 862
    suppress--;                                                                                           // 16  // 863
    return;                                                                                               // 17  // 864
  }                                                                                                       // 18  // 865
  if (typeof console !== 'undefined' &&                                                                   // 19  // 866
      typeof console.log !== 'undefined') {                                                               // 20  // 867
    if (arguments.length == 0) { // IE Companion breaks otherwise                                         // 21  // 868
      // IE10 PP4 requires at least one argument                                                          // 22  // 869
      console.log('');                                                                                    // 23  // 870
    } else {                                                                                              // 24  // 871
      // IE doesn't have console.log.apply, it's not a real Object.                                       // 25  // 872
      // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9                  // 26  // 873
      // http://patik.com/blog/complete-cross-browser-console-log/                                        // 27  // 874
      if (typeof console.log.apply === "function") {                                                      // 28  // 875
        // Most browsers                                                                                  // 29  // 876
                                                                                                          // 30  // 877
        // Chrome and Safari only hyperlink URLs to source files in first argument of                     // 31  // 878
        // console.log, so try to call it with one argument if possible.                                  // 32  // 879
        // Approach taken here: If all arguments are strings, join them on space.                         // 33  // 880
        // See https://github.com/meteor/meteor/pull/732#issuecomment-13975991                            // 34  // 881
        var allArgumentsOfTypeString = true;                                                              // 35  // 882
        for (var i = 0; i < arguments.length; i++)                                                        // 36  // 883
          if (typeof arguments[i] !== "string")                                                           // 37  // 884
            allArgumentsOfTypeString = false;                                                             // 38  // 885
                                                                                                          // 39  // 886
        if (allArgumentsOfTypeString)                                                                     // 40  // 887
          console.log.apply(console, [Array.prototype.join.call(arguments, " ")]);                        // 41  // 888
        else                                                                                              // 42  // 889
          console.log.apply(console, arguments);                                                          // 43  // 890
                                                                                                          // 44  // 891
      } else if (typeof Function.prototype.bind === "function") {                                         // 45  // 892
        // IE9                                                                                            // 46  // 893
        var log = Function.prototype.bind.call(console.log, console);                                     // 47  // 894
        log.apply(console, arguments);                                                                    // 48  // 895
      } else {                                                                                            // 49  // 896
        // IE8                                                                                            // 50  // 897
        Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));        // 51  // 898
      }                                                                                                   // 52  // 899
    }                                                                                                     // 53  // 900
  }                                                                                                       // 54  // 901
};                                                                                                        // 55  // 902
                                                                                                          // 56  // 903
// Suppress the next 'count' Meteor._debug messsages. Use this to                                         // 57  // 904
// stop tests from spamming the console.                                                                  // 58  // 905
//                                                                                                        // 59  // 906
Meteor._suppress_log = function (count) {                                                                 // 60  // 907
  suppress += count;                                                                                      // 61  // 908
};                                                                                                        // 62  // 909
                                                                                                          // 63  // 910
Meteor._supressed_log_expected = function () {                                                            // 64  // 911
  return suppress !== 0;                                                                                  // 65  // 912
};                                                                                                        // 66  // 913
                                                                                                          // 67  // 914
                                                                                                          // 68  // 915
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 916
                                                                                                                 // 917
}).call(this);                                                                                                   // 918
                                                                                                                 // 919
                                                                                                                 // 920
                                                                                                                 // 921
                                                                                                                 // 922
                                                                                                                 // 923
                                                                                                                 // 924
(function(){                                                                                                     // 925
                                                                                                                 // 926
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 927
//                                                                                                        //     // 928
// packages/meteor/string_utils.js                                                                        //     // 929
//                                                                                                        //     // 930
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 931
                                                                                                          //     // 932
// Like Perl's quotemeta: quotes all regexp metacharacters.                                               // 1   // 933
// Code taken from                                                                                        // 2   // 934
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions                      // 3   // 935
Meteor._escapeRegExp = function (string) {                                                                // 4   // 936
    return String(string).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");                                         // 5   // 937
};                                                                                                        // 6   // 938
                                                                                                          // 7   // 939
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 940
                                                                                                                 // 941
}).call(this);                                                                                                   // 942
                                                                                                                 // 943
                                                                                                                 // 944
                                                                                                                 // 945
                                                                                                                 // 946
                                                                                                                 // 947
                                                                                                                 // 948
(function(){                                                                                                     // 949
                                                                                                                 // 950
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 951
//                                                                                                        //     // 952
// packages/meteor/dynamics_browser.js                                                                    //     // 953
//                                                                                                        //     // 954
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 955
                                                                                                          //     // 956
// Simple implementation of dynamic scoping, for use in browsers                                          // 1   // 957
                                                                                                          // 2   // 958
var nextSlot = 0;                                                                                         // 3   // 959
var currentValues = [];                                                                                   // 4   // 960
                                                                                                          // 5   // 961
Meteor.EnvironmentVariable = function () {                                                                // 6   // 962
  this.slot = nextSlot++;                                                                                 // 7   // 963
};                                                                                                        // 8   // 964
                                                                                                          // 9   // 965
_.extend(Meteor.EnvironmentVariable.prototype, {                                                          // 10  // 966
  get: function () {                                                                                      // 11  // 967
    return currentValues[this.slot];                                                                      // 12  // 968
  },                                                                                                      // 13  // 969
                                                                                                          // 14  // 970
  getOrNullIfOutsideFiber: function () {                                                                  // 15  // 971
    return this.get();                                                                                    // 16  // 972
  },                                                                                                      // 17  // 973
                                                                                                          // 18  // 974
  withValue: function (value, func) {                                                                     // 19  // 975
    var saved = currentValues[this.slot];                                                                 // 20  // 976
    try {                                                                                                 // 21  // 977
      currentValues[this.slot] = value;                                                                   // 22  // 978
      var ret = func();                                                                                   // 23  // 979
    } finally {                                                                                           // 24  // 980
      currentValues[this.slot] = saved;                                                                   // 25  // 981
    }                                                                                                     // 26  // 982
    return ret;                                                                                           // 27  // 983
  }                                                                                                       // 28  // 984
});                                                                                                       // 29  // 985
                                                                                                          // 30  // 986
Meteor.bindEnvironment = function (func, onException, _this) {                                            // 31  // 987
  // needed in order to be able to create closures inside func and                                        // 32  // 988
  // have the closed variables not change back to their original                                          // 33  // 989
  // values                                                                                               // 34  // 990
  var boundValues = _.clone(currentValues);                                                               // 35  // 991
                                                                                                          // 36  // 992
  if (!onException || typeof(onException) === 'string') {                                                 // 37  // 993
    var description = onException || "callback of async function";                                        // 38  // 994
    onException = function (error) {                                                                      // 39  // 995
      Meteor._debug(                                                                                      // 40  // 996
        "Exception in " + description + ":",                                                              // 41  // 997
        error && error.stack || error                                                                     // 42  // 998
      );                                                                                                  // 43  // 999
    };                                                                                                    // 44  // 1000
  }                                                                                                       // 45  // 1001
                                                                                                          // 46  // 1002
  return function (/* arguments */) {                                                                     // 47  // 1003
    var savedValues = currentValues;                                                                      // 48  // 1004
    try {                                                                                                 // 49  // 1005
      currentValues = boundValues;                                                                        // 50  // 1006
      var ret = func.apply(_this, _.toArray(arguments));                                                  // 51  // 1007
    } catch (e) {                                                                                         // 52  // 1008
      // note: callback-hook currently relies on the fact that if onException                             // 53  // 1009
      // throws in the browser, the wrapped call throws.                                                  // 54  // 1010
      onException(e);                                                                                     // 55  // 1011
    } finally {                                                                                           // 56  // 1012
      currentValues = savedValues;                                                                        // 57  // 1013
    }                                                                                                     // 58  // 1014
    return ret;                                                                                           // 59  // 1015
  };                                                                                                      // 60  // 1016
};                                                                                                        // 61  // 1017
                                                                                                          // 62  // 1018
Meteor._nodeCodeMustBeInFiber = function () {                                                             // 63  // 1019
  // no-op on browser                                                                                     // 64  // 1020
};                                                                                                        // 65  // 1021
                                                                                                          // 66  // 1022
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1023
                                                                                                                 // 1024
}).call(this);                                                                                                   // 1025
                                                                                                                 // 1026
                                                                                                                 // 1027
                                                                                                                 // 1028
                                                                                                                 // 1029
                                                                                                                 // 1030
                                                                                                                 // 1031
(function(){                                                                                                     // 1032
                                                                                                                 // 1033
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1034
//                                                                                                        //     // 1035
// packages/meteor/url_common.js                                                                          //     // 1036
//                                                                                                        //     // 1037
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1038
                                                                                                          //     // 1039
/**                                                                                                       // 1   // 1040
 * @summary Generate an absolute URL pointing to the application. The server reads from the `ROOT_URL` environment variable to determine where it is running. This is taken care of automatically for apps deployed with `meteor deploy`, but must be provided when using `meteor build`.
 * @locus Anywhere                                                                                        // 3   // 1042
 * @param {String} [path] A path to append to the root URL. Do not include a leading "`/`".               // 4   // 1043
 * @param {Object} [options]                                                                              // 5   // 1044
 * @param {Boolean} options.secure Create an HTTPS URL.                                                   // 6   // 1045
 * @param {Boolean} options.replaceLocalhost Replace localhost with 127.0.0.1. Useful for services that don't recognize localhost as a domain name.
 * @param {String} options.rootUrl Override the default ROOT_URL from the server environment. For example: "`http://foo.example.com`"
 */                                                                                                       // 9   // 1048
Meteor.absoluteUrl = function (path, options) {                                                           // 10  // 1049
  // path is optional                                                                                     // 11  // 1050
  if (!options && typeof path === 'object') {                                                             // 12  // 1051
    options = path;                                                                                       // 13  // 1052
    path = undefined;                                                                                     // 14  // 1053
  }                                                                                                       // 15  // 1054
  // merge options with defaults                                                                          // 16  // 1055
  options = _.extend({}, Meteor.absoluteUrl.defaultOptions, options || {});                               // 17  // 1056
                                                                                                          // 18  // 1057
  var url = options.rootUrl;                                                                              // 19  // 1058
  if (!url)                                                                                               // 20  // 1059
    throw new Error("Must pass options.rootUrl or set ROOT_URL in the server environment");               // 21  // 1060
                                                                                                          // 22  // 1061
  if (!/^http[s]?:\/\//i.test(url)) // url starts with 'http://' or 'https://'                            // 23  // 1062
    url = 'http://' + url; // we will later fix to https if options.secure is set                         // 24  // 1063
                                                                                                          // 25  // 1064
  if (!/\/$/.test(url)) // url ends with '/'                                                              // 26  // 1065
    url += '/';                                                                                           // 27  // 1066
                                                                                                          // 28  // 1067
  if (path)                                                                                               // 29  // 1068
    url += path;                                                                                          // 30  // 1069
                                                                                                          // 31  // 1070
  // turn http to https if secure option is set, and we're not talking                                    // 32  // 1071
  // to localhost.                                                                                        // 33  // 1072
  if (options.secure &&                                                                                   // 34  // 1073
      /^http:/.test(url) && // url starts with 'http:'                                                    // 35  // 1074
      !/http:\/\/localhost[:\/]/.test(url) && // doesn't match localhost                                  // 36  // 1075
      !/http:\/\/127\.0\.0\.1[:\/]/.test(url)) // or 127.0.0.1                                            // 37  // 1076
    url = url.replace(/^http:/, 'https:');                                                                // 38  // 1077
                                                                                                          // 39  // 1078
  if (options.replaceLocalhost)                                                                           // 40  // 1079
    url = url.replace(/^http:\/\/localhost([:\/].*)/, 'http://127.0.0.1$1');                              // 41  // 1080
                                                                                                          // 42  // 1081
  return url;                                                                                             // 43  // 1082
};                                                                                                        // 44  // 1083
                                                                                                          // 45  // 1084
// allow later packages to override default options                                                       // 46  // 1085
Meteor.absoluteUrl.defaultOptions = { };                                                                  // 47  // 1086
if (typeof __meteor_runtime_config__ === "object" &&                                                      // 48  // 1087
    __meteor_runtime_config__.ROOT_URL)                                                                   // 49  // 1088
  Meteor.absoluteUrl.defaultOptions.rootUrl = __meteor_runtime_config__.ROOT_URL;                         // 50  // 1089
                                                                                                          // 51  // 1090
                                                                                                          // 52  // 1091
Meteor._relativeToSiteRootUrl = function (link) {                                                         // 53  // 1092
  if (typeof __meteor_runtime_config__ === "object" &&                                                    // 54  // 1093
      link.substr(0, 1) === "/")                                                                          // 55  // 1094
    link = (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || "") + link;                                 // 56  // 1095
  return link;                                                                                            // 57  // 1096
};                                                                                                        // 58  // 1097
                                                                                                          // 59  // 1098
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1099
                                                                                                                 // 1100
}).call(this);                                                                                                   // 1101
                                                                                                                 // 1102
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.meteor = {
  Meteor: Meteor
};

})();
