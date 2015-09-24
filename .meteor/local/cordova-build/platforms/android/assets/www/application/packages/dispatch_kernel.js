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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Kernel;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/dispatch_kernel/packages/dispatch_kernel.js                                                  //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
(function () {                                                                                           // 1
                                                                                                         // 2
////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                //     // 4
// packages/dispatch:kernel/kernel.js                                                             //     // 5
//                                                                                                //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                  //     // 8
////////////////////////////////////////////////////////////////////////////////                  // 1   // 9
// Kernel RaiX 2014                                                                               // 2   // 10
////////////////////////////////////////////////////////////////////////////////                  // 3   // 11
                                                                                                  // 4   // 12
// Timed functions                                                                                // 5   // 13
var timedFunctions = [];                                                                          // 6   // 14
                                                                                                  // 7   // 15
// General render engine                                                                          // 8   // 16
var renderFunctions = [];                                                                         // 9   // 17
                                                                                                  // 10  // 18
// Functions that will be run when theres time for it                                             // 11  // 19
var deferedFunctions = [];                                                                        // 12  // 20
                                                                                                  // 13  // 21
// Render loop global                                                                             // 14  // 22
Kernel = {};                                                                                      // 15  // 23
                                                                                                  // 16  // 24
// Max length of defered buffer                                                                   // 17  // 25
Kernel.maxDeferedLength = 100;                                                                    // 18  // 26
                                                                                                  // 19  // 27
// Debug flag                                                                                     // 20  // 28
Kernel.debug = false;                                                                             // 21  // 29
                                                                                                  // 22  // 30
// DOMHighResTimeStamp - High resolution timestamp polyfil                                        // 23  // 31
var Time = (window.performance && window.performance.now) ?                                       // 24  // 32
        window.performance : Date;                                                                // 25  // 33
                                                                                                  // 26  // 34
/**                                                                                               // 27  // 35
 * Return the current timestamp in high resolution                                                // 28  // 36
 * @return {Number}                                                                               // 29  // 37
 */                                                                                               // 30  // 38
Kernel.now = function() {                                                                         // 31  // 39
  return Time.now();                                                                              // 32  // 40
};                                                                                                // 33  // 41
                                                                                                  // 34  // 42
/**                                                                                               // 35  // 43
 * Run render function                                                                            // 36  // 44
 * @param  {function}   Function to run in frame                                                  // 37  // 45
 * @return {Kernel}                                                                               // 38  // 46
 */                                                                                               // 39  // 47
Kernel.onRender = function onRender(f) {                                                          // 40  // 48
  renderFunctions.push(f);                                                                        // 41  // 49
  return Kernel;                                                                                  // 42  // 50
};                                                                                                // 43  // 51
                                                                                                  // 44  // 52
/**                                                                                               // 45  // 53
 * Run function when theres time for it in the render loop                                        // 46  // 54
 * @param  {function}   Function to run in frame when time permits it                             // 47  // 55
 * @return {Kernel}                                                                               // 48  // 56
 */                                                                                               // 49  // 57
Kernel.defer = function defer(f) {                                                                // 50  // 58
  deferedFunctions.push(f);                                                                       // 51  // 59
  return Kernel;                                                                                  // 52  // 60
};                                                                                                // 53  // 61
                                                                                                  // 54  // 62
/**                                                                                               // 55  // 63
 * Run a function at a fixed timestamp                                                            // 56  // 64
 * @param  {function}                                                                             // 57  // 65
 * @param  {Number}                                                                               // 58  // 66
 * @return {Kernel}                                                                               // 59  // 67
 */                                                                                               // 60  // 68
Kernel.timed = function timed(f, runAt) {                                                         // 61  // 69
  timedFunctions.push({                                                                           // 62  // 70
    f: f,                                                                                         // 63  // 71
    runAt: runAt                                                                                  // 64  // 72
  });                                                                                             // 65  // 73
  return Kernel;                                                                                  // 66  // 74
};                                                                                                // 67  // 75
                                                                                                  // 68  // 76
var _nextTimerReferenceId = 0;                                                                    // 69  // 77
var _timerRunning = {};                                                                           // 70  // 78
                                                                                                  // 71  // 79
var _initTimer = function() {                                                                     // 72  // 80
  // Get id                                                                                       // 73  // 81
  var id = _nextTimerReferenceId++;                                                               // 74  // 82
  // Set the timer to run                                                                         // 75  // 83
  _timerRunning[id] = true;                                                                       // 76  // 84
  // Return id                                                                                    // 77  // 85
  return id;                                                                                      // 78  // 86
};                                                                                                // 79  // 87
                                                                                                  // 80  // 88
/**                                                                                               // 81  // 89
 * Kernel.setTimeout                                                                              // 82  // 90
 * @param {Function}                                                                              // 83  // 91
 * @param {delay}                                                                                 // 84  // 92
 */                                                                                               // 85  // 93
Kernel.setTimeout = function(f, delay) {                                                          // 86  // 94
  // Initialize timer reference                                                                   // 87  // 95
  var id = _initTimer();                                                                          // 88  // 96
                                                                                                  // 89  // 97
  Kernel.timed(function() {                                                                       // 90  // 98
    if (_timerRunning[id]) {                                                                      // 91  // 99
      // Run the function                                                                         // 92  // 100
      f();                                                                                        // 93  // 101
    }                                                                                             // 94  // 102
  }, Kernel.now() + delay);                                                                       // 95  // 103
                                                                                                  // 96  // 104
  // Return clear id                                                                              // 97  // 105
  return id;                                                                                      // 98  // 106
};                                                                                                // 99  // 107
                                                                                                  // 100
Kernel.setInterval = function(f, interval) {                                                      // 101
  // Initialize timer reference                                                                   // 102
  var id = _initTimer();                                                                          // 103
                                                                                                  // 104
  // Calc the next run                                                                            // 105
  var nextRun = Kernel.now() + interval;                                                          // 106
                                                                                                  // 107
  // The interval function                                                                        // 108
  var intervalFunction = function intervalFunction() {                                            // 109
    if (_timerRunning[id]) {                                                                      // 110
      // Calc the next run                                                                        // 111
      nextRun += interval;                                                                        // 112
      // Add the next run to the queue                                                            // 113
      Kernel.timed(intervalFunction, nextRun);                                                    // 114
      // Run the function                                                                         // 115
      f();                                                                                        // 116
    }                                                                                             // 117
  };                                                                                              // 118
                                                                                                  // 119
  // Initial run                                                                                  // 120
  Kernel.timed(intervalFunction, nextRun);                                                        // 121
                                                                                                  // 122
  // Return clear id                                                                              // 123
  return id;                                                                                      // 124
};                                                                                                // 125
                                                                                                  // 126
Kernel.clearTimeout = function clearTimer(id) {                                                   // 127
  // Remove the timeout                                                                           // 128
  delete _timerRunning[id];                                                                       // 129
};                                                                                                // 130
                                                                                                  // 131
Kernel.clearInterval = Kernel.clearTimeout;                                                       // 132
                                                                                                  // 133
Kernel.debounce = function(func, wait, immediate) {                                               // 134
  var timeout, args, context, timestamp, result;                                                  // 135
  return function() {                                                                             // 136
    context = this;                                                                               // 137
    args = arguments;                                                                             // 138
    timestamp = new Date();                                                                       // 139
    var later = function() {                                                                      // 140
      var last = (new Date()) - timestamp;                                                        // 141
      if (last < wait) {                                                                          // 142
        timeout = Kernel.setTimeout(later, wait - last);                                          // 143
      } else {                                                                                    // 144
        timeout = null;                                                                           // 145
        if (!immediate) result = func.apply(context, args);                                       // 146
      }                                                                                           // 147
    };                                                                                            // 148
    var callNow = immediate && !timeout;                                                          // 149
    if (!timeout) {                                                                               // 150
      timeout = Kernel.setTimeout(later, wait);                                                   // 151
    }                                                                                             // 152
    if (callNow) result = func.apply(context, args);                                              // 153
    return result;                                                                                // 154
  };                                                                                              // 155
};                                                                                                // 156
                                                                                                  // 157
Kernel.throttle = function(func, wait, options) {                                                 // 158
  var context, args, result;                                                                      // 159
  var timeout = null;                                                                             // 160
  var previous = 0;                                                                               // 161
  options = options || {};                                                                        // 162
  var later = function () {                                                                       // 163
    previous = options.leading === false ? 0 : new Date();                                        // 164
    timeout = null;                                                                               // 165
    result = func.apply(context, args);                                                           // 166
  };                                                                                              // 167
  return function () {                                                                            // 168
    var now = new Date();                                                                         // 169
    if (!previous && options.leading === false) previous = now;                                   // 170
    var remaining = wait - (now - previous);                                                      // 171
    context = this;                                                                               // 172
    args = arguments;                                                                             // 173
    if (remaining <= 0) {                                                                         // 174
      Kernel.clearTimeout(timeout);                                                               // 175
      timeout = null;                                                                             // 176
      previous = now;                                                                             // 177
      result = func.apply(context, args);                                                         // 178
    } else if (!timeout && options.trailing !== false) {                                          // 179
      timeout = Kernel.setTimeout(later, remaining);                                              // 180
    }                                                                                             // 181
    return result;                                                                                // 182
  };                                                                                              // 183
};                                                                                                // 184
                                                                                                  // 185
/**                                                                                               // 186
 * Create alias function for defer                                                                // 187
 * @type {[type]}                                                                                 // 188
 */                                                                                               // 189
Kernel.then = Kernel.defer;                                                                       // 190
                                                                                                  // 191
/**                                                                                               // 192
 * Create alias for onRender as run                                                               // 193
 * @type {[type]}                                                                                 // 194
 */                                                                                               // 195
Kernel.run = Kernel.onRender;                                                                     // 196
                                                                                                  // 197
Kernel.each = function KernelEach(items, f) {                                                     // 198
  // XXX: for now depend on underscore                                                            // 199
  _.each(items, function KernelEach_Item(item, key) {                                             // 200
    // Let render loop run this when theres time                                                  // 201
    Kernel.defer(function KernelEachItem() {                                                      // 202
      // Run the function                                                                         // 203
      f(item, key);                                                                               // 204
    });                                                                                           // 205
  });                                                                                             // 206
                                                                                                  // 207
  return Kernel;                                                                                  // 208
};                                                                                                // 209
                                                                                                  // 210
/**                                                                                               // 211
 * Autorun when the                                                                               // 212
 * @param f The function to autorun.                                                              // 213
 * @param [options]                                                                               // 214
 * [options.debounce] Postpone the execution until after debounce                                 // 215
 * milliseconds have elapsed since the last time it was invoked.                                  // 216
 * [options.throttle] Only call the original function at most                                     // 217
 * once per every wait milliseconds.                                                              // 218
 * @returns {Tracker.Computation}                                                                 // 219
 */                                                                                               // 220
Kernel.autorun = function(f, options) {                                                           // 221
  var later = function(c) {                                                                       // 222
    // Make sure not to run if computation have been stopped                                      // 223
    if (!c.stopped) {                                                                             // 224
      // Store current computation                                                                // 225
      var prev = Tracker.currentComputation;                                                      // 226
                                                                                                  // 227
      // Set the new computation                                                                  // 228
      Tracker.currentComputation = c;//thisComputation;                                           // 229
      Tracker.active = !! Tracker.currentComputation;                                             // 230
                                                                                                  // 231
      // Call function                                                                            // 232
      f.call(this, c);                                                                            // 233
                                                                                                  // 234
      // Switch back                                                                              // 235
      Tracker.currentComputation = prev;                                                          // 236
      Tracker.active = !! Tracker.currentComputation;                                             // 237
                                                                                                  // 238
    }                                                                                             // 239
  };                                                                                              // 240
                                                                                                  // 241
  if (options && options.debounce) {                                                              // 242
    later = Kernel.debounce(later, options.debounce);                                             // 243
  }                                                                                               // 244
  else if (options && options.throttle) {                                                         // 245
    later = Kernel.throttle(later, options.throttle);                                             // 246
  }                                                                                               // 247
                                                                                                  // 248
  return Tracker.autorun(function KernelComputation(c) {                                          // 249
    if (c.firstRun) {                                                                             // 250
      // Let the first run be run normally                                                        // 251
      f.call(this, c);                                                                            // 252
    } else {                                                                                      // 253
      // On reruns we defer via the kernel                                                        // 254
      Kernel.defer(function () {                                                                  // 255
        later(c);                                                                                 // 256
      });                                                                                         // 257
    }                                                                                             // 258
  });                                                                                             // 259
};                                                                                                // 260
                                                                                                  // 261
Blaze.View.prototype.autorun = function(f, _inViewScope) {                                        // 262
  var self = this;                                                                                // 263
                                                                                                  // 264
  // Lets just have the Blaze autorun defered via the Kernel                                      // 265
                                                                                                  // 266
  // The restrictions on when View#autorun can be called are in order                             // 267
  // to avoid bad patterns, like creating a Blaze.View and immediately                            // 268
  // calling autorun on it.  A freshly created View is not ready to                               // 269
  // have logic run on it; it doesn't have a parentView, for example.                             // 270
  // It's when the View is materialized or expanded that the onViewCreated                        // 271
  // handlers are fired and the View starts up.                                                   // 272
  //                                                                                              // 273
  // Letting the render() method call `this.autorun()` is problematic                             // 274
  // because of re-render.  The best we can do is to stop the old                                 // 275
  // autorun and start a new one for each render, but that's a pattern                            // 276
  // we try to avoid internally because it leads to helpers being                                 // 277
  // called extra times, in the case where the autorun causes the                                 // 278
  // view to re-render (and thus the autorun to be torn down and a                                // 279
  // new one established).                                                                        // 280
  //                                                                                              // 281
  // We could lift these restrictions in various ways.  One interesting                           // 282
  // idea is to allow you to call `view.autorun` after instantiating                              // 283
  // `view`, and automatically wrap it in `view.onViewCreated`, deferring                         // 284
  // the autorun so that it starts at an appropriate time.  However,                              // 285
  // then we can't return the Computation object to the caller, because                           // 286
  // it doesn't exist yet.                                                                        // 287
  if (! self.isCreated) {                                                                         // 288
    throw new Error("View#autorun must be called from the created callback at the earliest");     // 289
  }                                                                                               // 290
  if (this._isInRender) {                                                                         // 291
    throw new Error("Can't call View#autorun from inside render(); try calling it from the created or rendered callback");
  }                                                                                               // 293
  if (Tracker.active) {                                                                           // 294
    throw new Error("Can't call View#autorun from a Tracker Computation; try calling it from the created or rendered callback");
  }                                                                                               // 296
                                                                                                  // 297
  var c = Kernel.autorun(function viewAutorun(c) {                                                // 298
                                                                                                  // 299
    Blaze._withCurrentView(_inViewScope || self, function () {                                    // 300
      return f.call(self, c);                                                                     // 301
    });                                                                                           // 302
                                                                                                  // 303
  });                                                                                             // 304
                                                                                                  // 305
  self.onViewDestroyed(function () { c.stop(); });                                                // 306
                                                                                                  // 307
  return c;                                                                                       // 308
                                                                                                  // 309
};                                                                                                // 310
                                                                                                  // 311
                                                                                                  // 312
/**                                                                                               // 313
 * The frame rate limit is set matching 60 fps 1000/60                                            // 314
 * @type {Number}                                                                                 // 315
 */                                                                                               // 316
Kernel.frameRateLimit = 0; // 1000 / 60;                                                          // 317
                                                                                                  // 318
Kernel.deferedTimeLimit = 10; // ms                                                               // 319
                                                                                                  // 320
Kernel.currentFrame = 0;                                                                          // 321
                                                                                                  // 322
var lastTimeStamp = null;                                                                         // 323
                                                                                                  // 324
Kernel.loop = function renderLoop() {                                                             // 325
  // Get timestamp                                                                                // 326
  var timestamp = Kernel.now();                                                                   // 327
                                                                                                  // 328
  // Request animation frame at the beginning trying to maintain 60fps                            // 329
  window.requestAnimationFrame(Kernel.loop);                                                      // 330
                                                                                                  // 331
  // Set initial value                                                                            // 332
  if (!lastTimeStamp) lastTimeStamp = timestamp;                                                  // 333
                                                                                                  // 334
  // Limit the cpu/gpu load constraint ourself to the frameRateLimit                              // 335
  if (Kernel.frameRateLimit && Kernel.frameRateLimit > timestamp - lastTimeStamp) return;         // 336
                                                                                                  // 337
  // Increase the frame counter                                                                   // 338
  Kernel.currentFrame++;                                                                          // 339
                                                                                                  // 340
  // Set current timed functions                                                                  // 341
  var currentTimedFunctions = timedFunctions;                                                     // 342
                                                                                                  // 343
  // Reset timedFunctions                                                                         // 344
  timedFunctions = [];                                                                            // 345
                                                                                                  // 346
  for (var i = 0; i < currentTimedFunctions.length; i++) {                                        // 347
    var timedFunction = currentTimedFunctions[i];                                                 // 348
                                                                                                  // 349
    if (timedFunction.runAt > timestamp) {                                                        // 350
      // not ready yet, maybe next tick                                                           // 351
      timedFunctions.push(timedFunction);                                                         // 352
    } else {                                                                                      // 353
      // Ready...                                                                                 // 354
      timedFunction.f(timedFunction.runAt, timestamp, lastTimeStamp, Kernel.currentFrame);        // 355
    }                                                                                             // 356
  }                                                                                               // 357
                                                                                                  // 358
  // Run all render functions                                                                     // 359
  var renderLength = renderFunctions.length;                                                      // 360
                                                                                                  // 361
  while (renderLength--) {                                                                        // 362
    // Run normal function in frame                                                               // 363
    (renderFunctions.shift())(timestamp, lastTimeStamp, Kernel.currentFrame);                     // 364
  }                                                                                               // 365
                                                                                                  // 366
  // Flags for limiting verbosity                                                                 // 367
  var displayForcedDeferedCount = true;                                                           // 368
  var displayDeferedCount = true;                                                                 // 369
                                                                                                  // 370
  // Make sure we keep the Kernel.maxDeferedLength limit                                          // 371
  while (Kernel.maxDeferedLength >= 0 && deferedFunctions.length - Kernel.maxDeferedLength > 0) { // 372
    // Display debug info                                                                         // 373
    if (Kernel.debug && displayForcedDeferedCount) {                                              // 374
      console.log('Kernel: force run of ' + (deferedFunctions.length - Kernel.maxDeferedLength) + ' defered functions');
      displayForcedDeferedCount=false;                                                            // 376
    }                                                                                             // 377
                                                                                                  // 378
    // Force defered function to run                                                              // 379
    (deferedFunctions.shift())(timestamp, lastTimeStamp, Kernel.currentFrame);                    // 380
  }                                                                                               // 381
                                                                                                  // 382
  // Run defered functions - in the defered time frame                                            // 383
  while (deferedFunctions.length && (Kernel.now() - timestamp) < Kernel.deferedTimeLimit) {       // 384
                                                                                                  // 385
    // Display debug info                                                                         // 386
    if (Kernel.debug && displayDeferedCount) {                                                    // 387
      console.log('Kernel: current defered queue size', deferedFunctions.length);                 // 388
      displayDeferedCount=false;                                                                  // 389
    }                                                                                             // 390
                                                                                                  // 391
    // Run the defered function                                                                   // 392
    (deferedFunctions.shift())(timestamp, lastTimeStamp, Kernel.currentFrame);                    // 393
  }                                                                                               // 394
                                                                                                  // 395
  // Set last time stamp                                                                          // 396
  lastTimeStamp = timestamp;                                                                      // 397
};                                                                                                // 398
                                                                                                  // 399
                                                                                                  // 400
// Initialize render loop                                                                         // 401
window.requestAnimationFrame(Kernel.loop);                                                        // 402
                                                                                                  // 403
////////////////////////////////////////////////////////////////////////////////////////////////////     // 412
                                                                                                         // 413
}).call(this);                                                                                           // 414
                                                                                                         // 415
                                                                                                         // 416
                                                                                                         // 417
                                                                                                         // 418
                                                                                                         // 419
                                                                                                         // 420
(function () {                                                                                           // 421
                                                                                                         // 422
////////////////////////////////////////////////////////////////////////////////////////////////////     // 423
//                                                                                                //     // 424
// packages/dispatch:kernel/meteor.js                                                             //     // 425
//                                                                                                //     // 426
////////////////////////////////////////////////////////////////////////////////////////////////////     // 427
                                                                                                  //     // 428
var withoutInvocation = function (f) {                                                            // 1   // 429
  if (Package.ddp) {                                                                              // 2   // 430
    var _CurrentInvocation = Package.ddp.DDP._CurrentInvocation;                                  // 3   // 431
    if (_CurrentInvocation.get() && _CurrentInvocation.get().isSimulation)                        // 4   // 432
      throw new Error("Can't set timers inside simulations");                                     // 5   // 433
    return function () { _CurrentInvocation.withValue(null, f); };                                // 6   // 434
  }                                                                                               // 7   // 435
  else                                                                                            // 8   // 436
    return f;                                                                                     // 9   // 437
};                                                                                                // 10  // 438
                                                                                                  // 11  // 439
var bindAndCatch = function (context, f) {                                                        // 12  // 440
  return Meteor.bindEnvironment(withoutInvocation(f), context);                                   // 13  // 441
};                                                                                                // 14  // 442
                                                                                                  // 15  // 443
_.extend(Meteor, {                                                                                // 16  // 444
  // Meteor.setTimeout and Meteor.setInterval callbacks scheduled                                 // 17  // 445
  // inside a server method are not part of the method invocation and                             // 18  // 446
  // should clear out the CurrentInvocation environment variable.                                 // 19  // 447
                                                                                                  // 20  // 448
  /**                                                                                             // 21  // 449
   * @memberOf Meteor                                                                             // 22  // 450
   * @summary Call a function in the future after waiting for a specified delay.                  // 23  // 451
   * @locus Anywhere                                                                              // 24  // 452
   * @param {Function} func The function to run                                                   // 25  // 453
   * @param {Number} delay Number of milliseconds to wait before calling function                 // 26  // 454
   */                                                                                             // 27  // 455
  setTimeout: function (f, duration) {                                                            // 28  // 456
    return Kernel.setTimeout(bindAndCatch("setTimeout callback", f), duration);                   // 29  // 457
  },                                                                                              // 30  // 458
                                                                                                  // 31  // 459
  /**                                                                                             // 32  // 460
   * @memberOf Meteor                                                                             // 33  // 461
   * @summary Call a function repeatedly, with a time delay between calls.                        // 34  // 462
   * @locus Anywhere                                                                              // 35  // 463
   * @param {Function} func The function to run                                                   // 36  // 464
   * @param {Number} delay Number of milliseconds to wait between each function call.             // 37  // 465
   */                                                                                             // 38  // 466
  setInterval: function (f, duration) {                                                           // 39  // 467
    return Kernel.setInterval(bindAndCatch("setInterval callback", f), duration);                 // 40  // 468
  },                                                                                              // 41  // 469
                                                                                                  // 42  // 470
  /**                                                                                             // 43  // 471
   * @memberOf Meteor                                                                             // 44  // 472
   * @summary Cancel a repeating function call scheduled by `Meteor.setInterval`.                 // 45  // 473
   * @locus Anywhere                                                                              // 46  // 474
   * @param {Number} id The handle returned by `Meteor.setInterval`                               // 47  // 475
   */                                                                                             // 48  // 476
  clearInterval: function(x) {                                                                    // 49  // 477
    return Kernel.clearInterval(x);                                                               // 50  // 478
  },                                                                                              // 51  // 479
                                                                                                  // 52  // 480
  /**                                                                                             // 53  // 481
   * @memberOf Meteor                                                                             // 54  // 482
   * @summary Cancel a function call scheduled by `Meteor.setTimeout`.                            // 55  // 483
   * @locus Anywhere                                                                              // 56  // 484
   * @param {Number} id The handle returned by `Meteor.setTimeout`                                // 57  // 485
   */                                                                                             // 58  // 486
  clearTimeout: function(x) {                                                                     // 59  // 487
    return Kernel.clearTimeout(x);                                                                // 60  // 488
  },                                                                                              // 61  // 489
                                                                                                  // 62  // 490
  // XXX consider making this guarantee ordering of defer'd callbacks, like                       // 63  // 491
  // Tracker.afterFlush or Node's nextTick (in practice). Then tests can do:                      // 64  // 492
  //    callSomethingThatDefersSomeWork();                                                        // 65  // 493
  //    Meteor.defer(expect(somethingThatValidatesThatTheWorkHappened));                          // 66  // 494
  defer: function (f) {                                                                           // 67  // 495
    Kernel.defer(bindAndCatch("defer callback", f));                                              // 68  // 496
  }                                                                                               // 69  // 497
});                                                                                               // 70  // 498
////////////////////////////////////////////////////////////////////////////////////////////////////     // 499
                                                                                                         // 500
}).call(this);                                                                                           // 501
                                                                                                         // 502
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dispatch:kernel'] = {
  Kernel: Kernel
};

})();
