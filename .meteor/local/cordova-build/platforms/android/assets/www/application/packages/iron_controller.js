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
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Template = Package.templating.Template;
var Iron = Package['iron:core'].Iron;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var WaitList, Controller;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/iron_controller/packages/iron_controller.js                                           //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
(function () {                                                                                    // 1
                                                                                                  // 2
/////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                         //     // 4
// packages/iron:controller/lib/wait_list.js                                               //     // 5
//                                                                                         //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                           //     // 8
/*****************************************************************************/            // 1   // 9
/* Imports */                                                                              // 2   // 10
/*****************************************************************************/            // 3   // 11
var assert = Iron.utils.assert;                                                            // 4   // 12
                                                                                           // 5   // 13
/*****************************************************************************/            // 6   // 14
/* Private */                                                                              // 7   // 15
/*****************************************************************************/            // 8   // 16
                                                                                           // 9   // 17
/**                                                                                        // 10  // 18
 * Returns an object of computation ids starting with                                      // 11  // 19
 * the current computation and including all ancestor                                      // 12  // 20
 * computations. The data structure is an object                                           // 13  // 21
 * so we can index by id and do quick checks.                                              // 14  // 22
 */                                                                                        // 15  // 23
var parentComputations = function () {                                                     // 16  // 24
  var list = {};                                                                           // 17  // 25
  var c = Deps.currentComputation;                                                         // 18  // 26
                                                                                           // 19  // 27
  while (c) {                                                                              // 20  // 28
    list[String(c._id)] = true;                                                            // 21  // 29
    c = c._parent;                                                                         // 22  // 30
  }                                                                                        // 23  // 31
                                                                                           // 24  // 32
  return list;                                                                             // 25  // 33
};                                                                                         // 26  // 34
                                                                                           // 27  // 35
/**                                                                                        // 28  // 36
 * Check whether the user has called ready() and then called wait(). This                  // 29  // 37
 * can cause a condition that can be simplified to this:                                   // 30  // 38
 *                                                                                         // 31  // 39
 * dep = new Deps.Dependency;                                                              // 32  // 40
 *                                                                                         // 33  // 41
 * Deps.autorun(function () {                                                              // 34  // 42
 *   dep.depend();                                                                         // 35  // 43
 *   dep.changed();                                                                        // 36  // 44
 * });                                                                                     // 37  // 45
 */                                                                                        // 38  // 46
var assertNoInvalidationLoop = function (dependency) {                                     // 39  // 47
  var parentComps = parentComputations();                                                  // 40  // 48
  var depCompIds = _.keys(dependency._dependentsById);                                     // 41  // 49
                                                                                           // 42  // 50
  _.each(depCompIds, function (id) {                                                       // 43  // 51
    assert(!parentComps[id], "\n\n\
You called wait() after calling ready() inside the same computation tree.\
\n\n\
You can fix this problem in two possible ways:\n\n\
1) Put all of your wait() calls before any ready() calls.\n\
2) Put your ready() call in its own computation with Deps.autorun."                        // 49  // 57
    );                                                                                     // 50  // 58
  });                                                                                      // 51  // 59
};                                                                                         // 52  // 60
                                                                                           // 53  // 61
                                                                                           // 54  // 62
/*****************************************************************************/            // 55  // 63
/* WaitList */                                                                             // 56  // 64
/*****************************************************************************/            // 57  // 65
/**                                                                                        // 58  // 66
 * A WaitList tracks a list of reactive functions, each in its own computation.            // 59  // 67
 * The list is ready() when all of the functions return true. This list is not             // 60  // 68
 * ready (i.e. this.ready() === false) if at least one function returns false.             // 61  // 69
 *                                                                                         // 62  // 70
 * You add functions by calling the wait(fn) method. Each function is run its              // 63  // 71
 * own computation. The ready() method is a reactive method but only calls the             // 64  // 72
 * deps changed function if the overall state of the list changes from true to             // 65  // 73
 * false or from false to true.                                                            // 66  // 74
 */                                                                                        // 67  // 75
WaitList = function () {                                                                   // 68  // 76
  this._readyDep = new Deps.Dependency;                                                    // 69  // 77
  this._comps = [];                                                                        // 70  // 78
  this._notReadyCount = 0;                                                                 // 71  // 79
};                                                                                         // 72  // 80
                                                                                           // 73  // 81
/**                                                                                        // 74  // 82
 * Pass a function that returns true or false.                                             // 75  // 83
 */                                                                                        // 76  // 84
WaitList.prototype.wait = function (fn) {                                                  // 77  // 85
  var self = this;                                                                         // 78  // 86
                                                                                           // 79  // 87
  var activeComp = Deps.currentComputation;                                                // 80  // 88
                                                                                           // 81  // 89
  assertNoInvalidationLoop(self._readyDep);                                                // 82  // 90
                                                                                           // 83  // 91
  // break with parent computation and grab the new comp                                   // 84  // 92
  Deps.nonreactive(function () {                                                           // 85  // 93
                                                                                           // 86  // 94
    // store the cached result so we can see if it's different from one run to             // 87  // 95
    // the next.                                                                           // 88  // 96
    var cachedResult = null;                                                               // 89  // 97
                                                                                           // 90  // 98
    // create a computation for this handle                                                // 91  // 99
    var comp = Deps.autorun(function (c) {                                                 // 92  // 100
      // let's get the new result coerced into a true or false value.                      // 93  // 101
      var result = !!fn();                                                                 // 94  // 102
                                                                                           // 95  // 103
      var oldNotReadyCount = self._notReadyCount;                                          // 96  // 104
                                                                                           // 97  // 105
      // if it's the first run and we're false then inc                                    // 98  // 106
      if (c.firstRun && !result)                                                           // 99  // 107
        self._notReadyCount++;                                                             // 100
      else if (cachedResult !== null && result !== cachedResult && result === true)        // 101
        self._notReadyCount--;                                                             // 102
      else if (cachedResult !== null && result !== cachedResult && result === false)       // 103
        self._notReadyCount++;                                                             // 104
                                                                                           // 105
      cachedResult = result;                                                               // 106
                                                                                           // 107
      if (oldNotReadyCount === 0 && self._notReadyCount > 0)                               // 108
        self._readyDep.changed();                                                          // 109
      else if (oldNotReadyCount > 0 && self._notReadyCount === 0)                          // 110
        self._readyDep.changed();                                                          // 111
    });                                                                                    // 112
                                                                                           // 113
    self._comps.push(comp);                                                                // 114
                                                                                           // 115
    if (activeComp) {                                                                      // 116
      activeComp.onInvalidate(function () {                                                // 117
        // keep the old computation and notReadyCount the same for one                     // 118
        // flush cycle so that we don't end up in an intermediate state                    // 119
        // where list.ready() is not correct.                                              // 120
                                                                                           // 121
        // keep the state the same until the flush cycle is complete                       // 122
        Deps.afterFlush(function () {                                                      // 123
          // stop the computation                                                          // 124
          comp.stop();                                                                     // 125
                                                                                           // 126
          // remove the computation from the list                                          // 127
          self._comps.splice(_.indexOf(self._comps, comp), 1);                             // 128
                                                                                           // 129
          if (cachedResult === false) {                                                    // 130
            self._notReadyCount--;                                                         // 131
                                                                                           // 132
            if (self._notReadyCount === 0)                                                 // 133
              self._readyDep.changed();                                                    // 134
          }                                                                                // 135
        });                                                                                // 136
      });                                                                                  // 137
    }                                                                                      // 138
  });                                                                                      // 139
};                                                                                         // 140
                                                                                           // 141
WaitList.prototype.ready = function () {                                                   // 142
  this._readyDep.depend();                                                                 // 143
  return this._notReadyCount === 0;                                                        // 144
};                                                                                         // 145
                                                                                           // 146
WaitList.prototype.stop = function () {                                                    // 147
  _.each(this._comps, function (c) { c.stop(); });                                         // 148
  this._comps = [];                                                                        // 149
};                                                                                         // 150
                                                                                           // 151
Iron.WaitList = WaitList;                                                                  // 152
                                                                                           // 153
/////////////////////////////////////////////////////////////////////////////////////////////     // 162
                                                                                                  // 163
}).call(this);                                                                                    // 164
                                                                                                  // 165
                                                                                                  // 166
                                                                                                  // 167
                                                                                                  // 168
                                                                                                  // 169
                                                                                                  // 170
(function () {                                                                                    // 171
                                                                                                  // 172
/////////////////////////////////////////////////////////////////////////////////////////////     // 173
//                                                                                         //     // 174
// packages/iron:controller/lib/controller.js                                              //     // 175
//                                                                                         //     // 176
/////////////////////////////////////////////////////////////////////////////////////////////     // 177
                                                                                           //     // 178
/*****************************************************************************/            // 1   // 179
/* Imports */                                                                              // 2   // 180
/*****************************************************************************/            // 3   // 181
var debug = Iron.utils.debug('iron:controller');                                           // 4   // 182
var Layout = Iron.Layout;                                                                  // 5   // 183
var DynamicTemplate = Iron.DynamicTemplate;                                                // 6   // 184
                                                                                           // 7   // 185
/*****************************************************************************/            // 8   // 186
/* Private */                                                                              // 9   // 187
/*****************************************************************************/            // 10  // 188
var bindData = function (value, thisArg) {                                                 // 11  // 189
  return function () {                                                                     // 12  // 190
    return (typeof value === 'function') ? value.apply(thisArg, arguments) : value;        // 13  // 191
  };                                                                                       // 14  // 192
};                                                                                         // 15  // 193
                                                                                           // 16  // 194
/*****************************************************************************/            // 17  // 195
/* Controller */                                                                           // 18  // 196
/*****************************************************************************/            // 19  // 197
Controller = function (options) {                                                          // 20  // 198
  var self = this;                                                                         // 21  // 199
  this.options = options || {};                                                            // 22  // 200
  this._layout = this.options.layout || new Layout(this.options);                          // 23  // 201
  this._isController = true;                                                               // 24  // 202
  this._layout._setLookupHost(this);                                                       // 25  // 203
                                                                                           // 26  // 204
  // grab the event map from the Controller constructor which was                          // 27  // 205
  // set if the user does MyController.events({...});                                      // 28  // 206
  var eventMap = Controller._collectEventMaps.call(this.constructor);                      // 29  // 207
  this._layout.events(eventMap, this);                                                     // 30  // 208
                                                                                           // 31  // 209
  this.init(options);                                                                      // 32  // 210
};                                                                                         // 33  // 211
                                                                                           // 34  // 212
/**                                                                                        // 35  // 213
 * Set or get the layout's template and optionally its data context.                       // 36  // 214
 */                                                                                        // 37  // 215
Controller.prototype.layout = function (template, options) {                               // 38  // 216
  var self = this;                                                                         // 39  // 217
                                                                                           // 40  // 218
  this._layout.template(template);                                                         // 41  // 219
                                                                                           // 42  // 220
  // check whether options has a data property                                             // 43  // 221
  if (options && (_.has(options, 'data')))                                                 // 44  // 222
    this._layout.data(bindData(options.data, this));                                       // 45  // 223
                                                                                           // 46  // 224
  return {                                                                                 // 47  // 225
    data: function (val) {                                                                 // 48  // 226
      return self._layout.data(bindData(val, self));                                       // 49  // 227
    }                                                                                      // 50  // 228
  };                                                                                       // 51  // 229
};                                                                                         // 52  // 230
                                                                                           // 53  // 231
/**                                                                                        // 54  // 232
 * Render a template into a region of the layout.                                          // 55  // 233
 */                                                                                        // 56  // 234
Controller.prototype.render = function (template, options) {                               // 57  // 235
  var self = this;                                                                         // 58  // 236
                                                                                           // 59  // 237
  if (options && (typeof options.data !== 'undefined'))                                    // 60  // 238
    options.data = bindData(options.data, this);                                           // 61  // 239
                                                                                           // 62  // 240
  var tmpl = this._layout.render(template, options);                                       // 63  // 241
                                                                                           // 64  // 242
  // allow caller to do: this.render('MyTemplate').data(function () {...});                // 65  // 243
  return {                                                                                 // 66  // 244
    data: function (func) {                                                                // 67  // 245
      return tmpl.data(bindData(func, self));                                              // 68  // 246
    }                                                                                      // 69  // 247
  };                                                                                       // 70  // 248
};                                                                                         // 71  // 249
                                                                                           // 72  // 250
/**                                                                                        // 73  // 251
 * Begin recording rendered regions.                                                       // 74  // 252
 */                                                                                        // 75  // 253
Controller.prototype.beginRendering = function (onComplete) {                              // 76  // 254
  return this._layout.beginRendering(onComplete);                                          // 77  // 255
};                                                                                         // 78  // 256
                                                                                           // 79  // 257
/*****************************************************************************/            // 80  // 258
/* Controller Static Methods */                                                            // 81  // 259
/*****************************************************************************/            // 82  // 260
/**                                                                                        // 83  // 261
 * Inherit from Controller.                                                                // 84  // 262
 *                                                                                         // 85  // 263
 * Note: The inheritance function in Meteor._inherits is broken. Static                    // 86  // 264
 * properties on functions don't get copied.                                               // 87  // 265
 */                                                                                        // 88  // 266
Controller.extend = function (props) {                                                     // 89  // 267
  return Iron.utils.extend(this, props);                                                   // 90  // 268
};                                                                                         // 91  // 269
                                                                                           // 92  // 270
Controller.events = function (events) {                                                    // 93  // 271
  this._eventMap = events;                                                                 // 94  // 272
  return this;                                                                             // 95  // 273
};                                                                                         // 96  // 274
                                                                                           // 97  // 275
/**                                                                                        // 98  // 276
 * Returns a single event map merged from super to child.                                  // 99  // 277
 * Called from the constructor function like this:                                         // 100
 *                                                                                         // 101
 * this.constructor._collectEventMaps()                                                    // 102
 */                                                                                        // 103
                                                                                           // 104
var mergeStaticInheritedObjectProperty = function (ctor, prop) {                           // 105
  var merge = {};                                                                          // 106
                                                                                           // 107
  if (ctor.__super__)                                                                      // 108
    _.extend(merge, mergeStaticInheritedObjectProperty(ctor.__super__.constructor, prop)); // 109
                                                                                           // 110
  return _.has(ctor, prop) ? _.extend(merge, ctor[prop]) : merge;                          // 111
};                                                                                         // 112
                                                                                           // 113
Controller._collectEventMaps = function () {                                               // 114
  return mergeStaticInheritedObjectProperty(this, '_eventMap');                            // 115
};                                                                                         // 116
                                                                                           // 117
// NOTE: helpers are not inherited from one controller to another, for now.                // 118
Controller._helpers = {};                                                                  // 119
Controller.helpers = function (helpers) {                                                  // 120
  _.extend(this._helpers, helpers);                                                        // 121
  return this;                                                                             // 122
};                                                                                         // 123
                                                                                           // 124
/*****************************************************************************/            // 125
/* Global Helpers */                                                                       // 126
/*****************************************************************************/            // 127
if (typeof Template !== 'undefined') {                                                     // 128
  /**                                                                                      // 129
   * Returns the nearest controller for a template instance. You can call this             // 130
   * function from inside a template helper.                                               // 131
   *                                                                                       // 132
   * Example:                                                                              // 133
   * Template.MyPage.helpers({                                                             // 134
   *   greeting: function () {                                                             // 135
   *    var controller = Iron.controller();                                                // 136
   *    return controller.state.get('greeting');                                           // 137
   *   }                                                                                   // 138
   * });                                                                                   // 139
   */                                                                                      // 140
  Iron.controller = function () {                                                          // 141
    //XXX establishes a reactive dependency which causes helper to run                     // 142
    return DynamicTemplate.findLookupHostWithProperty(Blaze.getView(), '_isController');   // 143
  };                                                                                       // 144
                                                                                           // 145
  /**                                                                                      // 146
   * Find a lookup host with a state key and return it reactively if we have               // 147
   * it.                                                                                   // 148
   */                                                                                      // 149
  Template.registerHelper('get', function (key) {                                          // 150
    var controller = Iron.controller();                                                    // 151
    if (controller && controller.state)                                                    // 152
      return controller.state.get(key);                                                    // 153
  });                                                                                      // 154
}                                                                                          // 155
/*****************************************************************************/            // 156
/* Namespacing */                                                                          // 157
/*****************************************************************************/            // 158
Iron.Controller = Controller;                                                              // 159
                                                                                           // 160
/////////////////////////////////////////////////////////////////////////////////////////////     // 339
                                                                                                  // 340
}).call(this);                                                                                    // 341
                                                                                                  // 342
                                                                                                  // 343
                                                                                                  // 344
                                                                                                  // 345
                                                                                                  // 346
                                                                                                  // 347
(function () {                                                                                    // 348
                                                                                                  // 349
/////////////////////////////////////////////////////////////////////////////////////////////     // 350
//                                                                                         //     // 351
// packages/iron:controller/lib/controller_client.js                                       //     // 352
//                                                                                         //     // 353
/////////////////////////////////////////////////////////////////////////////////////////////     // 354
                                                                                           //     // 355
/*****************************************************************************/            // 1   // 356
/* Imports */                                                                              // 2   // 357
/*****************************************************************************/            // 3   // 358
var Layout = Iron.Layout;                                                                  // 4   // 359
var debug = Iron.utils.debug('iron:controller');                                           // 5   // 360
var defaultValue = Iron.utils.defaultValue;                                                // 6   // 361
                                                                                           // 7   // 362
/*****************************************************************************/            // 8   // 363
/* Private */                                                                              // 9   // 364
/*****************************************************************************/            // 10  // 365
var bindData = function (value, thisArg) {                                                 // 11  // 366
  return function () {                                                                     // 12  // 367
    return (typeof value === 'function') ? value.apply(thisArg, arguments) : value;        // 13  // 368
  };                                                                                       // 14  // 369
};                                                                                         // 15  // 370
                                                                                           // 16  // 371
/*****************************************************************************/            // 17  // 372
/* Controller Client */                                                                    // 18  // 373
/*****************************************************************************/            // 19  // 374
/**                                                                                        // 20  // 375
 * Client specific init code.                                                              // 21  // 376
 */                                                                                        // 22  // 377
Controller.prototype.init = function (options) {                                           // 23  // 378
  this._waitlist = new WaitList;                                                           // 24  // 379
  this.state = new ReactiveDict;                                                           // 25  // 380
};                                                                                         // 26  // 381
                                                                                           // 27  // 382
/**                                                                                        // 28  // 383
 * Insert the controller's layout into the DOM.                                            // 29  // 384
 */                                                                                        // 30  // 385
Controller.prototype.insert = function (options) {                                         // 31  // 386
  return this._layout.insert.apply(this._layout, arguments);                               // 32  // 387
};                                                                                         // 33  // 388
                                                                                           // 34  // 389
/**                                                                                        // 35  // 390
 * Add an item to the waitlist.                                                            // 36  // 391
 */                                                                                        // 37  // 392
Controller.prototype.wait = function (fn) {                                                // 38  // 393
  var self = this;                                                                         // 39  // 394
                                                                                           // 40  // 395
  if (!fn)                                                                                 // 41  // 396
    // it's possible fn is just undefined but we'll just return instead                    // 42  // 397
    // of throwing an error, to make it easier to call this function                       // 43  // 398
    // with waitOn which might not return anything.                                        // 44  // 399
    return;                                                                                // 45  // 400
                                                                                           // 46  // 401
  if (_.isArray(fn)) {                                                                     // 47  // 402
    _.each(fn, function eachWait (fnOrHandle) {                                            // 48  // 403
      self.wait(fnOrHandle);                                                               // 49  // 404
    });                                                                                    // 50  // 405
  } else if (fn.ready) {                                                                   // 51  // 406
    this._waitlist.wait(function () { return fn.ready(); });                               // 52  // 407
  } else {                                                                                 // 53  // 408
    this._waitlist.wait(fn);                                                               // 54  // 409
  }                                                                                        // 55  // 410
                                                                                           // 56  // 411
  return this;                                                                             // 57  // 412
};                                                                                         // 58  // 413
                                                                                           // 59  // 414
/**                                                                                        // 60  // 415
 * Returns true if all items in the waitlist are ready.                                    // 61  // 416
 */                                                                                        // 62  // 417
Controller.prototype.ready = function () {                                                 // 63  // 418
  return this._waitlist.ready();                                                           // 64  // 419
};                                                                                         // 65  // 420
                                                                                           // 66  // 421
/**                                                                                        // 67  // 422
 * Clean up the controller and stop the waitlist.                                          // 68  // 423
 */                                                                                        // 69  // 424
Controller.prototype.stop = function () {                                                  // 70  // 425
  this._waitlist.stop();                                                                   // 71  // 426
};                                                                                         // 72  // 427
                                                                                           // 73  // 428
/////////////////////////////////////////////////////////////////////////////////////////////     // 429
                                                                                                  // 430
}).call(this);                                                                                    // 431
                                                                                                  // 432
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron:controller'] = {};

})();
