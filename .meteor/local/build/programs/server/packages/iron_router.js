(function () {

/* Imports */
var _ = Package.underscore._;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var EJSON = Package.ejson.EJSON;
var Meteor = Package.meteor.Meteor;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var CurrentOptions, HTTP_METHODS, RouteController, Route, Router, route;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/iron_router/packages/iron_router.js                                                      //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
(function () {                                                                                       // 1
                                                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                            //     // 4
// packages/iron:router/lib/current_options.js                                                //     // 5
//                                                                                            //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                              //     // 8
/**                                                                                           // 1   // 9
 * Allows for dynamic scoping of options variables. Primarily intended to be                  // 2   // 10
 * used in the RouteController.prototype.lookupOption method.                                 // 3   // 11
 */                                                                                           // 4   // 12
CurrentOptions = new Meteor.EnvironmentVariable;                                              // 5   // 13
                                                                                              // 6   // 14
////////////////////////////////////////////////////////////////////////////////////////////////     // 15
                                                                                                     // 16
}).call(this);                                                                                       // 17
                                                                                                     // 18
                                                                                                     // 19
                                                                                                     // 20
                                                                                                     // 21
                                                                                                     // 22
                                                                                                     // 23
(function () {                                                                                       // 24
                                                                                                     // 25
////////////////////////////////////////////////////////////////////////////////////////////////     // 26
//                                                                                            //     // 27
// packages/iron:router/lib/http_methods.js                                                   //     // 28
//                                                                                            //     // 29
////////////////////////////////////////////////////////////////////////////////////////////////     // 30
                                                                                              //     // 31
HTTP_METHODS = [                                                                              // 1   // 32
  'get',                                                                                      // 2   // 33
  'post',                                                                                     // 3   // 34
  'put',                                                                                      // 4   // 35
  'delete',                                                                                   // 5   // 36
  'patch'                                                                                     // 6   // 37
];                                                                                            // 7   // 38
                                                                                              // 8   // 39
////////////////////////////////////////////////////////////////////////////////////////////////     // 40
                                                                                                     // 41
}).call(this);                                                                                       // 42
                                                                                                     // 43
                                                                                                     // 44
                                                                                                     // 45
                                                                                                     // 46
                                                                                                     // 47
                                                                                                     // 48
(function () {                                                                                       // 49
                                                                                                     // 50
////////////////////////////////////////////////////////////////////////////////////////////////     // 51
//                                                                                            //     // 52
// packages/iron:router/lib/route_controller.js                                               //     // 53
//                                                                                            //     // 54
////////////////////////////////////////////////////////////////////////////////////////////////     // 55
                                                                                              //     // 56
/*****************************************************************************/               // 1   // 57
/* Imports */                                                                                 // 2   // 58
/*****************************************************************************/               // 3   // 59
var Controller = Iron.Controller;                                                             // 4   // 60
var Url = Iron.Url;                                                                           // 5   // 61
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 6   // 62
var assert = Iron.utils.assert;                                                               // 7   // 63
                                                                                              // 8   // 64
/*****************************************************************************/               // 9   // 65
/* RouteController */                                                                         // 10  // 66
/*****************************************************************************/               // 11  // 67
RouteController = Controller.extend({                                                         // 12  // 68
  constructor: function (options) {                                                           // 13  // 69
    RouteController.__super__.constructor.apply(this, arguments);                             // 14  // 70
    options = options || {};                                                                  // 15  // 71
    this.options = options;                                                                   // 16  // 72
    this._onStopCallbacks = [];                                                               // 17  // 73
    this.route = options.route;                                                               // 18  // 74
    this.params = [];                                                                         // 19  // 75
                                                                                              // 20  // 76
    // Sometimes the data property can be defined on route options,                           // 21  // 77
    // or even on the global router config. And people will expect the                        // 22  // 78
    // data function to be available on the controller instance if it                         // 23  // 79
    // is defined anywhere in the chain. This ensure that if we have                          // 24  // 80
    // a data function somewhere in the chain, you can call this.data().                      // 25  // 81
    var data = this.lookupOption('data');                                                     // 26  // 82
                                                                                              // 27  // 83
    if (typeof data === 'function')                                                           // 28  // 84
      this.data = _.bind(data, this);                                                         // 29  // 85
    else if (typeof data !== 'undefined')                                                     // 30  // 86
      this.data = function () { return data; };                                               // 31  // 87
                                                                                              // 32  // 88
    this.init(options);                                                                       // 33  // 89
  }                                                                                           // 34  // 90
});                                                                                           // 35  // 91
                                                                                              // 36  // 92
/**                                                                                           // 37  // 93
 * Returns an option value following an "options chain" which is this path:                   // 38  // 94
 *                                                                                            // 39  // 95
 *   this.options                                                                             // 40  // 96
 *   this (which includes the proto chain)                                                    // 41  // 97
 *   this.route.options                                                                       // 42  // 98
 *   dynamic variable                                                                         // 43  // 99
 *   this.router.options                                                                      // 44  // 100
 */                                                                                           // 45  // 101
RouteController.prototype.lookupOption = function (key) {                                     // 46  // 102
  // this.route.options                                                                       // 47  // 103
  // NOTE: we've debated whether route options should come before controller but              // 48  // 104
  // Tom has convinced me that it's easier for people to think about overriding               // 49  // 105
  // controller stuff at the route option level. However, this has the possibly               // 50  // 106
  // counterintuitive effect that if you define this.someprop = true on the                   // 51  // 107
  // controller instance, and you have someprop defined as an option on your                  // 52  // 108
  // Route, the route option will take precedence.                                            // 53  // 109
  if (this.route && this.route.options && _.has(this.route.options, key))                     // 54  // 110
    return this.route.options[key];                                                           // 55  // 111
                                                                                              // 56  // 112
  // this.options                                                                             // 57  // 113
  if (_.has(this.options, key))                                                               // 58  // 114
    return this.options[key];                                                                 // 59  // 115
                                                                                              // 60  // 116
  // "this" object or its proto chain                                                         // 61  // 117
  if (typeof this[key] !== 'undefined')                                                       // 62  // 118
    return this[key];                                                                         // 63  // 119
                                                                                              // 64  // 120
  // see if we have the CurrentOptions dynamic variable set.                                  // 65  // 121
  var opts = CurrentOptions.get();                                                            // 66  // 122
  if (opts && _.has(opts, key))                                                               // 67  // 123
    return opts[key];                                                                         // 68  // 124
                                                                                              // 69  // 125
  // this.router.options                                                                      // 70  // 126
  if (this.router && this.router.options && _.has(this.router.options, key))                  // 71  // 127
    return this.router.options[key];                                                          // 72  // 128
};                                                                                            // 73  // 129
                                                                                              // 74  // 130
RouteController.prototype.configureFromUrl = function (url, context, options) {               // 75  // 131
  assert(typeof url === 'string', 'url must be a string');                                    // 76  // 132
  context = context || {};                                                                    // 77  // 133
  this.request = context.request || {};                                                       // 78  // 134
  this.response = context.response || {};                                                     // 79  // 135
  this.url = context.url || url;                                                              // 80  // 136
  this.originalUrl = context.originalUrl || url;                                              // 81  // 137
  this.method = this.request.method;                                                          // 82  // 138
  if (this.route) {                                                                           // 83  // 139
    // pass options to that we can set reactive: false                                        // 84  // 140
    this.setParams(this.route.params(url), options);                                          // 85  // 141
  }                                                                                           // 86  // 142
};                                                                                            // 87  // 143
                                                                                              // 88  // 144
/**                                                                                           // 89  // 145
 * Returns an array of hook functions for the given hook names. Hooks are                     // 90  // 146
 * collected in this order:                                                                   // 91  // 147
 *                                                                                            // 92  // 148
 * router global hooks                                                                        // 93  // 149
 * route option hooks                                                                         // 94  // 150
 * prototype of the controller                                                                // 95  // 151
 * this object for the controller                                                             // 96  // 152
 *                                                                                            // 97  // 153
 * For example, this.collectHooks('onBeforeAction', 'before')                                 // 98  // 154
 * will return an array of hook functions where the key is either onBeforeAction              // 99  // 155
 * or before.                                                                                 // 100
 *                                                                                            // 101
 * Hook values can also be strings in which case they are looked up in the                    // 102
 * Iron.Router.hooks object.                                                                  // 103
 *                                                                                            // 104
 * TODO: Add an options last argument which can specify to only collect hooks                 // 105
 * for a particular environment (client, server or both).                                     // 106
 */                                                                                           // 107
RouteController.prototype._collectHooks = function (/* hook1, alias1, ... */) {               // 108
  var self = this;                                                                            // 109
  var hookNames = _.toArray(arguments);                                                       // 110
                                                                                              // 111
  var getHookValues = function (value) {                                                      // 112
    if (!value)                                                                               // 113
      return [];                                                                              // 114
    var lookupHook = self.router.lookupHook;                                                  // 115
    var hooks = _.isArray(value) ? value : [value];                                           // 116
    return _.map(hooks, function (h) { return lookupHook(h); });                              // 117
  };                                                                                          // 118
                                                                                              // 119
  var collectInheritedHooks = function (ctor, hookName) {                                     // 120
    var hooks = [];                                                                           // 121
                                                                                              // 122
    if (ctor.__super__)                                                                       // 123
      hooks = hooks.concat(collectInheritedHooks(ctor.__super__.constructor, hookName));      // 124
                                                                                              // 125
    return _.has(ctor.prototype, hookName) ?                                                  // 126
      hooks.concat(getHookValues(ctor.prototype[hookName])) : hooks;                          // 127
  };                                                                                          // 128
                                                                                              // 129
  var eachHook = function (cb) {                                                              // 130
    for (var i = 0; i < hookNames.length; i++) {                                              // 131
      cb(hookNames[i]);                                                                       // 132
    }                                                                                         // 133
  };                                                                                          // 134
                                                                                              // 135
  var routerHooks = [];                                                                       // 136
  eachHook(function (hook) {                                                                  // 137
    var name = self.route && self.route.getName();                                            // 138
    var hooks = self.router.getHooks(hook, name);                                             // 139
    routerHooks = routerHooks.concat(hooks);                                                  // 140
  });                                                                                         // 141
                                                                                              // 142
  var protoHooks = [];                                                                        // 143
  eachHook(function (hook) {                                                                  // 144
    var hooks = collectInheritedHooks(self.constructor, hook);                                // 145
    protoHooks = protoHooks.concat(hooks);                                                    // 146
  });                                                                                         // 147
                                                                                              // 148
  var thisHooks = [];                                                                         // 149
  eachHook(function (hook) {                                                                  // 150
    if (_.has(self, hook)) {                                                                  // 151
      var hooks = getHookValues(self[hook]);                                                  // 152
      thisHooks = thisHooks.concat(hooks);                                                    // 153
    }                                                                                         // 154
  });                                                                                         // 155
                                                                                              // 156
  var routeHooks = [];                                                                        // 157
  if (self.route) {                                                                           // 158
    eachHook(function (hook) {                                                                // 159
      var hooks = getHookValues(self.route.options[hook]);                                    // 160
      routeHooks = routeHooks.concat(hooks);                                                  // 161
    });                                                                                       // 162
  }                                                                                           // 163
                                                                                              // 164
  var allHooks = routerHooks                                                                  // 165
    .concat(routeHooks)                                                                       // 166
    .concat(protoHooks)                                                                       // 167
    .concat(thisHooks);                                                                       // 168
                                                                                              // 169
  return allHooks;                                                                            // 170
};                                                                                            // 171
                                                                                              // 172
/**                                                                                           // 173
 * Runs each hook and returns the number of hooks that were run.                              // 174
 */                                                                                           // 175
RouteController.prototype.runHooks = function (/* hook, alias1, ...*/ ) {                     // 176
  var hooks = this._collectHooks.apply(this, arguments);                                      // 177
  for (var i = 0, l = hooks.length; i < l; i++) {                                             // 178
    var h = hooks[i];                                                                         // 179
    h.call(this);                                                                             // 180
  }                                                                                           // 181
  return hooks.length;                                                                        // 182
};                                                                                            // 183
                                                                                              // 184
RouteController.prototype.getParams = function () {                                           // 185
  return this.params;                                                                         // 186
};                                                                                            // 187
                                                                                              // 188
RouteController.prototype.setParams = function (value) {                                      // 189
  this.params = value;                                                                        // 190
  return this;                                                                                // 191
};                                                                                            // 192
                                                                                              // 193
Iron.RouteController = RouteController;                                                       // 194
                                                                                              // 195
////////////////////////////////////////////////////////////////////////////////////////////////     // 252
                                                                                                     // 253
}).call(this);                                                                                       // 254
                                                                                                     // 255
                                                                                                     // 256
                                                                                                     // 257
                                                                                                     // 258
                                                                                                     // 259
                                                                                                     // 260
(function () {                                                                                       // 261
                                                                                                     // 262
////////////////////////////////////////////////////////////////////////////////////////////////     // 263
//                                                                                            //     // 264
// packages/iron:router/lib/route_controller_server.js                                        //     // 265
//                                                                                            //     // 266
////////////////////////////////////////////////////////////////////////////////////////////////     // 267
                                                                                              //     // 268
/*****************************************************************************/               // 1   // 269
/* Imports */                                                                                 // 2   // 270
/*****************************************************************************/               // 3   // 271
var Fiber = Npm.require('fibers');                                                            // 4   // 272
var Controller = Iron.Controller;                                                             // 5   // 273
var Url = Iron.Url;                                                                           // 6   // 274
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 7   // 275
                                                                                              // 8   // 276
/*****************************************************************************/               // 9   // 277
/* RouteController */                                                                         // 10  // 278
/*****************************************************************************/               // 11  // 279
                                                                                              // 12  // 280
/**                                                                                           // 13  // 281
 * Server specific initialization.                                                            // 14  // 282
 */                                                                                           // 15  // 283
RouteController.prototype.init = function (options) {};                                       // 16  // 284
                                                                                              // 17  // 285
/**                                                                                           // 18  // 286
 * Let this controller run a dispatch process. This function will be called                   // 19  // 287
 * from the router. That way, any state associated with the dispatch can go on                // 20  // 288
 * the controller instance. Note: no result returned from dispatch because its                // 21  // 289
 * run inside its own fiber. Might at some point move the fiber stuff to a                    // 22  // 290
 * higher layer.                                                                              // 23  // 291
 */                                                                                           // 24  // 292
RouteController.prototype.dispatch = function (stack, url, done) {                            // 25  // 293
  var self = this;                                                                            // 26  // 294
  Fiber(function () {                                                                         // 27  // 295
    stack.dispatch(url, self, done);                                                          // 28  // 296
  }).run();                                                                                   // 29  // 297
};                                                                                            // 30  // 298
                                                                                              // 31  // 299
/**                                                                                           // 32  // 300
 * Run a route on the server. When the router runs its middleware stack, it                   // 33  // 301
 * can run regular middleware functions or it can run a route. There should                   // 34  // 302
 * only one route object per path as where there may be many middleware                       // 35  // 303
 * functions.                                                                                 // 36  // 304
 *                                                                                            // 37  // 305
 * For example:                                                                               // 38  // 306
 *                                                                                            // 39  // 307
 *   "/some/path" => [middleware1, middleware2, route, middleware3]                           // 40  // 308
 *                                                                                            // 41  // 309
 * When a route is dispatched, it tells the controller to _runRoute so that                   // 42  // 310
 * the controller can control the process. At this point we should already be                 // 43  // 311
 * in a dispatch so a computation should already exist.                                       // 44  // 312
 */                                                                                           // 45  // 313
RouteController.prototype._runRoute = function (route, url, done) {                           // 46  // 314
  var self = this;                                                                            // 47  // 315
  var stack = new MiddlewareStack;                                                            // 48  // 316
                                                                                              // 49  // 317
  var onRunHooks = this._collectHooks('onRun', 'load');                                       // 50  // 318
  stack = stack.append(onRunHooks, {where: 'server'});                                        // 51  // 319
                                                                                              // 52  // 320
  var beforeHooks = this._collectHooks('onBeforeAction', 'before');                           // 53  // 321
  stack.append(beforeHooks, {where: 'server'});                                               // 54  // 322
                                                                                              // 55  // 323
  // make sure the action stack has at least one handler on it that defaults                  // 56  // 324
  // to the 'action' method                                                                   // 57  // 325
  if (route._actionStack.length === 0) {                                                      // 58  // 326
    route._actionStack.push(route._path, 'action', route.options);                            // 59  // 327
  }                                                                                           // 60  // 328
                                                                                              // 61  // 329
  stack = stack.concat(route._actionStack);                                                   // 62  // 330
  stack.dispatch(url, this, done);                                                            // 63  // 331
                                                                                              // 64  // 332
  // run the after hooks.                                                                     // 65  // 333
  this.next = function () {};                                                                 // 66  // 334
  this.runHooks('onAfterAction', 'after');                                                    // 67  // 335
};                                                                                            // 68  // 336
                                                                                              // 69  // 337
////////////////////////////////////////////////////////////////////////////////////////////////     // 338
                                                                                                     // 339
}).call(this);                                                                                       // 340
                                                                                                     // 341
                                                                                                     // 342
                                                                                                     // 343
                                                                                                     // 344
                                                                                                     // 345
                                                                                                     // 346
(function () {                                                                                       // 347
                                                                                                     // 348
////////////////////////////////////////////////////////////////////////////////////////////////     // 349
//                                                                                            //     // 350
// packages/iron:router/lib/route.js                                                          //     // 351
//                                                                                            //     // 352
////////////////////////////////////////////////////////////////////////////////////////////////     // 353
                                                                                              //     // 354
var Url = Iron.Url;                                                                           // 1   // 355
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 2   // 356
var assert = Iron.utils.assert;                                                               // 3   // 357
                                                                                              // 4   // 358
/*****************************************************************************/               // 5   // 359
/* Both */                                                                                    // 6   // 360
/*****************************************************************************/               // 7   // 361
Route = function (path, fn, options) {                                                        // 8   // 362
  var route = function (req, res, next) {                                                     // 9   // 363
    var controller = this;                                                                    // 10  // 364
    controller.request = req;                                                                 // 11  // 365
    controller.response = res;                                                                // 12  // 366
    route.dispatch(req.url, controller, next);                                                // 13  // 367
  }                                                                                           // 14  // 368
                                                                                              // 15  // 369
  if (typeof fn === 'object') {                                                               // 16  // 370
    options = fn;                                                                             // 17  // 371
    fn = options.action;                                                                      // 18  // 372
  }                                                                                           // 19  // 373
                                                                                              // 20  // 374
  options = options || {};                                                                    // 21  // 375
                                                                                              // 22  // 376
  if (typeof path === 'string' && path.charAt(0) !== '/') {                                   // 23  // 377
    path = options.path ? options.path : '/' + path                                           // 24  // 378
  }                                                                                           // 25  // 379
                                                                                              // 26  // 380
  // extend the route function with properties from this instance and its                     // 27  // 381
  // prototype.                                                                               // 28  // 382
  _.extend(route, this.constructor.prototype);                                                // 29  // 383
                                                                                              // 30  // 384
  // always good to have options                                                              // 31  // 385
  options = route.options = options || {};                                                    // 32  // 386
                                                                                              // 33  // 387
  // the main action function as well as any HTTP VERB action functions will go               // 34  // 388
  // onto this stack.                                                                         // 35  // 389
  route._actionStack = new MiddlewareStack;                                                   // 36  // 390
                                                                                              // 37  // 391
  // any before hooks will go onto this stack to make sure they get executed                  // 38  // 392
  // before the action stack.                                                                 // 39  // 393
  route._beforeStack = new MiddlewareStack;                                                   // 40  // 394
  route._beforeStack.append(route.options.onBeforeAction);                                    // 41  // 395
  route._beforeStack.append(route.options.before);                                            // 42  // 396
                                                                                              // 43  // 397
  // after hooks get run after the action stack                                               // 44  // 398
  route._afterStack = new MiddlewareStack;                                                    // 45  // 399
  route._afterStack.append(route.options.onAfterAction);                                      // 46  // 400
  route._afterStack.append(route.options.after);                                              // 47  // 401
                                                                                              // 48  // 402
                                                                                              // 49  // 403
  // track which methods this route uses                                                      // 50  // 404
  route._methods = {};                                                                        // 51  // 405
                                                                                              // 52  // 406
  if (typeof fn === 'string') {                                                               // 53  // 407
    route._actionStack.push(path, _.extend(options, {                                         // 54  // 408
      template: fn                                                                            // 55  // 409
    }));                                                                                      // 56  // 410
  } else if (typeof fn === 'function' || typeof fn === 'object') {                            // 57  // 411
    route._actionStack.push(path, fn, options);                                               // 58  // 412
  }                                                                                           // 59  // 413
                                                                                              // 60  // 414
  route._path = path;                                                                         // 61  // 415
  return route;                                                                               // 62  // 416
};                                                                                            // 63  // 417
                                                                                              // 64  // 418
/**                                                                                           // 65  // 419
 * The name of the route is actually stored on the handler since a route is a                 // 66  // 420
 * function that has an unassignable "name" property.                                         // 67  // 421
 */                                                                                           // 68  // 422
Route.prototype.getName = function () {                                                       // 69  // 423
  return this.handler && this.handler.name;                                                   // 70  // 424
};                                                                                            // 71  // 425
                                                                                              // 72  // 426
/**                                                                                           // 73  // 427
 * Returns an appropriate RouteController constructor the this Route.                         // 74  // 428
 *                                                                                            // 75  // 429
 * There are three possibilities:                                                             // 76  // 430
 *                                                                                            // 77  // 431
 *  1. controller option provided as a string on the route                                    // 78  // 432
 *  2. a controller in the global namespace with the converted name of the route              // 79  // 433
 *  3. a default RouteController                                                              // 80  // 434
 *                                                                                            // 81  // 435
 */                                                                                           // 82  // 436
Route.prototype.findControllerConstructor = function () {                                     // 83  // 437
  var self = this;                                                                            // 84  // 438
                                                                                              // 85  // 439
  var resolve = function (name, opts) {                                                       // 86  // 440
    opts = opts || {};                                                                        // 87  // 441
    var C = Iron.utils.resolve(name);                                                         // 88  // 442
    if (!C || !RouteController.prototype.isPrototypeOf(C.prototype)) {                        // 89  // 443
      if (opts.supressErrors !== true)                                                        // 90  // 444
        throw new Error("RouteController '" + name + "' is not defined.");                    // 91  // 445
      else                                                                                    // 92  // 446
        return undefined;                                                                     // 93  // 447
    } else {                                                                                  // 94  // 448
      return C;                                                                               // 95  // 449
    }                                                                                         // 96  // 450
  };                                                                                          // 97  // 451
                                                                                              // 98  // 452
  var convert = function (name) {                                                             // 99  // 453
    return self.router.toControllerName(name);                                                // 100
  };                                                                                          // 101
                                                                                              // 102
  var result;                                                                                 // 103
  var name = this.getName();                                                                  // 104
                                                                                              // 105
  // the controller was set directly                                                          // 106
  if (typeof this.options.controller === 'function')                                          // 107
    return this.options.controller;                                                           // 108
                                                                                              // 109
  // was the controller specified precisely by name? then resolve to an actual                // 110
  // javascript constructor value                                                             // 111
  else if (typeof this.options.controller === 'string')                                       // 112
    return resolve(this.options.controller);                                                  // 113
                                                                                              // 114
  // is there a default route controller configured?                                          // 115
  else if (this.router && this.router.options.controller) {                                   // 116
    if (typeof this.router.options.controller === 'function')                                 // 117
      return this.router.options.controller;                                                  // 118
                                                                                              // 119
    else if (typeof this.router.options.controller === 'string')                              // 120
      return resolve(this.router.options.controller);                                         // 121
  }                                                                                           // 122
                                                                                              // 123
  // otherwise do we have a name? try to convert the name to a controller name                // 124
  // and resolve it to a value                                                                // 125
  else if (name && (result = resolve(convert(name), {supressErrors: true})))                  // 126
    return result;                                                                            // 127
                                                                                              // 128
  // otherwise just use an anonymous route controller                                         // 129
  else                                                                                        // 130
    return RouteController;                                                                   // 131
};                                                                                            // 132
                                                                                              // 133
                                                                                              // 134
/**                                                                                           // 135
 * Create a new controller for the route.                                                     // 136
 */                                                                                           // 137
Route.prototype.createController = function (options) {                                       // 138
  options = options || {};                                                                    // 139
  var C = this.findControllerConstructor();                                                   // 140
  options.route = this;                                                                       // 141
  var instance = new C(options);                                                              // 142
  return instance;                                                                            // 143
};                                                                                            // 144
                                                                                              // 145
Route.prototype.setControllerParams = function (controller, url) {                            // 146
};                                                                                            // 147
                                                                                              // 148
/**                                                                                           // 149
 * Dispatch into the route's middleware stack.                                                // 150
 */                                                                                           // 151
Route.prototype.dispatch = function (url, context, done) {                                    // 152
  // call runRoute on the controller which will behave similarly to the previous              // 153
  // version of IR.                                                                           // 154
  assert(context._runRoute, "context doesn't have a _runRoute method");                       // 155
  return context._runRoute(this, url, done);                                                  // 156
};                                                                                            // 157
                                                                                              // 158
/**                                                                                           // 159
 * Returns a relative path for the route.                                                     // 160
 */                                                                                           // 161
Route.prototype.path = function (params, options) {                                           // 162
  return this.handler.resolve(params, options);                                               // 163
};                                                                                            // 164
                                                                                              // 165
/**                                                                                           // 166
 * Return a fully qualified url for the route, given a set of parmeters and                   // 167
 * options like hash and query.                                                               // 168
 */                                                                                           // 169
Route.prototype.url = function (params, options) {                                            // 170
  var path = this.path(params, options);                                                      // 171
  var host = (options && options.host) || Meteor.absoluteUrl();                               // 172
                                                                                              // 173
  if (host.charAt(host.length-1) === '/');                                                    // 174
    host = host.slice(0, host.length-1);                                                      // 175
  return host + path;                                                                         // 176
};                                                                                            // 177
                                                                                              // 178
/**                                                                                           // 179
 * Return a params object for the route given a path.                                         // 180
 */                                                                                           // 181
Route.prototype.params = function (path) {                                                    // 182
  return this.handler.params(path);                                                           // 183
};                                                                                            // 184
                                                                                              // 185
/**                                                                                           // 186
 * Add convenience methods for each HTTP verb.                                                // 187
 *                                                                                            // 188
 * Example:                                                                                   // 189
 *  var route = router.route('/item')                                                         // 190
 *    .get(function () { })                                                                   // 191
 *    .post(function () { })                                                                  // 192
 *    .put(function () { })                                                                   // 193
 */                                                                                           // 194
_.each(HTTP_METHODS, function (method) {                                                      // 195
  Route.prototype[method] = function (fn) {                                                   // 196
    // track the method being used for OPTIONS requests.                                      // 197
    this._methods[method] = true;                                                             // 198
                                                                                              // 199
    this._actionStack.push(this._path, fn, {                                                  // 200
      // give each method a unique name so it doesn't clash with the route's                  // 201
      // name in the action stack                                                             // 202
      name: this.getName() + '_' + method.toLowerCase(),                                      // 203
      method: method,                                                                         // 204
                                                                                              // 205
      // for now just make the handler where the same as the route, presumably a              // 206
      // server route.                                                                        // 207
      where: this.handler.where,                                                              // 208
      mount: false                                                                            // 209
    });                                                                                       // 210
                                                                                              // 211
    return this;                                                                              // 212
  };                                                                                          // 213
});                                                                                           // 214
                                                                                              // 215
Iron.Route = Route;                                                                           // 216
                                                                                              // 217
////////////////////////////////////////////////////////////////////////////////////////////////     // 572
                                                                                                     // 573
}).call(this);                                                                                       // 574
                                                                                                     // 575
                                                                                                     // 576
                                                                                                     // 577
                                                                                                     // 578
                                                                                                     // 579
                                                                                                     // 580
(function () {                                                                                       // 581
                                                                                                     // 582
////////////////////////////////////////////////////////////////////////////////////////////////     // 583
//                                                                                            //     // 584
// packages/iron:router/lib/router.js                                                         //     // 585
//                                                                                            //     // 586
////////////////////////////////////////////////////////////////////////////////////////////////     // 587
                                                                                              //     // 588
/*****************************************************************************/               // 1   // 589
/* Imports */                                                                                 // 2   // 590
/*****************************************************************************/               // 3   // 591
var MiddlewareStack = Iron.MiddlewareStack;                                                   // 4   // 592
var Url = Iron.Url;                                                                           // 5   // 593
var Layout = Iron.Layout;                                                                     // 6   // 594
var warn = Iron.utils.warn;                                                                   // 7   // 595
var assert = Iron.utils.assert;                                                               // 8   // 596
                                                                                              // 9   // 597
Router = function (options) {                                                                 // 10  // 598
  // keep the same api throughout which is:                                                   // 11  // 599
  // fn(url, context, done);                                                                  // 12  // 600
  function router (req, res, next) {                                                          // 13  // 601
    //XXX this assumes no other routers on the parent stack which we should probably fix      // 14  // 602
    router.dispatch(req.url, {                                                                // 15  // 603
      request: req,                                                                           // 16  // 604
      response: res                                                                           // 17  // 605
    }, next);                                                                                 // 18  // 606
  }                                                                                           // 19  // 607
                                                                                              // 20  // 608
  // the main router stack                                                                    // 21  // 609
  router._stack = new MiddlewareStack;                                                        // 22  // 610
                                                                                              // 23  // 611
  // for storing global hooks like before, after, etc.                                        // 24  // 612
  router._globalHooks = {};                                                                   // 25  // 613
                                                                                              // 26  // 614
  // backward compat and quicker lookup of Route handlers vs. regular function                // 27  // 615
  // handlers.                                                                                // 28  // 616
  router.routes = [];                                                                         // 29  // 617
                                                                                              // 30  // 618
  // to make sure we don't have more than one route per path                                  // 31  // 619
  router.routes._byPath = {};                                                                 // 32  // 620
                                                                                              // 33  // 621
  // always good to have options                                                              // 34  // 622
  this.configure.call(router, options);                                                       // 35  // 623
                                                                                              // 36  // 624
  // add proto properties to the router function                                              // 37  // 625
  _.extend(router, this.constructor.prototype);                                               // 38  // 626
                                                                                              // 39  // 627
  // let client and server side routing doing different things here                           // 40  // 628
  this.init.call(router, options);                                                            // 41  // 629
                                                                                              // 42  // 630
  Meteor.startup(function () {                                                                // 43  // 631
    Meteor.defer(function () {                                                                // 44  // 632
      if (router.options.autoStart !== false)                                                 // 45  // 633
        router.start();                                                                       // 46  // 634
    });                                                                                       // 47  // 635
  });                                                                                         // 48  // 636
                                                                                              // 49  // 637
  return router;                                                                              // 50  // 638
};                                                                                            // 51  // 639
                                                                                              // 52  // 640
Router.prototype.init = function (options) {};                                                // 53  // 641
                                                                                              // 54  // 642
Router.prototype.configure = function (options) {                                             // 55  // 643
  var self = this;                                                                            // 56  // 644
                                                                                              // 57  // 645
  options = options || {};                                                                    // 58  // 646
                                                                                              // 59  // 647
  var toArray = function (value) {                                                            // 60  // 648
    if (!value)                                                                               // 61  // 649
      return [];                                                                              // 62  // 650
                                                                                              // 63  // 651
    if (_.isArray(value))                                                                     // 64  // 652
      return value;                                                                           // 65  // 653
                                                                                              // 66  // 654
    return [value];                                                                           // 67  // 655
  };                                                                                          // 68  // 656
                                                                                              // 69  // 657
  // e.g. before: fn OR before: [fn1, fn2]                                                    // 70  // 658
  _.each(Iron.Router.HOOK_TYPES, function eachHookType (type) {                               // 71  // 659
    if (options[type]) {                                                                      // 72  // 660
      _.each(toArray(options[type]), function eachHook (hook) {                               // 73  // 661
        self.addHook(type, hook);                                                             // 74  // 662
      });                                                                                     // 75  // 663
                                                                                              // 76  // 664
      delete options[type];                                                                   // 77  // 665
    }                                                                                         // 78  // 666
  });                                                                                         // 79  // 667
                                                                                              // 80  // 668
  this.options = this.options || {};                                                          // 81  // 669
  _.extend(this.options, options);                                                            // 82  // 670
                                                                                              // 83  // 671
  return this;                                                                                // 84  // 672
};                                                                                            // 85  // 673
                                                                                              // 86  // 674
/**                                                                                           // 87  // 675
 * Just to support legacy calling. Doesn't really serve much purpose.                         // 88  // 676
 */                                                                                           // 89  // 677
Router.prototype.map = function (fn) {                                                        // 90  // 678
  return fn.call(this);                                                                       // 91  // 679
};                                                                                            // 92  // 680
                                                                                              // 93  // 681
/*                                                                                            // 94  // 682
 * XXX removing for now until this is thought about more carefully.                           // 95  // 683
Router.prototype.use = function (path, fn, opts) {                                            // 96  // 684
  if (typeof path === 'function') {                                                           // 97  // 685
    opts = fn || {};                                                                          // 98  // 686
    opts.mount = true;                                                                        // 99  // 687
    opts.where = opts.where || 'server';                                                      // 100
    this._stack.push(path, opts);                                                             // 101
  } else {                                                                                    // 102
    opts = opts || {};                                                                        // 103
    opts.mount = true;                                                                        // 104
    opts.where = opts.where || 'server';                                                      // 105
    this._stack.push(path, fn, opts);                                                         // 106
  }                                                                                           // 107
                                                                                              // 108
  return this;                                                                                // 109
};                                                                                            // 110
*/                                                                                            // 111
                                                                                              // 112
//XXX seems like we could put a params method on the route directly and make it reactive      // 113
Router.prototype.route = function (path, fn, opts) {                                          // 114
  var typeOf = function (val) { return Object.prototype.toString.call(val); };                // 115
  assert(typeOf(path) === '[object String]' || typeOf(path) === '[object RegExp]', "Router.route requires a path that is a string or regular expression.");
                                                                                              // 117
  if (typeof fn === 'object') {                                                               // 118
    opts = fn;                                                                                // 119
    fn = opts.action;                                                                         // 120
  }                                                                                           // 121
                                                                                              // 122
  var route = new Route(path, fn, opts);                                                      // 123
                                                                                              // 124
  opts = opts || {};                                                                          // 125
                                                                                              // 126
  // don't mount the route                                                                    // 127
  opts.mount = false;                                                                         // 128
                                                                                              // 129
  // stack expects a function which is exactly what a new Route returns!                      // 130
  var handler = this._stack.push(path, route, opts);                                          // 131
                                                                                              // 132
  handler.route = route;                                                                      // 133
  route.handler = handler;                                                                    // 134
  route.router = this;                                                                        // 135
                                                                                              // 136
  assert(!this.routes._byPath[handler.path],                                                  // 137
    "A route for the path " + JSON.stringify(handler.path) + " already exists by the name of " + JSON.stringify(handler.name) + ".");
  this.routes._byPath[handler.path] = route;                                                  // 139
                                                                                              // 140
  this.routes.push(route);                                                                    // 141
                                                                                              // 142
  if (typeof handler.name === 'string')                                                       // 143
    this.routes[handler.name] = route;                                                        // 144
                                                                                              // 145
  return route;                                                                               // 146
};                                                                                            // 147
                                                                                              // 148
/**                                                                                           // 149
 * Find the first route for the given url and options.                                        // 150
 */                                                                                           // 151
Router.prototype.findFirstRoute = function (url) {                                            // 152
  var isMatch;                                                                                // 153
  var routeHandler;                                                                           // 154
  for (var i = 0; i < this.routes.length; i++) {                                              // 155
    route = this.routes[i];                                                                   // 156
                                                                                              // 157
    // only matches if the url matches AND the                                                // 158
    // current environment matches.                                                           // 159
    isMatch = route.handler.test(url, {                                                       // 160
      where: Meteor.isServer ? 'server' : 'client'                                            // 161
    });                                                                                       // 162
                                                                                              // 163
    if (isMatch)                                                                              // 164
      return route;                                                                           // 165
  }                                                                                           // 166
                                                                                              // 167
  return null;                                                                                // 168
};                                                                                            // 169
                                                                                              // 170
Router.prototype.path = function (routeName, params, options) {                               // 171
  var route = this.routes[routeName];                                                         // 172
  warn(route, "You called Router.path for a route named " + JSON.stringify(routeName) + " but that route doesn't seem to exist. Are you sure you created it?");
  return route && route.path(params, options);                                                // 174
};                                                                                            // 175
                                                                                              // 176
Router.prototype.url = function (routeName, params, options) {                                // 177
  var route = this.routes[routeName];                                                         // 178
  warn(route, "You called Router.url for a route named " + JSON.stringify(routeName) + " but that route doesn't seem to exist. Are you sure you created it?");
  return route && route.url(params, options);                                                 // 180
};                                                                                            // 181
                                                                                              // 182
/**                                                                                           // 183
 * Create a new controller for a dispatch.                                                    // 184
 */                                                                                           // 185
Router.prototype.createController = function (url, context) {                                 // 186
  // see if there's a route for this url and environment                                      // 187
  // it's possible that we find a route but it's a client                                     // 188
  // route so we don't instantiate its controller and instead                                 // 189
  // use an anonymous controller to run the route.                                            // 190
  var route = this.findFirstRoute(url);                                                       // 191
  var controller;                                                                             // 192
                                                                                              // 193
  context = context || {};                                                                    // 194
                                                                                              // 195
  if (route)                                                                                  // 196
    // let the route decide what controller to use                                            // 197
    controller = route.createController({layout: this._layout});                              // 198
  else                                                                                        // 199
    // create an anonymous controller                                                         // 200
    controller = new RouteController({layout: this._layout});                                 // 201
                                                                                              // 202
  controller.router = this;                                                                   // 203
  controller.configureFromUrl(url, context, {reactive: false});                               // 204
  return controller;                                                                          // 205
};                                                                                            // 206
                                                                                              // 207
Router.prototype.setTemplateNameConverter = function (fn) {                                   // 208
  this._templateNameConverter = fn;                                                           // 209
  return this;                                                                                // 210
};                                                                                            // 211
                                                                                              // 212
Router.prototype.setControllerNameConverter = function (fn) {                                 // 213
  this._controllerNameConverter = fn;                                                         // 214
  return this;                                                                                // 215
};                                                                                            // 216
                                                                                              // 217
Router.prototype.toTemplateName = function (str) {                                            // 218
  if (this._templateNameConverter)                                                            // 219
    return this._templateNameConverter(str);                                                  // 220
  else                                                                                        // 221
    return Iron.utils.classCase(str);                                                         // 222
};                                                                                            // 223
                                                                                              // 224
Router.prototype.toControllerName = function (str) {                                          // 225
  if (this._controllerNameConverter)                                                          // 226
    return this._controllerNameConverter(str);                                                // 227
  else                                                                                        // 228
    return Iron.utils.classCase(str) + 'Controller';                                          // 229
};                                                                                            // 230
                                                                                              // 231
/**                                                                                           // 232
 *                                                                                            // 233
 * Add a hook to all routes. The hooks will apply to all routes,                              // 234
 * unless you name routes to include or exclude via `only` and `except` options               // 235
 *                                                                                            // 236
 * @param {String} [type] one of 'load', 'unload', 'before' or 'after'                        // 237
 * @param {Object} [options] Options to controll the hooks [optional]                         // 238
 * @param {Function} [hook] Callback to run                                                   // 239
 * @return {IronRouter}                                                                       // 240
 * @api public                                                                                // 241
 *                                                                                            // 242
 */                                                                                           // 243
                                                                                              // 244
Router.prototype.addHook = function(type, hook, options) {                                    // 245
  var self = this;                                                                            // 246
                                                                                              // 247
  options = options || {};                                                                    // 248
                                                                                              // 249
  var toArray = function (input) {                                                            // 250
    if (!input)                                                                               // 251
      return [];                                                                              // 252
    else if (_.isArray(input))                                                                // 253
      return input;                                                                           // 254
    else                                                                                      // 255
      return [input];                                                                         // 256
  }                                                                                           // 257
                                                                                              // 258
  if (options.only)                                                                           // 259
    options.only = toArray(options.only);                                                     // 260
  if (options.except)                                                                         // 261
    options.except = toArray(options.except);                                                 // 262
                                                                                              // 263
  var hooks = this._globalHooks[type] = this._globalHooks[type] || [];                        // 264
                                                                                              // 265
  var hookWithOptions = function () {                                                         // 266
    var thisArg = this;                                                                       // 267
    var args = arguments;                                                                     // 268
    // this allows us to bind hooks to options that get looked up when you call               // 269
    // this.lookupOption from within the hook. And it looks better to keep                    // 270
    // plugin/hook related options close to their definitions instead of                      // 271
    // Router.configure. But we use a dynamic variable so we don't have to                    // 272
    // pass the options explicitly as an argument and plugin creators can                     // 273
    // just use this.lookupOption which will follow the proper lookup chain from              // 274
    // "this", local options, dynamic variable options, route, router, etc.                   // 275
    return CurrentOptions.withValue(options, function () {                                    // 276
      return self.lookupHook(hook).apply(thisArg, args);                                      // 277
    });                                                                                       // 278
  };                                                                                          // 279
                                                                                              // 280
  hooks.push({options: options, hook: hookWithOptions});                                      // 281
  return this;                                                                                // 282
};                                                                                            // 283
                                                                                              // 284
/**                                                                                           // 285
 * If the argument is a function return it directly. If it's a string, see if                 // 286
 * there is a function in the Iron.Router.hooks namespace. Throw an error if we               // 287
 * can't find the hook.                                                                       // 288
 */                                                                                           // 289
Router.prototype.lookupHook = function (nameOrFn) {                                           // 290
  var fn = nameOrFn;                                                                          // 291
                                                                                              // 292
  // if we already have a func just return it                                                 // 293
  if (_.isFunction(fn))                                                                       // 294
    return fn;                                                                                // 295
                                                                                              // 296
  // look up one of the out-of-box hooks like                                                 // 297
  // 'loaded or 'dataNotFound' if the nameOrFn is a                                           // 298
  // string                                                                                   // 299
  if (_.isString(fn)) {                                                                       // 300
    if (_.isFunction(Iron.Router.hooks[fn]))                                                  // 301
      return Iron.Router.hooks[fn];                                                           // 302
  }                                                                                           // 303
                                                                                              // 304
  // we couldn't find it so throw an error                                                    // 305
  throw new Error("No hook found named: " + nameOrFn);                                        // 306
};                                                                                            // 307
                                                                                              // 308
/**                                                                                           // 309
 *                                                                                            // 310
 * Fetch the list of global hooks that apply to the given route name.                         // 311
 * Hooks are defined by the .addHook() function above.                                        // 312
 *                                                                                            // 313
 * @param {String} [type] one of IronRouter.HOOK_TYPES                                        // 314
 * @param {String} [name] the name of the route we are interested in                          // 315
 * @return {[Function]} [hooks] an array of hooks to run                                      // 316
 * @api public                                                                                // 317
 *                                                                                            // 318
 */                                                                                           // 319
                                                                                              // 320
Router.prototype.getHooks = function(type, name) {                                            // 321
  var self = this;                                                                            // 322
  var hooks = [];                                                                             // 323
                                                                                              // 324
  _.each(this._globalHooks[type], function(hook) {                                            // 325
    var options = hook.options;                                                               // 326
                                                                                              // 327
    if (options.except && _.include(options.except, name))                                    // 328
      return [];                                                                              // 329
                                                                                              // 330
    if (options.only && ! _.include(options.only, name))                                      // 331
      return [];                                                                              // 332
                                                                                              // 333
    hooks.push(hook.hook);                                                                    // 334
  });                                                                                         // 335
                                                                                              // 336
  return hooks;                                                                               // 337
};                                                                                            // 338
                                                                                              // 339
Router.HOOK_TYPES = [                                                                         // 340
  'onRun',                                                                                    // 341
  'onRerun',                                                                                  // 342
  'onBeforeAction',                                                                           // 343
  'onAfterAction',                                                                            // 344
  'onStop',                                                                                   // 345
                                                                                              // 346
  // not technically a hook but we'll use it                                                  // 347
  // in a similar way. This will cause waitOn                                                 // 348
  // to be added as a method to the Router and then                                           // 349
  // it can be selectively applied to specific routes                                         // 350
  'waitOn',                                                                                   // 351
  'subscriptions',                                                                            // 352
                                                                                              // 353
  // legacy hook types but we'll let them slide                                               // 354
  'load', // onRun                                                                            // 355
  'before', // onBeforeAction                                                                 // 356
  'after', // onAfterAction                                                                   // 357
  'unload' // onStop                                                                          // 358
];                                                                                            // 359
                                                                                              // 360
/**                                                                                           // 361
 * A namespace for hooks keyed by name.                                                       // 362
 */                                                                                           // 363
Router.hooks = {};                                                                            // 364
                                                                                              // 365
                                                                                              // 366
/**                                                                                           // 367
 * A namespace for plugin functions keyed by name.                                            // 368
 */                                                                                           // 369
Router.plugins = {};                                                                          // 370
                                                                                              // 371
/**                                                                                           // 372
 * Auto add helper mtehods for all the hooks.                                                 // 373
 */                                                                                           // 374
                                                                                              // 375
_.each(Router.HOOK_TYPES, function (type) {                                                   // 376
  Router.prototype[type] = function (hook, options) {                                         // 377
    this.addHook(type, hook, options);                                                        // 378
  };                                                                                          // 379
});                                                                                           // 380
                                                                                              // 381
/**                                                                                           // 382
 * Add a plugin to the router instance.                                                       // 383
 */                                                                                           // 384
Router.prototype.plugin = function (nameOrFn, options) {                                      // 385
  var func;                                                                                   // 386
                                                                                              // 387
  if (typeof nameOrFn === 'function')                                                         // 388
    func = nameOrFn;                                                                          // 389
  else if (typeof nameOrFn === 'string')                                                      // 390
    func = Iron.Router.plugins[nameOrFn];                                                     // 391
                                                                                              // 392
  if (!func)                                                                                  // 393
    throw new Error("No plugin found named " + JSON.stringify(nameOrFn));                     // 394
                                                                                              // 395
  // fn(router, options)                                                                      // 396
  func.call(this, this, options);                                                             // 397
                                                                                              // 398
  return this;                                                                                // 399
};                                                                                            // 400
                                                                                              // 401
Iron.Router = Router;                                                                         // 402
                                                                                              // 403
////////////////////////////////////////////////////////////////////////////////////////////////     // 992
                                                                                                     // 993
}).call(this);                                                                                       // 994
                                                                                                     // 995
                                                                                                     // 996
                                                                                                     // 997
                                                                                                     // 998
                                                                                                     // 999
                                                                                                     // 1000
(function () {                                                                                       // 1001
                                                                                                     // 1002
////////////////////////////////////////////////////////////////////////////////////////////////     // 1003
//                                                                                            //     // 1004
// packages/iron:router/lib/hooks.js                                                          //     // 1005
//                                                                                            //     // 1006
////////////////////////////////////////////////////////////////////////////////////////////////     // 1007
                                                                                              //     // 1008
if (typeof Template !== 'undefined') {                                                        // 1   // 1009
  /**                                                                                         // 2   // 1010
   * The default anonymous loading template.                                                  // 3   // 1011
   */                                                                                         // 4   // 1012
  var defaultLoadingTemplate = new Template('DefaultLoadingTemplate', function () {           // 5   // 1013
    return 'Loading...';                                                                      // 6   // 1014
  });                                                                                         // 7   // 1015
                                                                                              // 8   // 1016
  /**                                                                                         // 9   // 1017
   * The default anonymous data not found template.                                           // 10  // 1018
   */                                                                                         // 11  // 1019
  var defaultDataNotFoundTemplate = new Template('DefaultDataNotFoundTemplate', function () { // 12  // 1020
    return 'Data not found...';                                                               // 13  // 1021
  });                                                                                         // 14  // 1022
}                                                                                             // 15  // 1023
                                                                                              // 16  // 1024
/**                                                                                           // 17  // 1025
 * Automatically render a loading template into the main region if the                        // 18  // 1026
 * controller is not ready (i.e. this.ready() is false). If no loadingTemplate                // 19  // 1027
 * is defined use some default text.                                                          // 20  // 1028
 */                                                                                           // 21  // 1029
                                                                                              // 22  // 1030
Router.hooks.loading = function () {                                                          // 23  // 1031
  // if we're ready just pass through                                                         // 24  // 1032
  if (this.ready()) {                                                                         // 25  // 1033
    this.next();                                                                              // 26  // 1034
    return;                                                                                   // 27  // 1035
  }                                                                                           // 28  // 1036
                                                                                              // 29  // 1037
  var template = this.lookupOption('loadingTemplate');                                        // 30  // 1038
  this.render(template || defaultLoadingTemplate);                                            // 31  // 1039
  this.renderRegions();                                                                       // 32  // 1040
};                                                                                            // 33  // 1041
                                                                                              // 34  // 1042
/**                                                                                           // 35  // 1043
 * Render a "data not found" template if a global data function returns a falsey              // 36  // 1044
 * value                                                                                      // 37  // 1045
 */                                                                                           // 38  // 1046
Router.hooks.dataNotFound = function () {                                                     // 39  // 1047
  if (!this.ready()) {                                                                        // 40  // 1048
    this.next();                                                                              // 41  // 1049
    return;                                                                                   // 42  // 1050
  }                                                                                           // 43  // 1051
                                                                                              // 44  // 1052
  var data = this.lookupOption('data');                                                       // 45  // 1053
  var dataValue;                                                                              // 46  // 1054
  var template = this.lookupOption('notFoundTemplate');                                       // 47  // 1055
                                                                                              // 48  // 1056
  if (typeof data === 'function') {                                                           // 49  // 1057
    if (!(dataValue = data.call(this))) {                                                     // 50  // 1058
      this.render(template || defaultDataNotFoundTemplate);                                   // 51  // 1059
      this.renderRegions();                                                                   // 52  // 1060
      return;                                                                                 // 53  // 1061
    }                                                                                         // 54  // 1062
  }                                                                                           // 55  // 1063
                                                                                              // 56  // 1064
  // okay never mind just pass along now                                                      // 57  // 1065
  this.next();                                                                                // 58  // 1066
};                                                                                            // 59  // 1067
                                                                                              // 60  // 1068
////////////////////////////////////////////////////////////////////////////////////////////////     // 1069
                                                                                                     // 1070
}).call(this);                                                                                       // 1071
                                                                                                     // 1072
                                                                                                     // 1073
                                                                                                     // 1074
                                                                                                     // 1075
                                                                                                     // 1076
                                                                                                     // 1077
(function () {                                                                                       // 1078
                                                                                                     // 1079
////////////////////////////////////////////////////////////////////////////////////////////////     // 1080
//                                                                                            //     // 1081
// packages/iron:router/lib/helpers.js                                                        //     // 1082
//                                                                                            //     // 1083
////////////////////////////////////////////////////////////////////////////////////////////////     // 1084
                                                                                              //     // 1085
/*****************************************************************************/               // 1   // 1086
/* Imports */                                                                                 // 2   // 1087
/*****************************************************************************/               // 3   // 1088
var warn = Iron.utils.warn;                                                                   // 4   // 1089
var DynamicTemplate = Iron.DynamicTemplate;                                                   // 5   // 1090
var debug = Iron.utils.debug('iron:router <helpers>');                                        // 6   // 1091
                                                                                              // 7   // 1092
/*****************************************************************************/               // 8   // 1093
/* UI Helpers */                                                                              // 9   // 1094
/*****************************************************************************/               // 10  // 1095
                                                                                              // 11  // 1096
/**                                                                                           // 12  // 1097
 * Render the Router to a specific location on the page instead of the                        // 13  // 1098
 * document.body.                                                                             // 14  // 1099
 */                                                                                           // 15  // 1100
UI.registerHelper('Router', new Blaze.Template('Router', function () {                        // 16  // 1101
  return Router.createView();                                                                 // 17  // 1102
}));                                                                                          // 18  // 1103
                                                                                              // 19  // 1104
/**                                                                                           // 20  // 1105
 * Returns a relative path given a route name, data context and optional query                // 21  // 1106
 * and hash parameters.                                                                       // 22  // 1107
 */                                                                                           // 23  // 1108
UI.registerHelper('pathFor', function (options) {                                             // 24  // 1109
  var routeName;                                                                              // 25  // 1110
                                                                                              // 26  // 1111
  if (arguments.length > 1) {                                                                 // 27  // 1112
    routeName = arguments[0];                                                                 // 28  // 1113
    options = arguments[1] || {};                                                             // 29  // 1114
  }                                                                                           // 30  // 1115
                                                                                              // 31  // 1116
  var opts = options && options.hash;                                                         // 32  // 1117
                                                                                              // 33  // 1118
  opts = opts || {};                                                                          // 34  // 1119
                                                                                              // 35  // 1120
  var path = '';                                                                              // 36  // 1121
  var query = opts.query;                                                                     // 37  // 1122
  var hash = opts.hash;                                                                       // 38  // 1123
  var routeName = routeName || opts.route;                                                    // 39  // 1124
  var data = _.extend({}, opts.data || this);                                                 // 40  // 1125
                                                                                              // 41  // 1126
  var route = Router.routes[routeName];                                                       // 42  // 1127
  warn(route, "pathFor couldn't find a route named " + JSON.stringify(routeName));            // 43  // 1128
                                                                                              // 44  // 1129
  if (route) {                                                                                // 45  // 1130
    _.each(route.handler.compiledUrl.keys, function (keyConfig) {                             // 46  // 1131
      var key = keyConfig.name;                                                               // 47  // 1132
      if (_.has(opts, key)) {                                                                 // 48  // 1133
        data[key] = EJSON.clone(opts[key]);                                                   // 49  // 1134
                                                                                              // 50  // 1135
        // so the option doesn't end up on the element as an attribute                        // 51  // 1136
        delete opts[key];                                                                     // 52  // 1137
      }                                                                                       // 53  // 1138
    });                                                                                       // 54  // 1139
                                                                                              // 55  // 1140
    path = route.path(data, {query: query, hash: hash});                                      // 56  // 1141
  }                                                                                           // 57  // 1142
                                                                                              // 58  // 1143
  return path;                                                                                // 59  // 1144
});                                                                                           // 60  // 1145
                                                                                              // 61  // 1146
/**                                                                                           // 62  // 1147
 * Returns a relative path given a route name, data context and optional query                // 63  // 1148
 * and hash parameters.                                                                       // 64  // 1149
 */                                                                                           // 65  // 1150
UI.registerHelper('urlFor', function (options) {                                              // 66  // 1151
  var routeName;                                                                              // 67  // 1152
                                                                                              // 68  // 1153
  if (arguments.length > 1) {                                                                 // 69  // 1154
    routeName = arguments[0];                                                                 // 70  // 1155
    options = arguments[1] || {};                                                             // 71  // 1156
  }                                                                                           // 72  // 1157
                                                                                              // 73  // 1158
  var opts = options && options.hash;                                                         // 74  // 1159
                                                                                              // 75  // 1160
  opts = opts || {};                                                                          // 76  // 1161
  var url = '';                                                                               // 77  // 1162
  var query = opts.query;                                                                     // 78  // 1163
  var hash = opts.hash;                                                                       // 79  // 1164
  var routeName = routeName || opts.route;                                                    // 80  // 1165
  var data = _.extend({}, opts.data || this);                                                 // 81  // 1166
                                                                                              // 82  // 1167
  var route = Router.routes[routeName];                                                       // 83  // 1168
  warn(route, "urlFor couldn't find a route named " + JSON.stringify(routeName));             // 84  // 1169
                                                                                              // 85  // 1170
  if (route) {                                                                                // 86  // 1171
    _.each(route.handler.compiledUrl.keys, function (keyConfig) {                             // 87  // 1172
      var key = keyConfig.name;                                                               // 88  // 1173
      if (_.has(opts, key)) {                                                                 // 89  // 1174
        data[key] = EJSON.clone(opts[key]);                                                   // 90  // 1175
                                                                                              // 91  // 1176
        // so the option doesn't end up on the element as an attribute                        // 92  // 1177
        delete opts[key];                                                                     // 93  // 1178
      }                                                                                       // 94  // 1179
    });                                                                                       // 95  // 1180
                                                                                              // 96  // 1181
    url = route.url(data, {query: query, hash: hash});                                        // 97  // 1182
  }                                                                                           // 98  // 1183
                                                                                              // 99  // 1184
  return url;                                                                                 // 100
});                                                                                           // 101
                                                                                              // 102
/**                                                                                           // 103
 * Create a link with optional content block.                                                 // 104
 *                                                                                            // 105
 * Example:                                                                                   // 106
 *   {{#linkTo route="one" query="query" hash="hash" class="my-cls"}}                         // 107
 *    <div>My Custom Link Content</div>                                                       // 108
 *   {{/linkTo}}                                                                              // 109
 */                                                                                           // 110
UI.registerHelper('linkTo', new Blaze.Template('linkTo', function () {                        // 111
  var self = this;                                                                            // 112
  var opts = DynamicTemplate.getInclusionArguments(this);                                     // 113
                                                                                              // 114
  if (typeof opts !== 'object')                                                               // 115
    throw new Error("linkTo options must be key value pairs such as {{#linkTo route='my.route.name'}}. You passed: " + JSON.stringify(opts));
                                                                                              // 117
  opts = opts || {};                                                                          // 118
  var path = '';                                                                              // 119
  var query = opts.query;                                                                     // 120
  var hash = opts.hash;                                                                       // 121
  var routeName = opts.route;                                                                 // 122
  var data = _.extend({}, opts.data || DynamicTemplate.getParentDataContext(this));           // 123
  var route = Router.routes[routeName];                                                       // 124
  var paramKeys;                                                                              // 125
                                                                                              // 126
  warn(route, "linkTo couldn't find a route named " + JSON.stringify(routeName));             // 127
                                                                                              // 128
  if (route) {                                                                                // 129
    _.each(route.handler.compiledUrl.keys, function (keyConfig) {                             // 130
      var key = keyConfig.name;                                                               // 131
      if (_.has(opts, key)) {                                                                 // 132
        data[key] = EJSON.clone(opts[key]);                                                   // 133
                                                                                              // 134
        // so the option doesn't end up on the element as an attribute                        // 135
        delete opts[key];                                                                     // 136
      }                                                                                       // 137
    });                                                                                       // 138
                                                                                              // 139
    path = route.path(data, {query: query, hash: hash});                                      // 140
  }                                                                                           // 141
                                                                                              // 142
  // anything that isn't one of our keywords we'll assume is an attributed                    // 143
  // intended for the <a> tag                                                                 // 144
  var attrs = _.omit(opts, 'route', 'query', 'hash', 'data');                                 // 145
  attrs.href = path;                                                                          // 146
                                                                                              // 147
  return Blaze.With(function () {                                                             // 148
    return DynamicTemplate.getParentDataContext(self);                                        // 149
  }, function () {                                                                            // 150
    return HTML.A(attrs, self.templateContentBlock);                                          // 151
  });                                                                                         // 152
}));                                                                                          // 153
                                                                                              // 154
////////////////////////////////////////////////////////////////////////////////////////////////     // 1240
                                                                                                     // 1241
}).call(this);                                                                                       // 1242
                                                                                                     // 1243
                                                                                                     // 1244
                                                                                                     // 1245
                                                                                                     // 1246
                                                                                                     // 1247
                                                                                                     // 1248
(function () {                                                                                       // 1249
                                                                                                     // 1250
////////////////////////////////////////////////////////////////////////////////////////////////     // 1251
//                                                                                            //     // 1252
// packages/iron:router/lib/body_parser_server.js                                             //     // 1253
//                                                                                            //     // 1254
////////////////////////////////////////////////////////////////////////////////////////////////     // 1255
                                                                                              //     // 1256
Router.bodyParser = Npm.require('body-parser');                                               // 1   // 1257
                                                                                              // 2   // 1258
////////////////////////////////////////////////////////////////////////////////////////////////     // 1259
                                                                                                     // 1260
}).call(this);                                                                                       // 1261
                                                                                                     // 1262
                                                                                                     // 1263
                                                                                                     // 1264
                                                                                                     // 1265
                                                                                                     // 1266
                                                                                                     // 1267
(function () {                                                                                       // 1268
                                                                                                     // 1269
////////////////////////////////////////////////////////////////////////////////////////////////     // 1270
//                                                                                            //     // 1271
// packages/iron:router/lib/router_server.js                                                  //     // 1272
//                                                                                            //     // 1273
////////////////////////////////////////////////////////////////////////////////////////////////     // 1274
                                                                                              //     // 1275
var assert = Iron.utils.assert;                                                               // 1   // 1276
                                                                                              // 2   // 1277
var env = process.env.NODE_ENV || 'development';                                              // 3   // 1278
                                                                                              // 4   // 1279
/**                                                                                           // 5   // 1280
 * Server specific initialization.                                                            // 6   // 1281
 */                                                                                           // 7   // 1282
Router.prototype.init = function (options) {};                                                // 8   // 1283
                                                                                              // 9   // 1284
/**                                                                                           // 10  // 1285
 * Give people a chance to customize the body parser                                          // 11  // 1286
 * behavior.                                                                                  // 12  // 1287
 */                                                                                           // 13  // 1288
Router.prototype.configureBodyParsers = function () {                                         // 14  // 1289
  Router.onBeforeAction(Iron.Router.bodyParser.json());                                       // 15  // 1290
  Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({extended: false}));                // 16  // 1291
};                                                                                            // 17  // 1292
                                                                                              // 18  // 1293
/**                                                                                           // 19  // 1294
 * Add the router to the server connect handlers.                                             // 20  // 1295
 */                                                                                           // 21  // 1296
Router.prototype.start = function () {                                                        // 22  // 1297
  WebApp.connectHandlers.use(this);                                                           // 23  // 1298
  this.configureBodyParsers();                                                                // 24  // 1299
};                                                                                            // 25  // 1300
                                                                                              // 26  // 1301
/**                                                                                           // 27  // 1302
 * Create a new controller and dispatch into the stack.                                       // 28  // 1303
 */                                                                                           // 29  // 1304
Router.prototype.dispatch = function (url, context, done) {                                   // 30  // 1305
  var self = this;                                                                            // 31  // 1306
                                                                                              // 32  // 1307
  assert(typeof url === 'string', "expected url string in router dispatch");                  // 33  // 1308
  assert(typeof context === 'object', "expected context object in router dispatch");          // 34  // 1309
                                                                                              // 35  // 1310
  // assumes there is only one router                                                         // 36  // 1311
  // XXX need to initialize controller either from the context itself or if the               // 37  // 1312
  // context already has a controller on it, just use that one.                               // 38  // 1313
  var controller = this.createController(url, context);                                       // 39  // 1314
                                                                                              // 40  // 1315
  controller.dispatch(this._stack, url, function (err) {                                      // 41  // 1316
    var res = this.response;                                                                  // 42  // 1317
    var req = this.request;                                                                   // 43  // 1318
    var msg;                                                                                  // 44  // 1319
                                                                                              // 45  // 1320
    if (err) {                                                                                // 46  // 1321
      if (res.statusCode < 400)                                                               // 47  // 1322
        res.statusCode = 500;                                                                 // 48  // 1323
                                                                                              // 49  // 1324
      if (err.status)                                                                         // 50  // 1325
        res.statusCode = err.status;                                                          // 51  // 1326
                                                                                              // 52  // 1327
      if (env === 'development')                                                              // 53  // 1328
        msg = (err.stack || err.toString()) + '\n';                                           // 54  // 1329
      else                                                                                    // 55  // 1330
        //XXX get this from standard dict of error messages?                                  // 56  // 1331
        msg = 'Server error.';                                                                // 57  // 1332
                                                                                              // 58  // 1333
      console.error(err.stack || err.toString());                                             // 59  // 1334
                                                                                              // 60  // 1335
      if (res.headersSent)                                                                    // 61  // 1336
        return req.socket.destroy();                                                          // 62  // 1337
                                                                                              // 63  // 1338
      res.setHeader('Content-Type', 'text/html');                                             // 64  // 1339
      res.setHeader('Content-Length', Buffer.byteLength(msg));                                // 65  // 1340
      if (req.method === 'HEAD')                                                              // 66  // 1341
        return res.end();                                                                     // 67  // 1342
      res.end(msg);                                                                           // 68  // 1343
      return;                                                                                 // 69  // 1344
    }                                                                                         // 70  // 1345
                                                                                              // 71  // 1346
    // if there are no client or server handlers for this dispatch                            // 72  // 1347
    // then send a 404.                                                                       // 73  // 1348
    // XXX we need a solution here for 404s on bad routes.                                    // 74  // 1349
    //     one solution might be to provide a custom 404 page in the public                   // 75  // 1350
    //     folder. But we need a proper way to handle 404s for search engines.                // 76  // 1351
    // XXX might be a PR to Meteor to use an existing status code if it's set                 // 77  // 1352
    if (!controller.isHandled() && !controller.willBeHandledOnClient()) {                     // 78  // 1353
      return done();                                                                          // 79  // 1354
      /*                                                                                      // 80  // 1355
      res.statusCode = 404;                                                                   // 81  // 1356
      res.setHeader('Content-Type', 'text/html');                                             // 82  // 1357
      msg = req.method + ' ' + req.originalUrl + ' not found.';                               // 83  // 1358
      console.error(msg);                                                                     // 84  // 1359
      if (req.method == 'HEAD')                                                               // 85  // 1360
        return res.end();                                                                     // 86  // 1361
      res.end(msg + '\n');                                                                    // 87  // 1362
      return;                                                                                 // 88  // 1363
      */                                                                                      // 89  // 1364
    }                                                                                         // 90  // 1365
                                                                                              // 91  // 1366
    // if for some reason there was a server handler but no client handler                    // 92  // 1367
    // and the server handler called next() we might end up here. We                          // 93  // 1368
    // want to make sure to end the response so it doesn't hang.                              // 94  // 1369
    if (controller.isHandled() && !controller.willBeHandledOnClient()) {                      // 95  // 1370
      res.setHeader('Content-Type', 'text/html');                                             // 96  // 1371
      if (req.method === 'HEAD')                                                              // 97  // 1372
        res.end();                                                                            // 98  // 1373
      res.end("<p>It looks like you don't have any client routes defined, but you had at least one server handler. You probably want to define some client side routes!</p>\n");
    }                                                                                         // 100
                                                                                              // 101
    // we'll have Meteor load the normal application so long as                               // 102
    // we have at least one client route/handler and the done() iterator                      // 103
    // function has been passed to us, presumably from Connect.                               // 104
    if (controller.willBeHandledOnClient() && done)                                           // 105
      return done(err);                                                                       // 106
  });                                                                                         // 107
};                                                                                            // 108
                                                                                              // 109
////////////////////////////////////////////////////////////////////////////////////////////////     // 1385
                                                                                                     // 1386
}).call(this);                                                                                       // 1387
                                                                                                     // 1388
                                                                                                     // 1389
                                                                                                     // 1390
                                                                                                     // 1391
                                                                                                     // 1392
                                                                                                     // 1393
(function () {                                                                                       // 1394
                                                                                                     // 1395
////////////////////////////////////////////////////////////////////////////////////////////////     // 1396
//                                                                                            //     // 1397
// packages/iron:router/lib/plugins.js                                                        //     // 1398
//                                                                                            //     // 1399
////////////////////////////////////////////////////////////////////////////////////////////////     // 1400
                                                                                              //     // 1401
/**                                                                                           // 1   // 1402
 * Simple plugin wrapper around the loading hook.                                             // 2   // 1403
 */                                                                                           // 3   // 1404
Router.plugins.loading = function (router, options) {                                         // 4   // 1405
  router.onBeforeAction('loading', options);                                                  // 5   // 1406
};                                                                                            // 6   // 1407
                                                                                              // 7   // 1408
/**                                                                                           // 8   // 1409
 * Simple plugin wrapper around the dataNotFound hook.                                        // 9   // 1410
 */                                                                                           // 10  // 1411
Router.plugins.dataNotFound = function (router, options) {                                    // 11  // 1412
  router.onBeforeAction('dataNotFound', options);                                             // 12  // 1413
};                                                                                            // 13  // 1414
                                                                                              // 14  // 1415
////////////////////////////////////////////////////////////////////////////////////////////////     // 1416
                                                                                                     // 1417
}).call(this);                                                                                       // 1418
                                                                                                     // 1419
                                                                                                     // 1420
                                                                                                     // 1421
                                                                                                     // 1422
                                                                                                     // 1423
                                                                                                     // 1424
(function () {                                                                                       // 1425
                                                                                                     // 1426
////////////////////////////////////////////////////////////////////////////////////////////////     // 1427
//                                                                                            //     // 1428
// packages/iron:router/lib/global_router.js                                                  //     // 1429
//                                                                                            //     // 1430
////////////////////////////////////////////////////////////////////////////////////////////////     // 1431
                                                                                              //     // 1432
Router = new Iron.Router;                                                                     // 1   // 1433
                                                                                              // 2   // 1434
////////////////////////////////////////////////////////////////////////////////////////////////     // 1435
                                                                                                     // 1436
}).call(this);                                                                                       // 1437
                                                                                                     // 1438
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron:router'] = {
  Router: Router,
  RouteController: RouteController
};

})();

//# sourceMappingURL=iron_router.js.map
