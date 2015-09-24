(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var Controller;

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
// packages/iron:controller/lib/controller.js                                              //     // 5
//                                                                                         //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                           //     // 8
/*****************************************************************************/            // 1   // 9
/* Imports */                                                                              // 2   // 10
/*****************************************************************************/            // 3   // 11
var debug = Iron.utils.debug('iron:controller');                                           // 4   // 12
var Layout = Iron.Layout;                                                                  // 5   // 13
var DynamicTemplate = Iron.DynamicTemplate;                                                // 6   // 14
                                                                                           // 7   // 15
/*****************************************************************************/            // 8   // 16
/* Private */                                                                              // 9   // 17
/*****************************************************************************/            // 10  // 18
var bindData = function (value, thisArg) {                                                 // 11  // 19
  return function () {                                                                     // 12  // 20
    return (typeof value === 'function') ? value.apply(thisArg, arguments) : value;        // 13  // 21
  };                                                                                       // 14  // 22
};                                                                                         // 15  // 23
                                                                                           // 16  // 24
/*****************************************************************************/            // 17  // 25
/* Controller */                                                                           // 18  // 26
/*****************************************************************************/            // 19  // 27
Controller = function (options) {                                                          // 20  // 28
  var self = this;                                                                         // 21  // 29
  this.options = options || {};                                                            // 22  // 30
  this._layout = this.options.layout || new Layout(this.options);                          // 23  // 31
  this._isController = true;                                                               // 24  // 32
  this._layout._setLookupHost(this);                                                       // 25  // 33
                                                                                           // 26  // 34
  // grab the event map from the Controller constructor which was                          // 27  // 35
  // set if the user does MyController.events({...});                                      // 28  // 36
  var eventMap = Controller._collectEventMaps.call(this.constructor);                      // 29  // 37
  this._layout.events(eventMap, this);                                                     // 30  // 38
                                                                                           // 31  // 39
  this.init(options);                                                                      // 32  // 40
};                                                                                         // 33  // 41
                                                                                           // 34  // 42
/**                                                                                        // 35  // 43
 * Set or get the layout's template and optionally its data context.                       // 36  // 44
 */                                                                                        // 37  // 45
Controller.prototype.layout = function (template, options) {                               // 38  // 46
  var self = this;                                                                         // 39  // 47
                                                                                           // 40  // 48
  this._layout.template(template);                                                         // 41  // 49
                                                                                           // 42  // 50
  // check whether options has a data property                                             // 43  // 51
  if (options && (_.has(options, 'data')))                                                 // 44  // 52
    this._layout.data(bindData(options.data, this));                                       // 45  // 53
                                                                                           // 46  // 54
  return {                                                                                 // 47  // 55
    data: function (val) {                                                                 // 48  // 56
      return self._layout.data(bindData(val, self));                                       // 49  // 57
    }                                                                                      // 50  // 58
  };                                                                                       // 51  // 59
};                                                                                         // 52  // 60
                                                                                           // 53  // 61
/**                                                                                        // 54  // 62
 * Render a template into a region of the layout.                                          // 55  // 63
 */                                                                                        // 56  // 64
Controller.prototype.render = function (template, options) {                               // 57  // 65
  var self = this;                                                                         // 58  // 66
                                                                                           // 59  // 67
  if (options && (typeof options.data !== 'undefined'))                                    // 60  // 68
    options.data = bindData(options.data, this);                                           // 61  // 69
                                                                                           // 62  // 70
  var tmpl = this._layout.render(template, options);                                       // 63  // 71
                                                                                           // 64  // 72
  // allow caller to do: this.render('MyTemplate').data(function () {...});                // 65  // 73
  return {                                                                                 // 66  // 74
    data: function (func) {                                                                // 67  // 75
      return tmpl.data(bindData(func, self));                                              // 68  // 76
    }                                                                                      // 69  // 77
  };                                                                                       // 70  // 78
};                                                                                         // 71  // 79
                                                                                           // 72  // 80
/**                                                                                        // 73  // 81
 * Begin recording rendered regions.                                                       // 74  // 82
 */                                                                                        // 75  // 83
Controller.prototype.beginRendering = function (onComplete) {                              // 76  // 84
  return this._layout.beginRendering(onComplete);                                          // 77  // 85
};                                                                                         // 78  // 86
                                                                                           // 79  // 87
/*****************************************************************************/            // 80  // 88
/* Controller Static Methods */                                                            // 81  // 89
/*****************************************************************************/            // 82  // 90
/**                                                                                        // 83  // 91
 * Inherit from Controller.                                                                // 84  // 92
 *                                                                                         // 85  // 93
 * Note: The inheritance function in Meteor._inherits is broken. Static                    // 86  // 94
 * properties on functions don't get copied.                                               // 87  // 95
 */                                                                                        // 88  // 96
Controller.extend = function (props) {                                                     // 89  // 97
  return Iron.utils.extend(this, props);                                                   // 90  // 98
};                                                                                         // 91  // 99
                                                                                           // 92  // 100
Controller.events = function (events) {                                                    // 93  // 101
  this._eventMap = events;                                                                 // 94  // 102
  return this;                                                                             // 95  // 103
};                                                                                         // 96  // 104
                                                                                           // 97  // 105
/**                                                                                        // 98  // 106
 * Returns a single event map merged from super to child.                                  // 99  // 107
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
/////////////////////////////////////////////////////////////////////////////////////////////     // 169
                                                                                                  // 170
}).call(this);                                                                                    // 171
                                                                                                  // 172
                                                                                                  // 173
                                                                                                  // 174
                                                                                                  // 175
                                                                                                  // 176
                                                                                                  // 177
(function () {                                                                                    // 178
                                                                                                  // 179
/////////////////////////////////////////////////////////////////////////////////////////////     // 180
//                                                                                         //     // 181
// packages/iron:controller/lib/controller_server.js                                       //     // 182
//                                                                                         //     // 183
/////////////////////////////////////////////////////////////////////////////////////////////     // 184
                                                                                           //     // 185
Controller.prototype.init = function () {};                                                // 1   // 186
                                                                                           // 2   // 187
Controller.prototype.wait = function () {};                                                // 3   // 188
                                                                                           // 4   // 189
Controller.prototype.ready = function () {                                                 // 5   // 190
  // for now there are no subscribe calls on the server. All data should                   // 6   // 191
  // be ready synchronously which means this.ready() should always be true.                // 7   // 192
  return true;                                                                             // 8   // 193
};                                                                                         // 9   // 194
                                                                                           // 10  // 195
/////////////////////////////////////////////////////////////////////////////////////////////     // 196
                                                                                                  // 197
}).call(this);                                                                                    // 198
                                                                                                  // 199
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron:controller'] = {};

})();

//# sourceMappingURL=iron_controller.js.map
