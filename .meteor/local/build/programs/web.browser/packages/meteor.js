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
// packages/meteor/helpers.js                                                                             //     // 56
//                                                                                                        //     // 57
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 58
                                                                                                          //     // 59
if (Meteor.isServer)                                                                                      // 1   // 60
  var Future = Npm.require('fibers/future');                                                              // 2   // 61
                                                                                                          // 3   // 62
if (typeof __meteor_runtime_config__ === 'object' &&                                                      // 4   // 63
    __meteor_runtime_config__.meteorRelease) {                                                            // 5   // 64
  /**                                                                                                     // 6   // 65
   * @summary `Meteor.release` is a string containing the name of the [release](#meteorupdate) with which the project was built (for example, `"1.2.3"`). It is `undefined` if the project was built using a git checkout of Meteor.
   * @locus Anywhere                                                                                      // 8   // 67
   * @type {String}                                                                                       // 9   // 68
   */                                                                                                     // 10  // 69
  Meteor.release = __meteor_runtime_config__.meteorRelease;                                               // 11  // 70
}                                                                                                         // 12  // 71
                                                                                                          // 13  // 72
// XXX find a better home for these? Ideally they would be _.get,                                         // 14  // 73
// _.ensure, _.delete..                                                                                   // 15  // 74
                                                                                                          // 16  // 75
_.extend(Meteor, {                                                                                        // 17  // 76
  // _get(a,b,c,d) returns a[b][c][d], or else undefined if a[b] or                                       // 18  // 77
  // a[b][c] doesn't exist.                                                                               // 19  // 78
  //                                                                                                      // 20  // 79
  _get: function (obj /*, arguments */) {                                                                 // 21  // 80
    for (var i = 1; i < arguments.length; i++) {                                                          // 22  // 81
      if (!(arguments[i] in obj))                                                                         // 23  // 82
        return undefined;                                                                                 // 24  // 83
      obj = obj[arguments[i]];                                                                            // 25  // 84
    }                                                                                                     // 26  // 85
    return obj;                                                                                           // 27  // 86
  },                                                                                                      // 28  // 87
                                                                                                          // 29  // 88
  // _ensure(a,b,c,d) ensures that a[b][c][d] exists. If it does not,                                     // 30  // 89
  // it is created and set to {}. Either way, it is returned.                                             // 31  // 90
  //                                                                                                      // 32  // 91
  _ensure: function (obj /*, arguments */) {                                                              // 33  // 92
    for (var i = 1; i < arguments.length; i++) {                                                          // 34  // 93
      var key = arguments[i];                                                                             // 35  // 94
      if (!(key in obj))                                                                                  // 36  // 95
        obj[key] = {};                                                                                    // 37  // 96
      obj = obj[key];                                                                                     // 38  // 97
    }                                                                                                     // 39  // 98
                                                                                                          // 40  // 99
    return obj;                                                                                           // 41  // 100
  },                                                                                                      // 42  // 101
                                                                                                          // 43  // 102
  // _delete(a, b, c, d) deletes a[b][c][d], then a[b][c] unless it                                       // 44  // 103
  // isn't empty, then a[b] unless it isn't empty.                                                        // 45  // 104
  //                                                                                                      // 46  // 105
  _delete: function (obj /*, arguments */) {                                                              // 47  // 106
    var stack = [obj];                                                                                    // 48  // 107
    var leaf = true;                                                                                      // 49  // 108
    for (var i = 1; i < arguments.length - 1; i++) {                                                      // 50  // 109
      var key = arguments[i];                                                                             // 51  // 110
      if (!(key in obj)) {                                                                                // 52  // 111
        leaf = false;                                                                                     // 53  // 112
        break;                                                                                            // 54  // 113
      }                                                                                                   // 55  // 114
      obj = obj[key];                                                                                     // 56  // 115
      if (typeof obj !== "object")                                                                        // 57  // 116
        break;                                                                                            // 58  // 117
      stack.push(obj);                                                                                    // 59  // 118
    }                                                                                                     // 60  // 119
                                                                                                          // 61  // 120
    for (var i = stack.length - 1; i >= 0; i--) {                                                         // 62  // 121
      var key = arguments[i+1];                                                                           // 63  // 122
                                                                                                          // 64  // 123
      if (leaf)                                                                                           // 65  // 124
        leaf = false;                                                                                     // 66  // 125
      else                                                                                                // 67  // 126
        for (var other in stack[i][key])                                                                  // 68  // 127
          return; // not empty -- we're done                                                              // 69  // 128
                                                                                                          // 70  // 129
      delete stack[i][key];                                                                               // 71  // 130
    }                                                                                                     // 72  // 131
  },                                                                                                      // 73  // 132
                                                                                                          // 74  // 133
  // wrapAsync can wrap any function that takes some number of arguments that                             // 75  // 134
  // can't be undefined, followed by some optional arguments, where the callback                          // 76  // 135
  // is the last optional argument.                                                                       // 77  // 136
  // e.g. fs.readFile(pathname, [callback]),                                                              // 78  // 137
  // fs.open(pathname, flags, [mode], [callback])                                                         // 79  // 138
  // For maximum effectiveness and least confusion, wrapAsync should be used on                           // 80  // 139
  // functions where the callback is the only argument of type Function.                                  // 81  // 140
                                                                                                          // 82  // 141
  /**                                                                                                     // 83  // 142
   * @memberOf Meteor                                                                                     // 84  // 143
   * @summary Wrap a function that takes a callback function as its final parameter. The signature of the callback of the wrapped function should be `function(error, result){}`. On the server, the wrapped function can be used either synchronously (without passing a callback) or asynchronously (when a callback is passed). On the client, a callback is always required; errors will be logged if there is no callback. If a callback is provided, the environment captured when the original function was called will be restored in the callback.
   * @locus Anywhere                                                                                      // 86  // 145
   * @param {Function} func A function that takes a callback as its final parameter                       // 87  // 146
   * @param {Object} [context] Optional `this` object against which the original function will be invoked        // 147
   */                                                                                                     // 89  // 148
  wrapAsync: function (fn, context) {                                                                     // 90  // 149
    return function (/* arguments */) {                                                                   // 91  // 150
      var self = context || this;                                                                         // 92  // 151
      var newArgs = _.toArray(arguments);                                                                 // 93  // 152
      var callback;                                                                                       // 94  // 153
                                                                                                          // 95  // 154
      for (var i = newArgs.length - 1; i >= 0; --i) {                                                     // 96  // 155
        var arg = newArgs[i];                                                                             // 97  // 156
        var type = typeof arg;                                                                            // 98  // 157
        if (type !== "undefined") {                                                                       // 99  // 158
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 229
                                                                                                                 // 230
}).call(this);                                                                                                   // 231
                                                                                                                 // 232
                                                                                                                 // 233
                                                                                                                 // 234
                                                                                                                 // 235
                                                                                                                 // 236
                                                                                                                 // 237
(function(){                                                                                                     // 238
                                                                                                                 // 239
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 240
//                                                                                                        //     // 241
// packages/meteor/setimmediate.js                                                                        //     // 242
//                                                                                                        //     // 243
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 244
                                                                                                          //     // 245
// Chooses one of three setImmediate implementations:                                                     // 1   // 246
//                                                                                                        // 2   // 247
// * Native setImmediate (IE 10, Node 0.9+)                                                               // 3   // 248
//                                                                                                        // 4   // 249
// * postMessage (many browsers)                                                                          // 5   // 250
//                                                                                                        // 6   // 251
// * setTimeout  (fallback)                                                                               // 7   // 252
//                                                                                                        // 8   // 253
// The postMessage implementation is based on                                                             // 9   // 254
// https://github.com/NobleJS/setImmediate/tree/1.0.1                                                     // 10  // 255
//                                                                                                        // 11  // 256
// Don't use `nextTick` for Node since it runs its callbacks before                                       // 12  // 257
// I/O, which is stricter than we're looking for.                                                         // 13  // 258
//                                                                                                        // 14  // 259
// Not installed as a polyfill, as our public API is `Meteor.defer`.                                      // 15  // 260
// Since we're not trying to be a polyfill, we have some                                                  // 16  // 261
// simplifications:                                                                                       // 17  // 262
//                                                                                                        // 18  // 263
// If one invocation of a setImmediate callback pauses itself by a                                        // 19  // 264
// call to alert/prompt/showModelDialog, the NobleJS polyfill                                             // 20  // 265
// implementation ensured that no setImmedate callback would run until                                    // 21  // 266
// the first invocation completed.  While correct per the spec, what it                                   // 22  // 267
// would mean for us in practice is that any reactive updates relying                                     // 23  // 268
// on Meteor.defer would be hung in the main window until the modal                                       // 24  // 269
// dialog was dismissed.  Thus we only ensure that a setImmediate                                         // 25  // 270
// function is called in a later event loop.                                                              // 26  // 271
//                                                                                                        // 27  // 272
// We don't need to support using a string to be eval'ed for the                                          // 28  // 273
// callback, arguments to the function, or clearImmediate.                                                // 29  // 274
                                                                                                          // 30  // 275
"use strict";                                                                                             // 31  // 276
                                                                                                          // 32  // 277
var global = this;                                                                                        // 33  // 278
                                                                                                          // 34  // 279
                                                                                                          // 35  // 280
// IE 10, Node >= 9.1                                                                                     // 36  // 281
                                                                                                          // 37  // 282
function useSetImmediate() {                                                                              // 38  // 283
  if (! global.setImmediate)                                                                              // 39  // 284
    return null;                                                                                          // 40  // 285
  else {                                                                                                  // 41  // 286
    var setImmediate = function (fn) {                                                                    // 42  // 287
      global.setImmediate(fn);                                                                            // 43  // 288
    };                                                                                                    // 44  // 289
    setImmediate.implementation = 'setImmediate';                                                         // 45  // 290
    return setImmediate;                                                                                  // 46  // 291
  }                                                                                                       // 47  // 292
}                                                                                                         // 48  // 293
                                                                                                          // 49  // 294
                                                                                                          // 50  // 295
// Android 2.3.6, Chrome 26, Firefox 20, IE 8-9, iOS 5.1.1 Safari                                         // 51  // 296
                                                                                                          // 52  // 297
function usePostMessage() {                                                                               // 53  // 298
  // The test against `importScripts` prevents this implementation                                        // 54  // 299
  // from being installed inside a web worker, where                                                      // 55  // 300
  // `global.postMessage` means something completely different and                                        // 56  // 301
  // can't be used for this purpose.                                                                      // 57  // 302
                                                                                                          // 58  // 303
  if (!global.postMessage || global.importScripts) {                                                      // 59  // 304
    return null;                                                                                          // 60  // 305
  }                                                                                                       // 61  // 306
                                                                                                          // 62  // 307
  // Avoid synchronous post message implementations.                                                      // 63  // 308
                                                                                                          // 64  // 309
  var postMessageIsAsynchronous = true;                                                                   // 65  // 310
  var oldOnMessage = global.onmessage;                                                                    // 66  // 311
  global.onmessage = function () {                                                                        // 67  // 312
      postMessageIsAsynchronous = false;                                                                  // 68  // 313
  };                                                                                                      // 69  // 314
  global.postMessage("", "*");                                                                            // 70  // 315
  global.onmessage = oldOnMessage;                                                                        // 71  // 316
                                                                                                          // 72  // 317
  if (! postMessageIsAsynchronous)                                                                        // 73  // 318
    return null;                                                                                          // 74  // 319
                                                                                                          // 75  // 320
  var funcIndex = 0;                                                                                      // 76  // 321
  var funcs = {};                                                                                         // 77  // 322
                                                                                                          // 78  // 323
  // Installs an event handler on `global` for the `message` event: see                                   // 79  // 324
  // * https://developer.mozilla.org/en/DOM/window.postMessage                                            // 80  // 325
  // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages       // 81  // 326
                                                                                                          // 82  // 327
  // XXX use Random.id() here?                                                                            // 83  // 328
  var MESSAGE_PREFIX = "Meteor._setImmediate." + Math.random() + '.';                                     // 84  // 329
                                                                                                          // 85  // 330
  function isStringAndStartsWith(string, putativeStart) {                                                 // 86  // 331
    return (typeof string === "string" &&                                                                 // 87  // 332
            string.substring(0, putativeStart.length) === putativeStart);                                 // 88  // 333
  }                                                                                                       // 89  // 334
                                                                                                          // 90  // 335
  function onGlobalMessage(event) {                                                                       // 91  // 336
    // This will catch all incoming messages (even from other                                             // 92  // 337
    // windows!), so we need to try reasonably hard to avoid letting                                      // 93  // 338
    // anyone else trick us into firing off. We test the origin is                                        // 94  // 339
    // still this window, and that a (randomly generated)                                                 // 95  // 340
    // unpredictable identifying prefix is present.                                                       // 96  // 341
    if (event.source === global &&                                                                        // 97  // 342
        isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {                                              // 98  // 343
      var index = event.data.substring(MESSAGE_PREFIX.length);                                            // 99  // 344
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 388
                                                                                                                 // 389
}).call(this);                                                                                                   // 390
                                                                                                                 // 391
                                                                                                                 // 392
                                                                                                                 // 393
                                                                                                                 // 394
                                                                                                                 // 395
                                                                                                                 // 396
(function(){                                                                                                     // 397
                                                                                                                 // 398
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 399
//                                                                                                        //     // 400
// packages/meteor/timers.js                                                                              //     // 401
//                                                                                                        //     // 402
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 403
                                                                                                          //     // 404
var withoutInvocation = function (f) {                                                                    // 1   // 405
  if (Package.ddp) {                                                                                      // 2   // 406
    var _CurrentInvocation = Package.ddp.DDP._CurrentInvocation;                                          // 3   // 407
    if (_CurrentInvocation.get() && _CurrentInvocation.get().isSimulation)                                // 4   // 408
      throw new Error("Can't set timers inside simulations");                                             // 5   // 409
    return function () { _CurrentInvocation.withValue(null, f); };                                        // 6   // 410
  }                                                                                                       // 7   // 411
  else                                                                                                    // 8   // 412
    return f;                                                                                             // 9   // 413
};                                                                                                        // 10  // 414
                                                                                                          // 11  // 415
var bindAndCatch = function (context, f) {                                                                // 12  // 416
  return Meteor.bindEnvironment(withoutInvocation(f), context);                                           // 13  // 417
};                                                                                                        // 14  // 418
                                                                                                          // 15  // 419
_.extend(Meteor, {                                                                                        // 16  // 420
  // Meteor.setTimeout and Meteor.setInterval callbacks scheduled                                         // 17  // 421
  // inside a server method are not part of the method invocation and                                     // 18  // 422
  // should clear out the CurrentInvocation environment variable.                                         // 19  // 423
                                                                                                          // 20  // 424
  /**                                                                                                     // 21  // 425
   * @memberOf Meteor                                                                                     // 22  // 426
   * @summary Call a function in the future after waiting for a specified delay.                          // 23  // 427
   * @locus Anywhere                                                                                      // 24  // 428
   * @param {Function} func The function to run                                                           // 25  // 429
   * @param {Number} delay Number of milliseconds to wait before calling function                         // 26  // 430
   */                                                                                                     // 27  // 431
  setTimeout: function (f, duration) {                                                                    // 28  // 432
    return setTimeout(bindAndCatch("setTimeout callback", f), duration);                                  // 29  // 433
  },                                                                                                      // 30  // 434
                                                                                                          // 31  // 435
  /**                                                                                                     // 32  // 436
   * @memberOf Meteor                                                                                     // 33  // 437
   * @summary Call a function repeatedly, with a time delay between calls.                                // 34  // 438
   * @locus Anywhere                                                                                      // 35  // 439
   * @param {Function} func The function to run                                                           // 36  // 440
   * @param {Number} delay Number of milliseconds to wait between each function call.                     // 37  // 441
   */                                                                                                     // 38  // 442
  setInterval: function (f, duration) {                                                                   // 39  // 443
    return setInterval(bindAndCatch("setInterval callback", f), duration);                                // 40  // 444
  },                                                                                                      // 41  // 445
                                                                                                          // 42  // 446
  /**                                                                                                     // 43  // 447
   * @memberOf Meteor                                                                                     // 44  // 448
   * @summary Cancel a repeating function call scheduled by `Meteor.setInterval`.                         // 45  // 449
   * @locus Anywhere                                                                                      // 46  // 450
   * @param {Number} id The handle returned by `Meteor.setInterval`                                       // 47  // 451
   */                                                                                                     // 48  // 452
  clearInterval: function(x) {                                                                            // 49  // 453
    return clearInterval(x);                                                                              // 50  // 454
  },                                                                                                      // 51  // 455
                                                                                                          // 52  // 456
  /**                                                                                                     // 53  // 457
   * @memberOf Meteor                                                                                     // 54  // 458
   * @summary Cancel a function call scheduled by `Meteor.setTimeout`.                                    // 55  // 459
   * @locus Anywhere                                                                                      // 56  // 460
   * @param {Number} id The handle returned by `Meteor.setTimeout`                                        // 57  // 461
   */                                                                                                     // 58  // 462
  clearTimeout: function(x) {                                                                             // 59  // 463
    return clearTimeout(x);                                                                               // 60  // 464
  },                                                                                                      // 61  // 465
                                                                                                          // 62  // 466
  // XXX consider making this guarantee ordering of defer'd callbacks, like                               // 63  // 467
  // Tracker.afterFlush or Node's nextTick (in practice). Then tests can do:                              // 64  // 468
  //    callSomethingThatDefersSomeWork();                                                                // 65  // 469
  //    Meteor.defer(expect(somethingThatValidatesThatTheWorkHappened));                                  // 66  // 470
  defer: function (f) {                                                                                   // 67  // 471
    Meteor._setImmediate(bindAndCatch("defer callback", f));                                              // 68  // 472
  }                                                                                                       // 69  // 473
});                                                                                                       // 70  // 474
                                                                                                          // 71  // 475
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 476
                                                                                                                 // 477
}).call(this);                                                                                                   // 478
                                                                                                                 // 479
                                                                                                                 // 480
                                                                                                                 // 481
                                                                                                                 // 482
                                                                                                                 // 483
                                                                                                                 // 484
(function(){                                                                                                     // 485
                                                                                                                 // 486
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 487
//                                                                                                        //     // 488
// packages/meteor/errors.js                                                                              //     // 489
//                                                                                                        //     // 490
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 491
                                                                                                          //     // 492
// Makes an error subclass which properly contains a stack trace in most                                  // 1   // 493
// environments. constructor can set fields on `this` (and should probably set                            // 2   // 494
// `message`, which is what gets displayed at the top of a stack trace).                                  // 3   // 495
//                                                                                                        // 4   // 496
Meteor.makeErrorType = function (name, constructor) {                                                     // 5   // 497
  var errorClass = function (/*arguments*/) {                                                             // 6   // 498
    var self = this;                                                                                      // 7   // 499
                                                                                                          // 8   // 500
    // Ensure we get a proper stack trace in most Javascript environments                                 // 9   // 501
    if (Error.captureStackTrace) {                                                                        // 10  // 502
      // V8 environments (Chrome and Node.js)                                                             // 11  // 503
      Error.captureStackTrace(self, errorClass);                                                          // 12  // 504
    } else {                                                                                              // 13  // 505
      // Firefox                                                                                          // 14  // 506
      var e = new Error;                                                                                  // 15  // 507
      e.__proto__ = errorClass.prototype;                                                                 // 16  // 508
      if (e instanceof errorClass)                                                                        // 17  // 509
        self = e;                                                                                         // 18  // 510
    }                                                                                                     // 19  // 511
    // Safari magically works.                                                                            // 20  // 512
                                                                                                          // 21  // 513
    constructor.apply(self, arguments);                                                                   // 22  // 514
                                                                                                          // 23  // 515
    self.errorType = name;                                                                                // 24  // 516
                                                                                                          // 25  // 517
    return self;                                                                                          // 26  // 518
  };                                                                                                      // 27  // 519
                                                                                                          // 28  // 520
  Meteor._inherits(errorClass, Error);                                                                    // 29  // 521
                                                                                                          // 30  // 522
  return errorClass;                                                                                      // 31  // 523
};                                                                                                        // 32  // 524
                                                                                                          // 33  // 525
// This should probably be in the livedata package, but we don't want                                     // 34  // 526
// to require you to use the livedata package to get it. Eventually we                                    // 35  // 527
// should probably rename it to DDP.Error and put it back in the                                          // 36  // 528
// 'livedata' package (which we should rename to 'ddp' also.)                                             // 37  // 529
//                                                                                                        // 38  // 530
// Note: The DDP server assumes that Meteor.Error EJSON-serializes as an object                           // 39  // 531
// containing 'error' and optionally 'reason' and 'details'.                                              // 40  // 532
// The DDP client manually puts these into Meteor.Error objects. (We don't use                            // 41  // 533
// EJSON.addType here because the type is determined by location in the                                   // 42  // 534
// protocol, not text on the wire.)                                                                       // 43  // 535
                                                                                                          // 44  // 536
/**                                                                                                       // 45  // 537
 * @summary This class represents a symbolic error thrown by a method.                                    // 46  // 538
 * @locus Anywhere                                                                                        // 47  // 539
 * @class                                                                                                 // 48  // 540
 * @param {String} error A string code uniquely identifying this kind of error.                           // 49  // 541
 * This string should be used by callers of the method to determine the                                   // 50  // 542
 * appropriate action to take, instead of attempting to parse the reason                                  // 51  // 543
 * or details fields. For example:                                                                        // 52  // 544
 *                                                                                                        // 53  // 545
 * ```                                                                                                    // 54  // 546
 * // on the server, pick a code unique to this error                                                     // 55  // 547
 * // the reason field should be a useful debug message                                                   // 56  // 548
 * throw new Meteor.Error("logged-out",                                                                   // 57  // 549
 *   "The user must be logged in to post a comment.");                                                    // 58  // 550
 *                                                                                                        // 59  // 551
 * // on the client                                                                                       // 60  // 552
 * Meteor.call("methodName", function (error) {                                                           // 61  // 553
 *   // identify the error                                                                                // 62  // 554
 *   if (error && error.error === "logged-out") {                                                         // 63  // 555
 *     // show a nice error message                                                                       // 64  // 556
 *     Session.set("errorMessage", "Please log in to post a comment.");                                   // 65  // 557
 *   }                                                                                                    // 66  // 558
 * });                                                                                                    // 67  // 559
 * ```                                                                                                    // 68  // 560
 *                                                                                                        // 69  // 561
 * For legacy reasons, some built-in Meteor functions such as `check` throw                               // 70  // 562
 * errors with a number in this field.                                                                    // 71  // 563
 *                                                                                                        // 72  // 564
 * @param {String} [reason] Optional.  A short human-readable summary of the                              // 73  // 565
 * error, like 'Not Found'.                                                                               // 74  // 566
 * @param {String} [details] Optional.  Additional information about the error,                           // 75  // 567
 * like a textual stack trace.                                                                            // 76  // 568
 */                                                                                                       // 77  // 569
Meteor.Error = Meteor.makeErrorType(                                                                      // 78  // 570
  "Meteor.Error",                                                                                         // 79  // 571
  function (error, reason, details) {                                                                     // 80  // 572
    var self = this;                                                                                      // 81  // 573
                                                                                                          // 82  // 574
    // String code uniquely identifying this kind of error.                                               // 83  // 575
    self.error = error;                                                                                   // 84  // 576
                                                                                                          // 85  // 577
    // Optional: A short human-readable summary of the error. Not                                         // 86  // 578
    // intended to be shown to end users, just developers. ("Not Found",                                  // 87  // 579
    // "Internal Server Error")                                                                           // 88  // 580
    self.reason = reason;                                                                                 // 89  // 581
                                                                                                          // 90  // 582
    // Optional: Additional information about the error, say for                                          // 91  // 583
    // debugging. It might be a (textual) stack trace if the server is                                    // 92  // 584
    // willing to provide one. The corresponding thing in HTTP would be                                   // 93  // 585
    // the body of a 404 or 500 response. (The difference is that we                                      // 94  // 586
    // never expect this to be shown to end users, only developers, so                                    // 95  // 587
    // it doesn't need to be pretty.)                                                                     // 96  // 588
    self.details = details;                                                                               // 97  // 589
                                                                                                          // 98  // 590
    // This is what gets displayed at the top of a stack trace. Current                                   // 99  // 591
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 609
                                                                                                                 // 610
}).call(this);                                                                                                   // 611
                                                                                                                 // 612
                                                                                                                 // 613
                                                                                                                 // 614
                                                                                                                 // 615
                                                                                                                 // 616
                                                                                                                 // 617
(function(){                                                                                                     // 618
                                                                                                                 // 619
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 620
//                                                                                                        //     // 621
// packages/meteor/fiber_stubs_client.js                                                                  //     // 622
//                                                                                                        //     // 623
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 624
                                                                                                          //     // 625
// This file is a partial analogue to fiber_helpers.js, which allows the client                           // 1   // 626
// to use a queue too, and also to call noYieldsAllowed.                                                  // 2   // 627
                                                                                                          // 3   // 628
// The client has no ability to yield, so noYieldsAllowed is a noop.                                      // 4   // 629
//                                                                                                        // 5   // 630
Meteor._noYieldsAllowed = function (f) {                                                                  // 6   // 631
  return f();                                                                                             // 7   // 632
};                                                                                                        // 8   // 633
                                                                                                          // 9   // 634
// An even simpler queue of tasks than the fiber-enabled one.  This one just                              // 10  // 635
// runs all the tasks when you call runTask or flush, synchronously.                                      // 11  // 636
//                                                                                                        // 12  // 637
Meteor._SynchronousQueue = function () {                                                                  // 13  // 638
  var self = this;                                                                                        // 14  // 639
  self._tasks = [];                                                                                       // 15  // 640
  self._running = false;                                                                                  // 16  // 641
  self._runTimeout = null;                                                                                // 17  // 642
};                                                                                                        // 18  // 643
                                                                                                          // 19  // 644
_.extend(Meteor._SynchronousQueue.prototype, {                                                            // 20  // 645
  runTask: function (task) {                                                                              // 21  // 646
    var self = this;                                                                                      // 22  // 647
    if (!self.safeToRunTask())                                                                            // 23  // 648
      throw new Error("Could not synchronously run a task from a running task");                          // 24  // 649
    self._tasks.push(task);                                                                               // 25  // 650
    var tasks = self._tasks;                                                                              // 26  // 651
    self._tasks = [];                                                                                     // 27  // 652
    self._running = true;                                                                                 // 28  // 653
                                                                                                          // 29  // 654
    if (self._runTimeout) {                                                                               // 30  // 655
      // Since we're going to drain the queue, we can forget about the timeout                            // 31  // 656
      // which tries to run it.  (But if one of our tasks queues something else,                          // 32  // 657
      // the timeout will be correctly re-created.)                                                       // 33  // 658
      clearTimeout(self._runTimeout);                                                                     // 34  // 659
      self._runTimeout = null;                                                                            // 35  // 660
    }                                                                                                     // 36  // 661
                                                                                                          // 37  // 662
    try {                                                                                                 // 38  // 663
      while (!_.isEmpty(tasks)) {                                                                         // 39  // 664
        var t = tasks.shift();                                                                            // 40  // 665
        try {                                                                                             // 41  // 666
          t();                                                                                            // 42  // 667
        } catch (e) {                                                                                     // 43  // 668
          if (_.isEmpty(tasks)) {                                                                         // 44  // 669
            // this was the last task, that is, the one we're calling runTask                             // 45  // 670
            // for.                                                                                       // 46  // 671
            throw e;                                                                                      // 47  // 672
          } else {                                                                                        // 48  // 673
            Meteor._debug("Exception in queued task: " + (e.stack || e));                                 // 49  // 674
          }                                                                                               // 50  // 675
        }                                                                                                 // 51  // 676
      }                                                                                                   // 52  // 677
    } finally {                                                                                           // 53  // 678
      self._running = false;                                                                              // 54  // 679
    }                                                                                                     // 55  // 680
  },                                                                                                      // 56  // 681
                                                                                                          // 57  // 682
  queueTask: function (task) {                                                                            // 58  // 683
    var self = this;                                                                                      // 59  // 684
    self._tasks.push(task);                                                                               // 60  // 685
    // Intentionally not using Meteor.setTimeout, because it doesn't like runing                          // 61  // 686
    // in stubs for now.                                                                                  // 62  // 687
    if (!self._runTimeout) {                                                                              // 63  // 688
      self._runTimeout = setTimeout(_.bind(self.flush, self), 0);                                         // 64  // 689
    }                                                                                                     // 65  // 690
  },                                                                                                      // 66  // 691
                                                                                                          // 67  // 692
  flush: function () {                                                                                    // 68  // 693
    var self = this;                                                                                      // 69  // 694
    self.runTask(function () {});                                                                         // 70  // 695
  },                                                                                                      // 71  // 696
                                                                                                          // 72  // 697
  drain: function () {                                                                                    // 73  // 698
    var self = this;                                                                                      // 74  // 699
    if (!self.safeToRunTask())                                                                            // 75  // 700
      return;                                                                                             // 76  // 701
    while (!_.isEmpty(self._tasks)) {                                                                     // 77  // 702
      self.flush();                                                                                       // 78  // 703
    }                                                                                                     // 79  // 704
  },                                                                                                      // 80  // 705
                                                                                                          // 81  // 706
  safeToRunTask: function () {                                                                            // 82  // 707
    var self = this;                                                                                      // 83  // 708
    return !self._running;                                                                                // 84  // 709
  }                                                                                                       // 85  // 710
});                                                                                                       // 86  // 711
                                                                                                          // 87  // 712
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 713
                                                                                                                 // 714
}).call(this);                                                                                                   // 715
                                                                                                                 // 716
                                                                                                                 // 717
                                                                                                                 // 718
                                                                                                                 // 719
                                                                                                                 // 720
                                                                                                                 // 721
(function(){                                                                                                     // 722
                                                                                                                 // 723
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 724
//                                                                                                        //     // 725
// packages/meteor/startup_client.js                                                                      //     // 726
//                                                                                                        //     // 727
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 728
                                                                                                          //     // 729
var queue = [];                                                                                           // 1   // 730
var loaded = !Meteor.isCordova &&                                                                         // 2   // 731
  (document.readyState === "loaded" || document.readyState == "complete");                                // 3   // 732
                                                                                                          // 4   // 733
var awaitingEventsCount = 1;                                                                              // 5   // 734
var ready = function() {                                                                                  // 6   // 735
  awaitingEventsCount--;                                                                                  // 7   // 736
  if (awaitingEventsCount > 0)                                                                            // 8   // 737
    return;                                                                                               // 9   // 738
                                                                                                          // 10  // 739
  loaded = true;                                                                                          // 11  // 740
  var runStartupCallbacks = function () {                                                                 // 12  // 741
    if (Meteor.isCordova) {                                                                               // 13  // 742
      if (! cordova.plugins || ! cordova.plugins.CordovaUpdate) {                                         // 14  // 743
        // XXX This timeout should not be necessary.                                                      // 15  // 744
        // Cordova indicates that all the cordova plugins files have been loaded                          // 16  // 745
        // and plugins are ready to be used when the "deviceready" callback                               // 17  // 746
        // fires. Even though we wait for the "deviceready" event, plugins                                // 18  // 747
        // have been observed to still not be ready (likely a Cordova bug).                               // 19  // 748
        // We check the availability of the Cordova-Update plugin (the only                               // 20  // 749
        // plugin that we always include for sure) and retry a bit later if it                            // 21  // 750
        // is nowhere to be found. Experiments have found that either all                                 // 22  // 751
        // plugins are attached or none.                                                                  // 23  // 752
        Meteor.setTimeout(runStartupCallbacks, 20);                                                       // 24  // 753
        return;                                                                                           // 25  // 754
      }                                                                                                   // 26  // 755
    }                                                                                                     // 27  // 756
                                                                                                          // 28  // 757
    while (queue.length)                                                                                  // 29  // 758
      (queue.shift())();                                                                                  // 30  // 759
  };                                                                                                      // 31  // 760
  runStartupCallbacks();                                                                                  // 32  // 761
};                                                                                                        // 33  // 762
                                                                                                          // 34  // 763
if (document.addEventListener) {                                                                          // 35  // 764
  document.addEventListener('DOMContentLoaded', ready, false);                                            // 36  // 765
                                                                                                          // 37  // 766
  if (Meteor.isCordova) {                                                                                 // 38  // 767
    awaitingEventsCount++;                                                                                // 39  // 768
    document.addEventListener('deviceready', ready, false);                                               // 40  // 769
  }                                                                                                       // 41  // 770
                                                                                                          // 42  // 771
  window.addEventListener('load', ready, false);                                                          // 43  // 772
} else {                                                                                                  // 44  // 773
  document.attachEvent('onreadystatechange', function () {                                                // 45  // 774
    if (document.readyState === "complete")                                                               // 46  // 775
      ready();                                                                                            // 47  // 776
  });                                                                                                     // 48  // 777
  window.attachEvent('load', ready);                                                                      // 49  // 778
}                                                                                                         // 50  // 779
                                                                                                          // 51  // 780
/**                                                                                                       // 52  // 781
 * @summary Run code when a client or a server starts.                                                    // 53  // 782
 * @locus Anywhere                                                                                        // 54  // 783
 * @param {Function} func A function to run on startup.                                                   // 55  // 784
 */                                                                                                       // 56  // 785
Meteor.startup = function (cb) {                                                                          // 57  // 786
  var doScroll = !document.addEventListener &&                                                            // 58  // 787
    document.documentElement.doScroll;                                                                    // 59  // 788
                                                                                                          // 60  // 789
  if (!doScroll || window !== top) {                                                                      // 61  // 790
    if (loaded)                                                                                           // 62  // 791
      cb();                                                                                               // 63  // 792
    else                                                                                                  // 64  // 793
      queue.push(cb);                                                                                     // 65  // 794
  } else {                                                                                                // 66  // 795
    try { doScroll('left'); }                                                                             // 67  // 796
    catch (e) {                                                                                           // 68  // 797
      setTimeout(function() { Meteor.startup(cb); }, 50);                                                 // 69  // 798
      return;                                                                                             // 70  // 799
    };                                                                                                    // 71  // 800
    cb();                                                                                                 // 72  // 801
  }                                                                                                       // 73  // 802
};                                                                                                        // 74  // 803
                                                                                                          // 75  // 804
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 805
                                                                                                                 // 806
}).call(this);                                                                                                   // 807
                                                                                                                 // 808
                                                                                                                 // 809
                                                                                                                 // 810
                                                                                                                 // 811
                                                                                                                 // 812
                                                                                                                 // 813
(function(){                                                                                                     // 814
                                                                                                                 // 815
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 816
//                                                                                                        //     // 817
// packages/meteor/debug.js                                                                               //     // 818
//                                                                                                        //     // 819
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 820
                                                                                                          //     // 821
var suppress = 0;                                                                                         // 1   // 822
                                                                                                          // 2   // 823
// replacement for console.log. This is a temporary API. We should                                        // 3   // 824
// provide a real logging API soon (possibly just a polyfill for                                          // 4   // 825
// console?)                                                                                              // 5   // 826
//                                                                                                        // 6   // 827
// NOTE: this is used on the server to print the warning about                                            // 7   // 828
// having autopublish enabled when you probably meant to turn it                                          // 8   // 829
// off. it's not really the proper use of something called                                                // 9   // 830
// _debug. the intent is for this message to go to the terminal and                                       // 10  // 831
// be very visible. if you change _debug to go someplace else, etc,                                       // 11  // 832
// please fix the autopublish code to do something reasonable.                                            // 12  // 833
//                                                                                                        // 13  // 834
Meteor._debug = function (/* arguments */) {                                                              // 14  // 835
  if (suppress) {                                                                                         // 15  // 836
    suppress--;                                                                                           // 16  // 837
    return;                                                                                               // 17  // 838
  }                                                                                                       // 18  // 839
  if (typeof console !== 'undefined' &&                                                                   // 19  // 840
      typeof console.log !== 'undefined') {                                                               // 20  // 841
    if (arguments.length == 0) { // IE Companion breaks otherwise                                         // 21  // 842
      // IE10 PP4 requires at least one argument                                                          // 22  // 843
      console.log('');                                                                                    // 23  // 844
    } else {                                                                                              // 24  // 845
      // IE doesn't have console.log.apply, it's not a real Object.                                       // 25  // 846
      // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9                  // 26  // 847
      // http://patik.com/blog/complete-cross-browser-console-log/                                        // 27  // 848
      if (typeof console.log.apply === "function") {                                                      // 28  // 849
        // Most browsers                                                                                  // 29  // 850
                                                                                                          // 30  // 851
        // Chrome and Safari only hyperlink URLs to source files in first argument of                     // 31  // 852
        // console.log, so try to call it with one argument if possible.                                  // 32  // 853
        // Approach taken here: If all arguments are strings, join them on space.                         // 33  // 854
        // See https://github.com/meteor/meteor/pull/732#issuecomment-13975991                            // 34  // 855
        var allArgumentsOfTypeString = true;                                                              // 35  // 856
        for (var i = 0; i < arguments.length; i++)                                                        // 36  // 857
          if (typeof arguments[i] !== "string")                                                           // 37  // 858
            allArgumentsOfTypeString = false;                                                             // 38  // 859
                                                                                                          // 39  // 860
        if (allArgumentsOfTypeString)                                                                     // 40  // 861
          console.log.apply(console, [Array.prototype.join.call(arguments, " ")]);                        // 41  // 862
        else                                                                                              // 42  // 863
          console.log.apply(console, arguments);                                                          // 43  // 864
                                                                                                          // 44  // 865
      } else if (typeof Function.prototype.bind === "function") {                                         // 45  // 866
        // IE9                                                                                            // 46  // 867
        var log = Function.prototype.bind.call(console.log, console);                                     // 47  // 868
        log.apply(console, arguments);                                                                    // 48  // 869
      } else {                                                                                            // 49  // 870
        // IE8                                                                                            // 50  // 871
        Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));        // 51  // 872
      }                                                                                                   // 52  // 873
    }                                                                                                     // 53  // 874
  }                                                                                                       // 54  // 875
};                                                                                                        // 55  // 876
                                                                                                          // 56  // 877
// Suppress the next 'count' Meteor._debug messsages. Use this to                                         // 57  // 878
// stop tests from spamming the console.                                                                  // 58  // 879
//                                                                                                        // 59  // 880
Meteor._suppress_log = function (count) {                                                                 // 60  // 881
  suppress += count;                                                                                      // 61  // 882
};                                                                                                        // 62  // 883
                                                                                                          // 63  // 884
Meteor._supressed_log_expected = function () {                                                            // 64  // 885
  return suppress !== 0;                                                                                  // 65  // 886
};                                                                                                        // 66  // 887
                                                                                                          // 67  // 888
                                                                                                          // 68  // 889
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 890
                                                                                                                 // 891
}).call(this);                                                                                                   // 892
                                                                                                                 // 893
                                                                                                                 // 894
                                                                                                                 // 895
                                                                                                                 // 896
                                                                                                                 // 897
                                                                                                                 // 898
(function(){                                                                                                     // 899
                                                                                                                 // 900
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 901
//                                                                                                        //     // 902
// packages/meteor/string_utils.js                                                                        //     // 903
//                                                                                                        //     // 904
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 905
                                                                                                          //     // 906
// Like Perl's quotemeta: quotes all regexp metacharacters.                                               // 1   // 907
// Code taken from                                                                                        // 2   // 908
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions                      // 3   // 909
Meteor._escapeRegExp = function (string) {                                                                // 4   // 910
    return String(string).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");                                         // 5   // 911
};                                                                                                        // 6   // 912
                                                                                                          // 7   // 913
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 914
                                                                                                                 // 915
}).call(this);                                                                                                   // 916
                                                                                                                 // 917
                                                                                                                 // 918
                                                                                                                 // 919
                                                                                                                 // 920
                                                                                                                 // 921
                                                                                                                 // 922
(function(){                                                                                                     // 923
                                                                                                                 // 924
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 925
//                                                                                                        //     // 926
// packages/meteor/dynamics_browser.js                                                                    //     // 927
//                                                                                                        //     // 928
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 929
                                                                                                          //     // 930
// Simple implementation of dynamic scoping, for use in browsers                                          // 1   // 931
                                                                                                          // 2   // 932
var nextSlot = 0;                                                                                         // 3   // 933
var currentValues = [];                                                                                   // 4   // 934
                                                                                                          // 5   // 935
Meteor.EnvironmentVariable = function () {                                                                // 6   // 936
  this.slot = nextSlot++;                                                                                 // 7   // 937
};                                                                                                        // 8   // 938
                                                                                                          // 9   // 939
_.extend(Meteor.EnvironmentVariable.prototype, {                                                          // 10  // 940
  get: function () {                                                                                      // 11  // 941
    return currentValues[this.slot];                                                                      // 12  // 942
  },                                                                                                      // 13  // 943
                                                                                                          // 14  // 944
  getOrNullIfOutsideFiber: function () {                                                                  // 15  // 945
    return this.get();                                                                                    // 16  // 946
  },                                                                                                      // 17  // 947
                                                                                                          // 18  // 948
  withValue: function (value, func) {                                                                     // 19  // 949
    var saved = currentValues[this.slot];                                                                 // 20  // 950
    try {                                                                                                 // 21  // 951
      currentValues[this.slot] = value;                                                                   // 22  // 952
      var ret = func();                                                                                   // 23  // 953
    } finally {                                                                                           // 24  // 954
      currentValues[this.slot] = saved;                                                                   // 25  // 955
    }                                                                                                     // 26  // 956
    return ret;                                                                                           // 27  // 957
  }                                                                                                       // 28  // 958
});                                                                                                       // 29  // 959
                                                                                                          // 30  // 960
Meteor.bindEnvironment = function (func, onException, _this) {                                            // 31  // 961
  // needed in order to be able to create closures inside func and                                        // 32  // 962
  // have the closed variables not change back to their original                                          // 33  // 963
  // values                                                                                               // 34  // 964
  var boundValues = _.clone(currentValues);                                                               // 35  // 965
                                                                                                          // 36  // 966
  if (!onException || typeof(onException) === 'string') {                                                 // 37  // 967
    var description = onException || "callback of async function";                                        // 38  // 968
    onException = function (error) {                                                                      // 39  // 969
      Meteor._debug(                                                                                      // 40  // 970
        "Exception in " + description + ":",                                                              // 41  // 971
        error && error.stack || error                                                                     // 42  // 972
      );                                                                                                  // 43  // 973
    };                                                                                                    // 44  // 974
  }                                                                                                       // 45  // 975
                                                                                                          // 46  // 976
  return function (/* arguments */) {                                                                     // 47  // 977
    var savedValues = currentValues;                                                                      // 48  // 978
    try {                                                                                                 // 49  // 979
      currentValues = boundValues;                                                                        // 50  // 980
      var ret = func.apply(_this, _.toArray(arguments));                                                  // 51  // 981
    } catch (e) {                                                                                         // 52  // 982
      // note: callback-hook currently relies on the fact that if onException                             // 53  // 983
      // throws in the browser, the wrapped call throws.                                                  // 54  // 984
      onException(e);                                                                                     // 55  // 985
    } finally {                                                                                           // 56  // 986
      currentValues = savedValues;                                                                        // 57  // 987
    }                                                                                                     // 58  // 988
    return ret;                                                                                           // 59  // 989
  };                                                                                                      // 60  // 990
};                                                                                                        // 61  // 991
                                                                                                          // 62  // 992
Meteor._nodeCodeMustBeInFiber = function () {                                                             // 63  // 993
  // no-op on browser                                                                                     // 64  // 994
};                                                                                                        // 65  // 995
                                                                                                          // 66  // 996
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 997
                                                                                                                 // 998
}).call(this);                                                                                                   // 999
                                                                                                                 // 1000
                                                                                                                 // 1001
                                                                                                                 // 1002
                                                                                                                 // 1003
                                                                                                                 // 1004
                                                                                                                 // 1005
(function(){                                                                                                     // 1006
                                                                                                                 // 1007
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1008
//                                                                                                        //     // 1009
// packages/meteor/url_common.js                                                                          //     // 1010
//                                                                                                        //     // 1011
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1012
                                                                                                          //     // 1013
/**                                                                                                       // 1   // 1014
 * @summary Generate an absolute URL pointing to the application. The server reads from the `ROOT_URL` environment variable to determine where it is running. This is taken care of automatically for apps deployed with `meteor deploy`, but must be provided when using `meteor build`.
 * @locus Anywhere                                                                                        // 3   // 1016
 * @param {String} [path] A path to append to the root URL. Do not include a leading "`/`".               // 4   // 1017
 * @param {Object} [options]                                                                              // 5   // 1018
 * @param {Boolean} options.secure Create an HTTPS URL.                                                   // 6   // 1019
 * @param {Boolean} options.replaceLocalhost Replace localhost with 127.0.0.1. Useful for services that don't recognize localhost as a domain name.
 * @param {String} options.rootUrl Override the default ROOT_URL from the server environment. For example: "`http://foo.example.com`"
 */                                                                                                       // 9   // 1022
Meteor.absoluteUrl = function (path, options) {                                                           // 10  // 1023
  // path is optional                                                                                     // 11  // 1024
  if (!options && typeof path === 'object') {                                                             // 12  // 1025
    options = path;                                                                                       // 13  // 1026
    path = undefined;                                                                                     // 14  // 1027
  }                                                                                                       // 15  // 1028
  // merge options with defaults                                                                          // 16  // 1029
  options = _.extend({}, Meteor.absoluteUrl.defaultOptions, options || {});                               // 17  // 1030
                                                                                                          // 18  // 1031
  var url = options.rootUrl;                                                                              // 19  // 1032
  if (!url)                                                                                               // 20  // 1033
    throw new Error("Must pass options.rootUrl or set ROOT_URL in the server environment");               // 21  // 1034
                                                                                                          // 22  // 1035
  if (!/^http[s]?:\/\//i.test(url)) // url starts with 'http://' or 'https://'                            // 23  // 1036
    url = 'http://' + url; // we will later fix to https if options.secure is set                         // 24  // 1037
                                                                                                          // 25  // 1038
  if (!/\/$/.test(url)) // url ends with '/'                                                              // 26  // 1039
    url += '/';                                                                                           // 27  // 1040
                                                                                                          // 28  // 1041
  if (path)                                                                                               // 29  // 1042
    url += path;                                                                                          // 30  // 1043
                                                                                                          // 31  // 1044
  // turn http to https if secure option is set, and we're not talking                                    // 32  // 1045
  // to localhost.                                                                                        // 33  // 1046
  if (options.secure &&                                                                                   // 34  // 1047
      /^http:/.test(url) && // url starts with 'http:'                                                    // 35  // 1048
      !/http:\/\/localhost[:\/]/.test(url) && // doesn't match localhost                                  // 36  // 1049
      !/http:\/\/127\.0\.0\.1[:\/]/.test(url)) // or 127.0.0.1                                            // 37  // 1050
    url = url.replace(/^http:/, 'https:');                                                                // 38  // 1051
                                                                                                          // 39  // 1052
  if (options.replaceLocalhost)                                                                           // 40  // 1053
    url = url.replace(/^http:\/\/localhost([:\/].*)/, 'http://127.0.0.1$1');                              // 41  // 1054
                                                                                                          // 42  // 1055
  return url;                                                                                             // 43  // 1056
};                                                                                                        // 44  // 1057
                                                                                                          // 45  // 1058
// allow later packages to override default options                                                       // 46  // 1059
Meteor.absoluteUrl.defaultOptions = { };                                                                  // 47  // 1060
if (typeof __meteor_runtime_config__ === "object" &&                                                      // 48  // 1061
    __meteor_runtime_config__.ROOT_URL)                                                                   // 49  // 1062
  Meteor.absoluteUrl.defaultOptions.rootUrl = __meteor_runtime_config__.ROOT_URL;                         // 50  // 1063
                                                                                                          // 51  // 1064
                                                                                                          // 52  // 1065
Meteor._relativeToSiteRootUrl = function (link) {                                                         // 53  // 1066
  if (typeof __meteor_runtime_config__ === "object" &&                                                    // 54  // 1067
      link.substr(0, 1) === "/")                                                                          // 55  // 1068
    link = (__meteor_runtime_config__.ROOT_URL_PATH_PREFIX || "") + link;                                 // 56  // 1069
  return link;                                                                                            // 57  // 1070
};                                                                                                        // 58  // 1071
                                                                                                          // 59  // 1072
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1073
                                                                                                                 // 1074
}).call(this);                                                                                                   // 1075
                                                                                                                 // 1076
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.meteor = {
  Meteor: Meteor
};

})();
