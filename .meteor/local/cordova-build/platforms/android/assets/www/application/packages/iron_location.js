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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var urlToHashStyle, urlFromHashStyle, fixHashPath, State, Location;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/iron_location/packages/iron_location.js                                                                //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
(function () {                                                                                                     // 1
                                                                                                                   // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                          //     // 4
// packages/iron:location/lib/utils.js                                                                      //     // 5
//                                                                                                          //     // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                            //     // 8
var Url = Iron.Url;                                                                                         // 1   // 9
var HASH_PARAM_NAME='__hash__';                                                                             // 2   // 10
                                                                                                            // 3   // 11
/**                                                                                                         // 4   // 12
 * Given:                                                                                                   // 5   // 13
 *   http://host:port/some/pathname/?query=string#bar                                                       // 6   // 14
 *                                                                                                          // 7   // 15
 * Return:                                                                                                  // 8   // 16
 *   http://host:port#!some/pathname/?query=string&__hash__=bar                                             // 9   // 17
 */                                                                                                         // 10  // 18
urlToHashStyle = function (url) {                                                                           // 11  // 19
  var parts = Url.parse(url);                                                                               // 12  // 20
  var hash = parts.hash && parts.hash.replace('#', '');                                                     // 13  // 21
  var search = parts.search;                                                                                // 14  // 22
  var pathname = parts.pathname;                                                                            // 15  // 23
  var root = parts.rootUrl;                                                                                 // 16  // 24
                                                                                                            // 17  // 25
  // do we have another hash value that isn't a path?                                                       // 18  // 26
  if (hash && hash.charAt(0) !== '!') {                                                                     // 19  // 27
    var hashQueryString = HASH_PARAM_NAME + '=' + hash;                                                     // 20  // 28
    search = search ? (search + '&') : '?';                                                                 // 21  // 29
    search += hashQueryString;                                                                              // 22  // 30
    hash = '';                                                                                              // 23  // 31
  }                                                                                                         // 24  // 32
                                                                                                            // 25  // 33
  // if we don't already have a path on the hash create one                                                 // 26  // 34
  if (! hash && pathname) {                                                                                 // 27  // 35
    hash = '#!' + pathname.substring(1);                                                                    // 28  // 36
  } else if (hash) {                                                                                        // 29  // 37
    hash = '#' + hash;                                                                                      // 30  // 38
  }                                                                                                         // 31  // 39
                                                                                                            // 32  // 40
  return [                                                                                                  // 33  // 41
    root,                                                                                                   // 34  // 42
    hash,                                                                                                   // 35  // 43
    search                                                                                                  // 36  // 44
  ].join('');                                                                                               // 37  // 45
};                                                                                                          // 38  // 46
                                                                                                            // 39  // 47
/**                                                                                                         // 40  // 48
 * Given a url that uses the hash style (see above), return a new url that uses                             // 41  // 49
 * the hash path as a normal pathname.                                                                      // 42  // 50
 *                                                                                                          // 43  // 51
 * Given:                                                                                                   // 44  // 52
 *   http://host:port#!some/pathname/?query=string&__hash__=bar                                             // 45  // 53
 *                                                                                                          // 46  // 54
 * Return:                                                                                                  // 47  // 55
 *   http://host:port/some/pathname/?query=string#bar                                                       // 48  // 56
 */                                                                                                         // 49  // 57
urlFromHashStyle = function (url) {                                                                         // 50  // 58
  var parts = Url.parse(url);                                                                               // 51  // 59
  var pathname = parts.hash && parts.hash.replace('#!', '/');                                               // 52  // 60
  var search = parts.search;                                                                                // 53  // 61
  var root = parts.rootUrl;                                                                                 // 54  // 62
  var hash;                                                                                                 // 55  // 63
                                                                                                            // 56  // 64
  // see if there's a __hash__=value in the query string in which case put it                               // 57  // 65
  // back in the normal hash position and delete it from the search string.                                 // 58  // 66
  if (_.has(parts.queryObject, HASH_PARAM_NAME)) {                                                          // 59  // 67
    hash = '#' + parts.queryObject[HASH_PARAM_NAME];                                                        // 60  // 68
    delete parts.queryObject[HASH_PARAM_NAME];                                                              // 61  // 69
  } else {                                                                                                  // 62  // 70
    hash = '';                                                                                              // 63  // 71
  }                                                                                                         // 64  // 72
                                                                                                            // 65  // 73
  return [                                                                                                  // 66  // 74
    root,                                                                                                   // 67  // 75
    pathname,                                                                                               // 68  // 76
    Url.toQueryString(parts.queryObject),                                                                   // 69  // 77
    hash                                                                                                    // 70  // 78
  ].join('');                                                                                               // 71  // 79
};                                                                                                          // 72  // 80
                                                                                                            // 73  // 81
/**                                                                                                         // 74  // 82
 * Fix up a pathname intended for use with a hash path by moving any hash                                   // 75  // 83
 * fragments into the query string.                                                                         // 76  // 84
 */                                                                                                         // 77  // 85
fixHashPath = function (pathname) {                                                                         // 78  // 86
  var parts = Url.parse(pathname);                                                                          // 79  // 87
  var query = parts.queryObject;                                                                            // 80  // 88
                                                                                                            // 81  // 89
  // if there's a hash in the path move that to the query string                                            // 82  // 90
  if (parts.hash) {                                                                                         // 83  // 91
    query[HASH_PARAM_NAME] = parts.hash.replace('#', '')                                                    // 84  // 92
  }                                                                                                         // 85  // 93
                                                                                                            // 86  // 94
  return [                                                                                                  // 87  // 95
    '!',                                                                                                    // 88  // 96
    parts.pathname.substring(1),                                                                            // 89  // 97
    Url.toQueryString(query)                                                                                // 90  // 98
  ].join('');                                                                                               // 91  // 99
};                                                                                                          // 92  // 100
                                                                                                            // 93  // 101
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 102
                                                                                                                   // 103
}).call(this);                                                                                                     // 104
                                                                                                                   // 105
                                                                                                                   // 106
                                                                                                                   // 107
                                                                                                                   // 108
                                                                                                                   // 109
                                                                                                                   // 110
(function () {                                                                                                     // 111
                                                                                                                   // 112
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 113
//                                                                                                          //     // 114
// packages/iron:location/lib/state.js                                                                      //     // 115
//                                                                                                          //     // 116
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 117
                                                                                                            //     // 118
var Url = Iron.Url;                                                                                         // 1   // 119
                                                                                                            // 2   // 120
State = function (url, options) {                                                                           // 3   // 121
  _.extend(this, Url.parse(url), {options: options || {}});                                                 // 4   // 122
};                                                                                                          // 5   // 123
                                                                                                            // 6   // 124
// XXX: should this compare options (e.g. history.state?)                                                   // 7   // 125
State.prototype.equals = function (other) {                                                                 // 8   // 126
  if (!other)                                                                                               // 9   // 127
    return false;                                                                                           // 10  // 128
                                                                                                            // 11  // 129
  if (!(other instanceof State))                                                                            // 12  // 130
    return false;                                                                                           // 13  // 131
                                                                                                            // 14  // 132
  if (other.pathname == this.pathname &&                                                                    // 15  // 133
     other.search == this.search &&                                                                         // 16  // 134
     other.hash == this.hash &&                                                                             // 17  // 135
     other.options.historyState === this.options.historyState)                                              // 18  // 136
    return true;                                                                                            // 19  // 137
                                                                                                            // 20  // 138
  return false;                                                                                             // 21  // 139
};                                                                                                          // 22  // 140
                                                                                                            // 23  // 141
State.prototype.isCancelled = function () {                                                                 // 24  // 142
  return !!this._isCancelled;                                                                               // 25  // 143
};                                                                                                          // 26  // 144
                                                                                                            // 27  // 145
State.prototype.cancelUrlChange = function () {                                                             // 28  // 146
  this._isCancelled = true;                                                                                 // 29  // 147
};                                                                                                          // 30  // 148
                                                                                                            // 31  // 149
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 150
                                                                                                                   // 151
}).call(this);                                                                                                     // 152
                                                                                                                   // 153
                                                                                                                   // 154
                                                                                                                   // 155
                                                                                                                   // 156
                                                                                                                   // 157
                                                                                                                   // 158
(function () {                                                                                                     // 159
                                                                                                                   // 160
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 161
//                                                                                                          //     // 162
// packages/iron:location/lib/location.js                                                                   //     // 163
//                                                                                                          //     // 164
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 165
                                                                                                            //     // 166
/*****************************************************************************/                             // 1   // 167
/* Imports */                                                                                               // 2   // 168
/*****************************************************************************/                             // 3   // 169
var Url = Iron.Url;                                                                                         // 4   // 170
                                                                                                            // 5   // 171
/*****************************************************************************/                             // 6   // 172
/* Private */                                                                                               // 7   // 173
/*****************************************************************************/                             // 8   // 174
var current = null;                                                                                         // 9   // 175
var dep = new Deps.Dependency;                                                                              // 10  // 176
var handlers = {go: [], popState: []};                                                                      // 11  // 177
                                                                                                            // 12  // 178
var isIE9 = function () {                                                                                   // 13  // 179
  return /MSIE 9/.test(navigator.appVersion);                                                               // 14  // 180
};                                                                                                          // 15  // 181
                                                                                                            // 16  // 182
var isIE8 = function () {                                                                                   // 17  // 183
  return /MSIE 8/.test(navigator.appVersion);                                                               // 18  // 184
};                                                                                                          // 19  // 185
                                                                                                            // 20  // 186
var usingAppcache = function() {                                                                            // 21  // 187
  return !! Package.appcache;                                                                               // 22  // 188
}                                                                                                           // 23  // 189
                                                                                                            // 24  // 190
var replaceStateUndefined = function() {                                                                    // 25  // 191
  return (typeof history === "undefined")  || (typeof history.pushState !== "function");                    // 26  // 192
}                                                                                                           // 27  // 193
                                                                                                            // 28  // 194
var shouldUseHashPaths = function () {                                                                      // 29  // 195
  return Location.options.useHashPaths || isIE8() || isIE9() || usingAppcache() || replaceStateUndefined(); // 30  // 196
};                                                                                                          // 31  // 197
                                                                                                            // 32  // 198
var isUsingHashPaths = function () {                                                                        // 33  // 199
  return !!Location.options.useHashPaths;                                                                   // 34  // 200
};                                                                                                          // 35  // 201
                                                                                                            // 36  // 202
var runHandlers = function(name, state) {                                                                   // 37  // 203
  _.each(handlers[name], function(cb) {                                                                     // 38  // 204
    cb.call(state);                                                                                         // 39  // 205
  });                                                                                                       // 40  // 206
}                                                                                                           // 41  // 207
                                                                                                            // 42  // 208
var set = function (state) {                                                                                // 43  // 209
  if (!(state instanceof State))                                                                            // 44  // 210
    throw new Error("Expected a State instance");                                                           // 45  // 211
                                                                                                            // 46  // 212
  if (!state.equals(current)) {                                                                             // 47  // 213
    current = state;                                                                                        // 48  // 214
    dep.changed();                                                                                          // 49  // 215
                                                                                                            // 50  // 216
    // return true to indicate state was set to a new value.                                                // 51  // 217
    return true;                                                                                            // 52  // 218
  }                                                                                                         // 53  // 219
                                                                                                            // 54  // 220
  // state not set                                                                                          // 55  // 221
  return false;                                                                                             // 56  // 222
};                                                                                                          // 57  // 223
                                                                                                            // 58  // 224
var setStateFromEventHandler = function () {                                                                // 59  // 225
  var href = location.href;                                                                                 // 60  // 226
  var state;                                                                                                // 61  // 227
                                                                                                            // 62  // 228
  if (isUsingHashPaths()) {                                                                                 // 63  // 229
    state = new State(urlFromHashStyle(href));                                                              // 64  // 230
  } else {                                                                                                  // 65  // 231
    state = new State(href, {historyState: history.state});                                                 // 66  // 232
  }                                                                                                         // 67  // 233
                                                                                                            // 68  // 234
  runHandlers('popState', state);                                                                           // 69  // 235
  set(state);                                                                                               // 70  // 236
};                                                                                                          // 71  // 237
                                                                                                            // 72  // 238
var fireOnClick = function (e) {                                                                            // 73  // 239
  var handler = onClickHandler;                                                                             // 74  // 240
  handler && handler(e);                                                                                    // 75  // 241
};                                                                                                          // 76  // 242
                                                                                                            // 77  // 243
/**                                                                                                         // 78  // 244
 * Go to a url.                                                                                             // 79  // 245
 */                                                                                                         // 80  // 246
var go = function (url, options) {                                                                          // 81  // 247
  options = options || {};                                                                                  // 82  // 248
                                                                                                            // 83  // 249
  var state = new State(url, options);                                                                      // 84  // 250
                                                                                                            // 85  // 251
  runHandlers('go', state);                                                                                 // 86  // 252
                                                                                                            // 87  // 253
  if (set(state)) {                                                                                         // 88  // 254
    Deps.afterFlush(function () {                                                                           // 89  // 255
      // if after we've flushed if nobody has cancelled the state then change                               // 90  // 256
      // the url.                                                                                           // 91  // 257
      if (!state.isCancelled()) {                                                                           // 92  // 258
        if (isUsingHashPaths()) {                                                                           // 93  // 259
          location.hash = fixHashPath(url);                                                                 // 94  // 260
        } else {                                                                                            // 95  // 261
          if (options.replaceState === true)                                                                // 96  // 262
            history.replaceState(options.historyState, null, url);                                          // 97  // 263
          else                                                                                              // 98  // 264
            history.pushState(options.historyState, null, url);                                             // 99  // 265
        }                                                                                                   // 100
      }                                                                                                     // 101
    });                                                                                                     // 102
  }                                                                                                         // 103
};                                                                                                          // 104
                                                                                                            // 105
var onClickHandler = function (e) {                                                                         // 106
  try {                                                                                                     // 107
    var el = e.currentTarget;                                                                               // 108
    var href = el.href;                                                                                     // 109
    var path = el.pathname + el.search + el.hash;                                                           // 110
                                                                                                            // 111
    // ie9 omits the leading slash in pathname - so patch up if it's missing                                // 112
    path = path.replace(/(^\/?)/,"/");                                                                      // 113
                                                                                                            // 114
    // haven't been cancelled already                                                                       // 115
    if (e.isDefaultPrevented()) {                                                                           // 116
      e.preventDefault();                                                                                   // 117
      return;                                                                                               // 118
    }                                                                                                       // 119
                                                                                                            // 120
    // with no meta key pressed                                                                             // 121
    if (e.metaKey || e.ctrlKey || e.shiftKey)                                                               // 122
      return;                                                                                               // 123
                                                                                                            // 124
    // aren't targeting a new window                                                                        // 125
    if (el.target)                                                                                          // 126
      return;                                                                                               // 127
                                                                                                            // 128
    // aren't external to the app                                                                           // 129
    if (!Url.isSameOrigin(href, location.href))                                                             // 130
      return;                                                                                               // 131
                                                                                                            // 132
    // note that we _do_ handle links which point to the current URL                                        // 133
    // and links which only change the hash.                                                                // 134
    e.preventDefault();                                                                                     // 135
                                                                                                            // 136
    // manage setting the new state and maybe pushing onto the pushState stack                              // 137
    go(path);                                                                                               // 138
  } catch (err) {                                                                                           // 139
    // make sure we can see any errors that are thrown before going to the                                  // 140
    // server.                                                                                              // 141
    e.preventDefault();                                                                                     // 142
    throw err;                                                                                              // 143
  }                                                                                                         // 144
};                                                                                                          // 145
                                                                                                            // 146
/*****************************************************************************/                             // 147
/* Location API */                                                                                          // 148
/*****************************************************************************/                             // 149
                                                                                                            // 150
/**                                                                                                         // 151
 * Main Location object. Reactively respond to url changes. Normalized urls                                 // 152
 * between hash style (ie8/9) and normal style using pushState.                                             // 153
 */                                                                                                         // 154
Location = {};                                                                                              // 155
                                                                                                            // 156
/**                                                                                                         // 157
 * Default options.                                                                                         // 158
 */                                                                                                         // 159
Location.options = {                                                                                        // 160
  linkSelector: 'a[href]',                                                                                  // 161
  useHashPaths: false                                                                                       // 162
};                                                                                                          // 163
                                                                                                            // 164
/**                                                                                                         // 165
 * Set options on the Location object.                                                                      // 166
 */                                                                                                         // 167
Location.configure = function (options) {                                                                   // 168
  _.extend(this.options, options || {});                                                                    // 169
};                                                                                                          // 170
                                                                                                            // 171
/**                                                                                                         // 172
 * Reactively get the current state.                                                                        // 173
 */                                                                                                         // 174
Location.get = function () {                                                                                // 175
  dep.depend();                                                                                             // 176
  return current;                                                                                           // 177
};                                                                                                          // 178
                                                                                                            // 179
/**                                                                                                         // 180
 * Set the initial state and start listening for url events.                                                // 181
 */                                                                                                         // 182
Location.start = function () {                                                                              // 183
  if (this._isStarted)                                                                                      // 184
    return;                                                                                                 // 185
                                                                                                            // 186
  var parts = Url.parse(location.href);                                                                     // 187
                                                                                                            // 188
  // if we're using the /#/items/5 style then start off at the root url but                                 // 189
  // store away the pathname, query and hash into the hash fragment so when the                             // 190
  // client gets the response we can render the correct page.                                               // 191
  if (shouldUseHashPaths()) {                                                                               // 192
    // if we have any pathname like /items/5 take a trip to the server to get us                            // 193
    // back a root url.                                                                                     // 194
    if (parts.pathname.length > 1) {                                                                        // 195
      var url = urlToHashStyle(location.href);                                                              // 196
      window.location = url;                                                                                // 197
    }                                                                                                       // 198
                                                                                                            // 199
    // ok good to go                                                                                        // 200
    this.configure({useHashPaths: true});                                                                   // 201
  }                                                                                                         // 202
  // set initial state                                                                                      // 203
  var href = location.href;                                                                                 // 204
                                                                                                            // 205
  if (isUsingHashPaths()) {                                                                                 // 206
    var state = new State(urlFromHashStyle(href));                                                          // 207
    set(state);                                                                                             // 208
  } else {                                                                                                  // 209
    // if we started at a URL in the /#!items/5 style then we have picked up a                              // 210
    // URL from an non-HTML5 user. Let's redirect to /items/5                                               // 211
    if (parts.hash.replace('#', '')[0] === '!') {                                                           // 212
      var href = urlFromHashStyle(href);                                                                    // 213
    }                                                                                                       // 214
                                                                                                            // 215
    // store the fact that this is the first route we hit.                                                  // 216
    // this serves two purposes                                                                             // 217
    //   1. We can tell when we've reached an unhandled route and need to show a                            // 218
    //      404 (rather than bailing out to let the server handle it)                                       // 219
    //   2. Users can look at the state to tell if the history.back() will stay                             // 220
    //      inside the app (this is important for mobile apps).                                             // 221
    var historyState = {initial: true}                                                                      // 222
    history.replaceState(historyState, null, href);                                                         // 223
    var state = new State(href, {historyState: historyState});                                              // 224
    set(state);                                                                                             // 225
  }                                                                                                         // 226
                                                                                                            // 227
  // bind the event handlers                                                                                // 228
  $(window).on('popstate.iron-location', setStateFromEventHandler);                                         // 229
  $(window).on('hashchange.iron-location', setStateFromEventHandler);                                       // 230
                                                                                                            // 231
  // make sure we have a document before binding the click handler                                          // 232
  Meteor.startup(function () {                                                                              // 233
    $(document).on('click.iron-location', Location.options.linkSelector, fireOnClick);                      // 234
  });                                                                                                       // 235
                                                                                                            // 236
  this._isStarted = true;                                                                                   // 237
};                                                                                                          // 238
                                                                                                            // 239
/**                                                                                                         // 240
 * Stop the Location from listening for url changes.                                                        // 241
 */                                                                                                         // 242
Location.stop = function () {                                                                               // 243
  if (!this._isStarted)                                                                                     // 244
    return;                                                                                                 // 245
                                                                                                            // 246
  $(window).on('popstate.iron-location');                                                                   // 247
  $(window).on('hashchange.iron-location');                                                                 // 248
  $(document).off('click.iron-location');                                                                   // 249
                                                                                                            // 250
  this._isStarted = false;                                                                                  // 251
};                                                                                                          // 252
                                                                                                            // 253
/**                                                                                                         // 254
 * Assign a different click handler.                                                                        // 255
 */                                                                                                         // 256
Location.onClick = function (fn) {                                                                          // 257
  onClickHandler = fn;                                                                                      // 258
};                                                                                                          // 259
                                                                                                            // 260
/**                                                                                                         // 261
 * Go to a new url.                                                                                         // 262
 */                                                                                                         // 263
Location.go = function (url, options) {                                                                     // 264
  return go(url, options);                                                                                  // 265
};                                                                                                          // 266
                                                                                                            // 267
/**                                                                                                         // 268
 * Run the supplied callback whenever we "go" to a new location.                                            // 269
 *                                                                                                          // 270
 * Argument: cb - function, called with no arguments,                                                       // 271
 * `this` is the state that's being set, _may_ be modified.                                                 // 272
 */                                                                                                         // 273
Location.onGo = function (cb) {                                                                             // 274
  handlers.go.push(cb);                                                                                     // 275
};                                                                                                          // 276
                                                                                                            // 277
/**                                                                                                         // 278
 * Run the supplied callback whenever we "popState" to an old location.                                     // 279
 *                                                                                                          // 280
 * Argument: cb - function, called with no arguments,                                                       // 281
 * `this` is the state that's being set, _may_ be modified.                                                 // 282
 */                                                                                                         // 283
Location.onPopState = function (cb) {                                                                       // 284
  handlers.popState.push(cb);                                                                               // 285
};                                                                                                          // 286
                                                                                                            // 287
/**                                                                                                         // 288
 * Automatically start Iron.Location                                                                        // 289
 */                                                                                                         // 290
Location.start();                                                                                           // 291
                                                                                                            // 292
/*****************************************************************************/                             // 293
/* Namespacing */                                                                                           // 294
/*****************************************************************************/                             // 295
Iron.Location = Location;                                                                                   // 296
                                                                                                            // 297
//////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 464
                                                                                                                   // 465
}).call(this);                                                                                                     // 466
                                                                                                                   // 467
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron:location'] = {
  urlToHashStyle: urlToHashStyle,
  urlFromHashStyle: urlFromHashStyle
};

})();
