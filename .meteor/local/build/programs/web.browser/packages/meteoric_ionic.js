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
var Template = Package.templating.Template;
var _ = Package.underscore._;
var FastClick = Package.fastclick.FastClick;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Session = Package.session.Session;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var IonActionSheet, IonBackdrop, Platform, IonHeaderBar, IonKeyboard, scrollToFocusedElement, IonLoading, IonModal, IonScrollPositions, backUrl, backRoute, IonNavigation, POPOVER_BODY_PADDING, IonPopover, IonPopup, IonSideMenu, $snapperEl, classes, iconName;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/meteoric_ionic/packages/meteoric_ionic.js                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/vendor/snap.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
* Snap.js                                                                                                              // 2
*                                                                                                                      // 3
* Copyright 2013, Jacob Kelley - http://jakiestfu.com/                                                                 // 4
* Released under the MIT Licence                                                                                       // 5
* http://opensource.org/licenses/MIT                                                                                   // 6
*                                                                                                                      // 7
* Github:  http://github.com/jakiestfu/Snap.js/                                                                        // 8
* Version: 1.9.3                                                                                                       // 9
*/                                                                                                                     // 10
/*jslint browser: true*/                                                                                               // 11
/*global define, module, ender*/                                                                                       // 12
(function(win, doc) {                                                                                                  // 13
  'use strict';                                                                                                        // 14
  var Snap = Snap || function(userOpts) {                                                                              // 15
    var settings = {                                                                                                   // 16
      element: null,                                                                                                   // 17
      dragger: null,                                                                                                   // 18
      disable: 'none',                                                                                                 // 19
      addBodyClasses: true,                                                                                            // 20
      hyperextensible: true,                                                                                           // 21
      resistance: 0.5,                                                                                                 // 22
      flickThreshold: 50,                                                                                              // 23
      transitionSpeed: 0.3,                                                                                            // 24
      easing: 'ease',                                                                                                  // 25
      maxPosition: 266,                                                                                                // 26
      minPosition: -266,                                                                                               // 27
      tapToClose: true,                                                                                                // 28
      touchToDrag: true,                                                                                               // 29
      slideIntent: 40, // degrees                                                                                      // 30
      minDragDistance: 5                                                                                               // 31
    },                                                                                                                 // 32
    cache = {                                                                                                          // 33
      simpleStates: {                                                                                                  // 34
        opening: null,                                                                                                 // 35
        towards: null,                                                                                                 // 36
        hyperExtending: null,                                                                                          // 37
        halfway: null,                                                                                                 // 38
        flick: null,                                                                                                   // 39
        translation: {                                                                                                 // 40
          absolute: 0,                                                                                                 // 41
          relative: 0,                                                                                                 // 42
          sinceDirectionChange: 0,                                                                                     // 43
          percentage: 0                                                                                                // 44
        }                                                                                                              // 45
      }                                                                                                                // 46
    },                                                                                                                 // 47
    eventList = {},                                                                                                    // 48
    utils = {                                                                                                          // 49
      hasTouch: ('ontouchstart' in doc.documentElement || win.navigator.msPointerEnabled),                             // 50
      eventType: function(action) {                                                                                    // 51
        var eventTypes = {                                                                                             // 52
          down: (utils.hasTouch ? 'touchstart' : 'mousedown'),                                                         // 53
          move: (utils.hasTouch ? 'touchmove' : 'mousemove'),                                                          // 54
          up: (utils.hasTouch ? 'touchend' : 'mouseup'),                                                               // 55
          out: (utils.hasTouch ? 'touchcancel' : 'mouseout')                                                           // 56
        };                                                                                                             // 57
        return eventTypes[action];                                                                                     // 58
      },                                                                                                               // 59
      page: function(t, e){                                                                                            // 60
        return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];            // 61
      },                                                                                                               // 62
      klass: {                                                                                                         // 63
        has: function(el, name){                                                                                       // 64
          return (el.className).indexOf(name) !== -1;                                                                  // 65
        },                                                                                                             // 66
        add: function(el, name){                                                                                       // 67
          if(!utils.klass.has(el, name) && settings.addBodyClasses){                                                   // 68
            el.className += " "+name;                                                                                  // 69
          }                                                                                                            // 70
        },                                                                                                             // 71
        remove: function(el, name){                                                                                    // 72
          if(settings.addBodyClasses){                                                                                 // 73
            el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');                                 // 74
          }                                                                                                            // 75
        }                                                                                                              // 76
      },                                                                                                               // 77
      dispatchEvent: function(type) {                                                                                  // 78
        if (typeof eventList[type] === 'function') {                                                                   // 79
          return eventList[type].call();                                                                               // 80
        }                                                                                                              // 81
      },                                                                                                               // 82
      vendor: function(){                                                                                              // 83
        var tmp = doc.createElement("div"),                                                                            // 84
        prefixes = 'webkit Moz O ms'.split(' '),                                                                       // 85
        i;                                                                                                             // 86
        for (i in prefixes) {                                                                                          // 87
          if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {                                          // 88
            return prefixes[i];                                                                                        // 89
          }                                                                                                            // 90
        }                                                                                                              // 91
      },                                                                                                               // 92
      transitionCallback: function(){                                                                                  // 93
        return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';         // 94
      },                                                                                                               // 95
      canTransform: function(){                                                                                        // 96
        return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';                                // 97
      },                                                                                                               // 98
      deepExtend: function(destination, source) {                                                                      // 99
        var property;                                                                                                  // 100
        for (property in source) {                                                                                     // 101
          if (source[property] && source[property].constructor && source[property].constructor === Object) {           // 102
            destination[property] = destination[property] || {};                                                       // 103
            utils.deepExtend(destination[property], source[property]);                                                 // 104
          } else {                                                                                                     // 105
            destination[property] = source[property];                                                                  // 106
          }                                                                                                            // 107
        }                                                                                                              // 108
        return destination;                                                                                            // 109
      },                                                                                                               // 110
      angleOfDrag: function(x, y) {                                                                                    // 111
        var degrees, theta;                                                                                            // 112
        // Calc Theta                                                                                                  // 113
        theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));                                           // 114
        if (theta < 0) {                                                                                               // 115
          theta += 2 * Math.PI;                                                                                        // 116
        }                                                                                                              // 117
        // Calc Degrees                                                                                                // 118
        degrees = Math.floor(theta * (180 / Math.PI) - 180);                                                           // 119
        if (degrees < 0 && degrees > -180) {                                                                           // 120
          degrees = 360 - Math.abs(degrees);                                                                           // 121
        }                                                                                                              // 122
        return Math.abs(degrees);                                                                                      // 123
      },                                                                                                               // 124
      events: {                                                                                                        // 125
        addEvent: function addEvent(element, eventName, func) {                                                        // 126
          if (element.addEventListener) {                                                                              // 127
            return element.addEventListener(eventName, func, false);                                                   // 128
          } else if (element.attachEvent) {                                                                            // 129
            return element.attachEvent("on" + eventName, func);                                                        // 130
          }                                                                                                            // 131
        },                                                                                                             // 132
        removeEvent: function addEvent(element, eventName, func) {                                                     // 133
          if (element.addEventListener) {                                                                              // 134
            return element.removeEventListener(eventName, func, false);                                                // 135
          } else if (element.attachEvent) {                                                                            // 136
            return element.detachEvent("on" + eventName, func);                                                        // 137
          }                                                                                                            // 138
        },                                                                                                             // 139
        prevent: function(e) {                                                                                         // 140
          if (e.preventDefault) {                                                                                      // 141
            e.preventDefault();                                                                                        // 142
          } else {                                                                                                     // 143
            e.returnValue = false;                                                                                     // 144
          }                                                                                                            // 145
        }                                                                                                              // 146
      },                                                                                                               // 147
      parentUntil: function(el, attr) {                                                                                // 148
        var isStr = typeof attr === 'string';                                                                          // 149
        while (el.parentNode) {                                                                                        // 150
          if (isStr && el.getAttribute && el.getAttribute(attr)){                                                      // 151
            return el;                                                                                                 // 152
          } else if(!isStr && el === attr){                                                                            // 153
            return el;                                                                                                 // 154
          }                                                                                                            // 155
          el = el.parentNode;                                                                                          // 156
        }                                                                                                              // 157
        return null;                                                                                                   // 158
      }                                                                                                                // 159
    },                                                                                                                 // 160
    action = {                                                                                                         // 161
      translate: {                                                                                                     // 162
        get: {                                                                                                         // 163
          matrix: function(index) {                                                                                    // 164
                                                                                                                       // 165
            if( !utils.canTransform() ){                                                                               // 166
              return parseInt(settings.element.style.left, 10);                                                        // 167
            } else {                                                                                                   // 168
              var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),         // 169
              ieOffset = 8;                                                                                            // 170
              if (matrix) {                                                                                            // 171
                matrix = matrix[1].split(',');                                                                         // 172
                if(matrix.length===16){                                                                                // 173
                  index+=ieOffset;                                                                                     // 174
                }                                                                                                      // 175
                return parseInt(matrix[index], 10);                                                                    // 176
              }                                                                                                        // 177
              return 0;                                                                                                // 178
            }                                                                                                          // 179
          }                                                                                                            // 180
        },                                                                                                             // 181
        easeCallback: function(){                                                                                      // 182
          settings.element.style[cache.vendor+'Transition'] = '';                                                      // 183
          cache.translation = action.translate.get.matrix(4);                                                          // 184
          cache.easing = false;                                                                                        // 185
          clearInterval(cache.animatingInterval);                                                                      // 186
                                                                                                                       // 187
          if(cache.easingTo===0){                                                                                      // 188
            utils.klass.remove(doc.body, 'snapjs-right');                                                              // 189
            utils.klass.remove(doc.body, 'snapjs-left');                                                               // 190
          }                                                                                                            // 191
                                                                                                                       // 192
          utils.dispatchEvent('animated');                                                                             // 193
          utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);       // 194
        },                                                                                                             // 195
        easeTo: function(n) {                                                                                          // 196
                                                                                                                       // 197
          if( !utils.canTransform() ){                                                                                 // 198
            cache.translation = n;                                                                                     // 199
            action.translate.x(n);                                                                                     // 200
          } else {                                                                                                     // 201
            cache.easing = true;                                                                                       // 202
            cache.easingTo = n;                                                                                        // 203
                                                                                                                       // 204
            settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;
                                                                                                                       // 206
            cache.animatingInterval = setInterval(function() {                                                         // 207
              utils.dispatchEvent('animating');                                                                        // 208
            }, 1);                                                                                                     // 209
                                                                                                                       // 210
            utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);        // 211
            action.translate.x(n);                                                                                     // 212
          }                                                                                                            // 213
          if(n===0){                                                                                                   // 214
            settings.element.style[cache.vendor+'Transform'] = '';                                                     // 215
          }                                                                                                            // 216
        },                                                                                                             // 217
        x: function(n) {                                                                                               // 218
          if( (settings.disable==='left' && n>0) ||                                                                    // 219
            (settings.disable==='right' && n<0)                                                                        // 220
          ){ return; }                                                                                                 // 221
                                                                                                                       // 222
          if( !settings.hyperextensible ){                                                                             // 223
            if( n===settings.maxPosition || n>settings.maxPosition ){                                                  // 224
              n=settings.maxPosition;                                                                                  // 225
            } else if( n===settings.minPosition || n<settings.minPosition ){                                           // 226
              n=settings.minPosition;                                                                                  // 227
            }                                                                                                          // 228
          }                                                                                                            // 229
                                                                                                                       // 230
          n = parseInt(n, 10);                                                                                         // 231
          if(isNaN(n)){                                                                                                // 232
            n = 0;                                                                                                     // 233
          }                                                                                                            // 234
                                                                                                                       // 235
          if( utils.canTransform() ){                                                                                  // 236
            var theTranslate = 'translate3d(' + n + 'px, 0,0)';                                                        // 237
            settings.element.style[cache.vendor+'Transform'] = theTranslate;                                           // 238
          } else {                                                                                                     // 239
            settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';                   // 240
                                                                                                                       // 241
            settings.element.style.left = n+'px';                                                                      // 242
            settings.element.style.right = '';                                                                         // 243
          }                                                                                                            // 244
        }                                                                                                              // 245
      },                                                                                                               // 246
      drag: {                                                                                                          // 247
        listen: function() {                                                                                           // 248
          cache.translation = 0;                                                                                       // 249
          cache.easing = false;                                                                                        // 250
          utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);                     // 251
          utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);                      // 252
          utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);                         // 253
        },                                                                                                             // 254
        stopListening: function() {                                                                                    // 255
          utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);                  // 256
          utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);                   // 257
          utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);                      // 258
        },                                                                                                             // 259
        startDrag: function(e) {                                                                                       // 260
          // No drag on ignored elements                                                                               // 261
          var target = e.target ? e.target : e.srcElement,                                                             // 262
          ignoreParent = utils.parentUntil(target, 'data-snap-ignore');                                                // 263
                                                                                                                       // 264
          if (ignoreParent) {                                                                                          // 265
            utils.dispatchEvent('ignore');                                                                             // 266
            return;                                                                                                    // 267
          }                                                                                                            // 268
                                                                                                                       // 269
                                                                                                                       // 270
          if(settings.dragger){                                                                                        // 271
            var dragParent = utils.parentUntil(target, settings.dragger);                                              // 272
                                                                                                                       // 273
            // Only use dragger if we're in a closed state                                                             // 274
            if( !dragParent &&                                                                                         // 275
              (cache.translation !== settings.minPosition &&                                                           // 276
                cache.translation !== settings.maxPosition                                                             // 277
              )){                                                                                                      // 278
                return;                                                                                                // 279
              }                                                                                                        // 280
            }                                                                                                          // 281
                                                                                                                       // 282
            utils.dispatchEvent('start');                                                                              // 283
            settings.element.style[cache.vendor+'Transition'] = '';                                                    // 284
            cache.isDragging = true;                                                                                   // 285
            cache.hasIntent = null;                                                                                    // 286
            cache.intentChecked = false;                                                                               // 287
            cache.startDragX = utils.page('X', e);                                                                     // 288
            cache.startDragY = utils.page('Y', e);                                                                     // 289
            cache.dragWatchers = {                                                                                     // 290
              current: 0,                                                                                              // 291
              last: 0,                                                                                                 // 292
              hold: 0,                                                                                                 // 293
              state: ''                                                                                                // 294
            };                                                                                                         // 295
            cache.simpleStates = {                                                                                     // 296
              opening: null,                                                                                           // 297
              towards: null,                                                                                           // 298
              hyperExtending: null,                                                                                    // 299
              halfway: null,                                                                                           // 300
              flick: null,                                                                                             // 301
              translation: {                                                                                           // 302
                absolute: 0,                                                                                           // 303
                relative: 0,                                                                                           // 304
                sinceDirectionChange: 0,                                                                               // 305
                percentage: 0                                                                                          // 306
              }                                                                                                        // 307
            };                                                                                                         // 308
          },                                                                                                           // 309
          dragging: function(e) {                                                                                      // 310
            if (cache.isDragging && settings.touchToDrag) {                                                            // 311
                                                                                                                       // 312
              var thePageX = utils.page('X', e),                                                                       // 313
              thePageY = utils.page('Y', e),                                                                           // 314
              translated = cache.translation,                                                                          // 315
              absoluteTranslation = action.translate.get.matrix(4),                                                    // 316
              whileDragX = thePageX - cache.startDragX,                                                                // 317
              openingLeft = absoluteTranslation > 0,                                                                   // 318
              translateTo = whileDragX,                                                                                // 319
              diff;                                                                                                    // 320
                                                                                                                       // 321
              // Shown no intent already                                                                               // 322
              if((cache.intentChecked && !cache.hasIntent)){                                                           // 323
                return;                                                                                                // 324
              }                                                                                                        // 325
                                                                                                                       // 326
              if(settings.addBodyClasses){                                                                             // 327
                if((absoluteTranslation)>0){                                                                           // 328
                  utils.klass.add(doc.body, 'snapjs-left');                                                            // 329
                  utils.klass.remove(doc.body, 'snapjs-right');                                                        // 330
                } else if((absoluteTranslation)<0){                                                                    // 331
                  utils.klass.add(doc.body, 'snapjs-right');                                                           // 332
                  utils.klass.remove(doc.body, 'snapjs-left');                                                         // 333
                }                                                                                                      // 334
              }                                                                                                        // 335
                                                                                                                       // 336
              if (cache.hasIntent === false || cache.hasIntent === null) {                                             // 337
                var deg = utils.angleOfDrag(thePageX, thePageY),                                                       // 338
                inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
                inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
                if (!inLeftRange && !inRightRange) {                                                                   // 341
                  cache.hasIntent = false;                                                                             // 342
                } else {                                                                                               // 343
                  cache.hasIntent = true;                                                                              // 344
                }                                                                                                      // 345
                cache.intentChecked = true;                                                                            // 346
              }                                                                                                        // 347
                                                                                                                       // 348
              if (                                                                                                     // 349
                (settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
                (cache.hasIntent === false)                                                                            // 351
              ) {                                                                                                      // 352
                return;                                                                                                // 353
              }                                                                                                        // 354
                                                                                                                       // 355
              utils.events.prevent(e);                                                                                 // 356
              utils.dispatchEvent('drag');                                                                             // 357
                                                                                                                       // 358
              cache.dragWatchers.current = thePageX;                                                                   // 359
              // Determine which direction we are going                                                                // 360
              if (cache.dragWatchers.last > thePageX) {                                                                // 361
                if (cache.dragWatchers.state !== 'left') {                                                             // 362
                  cache.dragWatchers.state = 'left';                                                                   // 363
                  cache.dragWatchers.hold = thePageX;                                                                  // 364
                }                                                                                                      // 365
                cache.dragWatchers.last = thePageX;                                                                    // 366
              } else if (cache.dragWatchers.last < thePageX) {                                                         // 367
                if (cache.dragWatchers.state !== 'right') {                                                            // 368
                  cache.dragWatchers.state = 'right';                                                                  // 369
                  cache.dragWatchers.hold = thePageX;                                                                  // 370
                }                                                                                                      // 371
                cache.dragWatchers.last = thePageX;                                                                    // 372
              }                                                                                                        // 373
              if (openingLeft) {                                                                                       // 374
                // Pulling too far to the right                                                                        // 375
                if (settings.maxPosition < absoluteTranslation) {                                                      // 376
                  diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;                           // 377
                  translateTo = whileDragX - diff;                                                                     // 378
                }                                                                                                      // 379
                cache.simpleStates = {                                                                                 // 380
                  opening: 'left',                                                                                     // 381
                  towards: cache.dragWatchers.state,                                                                   // 382
                  hyperExtending: settings.maxPosition < absoluteTranslation,                                          // 383
                  halfway: absoluteTranslation > (settings.maxPosition / 2),                                           // 384
                  flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,     // 385
                  translation: {                                                                                       // 386
                    absolute: absoluteTranslation,                                                                     // 387
                    relative: whileDragX,                                                                              // 388
                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),                      // 389
                    percentage: (absoluteTranslation/settings.maxPosition)*100                                         // 390
                  }                                                                                                    // 391
                };                                                                                                     // 392
              } else {                                                                                                 // 393
                // Pulling too far to the left                                                                         // 394
                if (settings.minPosition > absoluteTranslation) {                                                      // 395
                  diff = (absoluteTranslation - settings.minPosition) * settings.resistance;                           // 396
                  translateTo = whileDragX - diff;                                                                     // 397
                }                                                                                                      // 398
                cache.simpleStates = {                                                                                 // 399
                  opening: 'right',                                                                                    // 400
                  towards: cache.dragWatchers.state,                                                                   // 401
                  hyperExtending: settings.minPosition > absoluteTranslation,                                          // 402
                  halfway: absoluteTranslation < (settings.minPosition / 2),                                           // 403
                  flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,     // 404
                  translation: {                                                                                       // 405
                    absolute: absoluteTranslation,                                                                     // 406
                    relative: whileDragX,                                                                              // 407
                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),                      // 408
                    percentage: (absoluteTranslation/settings.minPosition)*100                                         // 409
                  }                                                                                                    // 410
                };                                                                                                     // 411
              }                                                                                                        // 412
              action.translate.x(translateTo + translated);                                                            // 413
            }                                                                                                          // 414
          },                                                                                                           // 415
          endDrag: function(e) {                                                                                       // 416
            if (cache.isDragging) {                                                                                    // 417
              utils.dispatchEvent('end');                                                                              // 418
              var translated = action.translate.get.matrix(4);                                                         // 419
                                                                                                                       // 420
              // Tap Close                                                                                             // 421
              if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {                       // 422
                utils.dispatchEvent('close');                                                                          // 423
                utils.events.prevent(e);                                                                               // 424
                action.translate.easeTo(0);                                                                            // 425
                cache.isDragging = false;                                                                              // 426
                cache.startDragX = 0;                                                                                  // 427
                return;                                                                                                // 428
              }                                                                                                        // 429
                                                                                                                       // 430
              // Revealing Left                                                                                        // 431
              if (cache.simpleStates.opening === 'left') {                                                             // 432
                // Halfway, Flicking, or Too Far Out                                                                   // 433
                if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {   // 434
                  if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed          // 435
                    action.translate.easeTo(0);                                                                        // 436
                  } else if (                                                                                          // 437
                    (cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR        // 438
                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                  ) {                                                                                                  // 440
                    action.translate.easeTo(settings.maxPosition); // Open Left                                        // 441
                  }                                                                                                    // 442
                } else {                                                                                               // 443
                  action.translate.easeTo(0); // Close Left                                                            // 444
                }                                                                                                      // 445
                // Revealing Right                                                                                     // 446
              } else if (cache.simpleStates.opening === 'right') {                                                     // 447
                // Halfway, Flicking, or Too Far Out                                                                   // 448
                if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {   // 449
                  if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed         // 450
                    action.translate.easeTo(0);                                                                        // 451
                  } else if (                                                                                          // 452
                    (cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR         // 453
                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                  ) {                                                                                                  // 455
                    action.translate.easeTo(settings.minPosition); // Open Right                                       // 456
                  }                                                                                                    // 457
                } else {                                                                                               // 458
                  action.translate.easeTo(0); // Close Right                                                           // 459
                }                                                                                                      // 460
              }                                                                                                        // 461
              cache.isDragging = false;                                                                                // 462
              cache.startDragX = utils.page('X', e);                                                                   // 463
            }                                                                                                          // 464
          }                                                                                                            // 465
        }                                                                                                              // 466
      },                                                                                                               // 467
      init = function(opts) {                                                                                          // 468
        if (opts.element) {                                                                                            // 469
          utils.deepExtend(settings, opts);                                                                            // 470
          cache.vendor = utils.vendor();                                                                               // 471
          action.drag.listen();                                                                                        // 472
        }                                                                                                              // 473
      };                                                                                                               // 474
      /*                                                                                                               // 475
      * Public                                                                                                         // 476
      */                                                                                                               // 477
      this.open = function(side) {                                                                                     // 478
        utils.dispatchEvent('open');                                                                                   // 479
        utils.klass.remove(doc.body, 'snapjs-expand-left');                                                            // 480
        utils.klass.remove(doc.body, 'snapjs-expand-right');                                                           // 481
                                                                                                                       // 482
        if (side === 'left') {                                                                                         // 483
          cache.simpleStates.opening = 'left';                                                                         // 484
          cache.simpleStates.towards = 'right';                                                                        // 485
          utils.klass.add(doc.body, 'snapjs-left');                                                                    // 486
          utils.klass.remove(doc.body, 'snapjs-right');                                                                // 487
          action.translate.easeTo(settings.maxPosition);                                                               // 488
        } else if (side === 'right') {                                                                                 // 489
          cache.simpleStates.opening = 'right';                                                                        // 490
          cache.simpleStates.towards = 'left';                                                                         // 491
          utils.klass.remove(doc.body, 'snapjs-left');                                                                 // 492
          utils.klass.add(doc.body, 'snapjs-right');                                                                   // 493
          action.translate.easeTo(settings.minPosition);                                                               // 494
        }                                                                                                              // 495
      };                                                                                                               // 496
      this.close = function() {                                                                                        // 497
        utils.dispatchEvent('close');                                                                                  // 498
        action.translate.easeTo(0);                                                                                    // 499
      };                                                                                                               // 500
      this.expand = function(side){                                                                                    // 501
        var to = win.innerWidth || doc.documentElement.clientWidth;                                                    // 502
                                                                                                                       // 503
        if(side==='left'){                                                                                             // 504
          utils.dispatchEvent('expandLeft');                                                                           // 505
          utils.klass.add(doc.body, 'snapjs-expand-left');                                                             // 506
          utils.klass.remove(doc.body, 'snapjs-expand-right');                                                         // 507
        } else {                                                                                                       // 508
          utils.dispatchEvent('expandRight');                                                                          // 509
          utils.klass.add(doc.body, 'snapjs-expand-right');                                                            // 510
          utils.klass.remove(doc.body, 'snapjs-expand-left');                                                          // 511
          to *= -1;                                                                                                    // 512
        }                                                                                                              // 513
        action.translate.easeTo(to);                                                                                   // 514
      };                                                                                                               // 515
                                                                                                                       // 516
      this.on = function(evt, fn) {                                                                                    // 517
        eventList[evt] = fn;                                                                                           // 518
        return this;                                                                                                   // 519
      };                                                                                                               // 520
      this.off = function(evt) {                                                                                       // 521
        if (eventList[evt]) {                                                                                          // 522
          eventList[evt] = false;                                                                                      // 523
        }                                                                                                              // 524
      };                                                                                                               // 525
                                                                                                                       // 526
      this.enable = function() {                                                                                       // 527
        utils.dispatchEvent('enable');                                                                                 // 528
        action.drag.listen();                                                                                          // 529
      };                                                                                                               // 530
      this.disable = function() {                                                                                      // 531
        utils.dispatchEvent('disable');                                                                                // 532
        action.drag.stopListening();                                                                                   // 533
      };                                                                                                               // 534
                                                                                                                       // 535
      this.settings = function(opts){                                                                                  // 536
        utils.deepExtend(settings, opts);                                                                              // 537
      };                                                                                                               // 538
                                                                                                                       // 539
      this.state = function() {                                                                                        // 540
        var state,                                                                                                     // 541
        fromLeft = action.translate.get.matrix(4);                                                                     // 542
        if (fromLeft === settings.maxPosition) {                                                                       // 543
          state = 'left';                                                                                              // 544
        } else if (fromLeft === settings.minPosition) {                                                                // 545
          state = 'right';                                                                                             // 546
        } else {                                                                                                       // 547
          state = 'closed';                                                                                            // 548
        }                                                                                                              // 549
        return {                                                                                                       // 550
          state: state,                                                                                                // 551
          info: cache.simpleStates                                                                                     // 552
        };                                                                                                             // 553
      };                                                                                                               // 554
      init(userOpts);                                                                                                  // 555
    };                                                                                                                 // 556
    if ((typeof module !== 'undefined') && module.exports) {                                                           // 557
      module.exports = Snap;                                                                                           // 558
    }                                                                                                                  // 559
    if (typeof ender === 'undefined') {                                                                                // 560
      this.Snap = Snap;                                                                                                // 561
    }                                                                                                                  // 562
    if ((typeof define === "function") && define.amd) {                                                                // 563
      define("snap", [], function() {                                                                                  // 564
        return Snap;                                                                                                   // 565
      });                                                                                                              // 566
    }                                                                                                                  // 567
  }).call(this, window, document);                                                                                     // 568
                                                                                                                       // 569
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 579
}).call(this);                                                       // 580
                                                                     // 581
                                                                     // 582
                                                                     // 583
                                                                     // 584
                                                                     // 585
                                                                     // 586
(function () {                                                       // 587
                                                                     // 588
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/vendor/slick.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
     _ _      _       _                                                                                                // 2
 ___| (_) ___| | __  (_)___                                                                                            // 3
/ __| | |/ __| |/ /  | / __|                                                                                           // 4
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/                                                                                           // 6
                   |__/                                                                                                // 7
                                                                                                                       // 8
 Version: 1.4.1                                                                                                        // 9
  Author: Ken Wheeler                                                                                                  // 10
 Website: http://kenwheeler.github.io                                                                                  // 11
    Docs: http://kenwheeler.github.io/slick                                                                            // 12
    Repo: http://github.com/kenwheeler/slick                                                                           // 13
  Issues: http://github.com/kenwheeler/slick/issues                                                                    // 14
                                                                                                                       // 15
 */                                                                                                                    // 16
                                                                                                                       // 17
/* global window, document, define, jQuery, setInterval, clearInterval */                                              // 18
                                                                                                                       // 19
(function(factory) {                                                                                                   // 20
    'use strict';                                                                                                      // 21
    if (typeof define === 'function' && define.amd) {                                                                  // 22
        define(['jquery'], factory);                                                                                   // 23
    } else if (typeof exports !== 'undefined') {                                                                       // 24
        module.exports = factory(require('jquery'));                                                                   // 25
    } else {                                                                                                           // 26
        factory(jQuery);                                                                                               // 27
    }                                                                                                                  // 28
                                                                                                                       // 29
}(function($) {                                                                                                        // 30
    'use strict';                                                                                                      // 31
    var Slick = window.Slick || {};                                                                                    // 32
                                                                                                                       // 33
    Slick = (function() {                                                                                              // 34
                                                                                                                       // 35
        var instanceUid = 0;                                                                                           // 36
                                                                                                                       // 37
        function Slick(element, settings) {                                                                            // 38
                                                                                                                       // 39
            var _ = this,                                                                                              // 40
                dataSettings, responsiveSettings, breakpoint;                                                          // 41
                                                                                                                       // 42
            _.defaults = {                                                                                             // 43
                accessibility: true,                                                                                   // 44
                adaptiveHeight: false,                                                                                 // 45
                appendArrows: $(element),                                                                              // 46
                appendDots: $(element),                                                                                // 47
                arrows: true,                                                                                          // 48
                asNavFor: null,                                                                                        // 49
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="next">Next</button>',
                autoplay: false,                                                                                       // 52
                autoplaySpeed: 3000,                                                                                   // 53
                centerMode: false,                                                                                     // 54
                centerPadding: '50px',                                                                                 // 55
                cssEase: 'ease',                                                                                       // 56
                customPaging: function(slider, i) {                                                                    // 57
                    return '<button type="button" data-role="none">' + (i + 1) + '</button>';                          // 58
                },                                                                                                     // 59
                dots: false,                                                                                           // 60
                dotsClass: 'slick-dots',                                                                               // 61
                draggable: true,                                                                                       // 62
                easing: 'linear',                                                                                      // 63
                edgeFriction: 0.35,                                                                                    // 64
                fade: false,                                                                                           // 65
                focusOnSelect: false,                                                                                  // 66
                infinite: true,                                                                                        // 67
                initialSlide: 0,                                                                                       // 68
                lazyLoad: 'ondemand',                                                                                  // 69
                mobileFirst: false,                                                                                    // 70
                pauseOnHover: true,                                                                                    // 71
                pauseOnDotsHover: false,                                                                               // 72
                respondTo: 'window',                                                                                   // 73
                responsive: null,                                                                                      // 74
                rtl: false,                                                                                            // 75
                slide: '',                                                                                             // 76
                slidesToShow: 1,                                                                                       // 77
                slidesToScroll: 1,                                                                                     // 78
                speed: 500,                                                                                            // 79
                swipe: true,                                                                                           // 80
                swipeToSlide: false,                                                                                   // 81
                touchMove: true,                                                                                       // 82
                touchThreshold: 5,                                                                                     // 83
                useCSS: true,                                                                                          // 84
                variableWidth: false,                                                                                  // 85
                vertical: false,                                                                                       // 86
                waitForAnimate: true                                                                                   // 87
            };                                                                                                         // 88
                                                                                                                       // 89
            _.initials = {                                                                                             // 90
                animating: false,                                                                                      // 91
                dragging: false,                                                                                       // 92
                autoPlayTimer: null,                                                                                   // 93
                currentDirection: 0,                                                                                   // 94
                currentLeft: null,                                                                                     // 95
                currentSlide: 0,                                                                                       // 96
                direction: 1,                                                                                          // 97
                $dots: null,                                                                                           // 98
                listWidth: null,                                                                                       // 99
                listHeight: null,                                                                                      // 100
                loadIndex: 0,                                                                                          // 101
                $nextArrow: null,                                                                                      // 102
                $prevArrow: null,                                                                                      // 103
                slideCount: null,                                                                                      // 104
                slideWidth: null,                                                                                      // 105
                $slideTrack: null,                                                                                     // 106
                $slides: null,                                                                                         // 107
                sliding: false,                                                                                        // 108
                slideOffset: 0,                                                                                        // 109
                swipeLeft: null,                                                                                       // 110
                $list: null,                                                                                           // 111
                touchObject: {},                                                                                       // 112
                transformsEnabled: false                                                                               // 113
            };                                                                                                         // 114
                                                                                                                       // 115
            $.extend(_, _.initials);                                                                                   // 116
                                                                                                                       // 117
            _.activeBreakpoint = null;                                                                                 // 118
            _.animType = null;                                                                                         // 119
            _.animProp = null;                                                                                         // 120
            _.breakpoints = [];                                                                                        // 121
            _.breakpointSettings = [];                                                                                 // 122
            _.cssTransitions = false;                                                                                  // 123
            _.hidden = "hidden";                                                                                       // 124
            _.paused = false;                                                                                          // 125
            _.positionProp = null;                                                                                     // 126
            _.respondTo = null;                                                                                        // 127
            _.shouldClick = true;                                                                                      // 128
            _.$slider = $(element);                                                                                    // 129
            _.$slidesCache = null;                                                                                     // 130
            _.transformType = null;                                                                                    // 131
            _.transitionType = null;                                                                                   // 132
            _.visibilityChange = "visibilitychange";                                                                   // 133
            _.windowWidth = 0;                                                                                         // 134
            _.windowTimer = null;                                                                                      // 135
                                                                                                                       // 136
            dataSettings = $(element).data('slick') || {};                                                             // 137
                                                                                                                       // 138
            _.options = $.extend({}, _.defaults, dataSettings, settings);                                              // 139
                                                                                                                       // 140
            _.currentSlide = _.options.initialSlide;                                                                   // 141
                                                                                                                       // 142
            _.originalSettings = _.options;                                                                            // 143
            responsiveSettings = _.options.responsive || null;                                                         // 144
                                                                                                                       // 145
            if (responsiveSettings && responsiveSettings.length > -1) {                                                // 146
                _.respondTo = _.options.respondTo || "window";                                                         // 147
                for (breakpoint in responsiveSettings) {                                                               // 148
                    if (responsiveSettings.hasOwnProperty(breakpoint)) {                                               // 149
                        _.breakpoints.push(responsiveSettings[                                                         // 150
                            breakpoint].breakpoint);                                                                   // 151
                        _.breakpointSettings[responsiveSettings[                                                       // 152
                            breakpoint].breakpoint] =                                                                  // 153
                            responsiveSettings[breakpoint].settings;                                                   // 154
                    }                                                                                                  // 155
                }                                                                                                      // 156
                _.breakpoints.sort(function(a, b) {                                                                    // 157
                    if(_.options.mobileFirst === true) {                                                               // 158
                        return a - b;                                                                                  // 159
                    } else {                                                                                           // 160
                        return b - a;                                                                                  // 161
                    }                                                                                                  // 162
                });                                                                                                    // 163
            }                                                                                                          // 164
                                                                                                                       // 165
            if (typeof document.mozHidden !== "undefined") {                                                           // 166
                _.hidden = "mozHidden";                                                                                // 167
                _.visibilityChange = "mozvisibilitychange";                                                            // 168
            } else if (typeof document.msHidden !== "undefined") {                                                     // 169
                _.hidden = "msHidden";                                                                                 // 170
                _.visibilityChange = "msvisibilitychange";                                                             // 171
            } else if (typeof document.webkitHidden !== "undefined") {                                                 // 172
                _.hidden = "webkitHidden";                                                                             // 173
                _.visibilityChange = "webkitvisibilitychange";                                                         // 174
            }                                                                                                          // 175
                                                                                                                       // 176
            _.autoPlay = $.proxy(_.autoPlay, _);                                                                       // 177
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);                                                             // 178
            _.changeSlide = $.proxy(_.changeSlide, _);                                                                 // 179
            _.clickHandler = $.proxy(_.clickHandler, _);                                                               // 180
            _.selectHandler = $.proxy(_.selectHandler, _);                                                             // 181
            _.setPosition = $.proxy(_.setPosition, _);                                                                 // 182
            _.swipeHandler = $.proxy(_.swipeHandler, _);                                                               // 183
            _.dragHandler = $.proxy(_.dragHandler, _);                                                                 // 184
            _.keyHandler = $.proxy(_.keyHandler, _);                                                                   // 185
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);                                                       // 186
                                                                                                                       // 187
            _.instanceUid = instanceUid++;                                                                             // 188
                                                                                                                       // 189
            // A simple way to check for HTML strings                                                                  // 190
            // Strict HTML recognition (must start with <)                                                             // 191
            // Extracted from jQuery v1.11 source                                                                      // 192
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;                                                                  // 193
                                                                                                                       // 194
            _.init();                                                                                                  // 195
                                                                                                                       // 196
            _.checkResponsive(true);                                                                                   // 197
                                                                                                                       // 198
        }                                                                                                              // 199
                                                                                                                       // 200
        return Slick;                                                                                                  // 201
                                                                                                                       // 202
    }());                                                                                                              // 203
                                                                                                                       // 204
    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {                         // 205
                                                                                                                       // 206
        var _ = this;                                                                                                  // 207
                                                                                                                       // 208
        if (typeof(index) === 'boolean') {                                                                             // 209
            addBefore = index;                                                                                         // 210
            index = null;                                                                                              // 211
        } else if (index < 0 || (index >= _.slideCount)) {                                                             // 212
            return false;                                                                                              // 213
        }                                                                                                              // 214
                                                                                                                       // 215
        _.unload();                                                                                                    // 216
                                                                                                                       // 217
        if (typeof(index) === 'number') {                                                                              // 218
            if (index === 0 && _.$slides.length === 0) {                                                               // 219
                $(markup).appendTo(_.$slideTrack);                                                                     // 220
            } else if (addBefore) {                                                                                    // 221
                $(markup).insertBefore(_.$slides.eq(index));                                                           // 222
            } else {                                                                                                   // 223
                $(markup).insertAfter(_.$slides.eq(index));                                                            // 224
            }                                                                                                          // 225
        } else {                                                                                                       // 226
            if (addBefore === true) {                                                                                  // 227
                $(markup).prependTo(_.$slideTrack);                                                                    // 228
            } else {                                                                                                   // 229
                $(markup).appendTo(_.$slideTrack);                                                                     // 230
            }                                                                                                          // 231
        }                                                                                                              // 232
                                                                                                                       // 233
        _.$slides = _.$slideTrack.children(this.options.slide);                                                        // 234
                                                                                                                       // 235
        _.$slideTrack.children(this.options.slide).detach();                                                           // 236
                                                                                                                       // 237
        _.$slideTrack.append(_.$slides);                                                                               // 238
                                                                                                                       // 239
        _.$slides.each(function(index, element) {                                                                      // 240
            $(element).attr("data-slick-index",index);                                                                 // 241
        });                                                                                                            // 242
                                                                                                                       // 243
        _.$slidesCache = _.$slides;                                                                                    // 244
                                                                                                                       // 245
        _.reinit();                                                                                                    // 246
                                                                                                                       // 247
    };                                                                                                                 // 248
                                                                                                                       // 249
    Slick.prototype.animateHeight = function(){                                                                        // 250
        var _ = this;                                                                                                  // 251
        if(_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {        // 252
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);                                         // 253
            _.$list.animate({height: targetHeight},_.options.speed);                                                   // 254
        }                                                                                                              // 255
    };                                                                                                                 // 256
                                                                                                                       // 257
    Slick.prototype.animateSlide = function(targetLeft, callback) {                                                    // 258
                                                                                                                       // 259
        var animProps = {}, _ = this;                                                                                  // 260
                                                                                                                       // 261
        _.animateHeight();                                                                                             // 262
                                                                                                                       // 263
        if (_.options.rtl === true && _.options.vertical === false) {                                                  // 264
            targetLeft = -targetLeft;                                                                                  // 265
        }                                                                                                              // 266
        if (_.transformsEnabled === false) {                                                                           // 267
            if (_.options.vertical === false) {                                                                        // 268
                _.$slideTrack.animate({                                                                                // 269
                    left: targetLeft                                                                                   // 270
                }, _.options.speed, _.options.easing, callback);                                                       // 271
            } else {                                                                                                   // 272
                _.$slideTrack.animate({                                                                                // 273
                    top: targetLeft                                                                                    // 274
                }, _.options.speed, _.options.easing, callback);                                                       // 275
            }                                                                                                          // 276
                                                                                                                       // 277
        } else {                                                                                                       // 278
                                                                                                                       // 279
            if (_.cssTransitions === false) {                                                                          // 280
                if (_.options.rtl === true) {                                                                          // 281
                    _.currentLeft = -(_.currentLeft);                                                                  // 282
                }                                                                                                      // 283
                $({                                                                                                    // 284
                    animStart: _.currentLeft                                                                           // 285
                }).animate({                                                                                           // 286
                    animStart: targetLeft                                                                              // 287
                }, {                                                                                                   // 288
                    duration: _.options.speed,                                                                         // 289
                    easing: _.options.easing,                                                                          // 290
                    step: function(now) {                                                                              // 291
                        now = Math.ceil(now);                                                                          // 292
                        if (_.options.vertical === false) {                                                            // 293
                            animProps[_.animType] = 'translate(' +                                                     // 294
                                now + 'px, 0px)';                                                                      // 295
                            _.$slideTrack.css(animProps);                                                              // 296
                        } else {                                                                                       // 297
                            animProps[_.animType] = 'translate(0px,' +                                                 // 298
                                now + 'px)';                                                                           // 299
                            _.$slideTrack.css(animProps);                                                              // 300
                        }                                                                                              // 301
                    },                                                                                                 // 302
                    complete: function() {                                                                             // 303
                        if (callback) {                                                                                // 304
                            callback.call();                                                                           // 305
                        }                                                                                              // 306
                    }                                                                                                  // 307
                });                                                                                                    // 308
                                                                                                                       // 309
            } else {                                                                                                   // 310
                                                                                                                       // 311
                _.applyTransition();                                                                                   // 312
                targetLeft = Math.ceil(targetLeft);                                                                    // 313
                                                                                                                       // 314
                if (_.options.vertical === false) {                                                                    // 315
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';                             // 316
                } else {                                                                                               // 317
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';                              // 318
                }                                                                                                      // 319
                _.$slideTrack.css(animProps);                                                                          // 320
                                                                                                                       // 321
                if (callback) {                                                                                        // 322
                    setTimeout(function() {                                                                            // 323
                                                                                                                       // 324
                        _.disableTransition();                                                                         // 325
                                                                                                                       // 326
                        callback.call();                                                                               // 327
                    }, _.options.speed);                                                                               // 328
                }                                                                                                      // 329
                                                                                                                       // 330
            }                                                                                                          // 331
                                                                                                                       // 332
        }                                                                                                              // 333
                                                                                                                       // 334
    };                                                                                                                 // 335
                                                                                                                       // 336
    Slick.prototype.asNavFor = function(index) {                                                                       // 337
        var _ = this, asNavFor = _.options.asNavFor !== null ? $(_.options.asNavFor).slick('getSlick') : null;         // 338
        if(asNavFor !== null) asNavFor.slideHandler(index, true);                                                      // 339
    };                                                                                                                 // 340
                                                                                                                       // 341
    Slick.prototype.applyTransition = function(slide) {                                                                // 342
                                                                                                                       // 343
        var _ = this,                                                                                                  // 344
            transition = {};                                                                                           // 345
                                                                                                                       // 346
        if (_.options.fade === false) {                                                                                // 347
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;        // 348
        } else {                                                                                                       // 349
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;                   // 350
        }                                                                                                              // 351
                                                                                                                       // 352
        if (_.options.fade === false) {                                                                                // 353
            _.$slideTrack.css(transition);                                                                             // 354
        } else {                                                                                                       // 355
            _.$slides.eq(slide).css(transition);                                                                       // 356
        }                                                                                                              // 357
                                                                                                                       // 358
    };                                                                                                                 // 359
                                                                                                                       // 360
    Slick.prototype.autoPlay = function() {                                                                            // 361
                                                                                                                       // 362
        var _ = this;                                                                                                  // 363
                                                                                                                       // 364
        if (_.autoPlayTimer) {                                                                                         // 365
            clearInterval(_.autoPlayTimer);                                                                            // 366
        }                                                                                                              // 367
                                                                                                                       // 368
        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {                                              // 369
            _.autoPlayTimer = setInterval(_.autoPlayIterator,                                                          // 370
                _.options.autoplaySpeed);                                                                              // 371
        }                                                                                                              // 372
                                                                                                                       // 373
    };                                                                                                                 // 374
                                                                                                                       // 375
    Slick.prototype.autoPlayClear = function() {                                                                       // 376
                                                                                                                       // 377
        var _ = this;                                                                                                  // 378
        if (_.autoPlayTimer) {                                                                                         // 379
            clearInterval(_.autoPlayTimer);                                                                            // 380
        }                                                                                                              // 381
                                                                                                                       // 382
    };                                                                                                                 // 383
                                                                                                                       // 384
    Slick.prototype.autoPlayIterator = function() {                                                                    // 385
                                                                                                                       // 386
        var _ = this;                                                                                                  // 387
                                                                                                                       // 388
        if (_.options.infinite === false) {                                                                            // 389
                                                                                                                       // 390
            if (_.direction === 1) {                                                                                   // 391
                                                                                                                       // 392
                if ((_.currentSlide + 1) === _.slideCount -                                                            // 393
                    1) {                                                                                               // 394
                    _.direction = 0;                                                                                   // 395
                }                                                                                                      // 396
                                                                                                                       // 397
                _.slideHandler(_.currentSlide + _.options.slidesToScroll);                                             // 398
                                                                                                                       // 399
            } else {                                                                                                   // 400
                                                                                                                       // 401
                if ((_.currentSlide - 1 === 0)) {                                                                      // 402
                                                                                                                       // 403
                    _.direction = 1;                                                                                   // 404
                                                                                                                       // 405
                }                                                                                                      // 406
                                                                                                                       // 407
                _.slideHandler(_.currentSlide - _.options.slidesToScroll);                                             // 408
                                                                                                                       // 409
            }                                                                                                          // 410
                                                                                                                       // 411
        } else {                                                                                                       // 412
                                                                                                                       // 413
            _.slideHandler(_.currentSlide + _.options.slidesToScroll);                                                 // 414
                                                                                                                       // 415
        }                                                                                                              // 416
                                                                                                                       // 417
    };                                                                                                                 // 418
                                                                                                                       // 419
    Slick.prototype.buildArrows = function() {                                                                         // 420
                                                                                                                       // 421
        var _ = this;                                                                                                  // 422
                                                                                                                       // 423
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {                                      // 424
                                                                                                                       // 425
            _.$prevArrow = $(_.options.prevArrow);                                                                     // 426
            _.$nextArrow = $(_.options.nextArrow);                                                                     // 427
                                                                                                                       // 428
            if (_.htmlExpr.test(_.options.prevArrow)) {                                                                // 429
                _.$prevArrow.appendTo(_.options.appendArrows);                                                         // 430
            }                                                                                                          // 431
                                                                                                                       // 432
            if (_.htmlExpr.test(_.options.nextArrow)) {                                                                // 433
                _.$nextArrow.appendTo(_.options.appendArrows);                                                         // 434
            }                                                                                                          // 435
                                                                                                                       // 436
            if (_.options.infinite !== true) {                                                                         // 437
                _.$prevArrow.addClass('slick-disabled');                                                               // 438
            }                                                                                                          // 439
                                                                                                                       // 440
        }                                                                                                              // 441
                                                                                                                       // 442
    };                                                                                                                 // 443
                                                                                                                       // 444
    Slick.prototype.buildDots = function() {                                                                           // 445
                                                                                                                       // 446
        var _ = this,                                                                                                  // 447
            i, dotString;                                                                                              // 448
                                                                                                                       // 449
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {                                        // 450
                                                                                                                       // 451
            dotString = '<ul class="' + _.options.dotsClass + '">';                                                    // 452
                                                                                                                       // 453
            for (i = 0; i <= _.getDotCount(); i += 1) {                                                                // 454
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';                               // 455
            }                                                                                                          // 456
                                                                                                                       // 457
            dotString += '</ul>';                                                                                      // 458
                                                                                                                       // 459
            _.$dots = $(dotString).appendTo(                                                                           // 460
                _.options.appendDots);                                                                                 // 461
                                                                                                                       // 462
            _.$dots.find('li').first().addClass('slick-active').attr("aria-hidden","false");                           // 463
                                                                                                                       // 464
        }                                                                                                              // 465
                                                                                                                       // 466
    };                                                                                                                 // 467
                                                                                                                       // 468
    Slick.prototype.buildOut = function() {                                                                            // 469
                                                                                                                       // 470
        var _ = this;                                                                                                  // 471
                                                                                                                       // 472
        _.$slides = _.$slider.children(_.options.slide +                                                               // 473
            ':not(.slick-cloned)').addClass(                                                                           // 474
            'slick-slide');                                                                                            // 475
        _.slideCount = _.$slides.length;                                                                               // 476
                                                                                                                       // 477
        _.$slides.each(function(index, element) {                                                                      // 478
            $(element).attr("data-slick-index",index);                                                                 // 479
        });                                                                                                            // 480
                                                                                                                       // 481
        _.$slidesCache = _.$slides;                                                                                    // 482
                                                                                                                       // 483
        _.$slider.addClass('slick-slider');                                                                            // 484
                                                                                                                       // 485
        _.$slideTrack = (_.slideCount === 0) ?                                                                         // 486
            $('<div class="slick-track"/>').appendTo(_.$slider) :                                                      // 487
            _.$slides.wrapAll('<div class="slick-track"/>').parent();                                                  // 488
                                                                                                                       // 489
        _.$list = _.$slideTrack.wrap(                                                                                  // 490
            '<div aria-live="polite" class="slick-list"/>').parent();                                                  // 491
        _.$slideTrack.css('opacity', 0);                                                                               // 492
                                                                                                                       // 493
        if (_.options.centerMode === true || _.options.swipeToSlide === true) {                                        // 494
            _.options.slidesToScroll = 1;                                                                              // 495
        }                                                                                                              // 496
                                                                                                                       // 497
        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');                                         // 498
                                                                                                                       // 499
        _.setupInfinite();                                                                                             // 500
                                                                                                                       // 501
        _.buildArrows();                                                                                               // 502
                                                                                                                       // 503
        _.buildDots();                                                                                                 // 504
                                                                                                                       // 505
        _.updateDots();                                                                                                // 506
                                                                                                                       // 507
        if (_.options.accessibility === true) {                                                                        // 508
            _.$list.prop('tabIndex', 0);                                                                               // 509
        }                                                                                                              // 510
                                                                                                                       // 511
        _.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);                              // 512
                                                                                                                       // 513
        if (_.options.draggable === true) {                                                                            // 514
            _.$list.addClass('draggable');                                                                             // 515
        }                                                                                                              // 516
                                                                                                                       // 517
    };                                                                                                                 // 518
                                                                                                                       // 519
    Slick.prototype.checkResponsive = function(initial) {                                                              // 520
                                                                                                                       // 521
        var _ = this,                                                                                                  // 522
            breakpoint, targetBreakpoint, respondToWidth;                                                              // 523
        var sliderWidth = _.$slider.width();                                                                           // 524
        var windowWidth = window.innerWidth || $(window).width();                                                      // 525
        if (_.respondTo === "window") {                                                                                // 526
          respondToWidth = windowWidth;                                                                                // 527
        } else if (_.respondTo === "slider") {                                                                         // 528
          respondToWidth = sliderWidth;                                                                                // 529
        } else if (_.respondTo === "min") {                                                                            // 530
          respondToWidth = Math.min(windowWidth, sliderWidth);                                                         // 531
        }                                                                                                              // 532
                                                                                                                       // 533
        if (_.originalSettings.responsive && _.originalSettings                                                        // 534
            .responsive.length > -1 && _.originalSettings.responsive !== null) {                                       // 535
                                                                                                                       // 536
            targetBreakpoint = null;                                                                                   // 537
                                                                                                                       // 538
            for (breakpoint in _.breakpoints) {                                                                        // 539
                if (_.breakpoints.hasOwnProperty(breakpoint)) {                                                        // 540
                    if (_.originalSettings.mobileFirst === false) {                                                    // 541
                        if (respondToWidth < _.breakpoints[breakpoint]) {                                              // 542
                            targetBreakpoint = _.breakpoints[breakpoint];                                              // 543
                        }                                                                                              // 544
                    } else {                                                                                           // 545
                        if (respondToWidth > _.breakpoints[breakpoint]) {                                              // 546
                            targetBreakpoint = _.breakpoints[breakpoint];                                              // 547
                        }                                                                                              // 548
                    }                                                                                                  // 549
                }                                                                                                      // 550
            }                                                                                                          // 551
                                                                                                                       // 552
            if (targetBreakpoint !== null) {                                                                           // 553
                if (_.activeBreakpoint !== null) {                                                                     // 554
                    if (targetBreakpoint !== _.activeBreakpoint) {                                                     // 555
                        _.activeBreakpoint =                                                                           // 556
                            targetBreakpoint;                                                                          // 557
                        if(_.breakpointSettings[targetBreakpoint] === "unslick") {                                     // 558
                            _.unslick();                                                                               // 559
                        } else {                                                                                       // 560
                            _.options = $.extend({}, _.originalSettings,                                               // 561
                                _.breakpointSettings[                                                                  // 562
                                    targetBreakpoint]);                                                                // 563
                            if(initial === true)                                                                       // 564
                                _.currentSlide = _.options.initialSlide;                                               // 565
                            _.refresh();                                                                               // 566
                        }                                                                                              // 567
                    }                                                                                                  // 568
                } else {                                                                                               // 569
                    _.activeBreakpoint = targetBreakpoint;                                                             // 570
                    if(_.breakpointSettings[targetBreakpoint] === "unslick") {                                         // 571
                        _.unslick();                                                                                   // 572
                    } else {                                                                                           // 573
                        _.options = $.extend({}, _.originalSettings,                                                   // 574
                            _.breakpointSettings[                                                                      // 575
                                targetBreakpoint]);                                                                    // 576
                        if(initial === true)                                                                           // 577
                            _.currentSlide = _.options.initialSlide;                                                   // 578
                        _.refresh();                                                                                   // 579
                    }                                                                                                  // 580
                }                                                                                                      // 581
            } else {                                                                                                   // 582
                if (_.activeBreakpoint !== null) {                                                                     // 583
                    _.activeBreakpoint = null;                                                                         // 584
                    _.options = _.originalSettings;                                                                    // 585
                    if(initial === true)                                                                               // 586
                        _.currentSlide = _.options.initialSlide;                                                       // 587
                    _.refresh();                                                                                       // 588
                }                                                                                                      // 589
            }                                                                                                          // 590
                                                                                                                       // 591
        }                                                                                                              // 592
                                                                                                                       // 593
    };                                                                                                                 // 594
                                                                                                                       // 595
    Slick.prototype.changeSlide = function(event, dontAnimate) {                                                       // 596
        var _ = this,                                                                                                  // 597
            $target = $(event.target),                                                                                 // 598
            indexOffset, slideOffset, unevenOffset;                                                                    // 599
                                                                                                                       // 600
        // If target is a link, prevent default action.                                                                // 601
        $target.is('a') && event.preventDefault();                                                                     // 602
                                                                                                                       // 603
        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);                                                // 604
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;                   // 605
                                                                                                                       // 606
        switch (event.data.message) {                                                                                  // 607
                                                                                                                       // 608
            case 'previous':                                                                                           // 609
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;     // 610
                if (_.slideCount > _.options.slidesToShow) {                                                           // 611
                    _.slideHandler(_.currentSlide  - slideOffset, false, dontAnimate);                                 // 612
                }                                                                                                      // 613
                break;                                                                                                 // 614
                                                                                                                       // 615
            case 'next':                                                                                               // 616
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;                              // 617
                if (_.slideCount > _.options.slidesToShow) {                                                           // 618
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);                                  // 619
                }                                                                                                      // 620
                break;                                                                                                 // 621
                                                                                                                       // 622
            case 'index':                                                                                              // 623
                var index = event.data.index === 0 ? 0 :                                                               // 624
                    event.data.index || $(event.target).parent().index() * _.options.slidesToScroll;                   // 625
                                                                                                                       // 626
                _.slideHandler(_.checkNavigable(index), false, dontAnimate);                                           // 627
                break;                                                                                                 // 628
                                                                                                                       // 629
            default:                                                                                                   // 630
                return;                                                                                                // 631
        }                                                                                                              // 632
                                                                                                                       // 633
    };                                                                                                                 // 634
                                                                                                                       // 635
    Slick.prototype.checkNavigable = function(index) {                                                                 // 636
                                                                                                                       // 637
        var _ = this, navigables, prevNavigable;                                                                       // 638
                                                                                                                       // 639
        navigables = _.getNavigableIndexes();                                                                          // 640
        prevNavigable = 0;                                                                                             // 641
        if(index > navigables[navigables.length -1]){                                                                  // 642
            index = navigables[navigables.length -1];                                                                  // 643
        } else {                                                                                                       // 644
            for(var n in navigables) {                                                                                 // 645
                if(index < navigables[n]) {                                                                            // 646
                    index = prevNavigable;                                                                             // 647
                    break;                                                                                             // 648
                }                                                                                                      // 649
                prevNavigable = navigables[n];                                                                         // 650
            }                                                                                                          // 651
        }                                                                                                              // 652
                                                                                                                       // 653
        return index;                                                                                                  // 654
    };                                                                                                                 // 655
                                                                                                                       // 656
    Slick.prototype.clickHandler = function(event) {                                                                   // 657
                                                                                                                       // 658
        var _ = this;                                                                                                  // 659
                                                                                                                       // 660
        if(_.shouldClick === false) {                                                                                  // 661
            event.stopImmediatePropagation();                                                                          // 662
            event.stopPropagation();                                                                                   // 663
            event.preventDefault();                                                                                    // 664
        }                                                                                                              // 665
                                                                                                                       // 666
    };                                                                                                                 // 667
                                                                                                                       // 668
    Slick.prototype.destroy = function() {                                                                             // 669
                                                                                                                       // 670
        var _ = this;                                                                                                  // 671
                                                                                                                       // 672
        _.autoPlayClear();                                                                                             // 673
                                                                                                                       // 674
        _.touchObject = {};                                                                                            // 675
                                                                                                                       // 676
        $('.slick-cloned', _.$slider).remove();                                                                        // 677
        if (_.$dots) {                                                                                                 // 678
            _.$dots.remove();                                                                                          // 679
        }                                                                                                              // 680
        if (_.$prevArrow && (typeof _.options.prevArrow !== 'object')) {                                               // 681
            _.$prevArrow.remove();                                                                                     // 682
        }                                                                                                              // 683
        if (_.$nextArrow && (typeof _.options.nextArrow !== 'object')) {                                               // 684
            _.$nextArrow.remove();                                                                                     // 685
        }                                                                                                              // 686
                                                                                                                       // 687
                                                                                                                       // 688
        _.$slides.removeClass('slick-slide slick-active slick-center slick-visible')                                   // 689
            .attr("aria-hidden","true")                                                                                // 690
            .removeAttr('data-slick-index')                                                                            // 691
            .css({                                                                                                     // 692
                position: '',                                                                                          // 693
                left: '',                                                                                              // 694
                top: '',                                                                                               // 695
                zIndex: '',                                                                                            // 696
                opacity: '',                                                                                           // 697
                width: ''                                                                                              // 698
            });                                                                                                        // 699
                                                                                                                       // 700
        _.$slider.removeClass('slick-slider');                                                                         // 701
        _.$slider.removeClass('slick-initialized');                                                                    // 702
                                                                                                                       // 703
        _.$list.off('.slick');                                                                                         // 704
        $(window).off('.slick-' + _.instanceUid);                                                                      // 705
        $(document).off('.slick-' + _.instanceUid);                                                                    // 706
                                                                                                                       // 707
        _.$slider.html(_.$slides);                                                                                     // 708
                                                                                                                       // 709
    };                                                                                                                 // 710
                                                                                                                       // 711
    Slick.prototype.disableTransition = function(slide) {                                                              // 712
                                                                                                                       // 713
        var _ = this,                                                                                                  // 714
            transition = {};                                                                                           // 715
                                                                                                                       // 716
        transition[_.transitionType] = "";                                                                             // 717
                                                                                                                       // 718
        if (_.options.fade === false) {                                                                                // 719
            _.$slideTrack.css(transition);                                                                             // 720
        } else {                                                                                                       // 721
            _.$slides.eq(slide).css(transition);                                                                       // 722
        }                                                                                                              // 723
                                                                                                                       // 724
    };                                                                                                                 // 725
                                                                                                                       // 726
    Slick.prototype.fadeSlide = function(slideIndex, callback) {                                                       // 727
                                                                                                                       // 728
        var _ = this;                                                                                                  // 729
                                                                                                                       // 730
        if (_.cssTransitions === false) {                                                                              // 731
                                                                                                                       // 732
            _.$slides.eq(slideIndex).css({                                                                             // 733
                zIndex: 1000                                                                                           // 734
            });                                                                                                        // 735
                                                                                                                       // 736
            _.$slides.eq(slideIndex).animate({                                                                         // 737
                opacity: 1                                                                                             // 738
            }, _.options.speed, _.options.easing, callback);                                                           // 739
                                                                                                                       // 740
        } else {                                                                                                       // 741
                                                                                                                       // 742
            _.applyTransition(slideIndex);                                                                             // 743
                                                                                                                       // 744
            _.$slides.eq(slideIndex).css({                                                                             // 745
                opacity: 1,                                                                                            // 746
                zIndex: 1000                                                                                           // 747
            });                                                                                                        // 748
                                                                                                                       // 749
            if (callback) {                                                                                            // 750
                setTimeout(function() {                                                                                // 751
                                                                                                                       // 752
                    _.disableTransition(slideIndex);                                                                   // 753
                                                                                                                       // 754
                    callback.call();                                                                                   // 755
                }, _.options.speed);                                                                                   // 756
            }                                                                                                          // 757
                                                                                                                       // 758
        }                                                                                                              // 759
                                                                                                                       // 760
    };                                                                                                                 // 761
                                                                                                                       // 762
    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {                                    // 763
                                                                                                                       // 764
        var _ = this;                                                                                                  // 765
                                                                                                                       // 766
        if (filter !== null) {                                                                                         // 767
                                                                                                                       // 768
            _.unload();                                                                                                // 769
                                                                                                                       // 770
            _.$slideTrack.children(this.options.slide).detach();                                                       // 771
                                                                                                                       // 772
            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);                                                     // 773
                                                                                                                       // 774
            _.reinit();                                                                                                // 775
                                                                                                                       // 776
        }                                                                                                              // 777
                                                                                                                       // 778
    };                                                                                                                 // 779
                                                                                                                       // 780
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {                                      // 781
                                                                                                                       // 782
        var _ = this;                                                                                                  // 783
        return _.currentSlide;                                                                                         // 784
                                                                                                                       // 785
    };                                                                                                                 // 786
                                                                                                                       // 787
    Slick.prototype.getDotCount = function() {                                                                         // 788
                                                                                                                       // 789
        var _ = this;                                                                                                  // 790
                                                                                                                       // 791
        var breakPoint = 0;                                                                                            // 792
        var counter = 0;                                                                                               // 793
        var pagerQty = 0;                                                                                              // 794
                                                                                                                       // 795
        if(_.options.infinite === true) {                                                                              // 796
            pagerQty = Math.ceil(_.slideCount / _.options.slidesToScroll);                                             // 797
        } else if (_.options.centerMode === true) {                                                                    // 798
            pagerQty = _.slideCount;                                                                                   // 799
        } else {                                                                                                       // 800
            while (breakPoint < _.slideCount){                                                                         // 801
                ++pagerQty;                                                                                            // 802
                breakPoint = counter + _.options.slidesToShow;                                                         // 803
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll  : _.options.slidesToShow;
            }                                                                                                          // 805
        }                                                                                                              // 806
                                                                                                                       // 807
        return pagerQty - 1;                                                                                           // 808
                                                                                                                       // 809
    };                                                                                                                 // 810
                                                                                                                       // 811
    Slick.prototype.getLeft = function(slideIndex) {                                                                   // 812
                                                                                                                       // 813
        var _ = this,                                                                                                  // 814
            targetLeft,                                                                                                // 815
            verticalHeight,                                                                                            // 816
            verticalOffset = 0,                                                                                        // 817
            targetSlide;                                                                                               // 818
                                                                                                                       // 819
        _.slideOffset = 0;                                                                                             // 820
        verticalHeight = _.$slides.first().outerHeight();                                                              // 821
                                                                                                                       // 822
        if (_.options.infinite === true) {                                                                             // 823
            if (_.slideCount > _.options.slidesToShow) {                                                               // 824
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;                                          // 825
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;                                       // 826
            }                                                                                                          // 827
            if (_.slideCount % _.options.slidesToScroll !== 0) {                                                       // 828
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {   // 829
                    if(slideIndex > _.slideCount) {                                                                    // 830
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;  // 831
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {                                                                                           // 833
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;               // 834
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;            // 835
                    }                                                                                                  // 836
                }                                                                                                      // 837
            }                                                                                                          // 838
        } else {                                                                                                       // 839
            if(slideIndex + _.options.slidesToShow > _.slideCount) {                                                   // 840
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;                 // 841
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;              // 842
            }                                                                                                          // 843
        }                                                                                                              // 844
                                                                                                                       // 845
        if (_.slideCount <= _.options.slidesToShow){                                                                   // 846
            _.slideOffset = 0;                                                                                         // 847
            verticalOffset = 0;                                                                                        // 848
        }                                                                                                              // 849
                                                                                                                       // 850
        if (_.options.centerMode === true && _.options.infinite === true) {                                            // 851
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;                     // 852
        } else if (_.options.centerMode === true) {                                                                    // 853
            _.slideOffset = 0;                                                                                         // 854
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);                                    // 855
        }                                                                                                              // 856
                                                                                                                       // 857
        if (_.options.vertical === false) {                                                                            // 858
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;                                           // 859
        } else {                                                                                                       // 860
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;                                        // 861
        }                                                                                                              // 862
                                                                                                                       // 863
        if (_.options.variableWidth === true) {                                                                        // 864
                                                                                                                       // 865
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {                              // 866
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);                                   // 867
            } else {                                                                                                   // 868
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);          // 869
            }                                                                                                          // 870
                                                                                                                       // 871
            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;                                          // 872
                                                                                                                       // 873
            if (_.options.centerMode === true) {                                                                       // 874
                if(_.options.infinite === false) {                                                                     // 875
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);                               // 876
                } else {                                                                                               // 877
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);  // 878
                }                                                                                                      // 879
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;                                      // 880
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;                                        // 881
            }                                                                                                          // 882
        }                                                                                                              // 883
                                                                                                                       // 884
        return targetLeft;                                                                                             // 885
                                                                                                                       // 886
    };                                                                                                                 // 887
                                                                                                                       // 888
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {                                    // 889
                                                                                                                       // 890
        var _ = this;                                                                                                  // 891
                                                                                                                       // 892
        return _.options[option];                                                                                      // 893
                                                                                                                       // 894
    };                                                                                                                 // 895
                                                                                                                       // 896
    Slick.prototype.getNavigableIndexes = function() {                                                                 // 897
                                                                                                                       // 898
        var _ = this, breakPoint = 0, counter = 0, indexes = [], max;                                                  // 899
                                                                                                                       // 900
        if(_.options.infinite === false) {                                                                             // 901
            max = _.slideCount - _.options.slidesToShow + 1;                                                           // 902
            if (_.options.centerMode === true) max = _.slideCount;                                                     // 903
        } else {                                                                                                       // 904
            breakPoint = _.slideCount * -1;                                                                            // 905
            counter = _.slideCount * -1;                                                                               // 906
            max = _.slideCount * 2;                                                                                    // 907
        }                                                                                                              // 908
                                                                                                                       // 909
        while (breakPoint < max){                                                                                      // 910
            indexes.push(breakPoint);                                                                                  // 911
            breakPoint = counter + _.options.slidesToScroll;                                                           // 912
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll  : _.options.slidesToShow;
        }                                                                                                              // 914
                                                                                                                       // 915
        return indexes;                                                                                                // 916
                                                                                                                       // 917
    };                                                                                                                 // 918
                                                                                                                       // 919
    Slick.prototype.getSlick = function() {                                                                            // 920
                                                                                                                       // 921
        return this;                                                                                                   // 922
                                                                                                                       // 923
    };                                                                                                                 // 924
                                                                                                                       // 925
    Slick.prototype.getSlideCount = function() {                                                                       // 926
                                                                                                                       // 927
        var _ = this, slidesTraversed, swipedSlide, centerOffset;                                                      // 928
                                                                                                                       // 929
        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;      // 930
                                                                                                                       // 931
        if(_.options.swipeToSlide === true) {                                                                          // 932
            _.$slideTrack.find('.slick-slide').each(function(index, slide){                                            // 933
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {              // 934
                    swipedSlide = slide;                                                                               // 935
                    return false;                                                                                      // 936
                }                                                                                                      // 937
            });                                                                                                        // 938
                                                                                                                       // 939
            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;                 // 940
                                                                                                                       // 941
            return slidesTraversed;                                                                                    // 942
                                                                                                                       // 943
        } else {                                                                                                       // 944
            return _.options.slidesToScroll;                                                                           // 945
        }                                                                                                              // 946
                                                                                                                       // 947
    };                                                                                                                 // 948
                                                                                                                       // 949
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {                                  // 950
                                                                                                                       // 951
        var _ = this;                                                                                                  // 952
                                                                                                                       // 953
        _.changeSlide({                                                                                                // 954
            data: {                                                                                                    // 955
                message: 'index',                                                                                      // 956
                index: parseInt(slide)                                                                                 // 957
            }                                                                                                          // 958
        }, dontAnimate);                                                                                               // 959
                                                                                                                       // 960
    };                                                                                                                 // 961
                                                                                                                       // 962
    Slick.prototype.init = function() {                                                                                // 963
                                                                                                                       // 964
        var _ = this;                                                                                                  // 965
                                                                                                                       // 966
        if (!$(_.$slider).hasClass('slick-initialized')) {                                                             // 967
                                                                                                                       // 968
            $(_.$slider).addClass('slick-initialized');                                                                // 969
            _.buildOut();                                                                                              // 970
            _.setProps();                                                                                              // 971
            _.startLoad();                                                                                             // 972
            _.loadSlider();                                                                                            // 973
            _.initializeEvents();                                                                                      // 974
            _.updateArrows();                                                                                          // 975
            _.updateDots();                                                                                            // 976
        }                                                                                                              // 977
                                                                                                                       // 978
        _.$slider.trigger("init", [ _ ]);                                                                              // 979
                                                                                                                       // 980
    };                                                                                                                 // 981
                                                                                                                       // 982
    Slick.prototype.initArrowEvents = function() {                                                                     // 983
                                                                                                                       // 984
        var _ = this;                                                                                                  // 985
                                                                                                                       // 986
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {                                      // 987
            _.$prevArrow.on('click.slick', {                                                                           // 988
                message: 'previous'                                                                                    // 989
            }, _.changeSlide);                                                                                         // 990
            _.$nextArrow.on('click.slick', {                                                                           // 991
                message: 'next'                                                                                        // 992
            }, _.changeSlide);                                                                                         // 993
        }                                                                                                              // 994
                                                                                                                       // 995
    };                                                                                                                 // 996
                                                                                                                       // 997
    Slick.prototype.initDotEvents = function() {                                                                       // 998
                                                                                                                       // 999
        var _ = this;                                                                                                  // 1000
                                                                                                                       // 1001
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {                                        // 1002
            $('li', _.$dots).on('click.slick', {                                                                       // 1003
                message: 'index'                                                                                       // 1004
            }, _.changeSlide);                                                                                         // 1005
        }                                                                                                              // 1006
                                                                                                                       // 1007
        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {           // 1008
            $('li', _.$dots)                                                                                           // 1009
                .on('mouseenter.slick', function(){                                                                    // 1010
                    _.paused = true;                                                                                   // 1011
                    _.autoPlayClear();                                                                                 // 1012
                })                                                                                                     // 1013
                .on('mouseleave.slick', function(){                                                                    // 1014
                    _.paused = false;                                                                                  // 1015
                    _.autoPlay();                                                                                      // 1016
                });                                                                                                    // 1017
        }                                                                                                              // 1018
                                                                                                                       // 1019
    };                                                                                                                 // 1020
                                                                                                                       // 1021
    Slick.prototype.initializeEvents = function() {                                                                    // 1022
                                                                                                                       // 1023
        var _ = this;                                                                                                  // 1024
                                                                                                                       // 1025
        _.initArrowEvents();                                                                                           // 1026
                                                                                                                       // 1027
        _.initDotEvents();                                                                                             // 1028
                                                                                                                       // 1029
        _.$list.on('touchstart.slick mousedown.slick', {                                                               // 1030
            action: 'start'                                                                                            // 1031
        }, _.swipeHandler);                                                                                            // 1032
        _.$list.on('touchmove.slick mousemove.slick', {                                                                // 1033
            action: 'move'                                                                                             // 1034
        }, _.swipeHandler);                                                                                            // 1035
        _.$list.on('touchend.slick mouseup.slick', {                                                                   // 1036
            action: 'end'                                                                                              // 1037
        }, _.swipeHandler);                                                                                            // 1038
        _.$list.on('touchcancel.slick mouseleave.slick', {                                                             // 1039
            action: 'end'                                                                                              // 1040
        }, _.swipeHandler);                                                                                            // 1041
                                                                                                                       // 1042
        _.$list.on('click.slick', _.clickHandler);                                                                     // 1043
                                                                                                                       // 1044
        if (_.options.autoplay === true) {                                                                             // 1045
                                                                                                                       // 1046
            $(document).on(_.visibilityChange, function(){                                                             // 1047
                _.visibility();                                                                                        // 1048
            });                                                                                                        // 1049
                                                                                                                       // 1050
            if( _.options.pauseOnHover === true ) {                                                                    // 1051
                                                                                                                       // 1052
                _.$list.on('mouseenter.slick', function(){                                                             // 1053
                    _.paused = true;                                                                                   // 1054
                    _.autoPlayClear();                                                                                 // 1055
                });                                                                                                    // 1056
                _.$list.on('mouseleave.slick', function(){                                                             // 1057
                    _.paused = false;                                                                                  // 1058
                    _.autoPlay();                                                                                      // 1059
                });                                                                                                    // 1060
                                                                                                                       // 1061
            }                                                                                                          // 1062
                                                                                                                       // 1063
        }                                                                                                              // 1064
                                                                                                                       // 1065
        if(_.options.accessibility === true) {                                                                         // 1066
            _.$list.on('keydown.slick', _.keyHandler);                                                                 // 1067
        }                                                                                                              // 1068
                                                                                                                       // 1069
        if(_.options.focusOnSelect === true) {                                                                         // 1070
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);                                            // 1071
        }                                                                                                              // 1072
                                                                                                                       // 1073
        $(window).on('orientationchange.slick.slick-' + _.instanceUid, function() {                                    // 1074
            _.checkResponsive();                                                                                       // 1075
            _.setPosition();                                                                                           // 1076
        });                                                                                                            // 1077
                                                                                                                       // 1078
        $(window).on('resize.slick.slick-' + _.instanceUid, function() {                                               // 1079
            if ($(window).width() !== _.windowWidth) {                                                                 // 1080
                clearTimeout(_.windowDelay);                                                                           // 1081
                _.windowDelay = window.setTimeout(function() {                                                         // 1082
                    _.windowWidth = $(window).width();                                                                 // 1083
                    _.checkResponsive();                                                                               // 1084
                    _.setPosition();                                                                                   // 1085
                }, 50);                                                                                                // 1086
            }                                                                                                          // 1087
        });                                                                                                            // 1088
                                                                                                                       // 1089
        $('*[draggable!=true]', _.$slideTrack).on('dragstart', function(e){ e.preventDefault(); });                    // 1090
                                                                                                                       // 1091
        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);                                              // 1092
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);                                           // 1093
                                                                                                                       // 1094
    };                                                                                                                 // 1095
                                                                                                                       // 1096
    Slick.prototype.initUI = function() {                                                                              // 1097
                                                                                                                       // 1098
        var _ = this;                                                                                                  // 1099
                                                                                                                       // 1100
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {                                      // 1101
                                                                                                                       // 1102
            _.$prevArrow.show();                                                                                       // 1103
            _.$nextArrow.show();                                                                                       // 1104
                                                                                                                       // 1105
        }                                                                                                              // 1106
                                                                                                                       // 1107
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {                                        // 1108
                                                                                                                       // 1109
            _.$dots.show();                                                                                            // 1110
                                                                                                                       // 1111
        }                                                                                                              // 1112
                                                                                                                       // 1113
        if (_.options.autoplay === true) {                                                                             // 1114
                                                                                                                       // 1115
            _.autoPlay();                                                                                              // 1116
                                                                                                                       // 1117
        }                                                                                                              // 1118
                                                                                                                       // 1119
    };                                                                                                                 // 1120
                                                                                                                       // 1121
    Slick.prototype.keyHandler = function(event) {                                                                     // 1122
                                                                                                                       // 1123
        var _ = this;                                                                                                  // 1124
                                                                                                                       // 1125
        if (event.keyCode === 37 && _.options.accessibility === true) {                                                // 1126
            _.changeSlide({                                                                                            // 1127
                data: {                                                                                                // 1128
                    message: 'previous'                                                                                // 1129
                }                                                                                                      // 1130
            });                                                                                                        // 1131
        } else if (event.keyCode === 39 && _.options.accessibility === true) {                                         // 1132
            _.changeSlide({                                                                                            // 1133
                data: {                                                                                                // 1134
                    message: 'next'                                                                                    // 1135
                }                                                                                                      // 1136
            });                                                                                                        // 1137
        }                                                                                                              // 1138
                                                                                                                       // 1139
    };                                                                                                                 // 1140
                                                                                                                       // 1141
    Slick.prototype.lazyLoad = function() {                                                                            // 1142
                                                                                                                       // 1143
        var _ = this,                                                                                                  // 1144
            loadRange, cloneRange, rangeStart, rangeEnd;                                                               // 1145
                                                                                                                       // 1146
        function loadImages(imagesScope) {                                                                             // 1147
            $('img[data-lazy]', imagesScope).each(function() {                                                         // 1148
                var image = $(this),                                                                                   // 1149
                    imageSource = $(this).attr('data-lazy');                                                           // 1150
                                                                                                                       // 1151
                image                                                                                                  // 1152
                  .load(function() { image.animate({ opacity: 1 }, 200); })                                            // 1153
                  .css({ opacity: 0 })                                                                                 // 1154
                  .attr('src', imageSource)                                                                            // 1155
                  .removeAttr('data-lazy')                                                                             // 1156
                  .removeClass('slick-loading');                                                                       // 1157
            });                                                                                                        // 1158
        }                                                                                                              // 1159
                                                                                                                       // 1160
        if (_.options.centerMode === true) {                                                                           // 1161
            if (_.options.infinite === true) {                                                                         // 1162
                rangeStart = _.currentSlide + (_.options.slidesToShow/2 + 1);                                          // 1163
                rangeEnd = rangeStart + _.options.slidesToShow + 2;                                                    // 1164
            } else {                                                                                                   // 1165
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow/2 + 1));                             // 1166
                rangeEnd = 2 + (_.options.slidesToShow/2 + 1) + _.currentSlide;                                        // 1167
            }                                                                                                          // 1168
        } else {                                                                                                       // 1169
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;                // 1170
            rangeEnd = rangeStart + _.options.slidesToShow;                                                            // 1171
            if (_.options.fade === true ) {                                                                            // 1172
                if(rangeStart > 0) rangeStart--;                                                                       // 1173
                if(rangeEnd <= _.slideCount) rangeEnd++;                                                               // 1174
            }                                                                                                          // 1175
        }                                                                                                              // 1176
                                                                                                                       // 1177
        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);                                        // 1178
        loadImages(loadRange);                                                                                         // 1179
                                                                                                                       // 1180
          if (_.slideCount <= _.options.slidesToShow){                                                                 // 1181
              cloneRange = _.$slider.find('.slick-slide');                                                             // 1182
              loadImages(cloneRange);                                                                                  // 1183
          }else                                                                                                        // 1184
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {                                                 // 1185
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);                             // 1186
            loadImages(cloneRange);                                                                                    // 1187
        } else if (_.currentSlide === 0) {                                                                             // 1188
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);                           // 1189
            loadImages(cloneRange);                                                                                    // 1190
        }                                                                                                              // 1191
                                                                                                                       // 1192
    };                                                                                                                 // 1193
                                                                                                                       // 1194
    Slick.prototype.loadSlider = function() {                                                                          // 1195
                                                                                                                       // 1196
        var _ = this;                                                                                                  // 1197
                                                                                                                       // 1198
        _.setPosition();                                                                                               // 1199
                                                                                                                       // 1200
        _.$slideTrack.css({                                                                                            // 1201
            opacity: 1                                                                                                 // 1202
        });                                                                                                            // 1203
                                                                                                                       // 1204
        _.$slider.removeClass('slick-loading');                                                                        // 1205
                                                                                                                       // 1206
        _.initUI();                                                                                                    // 1207
                                                                                                                       // 1208
        if (_.options.lazyLoad === 'progressive') {                                                                    // 1209
            _.progressiveLazyLoad();                                                                                   // 1210
        }                                                                                                              // 1211
                                                                                                                       // 1212
    };                                                                                                                 // 1213
                                                                                                                       // 1214
    Slick.prototype.next = Slick.prototype.slickNext = function() {                                                    // 1215
                                                                                                                       // 1216
        var _ = this;                                                                                                  // 1217
                                                                                                                       // 1218
        _.changeSlide({                                                                                                // 1219
            data: {                                                                                                    // 1220
                message: 'next'                                                                                        // 1221
            }                                                                                                          // 1222
        });                                                                                                            // 1223
                                                                                                                       // 1224
    };                                                                                                                 // 1225
                                                                                                                       // 1226
    Slick.prototype.pause = Slick.prototype.slickPause = function() {                                                  // 1227
                                                                                                                       // 1228
        var _ = this;                                                                                                  // 1229
                                                                                                                       // 1230
        _.autoPlayClear();                                                                                             // 1231
        _.paused = true;                                                                                               // 1232
                                                                                                                       // 1233
    };                                                                                                                 // 1234
                                                                                                                       // 1235
    Slick.prototype.play = Slick.prototype.slickPlay = function() {                                                    // 1236
                                                                                                                       // 1237
        var _ = this;                                                                                                  // 1238
                                                                                                                       // 1239
        _.paused = false;                                                                                              // 1240
        _.autoPlay();                                                                                                  // 1241
                                                                                                                       // 1242
    };                                                                                                                 // 1243
                                                                                                                       // 1244
    Slick.prototype.postSlide = function(index) {                                                                      // 1245
                                                                                                                       // 1246
        var _ = this;                                                                                                  // 1247
                                                                                                                       // 1248
        _.$slider.trigger("afterChange", [ _, index]);                                                                 // 1249
                                                                                                                       // 1250
        _.animating = false;                                                                                           // 1251
                                                                                                                       // 1252
        _.setPosition();                                                                                               // 1253
                                                                                                                       // 1254
        _.swipeLeft = null;                                                                                            // 1255
                                                                                                                       // 1256
        if (_.options.autoplay === true && _.paused === false) {                                                       // 1257
            _.autoPlay();                                                                                              // 1258
        }                                                                                                              // 1259
                                                                                                                       // 1260
    };                                                                                                                 // 1261
                                                                                                                       // 1262
    Slick.prototype.prev = Slick.prototype.slickPrev = function() {                                                    // 1263
                                                                                                                       // 1264
        var _ = this;                                                                                                  // 1265
                                                                                                                       // 1266
        _.changeSlide({                                                                                                // 1267
            data: {                                                                                                    // 1268
                message: 'previous'                                                                                    // 1269
            }                                                                                                          // 1270
        });                                                                                                            // 1271
                                                                                                                       // 1272
    };                                                                                                                 // 1273
                                                                                                                       // 1274
    Slick.prototype.progressiveLazyLoad = function() {                                                                 // 1275
                                                                                                                       // 1276
        var _ = this,                                                                                                  // 1277
            imgCount, targetImage;                                                                                     // 1278
                                                                                                                       // 1279
        imgCount = $('img[data-lazy]', _.$slider).length;                                                              // 1280
                                                                                                                       // 1281
        if (imgCount > 0) {                                                                                            // 1282
            targetImage = $('img[data-lazy]', _.$slider).first();                                                      // 1283
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {      // 1284
                targetImage.removeAttr('data-lazy');                                                                   // 1285
                _.progressiveLazyLoad();                                                                               // 1286
                                                                                                                       // 1287
                if( _.options.adaptiveHeight === true ) {                                                              // 1288
                    _.setPosition();                                                                                   // 1289
                }                                                                                                      // 1290
            })                                                                                                         // 1291
         .error(function () {                                                                                          // 1292
          targetImage.removeAttr('data-lazy');                                                                         // 1293
          _.progressiveLazyLoad();                                                                                     // 1294
         });                                                                                                           // 1295
        }                                                                                                              // 1296
                                                                                                                       // 1297
    };                                                                                                                 // 1298
                                                                                                                       // 1299
    Slick.prototype.refresh = function() {                                                                             // 1300
                                                                                                                       // 1301
        var _ = this,                                                                                                  // 1302
            currentSlide = _.currentSlide;                                                                             // 1303
                                                                                                                       // 1304
        _.destroy();                                                                                                   // 1305
                                                                                                                       // 1306
        $.extend(_, _.initials);                                                                                       // 1307
                                                                                                                       // 1308
        _.init();                                                                                                      // 1309
                                                                                                                       // 1310
        _.changeSlide({                                                                                                // 1311
            data: {                                                                                                    // 1312
                message: 'index',                                                                                      // 1313
                index: currentSlide                                                                                    // 1314
            }                                                                                                          // 1315
        }, true);                                                                                                      // 1316
                                                                                                                       // 1317
    };                                                                                                                 // 1318
                                                                                                                       // 1319
    Slick.prototype.reinit = function() {                                                                              // 1320
                                                                                                                       // 1321
        var _ = this;                                                                                                  // 1322
                                                                                                                       // 1323
        _.$slides = _.$slideTrack.children(_.options.slide).addClass(                                                  // 1324
            'slick-slide');                                                                                            // 1325
                                                                                                                       // 1326
        _.slideCount = _.$slides.length;                                                                               // 1327
                                                                                                                       // 1328
        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {                                                  // 1329
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;                                                // 1330
        }                                                                                                              // 1331
                                                                                                                       // 1332
        if (_.slideCount <= _.options.slidesToShow) {                                                                  // 1333
            _.currentSlide = 0;                                                                                        // 1334
        }                                                                                                              // 1335
                                                                                                                       // 1336
        _.setProps();                                                                                                  // 1337
                                                                                                                       // 1338
        _.setupInfinite();                                                                                             // 1339
                                                                                                                       // 1340
        _.buildArrows();                                                                                               // 1341
                                                                                                                       // 1342
        _.updateArrows();                                                                                              // 1343
                                                                                                                       // 1344
        _.initArrowEvents();                                                                                           // 1345
                                                                                                                       // 1346
        _.buildDots();                                                                                                 // 1347
                                                                                                                       // 1348
        _.updateDots();                                                                                                // 1349
                                                                                                                       // 1350
        _.initDotEvents();                                                                                             // 1351
                                                                                                                       // 1352
        if(_.options.focusOnSelect === true) {                                                                         // 1353
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);                                            // 1354
        }                                                                                                              // 1355
                                                                                                                       // 1356
        _.setSlideClasses(0);                                                                                          // 1357
                                                                                                                       // 1358
        _.setPosition();                                                                                               // 1359
                                                                                                                       // 1360
        _.$slider.trigger("reInit", [ _ ]);                                                                            // 1361
                                                                                                                       // 1362
    };                                                                                                                 // 1363
                                                                                                                       // 1364
    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {             // 1365
                                                                                                                       // 1366
        var _ = this;                                                                                                  // 1367
                                                                                                                       // 1368
        if (typeof(index) === 'boolean') {                                                                             // 1369
            removeBefore = index;                                                                                      // 1370
            index = removeBefore === true ? 0 : _.slideCount - 1;                                                      // 1371
        } else {                                                                                                       // 1372
            index = removeBefore === true ? --index : index;                                                           // 1373
        }                                                                                                              // 1374
                                                                                                                       // 1375
        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {                                               // 1376
            return false;                                                                                              // 1377
        }                                                                                                              // 1378
                                                                                                                       // 1379
        _.unload();                                                                                                    // 1380
                                                                                                                       // 1381
        if(removeAll === true) {                                                                                       // 1382
            _.$slideTrack.children().remove();                                                                         // 1383
        } else {                                                                                                       // 1384
            _.$slideTrack.children(this.options.slide).eq(index).remove();                                             // 1385
        }                                                                                                              // 1386
                                                                                                                       // 1387
        _.$slides = _.$slideTrack.children(this.options.slide);                                                        // 1388
                                                                                                                       // 1389
        _.$slideTrack.children(this.options.slide).detach();                                                           // 1390
                                                                                                                       // 1391
        _.$slideTrack.append(_.$slides);                                                                               // 1392
                                                                                                                       // 1393
        _.$slidesCache = _.$slides;                                                                                    // 1394
                                                                                                                       // 1395
        _.reinit();                                                                                                    // 1396
                                                                                                                       // 1397
    };                                                                                                                 // 1398
                                                                                                                       // 1399
    Slick.prototype.setCSS = function(position) {                                                                      // 1400
                                                                                                                       // 1401
        var _ = this,                                                                                                  // 1402
            positionProps = {}, x, y;                                                                                  // 1403
                                                                                                                       // 1404
        if (_.options.rtl === true) {                                                                                  // 1405
            position = -position;                                                                                      // 1406
        }                                                                                                              // 1407
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';                                             // 1408
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';                                              // 1409
                                                                                                                       // 1410
        positionProps[_.positionProp] = position;                                                                      // 1411
                                                                                                                       // 1412
        if (_.transformsEnabled === false) {                                                                           // 1413
            _.$slideTrack.css(positionProps);                                                                          // 1414
        } else {                                                                                                       // 1415
            positionProps = {};                                                                                        // 1416
            if (_.cssTransitions === false) {                                                                          // 1417
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';                                         // 1418
                _.$slideTrack.css(positionProps);                                                                      // 1419
            } else {                                                                                                   // 1420
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';                                  // 1421
                _.$slideTrack.css(positionProps);                                                                      // 1422
            }                                                                                                          // 1423
        }                                                                                                              // 1424
                                                                                                                       // 1425
    };                                                                                                                 // 1426
                                                                                                                       // 1427
    Slick.prototype.setDimensions = function() {                                                                       // 1428
                                                                                                                       // 1429
        var _ = this;                                                                                                  // 1430
                                                                                                                       // 1431
        if (_.options.vertical === false) {                                                                            // 1432
            if (_.options.centerMode === true) {                                                                       // 1433
                _.$list.css({                                                                                          // 1434
                    padding: ('0px ' + _.options.centerPadding)                                                        // 1435
                });                                                                                                    // 1436
            }                                                                                                          // 1437
        } else {                                                                                                       // 1438
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);                              // 1439
            if (_.options.centerMode === true) {                                                                       // 1440
                _.$list.css({                                                                                          // 1441
                    padding: (_.options.centerPadding + ' 0px')                                                        // 1442
                });                                                                                                    // 1443
            }                                                                                                          // 1444
        }                                                                                                              // 1445
                                                                                                                       // 1446
        _.listWidth = _.$list.width();                                                                                 // 1447
        _.listHeight = _.$list.height();                                                                               // 1448
                                                                                                                       // 1449
                                                                                                                       // 1450
        if(_.options.vertical === false && _.options.variableWidth === false) {                                        // 1451
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);                                            // 1452
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));            // 1453
                                                                                                                       // 1454
        } else if (_.options.variableWidth === true) {                                                                 // 1455
            var trackWidth = 0;                                                                                        // 1456
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);                                            // 1457
            _.$slideTrack.children('.slick-slide').each(function(){                                                    // 1458
                trackWidth += _.listWidth;                                                                             // 1459
            });                                                                                                        // 1460
            _.$slideTrack.width(Math.ceil(trackWidth) + 1);                                                            // 1461
        } else {                                                                                                       // 1462
            _.slideWidth = Math.ceil(_.listWidth);                                                                     // 1463
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }                                                                                                              // 1465
                                                                                                                       // 1466
        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();                                   // 1467
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);    // 1468
                                                                                                                       // 1469
    };                                                                                                                 // 1470
                                                                                                                       // 1471
    Slick.prototype.setFade = function() {                                                                             // 1472
                                                                                                                       // 1473
        var _ = this,                                                                                                  // 1474
            targetLeft;                                                                                                // 1475
                                                                                                                       // 1476
        _.$slides.each(function(index, element) {                                                                      // 1477
            targetLeft = (_.slideWidth * index) * -1;                                                                  // 1478
            if (_.options.rtl === true) {                                                                              // 1479
                $(element).css({                                                                                       // 1480
                    position: 'relative',                                                                              // 1481
                    right: targetLeft,                                                                                 // 1482
                    top: 0,                                                                                            // 1483
                    zIndex: 800,                                                                                       // 1484
                    opacity: 0                                                                                         // 1485
                });                                                                                                    // 1486
            } else {                                                                                                   // 1487
                $(element).css({                                                                                       // 1488
                    position: 'relative',                                                                              // 1489
                    left: targetLeft,                                                                                  // 1490
                    top: 0,                                                                                            // 1491
                    zIndex: 800,                                                                                       // 1492
                    opacity: 0                                                                                         // 1493
                });                                                                                                    // 1494
            }                                                                                                          // 1495
        });                                                                                                            // 1496
                                                                                                                       // 1497
        _.$slides.eq(_.currentSlide).css({                                                                             // 1498
            zIndex: 900,                                                                                               // 1499
            opacity: 1                                                                                                 // 1500
        });                                                                                                            // 1501
                                                                                                                       // 1502
    };                                                                                                                 // 1503
                                                                                                                       // 1504
    Slick.prototype.setHeight = function() {                                                                           // 1505
                                                                                                                       // 1506
        var _ = this;                                                                                                  // 1507
                                                                                                                       // 1508
        if(_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {        // 1509
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);                                         // 1510
            _.$list.css('height', targetHeight);                                                                       // 1511
        }                                                                                                              // 1512
                                                                                                                       // 1513
    };                                                                                                                 // 1514
                                                                                                                       // 1515
    Slick.prototype.setOption = Slick.prototype.slickSetOption = function(option, value, refresh) {                    // 1516
                                                                                                                       // 1517
        var _ = this;                                                                                                  // 1518
        _.options[option] = value;                                                                                     // 1519
                                                                                                                       // 1520
        if (refresh === true) {                                                                                        // 1521
            _.unload();                                                                                                // 1522
            _.reinit();                                                                                                // 1523
        }                                                                                                              // 1524
                                                                                                                       // 1525
    };                                                                                                                 // 1526
                                                                                                                       // 1527
    Slick.prototype.setPosition = function() {                                                                         // 1528
                                                                                                                       // 1529
        var _ = this;                                                                                                  // 1530
                                                                                                                       // 1531
        _.setDimensions();                                                                                             // 1532
                                                                                                                       // 1533
        _.setHeight();                                                                                                 // 1534
                                                                                                                       // 1535
        if (_.options.fade === false) {                                                                                // 1536
            _.setCSS(_.getLeft(_.currentSlide));                                                                       // 1537
        } else {                                                                                                       // 1538
            _.setFade();                                                                                               // 1539
        }                                                                                                              // 1540
                                                                                                                       // 1541
        _.$slider.trigger("setPosition", [ _ ]);                                                                       // 1542
                                                                                                                       // 1543
    };                                                                                                                 // 1544
                                                                                                                       // 1545
    Slick.prototype.setProps = function() {                                                                            // 1546
                                                                                                                       // 1547
        var _ = this,                                                                                                  // 1548
            bodyStyle = document.body.style;                                                                           // 1549
                                                                                                                       // 1550
        _.positionProp = _.options.vertical === true ? 'top' : 'left';                                                 // 1551
                                                                                                                       // 1552
        if (_.positionProp === 'top') {                                                                                // 1553
            _.$slider.addClass('slick-vertical');                                                                      // 1554
        } else {                                                                                                       // 1555
            _.$slider.removeClass('slick-vertical');                                                                   // 1556
        }                                                                                                              // 1557
                                                                                                                       // 1558
        if (bodyStyle.WebkitTransition !== undefined ||                                                                // 1559
            bodyStyle.MozTransition !== undefined ||                                                                   // 1560
            bodyStyle.msTransition !== undefined) {                                                                    // 1561
            if(_.options.useCSS === true) {                                                                            // 1562
                _.cssTransitions = true;                                                                               // 1563
            }                                                                                                          // 1564
        }                                                                                                              // 1565
                                                                                                                       // 1566
        if (bodyStyle.OTransform !== undefined) {                                                                      // 1567
            _.animType = 'OTransform';                                                                                 // 1568
            _.transformType = "-o-transform";                                                                          // 1569
            _.transitionType = 'OTransition';                                                                          // 1570
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }                                                                                                              // 1572
        if (bodyStyle.MozTransform !== undefined) {                                                                    // 1573
            _.animType = 'MozTransform';                                                                               // 1574
            _.transformType = "-moz-transform";                                                                        // 1575
            _.transitionType = 'MozTransition';                                                                        // 1576
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }                                                                                                              // 1578
        if (bodyStyle.webkitTransform !== undefined) {                                                                 // 1579
            _.animType = 'webkitTransform';                                                                            // 1580
            _.transformType = "-webkit-transform";                                                                     // 1581
            _.transitionType = 'webkitTransition';                                                                     // 1582
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }                                                                                                              // 1584
        if (bodyStyle.msTransform !== undefined) {                                                                     // 1585
            _.animType = 'msTransform';                                                                                // 1586
            _.transformType = "-ms-transform";                                                                         // 1587
            _.transitionType = 'msTransition';                                                                         // 1588
            if (bodyStyle.msTransform === undefined) _.animType = false;                                               // 1589
        }                                                                                                              // 1590
        if (bodyStyle.transform !== undefined && _.animType !== false) {                                               // 1591
            _.animType = 'transform';                                                                                  // 1592
            _.transformType = "transform";                                                                             // 1593
            _.transitionType = 'transition';                                                                           // 1594
        }                                                                                                              // 1595
        _.transformsEnabled = (_.animType !== null && _.animType !== false);                                           // 1596
                                                                                                                       // 1597
    };                                                                                                                 // 1598
                                                                                                                       // 1599
                                                                                                                       // 1600
    Slick.prototype.setSlideClasses = function(index) {                                                                // 1601
                                                                                                                       // 1602
        var _ = this,                                                                                                  // 1603
            centerOffset, allSlides, indexOffset, remainder;                                                           // 1604
                                                                                                                       // 1605
        _.$slider.find('.slick-slide').removeClass('slick-active').attr("aria-hidden","true").removeClass('slick-center');
        allSlides = _.$slider.find('.slick-slide');                                                                    // 1607
                                                                                                                       // 1608
        if (_.options.centerMode === true) {                                                                           // 1609
                                                                                                                       // 1610
            centerOffset = Math.floor(_.options.slidesToShow / 2);                                                     // 1611
                                                                                                                       // 1612
            if(_.options.infinite === true) {                                                                          // 1613
                                                                                                                       // 1614
                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {                             // 1615
                    _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active').attr("aria-hidden","false");
                } else {                                                                                               // 1617
                    indexOffset = _.options.slidesToShow + index;                                                      // 1618
                    allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active').attr("aria-hidden","false");
                }                                                                                                      // 1620
                                                                                                                       // 1621
                if (index === 0) {                                                                                     // 1622
                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');              // 1623
                } else if (index === _.slideCount - 1) {                                                               // 1624
                    allSlides.eq(_.options.slidesToShow).addClass('slick-center');                                     // 1625
                }                                                                                                      // 1626
                                                                                                                       // 1627
            }                                                                                                          // 1628
                                                                                                                       // 1629
            _.$slides.eq(index).addClass('slick-center');                                                              // 1630
                                                                                                                       // 1631
        } else {                                                                                                       // 1632
                                                                                                                       // 1633
            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {                                      // 1634
                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr("aria-hidden","false");
            } else if ( allSlides.length <= _.options.slidesToShow ) {                                                 // 1636
                allSlides.addClass('slick-active').attr("aria-hidden","false");                                        // 1637
            } else {                                                                                                   // 1638
                remainder = _.slideCount%_.options.slidesToShow;                                                       // 1639
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;                    // 1640
                if(_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides.slice(indexOffset-(_.options.slidesToShow-remainder), indexOffset + remainder).addClass('slick-active').attr("aria-hidden","false");
                } else {                                                                                               // 1643
                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr("aria-hidden","false");
                }                                                                                                      // 1645
            }                                                                                                          // 1646
                                                                                                                       // 1647
        }                                                                                                              // 1648
                                                                                                                       // 1649
        if (_.options.lazyLoad === 'ondemand') {                                                                       // 1650
            _.lazyLoad();                                                                                              // 1651
        }                                                                                                              // 1652
                                                                                                                       // 1653
    };                                                                                                                 // 1654
                                                                                                                       // 1655
    Slick.prototype.setupInfinite = function() {                                                                       // 1656
                                                                                                                       // 1657
        var _ = this,                                                                                                  // 1658
            i, slideIndex, infiniteCount;                                                                              // 1659
                                                                                                                       // 1660
        if (_.options.fade === true) {                                                                                 // 1661
            _.options.centerMode = false;                                                                              // 1662
        }                                                                                                              // 1663
                                                                                                                       // 1664
        if (_.options.infinite === true && _.options.fade === false) {                                                 // 1665
                                                                                                                       // 1666
            slideIndex = null;                                                                                         // 1667
                                                                                                                       // 1668
            if (_.slideCount > _.options.slidesToShow) {                                                               // 1669
                                                                                                                       // 1670
                if (_.options.centerMode === true) {                                                                   // 1671
                    infiniteCount = _.options.slidesToShow + 1;                                                        // 1672
                } else {                                                                                               // 1673
                    infiniteCount = _.options.slidesToShow;                                                            // 1674
                }                                                                                                      // 1675
                                                                                                                       // 1676
                for (i = _.slideCount; i > (_.slideCount -                                                             // 1677
                    infiniteCount); i -= 1) {                                                                          // 1678
                    slideIndex = i - 1;                                                                                // 1679
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')                                                // 1680
                        .attr('data-slick-index', slideIndex-_.slideCount)                                             // 1681
                        .prependTo(_.$slideTrack).addClass('slick-cloned');                                            // 1682
                }                                                                                                      // 1683
                for (i = 0; i < infiniteCount; i += 1) {                                                               // 1684
                    slideIndex = i;                                                                                    // 1685
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')                                                // 1686
                        .attr('data-slick-index', slideIndex+_.slideCount)                                             // 1687
                        .appendTo(_.$slideTrack).addClass('slick-cloned');                                             // 1688
                }                                                                                                      // 1689
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {                                     // 1690
                    $(this).attr('id', '');                                                                            // 1691
                });                                                                                                    // 1692
                                                                                                                       // 1693
            }                                                                                                          // 1694
                                                                                                                       // 1695
        }                                                                                                              // 1696
                                                                                                                       // 1697
    };                                                                                                                 // 1698
                                                                                                                       // 1699
    Slick.prototype.selectHandler = function(event) {                                                                  // 1700
                                                                                                                       // 1701
        var _ = this;                                                                                                  // 1702
        var index = parseInt($(event.target).parents('.slick-slide').attr("data-slick-index"));                        // 1703
        if(!index) index = 0;                                                                                          // 1704
                                                                                                                       // 1705
        if(_.slideCount <= _.options.slidesToShow){                                                                    // 1706
            _.$slider.find('.slick-slide').removeClass('slick-active').attr("aria-hidden","true");                     // 1707
            _.$slides.eq(index).addClass('slick-active').attr("aria-hidden","false");                                  // 1708
            if(_.options.centerMode === true) {                                                                        // 1709
                _.$slider.find('.slick-slide').removeClass('slick-center');                                            // 1710
                _.$slides.eq(index).addClass('slick-center');                                                          // 1711
            }                                                                                                          // 1712
            _.asNavFor(index);                                                                                         // 1713
            return;                                                                                                    // 1714
        }                                                                                                              // 1715
        _.slideHandler(index);                                                                                         // 1716
                                                                                                                       // 1717
    };                                                                                                                 // 1718
                                                                                                                       // 1719
    Slick.prototype.slideHandler = function(index,sync,dontAnimate) {                                                  // 1720
                                                                                                                       // 1721
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,                                            // 1722
            _ = this;                                                                                                  // 1723
                                                                                                                       // 1724
        sync = sync || false;                                                                                          // 1725
                                                                                                                       // 1726
        if (_.animating === true && _.options.waitForAnimate === true) {                                               // 1727
            return;                                                                                                    // 1728
        }                                                                                                              // 1729
                                                                                                                       // 1730
        if (_.options.fade === true && _.currentSlide === index) {                                                     // 1731
            return;                                                                                                    // 1732
        }                                                                                                              // 1733
                                                                                                                       // 1734
        if (_.slideCount <= _.options.slidesToShow) {                                                                  // 1735
            return;                                                                                                    // 1736
        }                                                                                                              // 1737
                                                                                                                       // 1738
        if (sync === false) {                                                                                          // 1739
            _.asNavFor(index);                                                                                         // 1740
        }                                                                                                              // 1741
                                                                                                                       // 1742
        targetSlide = index;                                                                                           // 1743
        targetLeft = _.getLeft(targetSlide);                                                                           // 1744
        slideLeft = _.getLeft(_.currentSlide);                                                                         // 1745
                                                                                                                       // 1746
        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;                                                // 1747
                                                                                                                       // 1748
        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if(_.options.fade === false) {                                                                             // 1750
                targetSlide = _.currentSlide;                                                                          // 1751
                if(dontAnimate!==true) {                                                                               // 1752
                    _.animateSlide(slideLeft, function() {                                                             // 1753
                        _.postSlide(targetSlide);                                                                      // 1754
                    });                                                                                                // 1755
                } else {                                                                                               // 1756
                    _.postSlide(targetSlide);                                                                          // 1757
                }                                                                                                      // 1758
            }                                                                                                          // 1759
            return;                                                                                                    // 1760
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if(_.options.fade === false) {                                                                             // 1762
                targetSlide = _.currentSlide;                                                                          // 1763
                if(dontAnimate!==true) {                                                                               // 1764
                    _.animateSlide(slideLeft, function() {                                                             // 1765
                        _.postSlide(targetSlide);                                                                      // 1766
                    });                                                                                                // 1767
                } else {                                                                                               // 1768
                    _.postSlide(targetSlide);                                                                          // 1769
                }                                                                                                      // 1770
            }                                                                                                          // 1771
            return;                                                                                                    // 1772
        }                                                                                                              // 1773
                                                                                                                       // 1774
        if (_.options.autoplay === true) {                                                                             // 1775
            clearInterval(_.autoPlayTimer);                                                                            // 1776
        }                                                                                                              // 1777
                                                                                                                       // 1778
        if (targetSlide < 0) {                                                                                         // 1779
            if (_.slideCount % _.options.slidesToScroll !== 0) {                                                       // 1780
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);                                  // 1781
            } else {                                                                                                   // 1782
                animSlide = _.slideCount + targetSlide;                                                                // 1783
            }                                                                                                          // 1784
        } else if (targetSlide >= _.slideCount) {                                                                      // 1785
            if (_.slideCount % _.options.slidesToScroll !== 0) {                                                       // 1786
                animSlide = 0;                                                                                         // 1787
            } else {                                                                                                   // 1788
                animSlide = targetSlide - _.slideCount;                                                                // 1789
            }                                                                                                          // 1790
        } else {                                                                                                       // 1791
            animSlide = targetSlide;                                                                                   // 1792
        }                                                                                                              // 1793
                                                                                                                       // 1794
        _.animating = true;                                                                                            // 1795
                                                                                                                       // 1796
        _.$slider.trigger("beforeChange", [ _ , _.currentSlide, animSlide]);                                           // 1797
                                                                                                                       // 1798
        oldSlide = _.currentSlide;                                                                                     // 1799
        _.currentSlide = animSlide;                                                                                    // 1800
                                                                                                                       // 1801
        _.setSlideClasses(_.currentSlide);                                                                             // 1802
                                                                                                                       // 1803
        _.updateDots();                                                                                                // 1804
        _.updateArrows();                                                                                              // 1805
                                                                                                                       // 1806
        if (_.options.fade === true) {                                                                                 // 1807
            if(dontAnimate!==true) {                                                                                   // 1808
                _.fadeSlide(animSlide, function() {                                                                    // 1809
                    _.postSlide(animSlide);                                                                            // 1810
                });                                                                                                    // 1811
            } else {                                                                                                   // 1812
                _.postSlide(animSlide);                                                                                // 1813
            }                                                                                                          // 1814
            _.animateHeight();                                                                                         // 1815
            return;                                                                                                    // 1816
        }                                                                                                              // 1817
                                                                                                                       // 1818
        if(dontAnimate!==true) {                                                                                       // 1819
            _.animateSlide(targetLeft, function() {                                                                    // 1820
                _.postSlide(animSlide);                                                                                // 1821
            });                                                                                                        // 1822
        } else {                                                                                                       // 1823
            _.postSlide(animSlide);                                                                                    // 1824
        }                                                                                                              // 1825
                                                                                                                       // 1826
    };                                                                                                                 // 1827
                                                                                                                       // 1828
    Slick.prototype.startLoad = function() {                                                                           // 1829
                                                                                                                       // 1830
        var _ = this;                                                                                                  // 1831
                                                                                                                       // 1832
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {                                      // 1833
                                                                                                                       // 1834
            _.$prevArrow.hide();                                                                                       // 1835
            _.$nextArrow.hide();                                                                                       // 1836
                                                                                                                       // 1837
        }                                                                                                              // 1838
                                                                                                                       // 1839
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {                                        // 1840
                                                                                                                       // 1841
            _.$dots.hide();                                                                                            // 1842
                                                                                                                       // 1843
        }                                                                                                              // 1844
                                                                                                                       // 1845
        _.$slider.addClass('slick-loading');                                                                           // 1846
                                                                                                                       // 1847
    };                                                                                                                 // 1848
                                                                                                                       // 1849
    Slick.prototype.swipeDirection = function() {                                                                      // 1850
                                                                                                                       // 1851
        var xDist, yDist, r, swipeAngle, _ = this;                                                                     // 1852
                                                                                                                       // 1853
        xDist = _.touchObject.startX - _.touchObject.curX;                                                             // 1854
        yDist = _.touchObject.startY - _.touchObject.curY;                                                             // 1855
        r = Math.atan2(yDist, xDist);                                                                                  // 1856
                                                                                                                       // 1857
        swipeAngle = Math.round(r * 180 / Math.PI);                                                                    // 1858
        if (swipeAngle < 0) {                                                                                          // 1859
            swipeAngle = 360 - Math.abs(swipeAngle);                                                                   // 1860
        }                                                                                                              // 1861
                                                                                                                       // 1862
        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {                                                                 // 1863
            return (_.options.rtl === false ? 'left' : 'right');                                                       // 1864
        }                                                                                                              // 1865
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {                                                              // 1866
            return (_.options.rtl === false ? 'left' : 'right');                                                       // 1867
        }                                                                                                              // 1868
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {                                                              // 1869
            return (_.options.rtl === false ? 'right' : 'left');                                                       // 1870
        }                                                                                                              // 1871
                                                                                                                       // 1872
        return 'vertical';                                                                                             // 1873
                                                                                                                       // 1874
    };                                                                                                                 // 1875
                                                                                                                       // 1876
    Slick.prototype.swipeEnd = function(event) {                                                                       // 1877
                                                                                                                       // 1878
        var _ = this, slideCount;                                                                                      // 1879
                                                                                                                       // 1880
        _.dragging = false;                                                                                            // 1881
                                                                                                                       // 1882
        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;                                               // 1883
                                                                                                                       // 1884
        if (_.touchObject.curX === undefined) {                                                                        // 1885
            return false;                                                                                              // 1886
        }                                                                                                              // 1887
                                                                                                                       // 1888
        if (_.touchObject.edgeHit === true) {                                                                          // 1889
            _.$slider.trigger("edge", [  _, _.swipeDirection()]);                                                      // 1890
        }                                                                                                              // 1891
                                                                                                                       // 1892
        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {                                                     // 1893
                                                                                                                       // 1894
            switch (_.swipeDirection()) {                                                                              // 1895
                case 'left':                                                                                           // 1896
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.slideHandler(slideCount);                                                                        // 1898
                    _.currentDirection = 0;                                                                            // 1899
                    _.touchObject = {};                                                                                // 1900
                    _.$slider.trigger("swipe", [ _, "left"]);                                                          // 1901
                    break;                                                                                             // 1902
                                                                                                                       // 1903
                case 'right':                                                                                          // 1904
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.slideHandler(slideCount);                                                                        // 1906
                    _.currentDirection = 1;                                                                            // 1907
                    _.touchObject = {};                                                                                // 1908
                    _.$slider.trigger("swipe", [ _, "right"]);                                                         // 1909
                    break;                                                                                             // 1910
            }                                                                                                          // 1911
        } else {                                                                                                       // 1912
            if(_.touchObject.startX !== _.touchObject.curX) {                                                          // 1913
                _.slideHandler(_.currentSlide);                                                                        // 1914
                _.touchObject = {};                                                                                    // 1915
            }                                                                                                          // 1916
        }                                                                                                              // 1917
                                                                                                                       // 1918
    };                                                                                                                 // 1919
                                                                                                                       // 1920
    Slick.prototype.swipeHandler = function(event) {                                                                   // 1921
                                                                                                                       // 1922
        var _ = this;                                                                                                  // 1923
                                                                                                                       // 1924
        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {                  // 1925
           return;                                                                                                     // 1926
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {                              // 1927
           return;                                                                                                     // 1928
        }                                                                                                              // 1929
                                                                                                                       // 1930
        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?                 // 1931
            event.originalEvent.touches.length : 1;                                                                    // 1932
                                                                                                                       // 1933
        _.touchObject.minSwipe = _.listWidth / _.options                                                               // 1934
            .touchThreshold;                                                                                           // 1935
                                                                                                                       // 1936
        switch (event.data.action) {                                                                                   // 1937
                                                                                                                       // 1938
            case 'start':                                                                                              // 1939
                _.swipeStart(event);                                                                                   // 1940
                break;                                                                                                 // 1941
                                                                                                                       // 1942
            case 'move':                                                                                               // 1943
                _.swipeMove(event);                                                                                    // 1944
                break;                                                                                                 // 1945
                                                                                                                       // 1946
            case 'end':                                                                                                // 1947
                _.swipeEnd(event);                                                                                     // 1948
                break;                                                                                                 // 1949
                                                                                                                       // 1950
        }                                                                                                              // 1951
                                                                                                                       // 1952
    };                                                                                                                 // 1953
                                                                                                                       // 1954
    Slick.prototype.swipeMove = function(event) {                                                                      // 1955
                                                                                                                       // 1956
        var _ = this,                                                                                                  // 1957
            edgeWasHit = false,                                                                                        // 1958
            curLeft, swipeDirection, swipeLength, positionOffset, touches;                                             // 1959
                                                                                                                       // 1960
        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;                              // 1961
                                                                                                                       // 1962
        if (!_.dragging || touches && touches.length !== 1) {                                                          // 1963
            return false;                                                                                              // 1964
        }                                                                                                              // 1965
                                                                                                                       // 1966
        curLeft = _.getLeft(_.currentSlide);                                                                           // 1967
                                                                                                                       // 1968
        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;                                 // 1969
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;                                 // 1970
                                                                                                                       // 1971
        _.touchObject.swipeLength = Math.round(Math.sqrt(                                                              // 1972
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));                                                  // 1973
                                                                                                                       // 1974
        swipeDirection = _.swipeDirection();                                                                           // 1975
                                                                                                                       // 1976
        if (swipeDirection === 'vertical') {                                                                           // 1977
            return;                                                                                                    // 1978
        }                                                                                                              // 1979
                                                                                                                       // 1980
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {                                      // 1981
            event.preventDefault();                                                                                    // 1982
        }                                                                                                              // 1983
                                                                                                                       // 1984
        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);    // 1985
                                                                                                                       // 1986
        swipeLength = _.touchObject.swipeLength;                                                                       // 1987
                                                                                                                       // 1988
        _.touchObject.edgeHit = false;                                                                                 // 1989
                                                                                                                       // 1990
        if (_.options.infinite === false) {                                                                            // 1991
            if ((_.currentSlide === 0 && swipeDirection === "right") || (_.currentSlide >= _.getDotCount() && swipeDirection === "left")) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;                                      // 1993
                _.touchObject.edgeHit = true;                                                                          // 1994
            }                                                                                                          // 1995
        }                                                                                                              // 1996
                                                                                                                       // 1997
        if (_.options.vertical === false) {                                                                            // 1998
            _.swipeLeft = curLeft + swipeLength * positionOffset;                                                      // 1999
        } else {                                                                                                       // 2000
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;                 // 2001
        }                                                                                                              // 2002
                                                                                                                       // 2003
        if (_.options.fade === true || _.options.touchMove === false) {                                                // 2004
            return false;                                                                                              // 2005
        }                                                                                                              // 2006
                                                                                                                       // 2007
        if (_.animating === true) {                                                                                    // 2008
            _.swipeLeft = null;                                                                                        // 2009
            return false;                                                                                              // 2010
        }                                                                                                              // 2011
                                                                                                                       // 2012
        _.setCSS(_.swipeLeft);                                                                                         // 2013
                                                                                                                       // 2014
    };                                                                                                                 // 2015
                                                                                                                       // 2016
    Slick.prototype.swipeStart = function(event) {                                                                     // 2017
                                                                                                                       // 2018
        var _ = this,                                                                                                  // 2019
            touches;                                                                                                   // 2020
                                                                                                                       // 2021
        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {                               // 2022
            _.touchObject = {};                                                                                        // 2023
            return false;                                                                                              // 2024
        }                                                                                                              // 2025
                                                                                                                       // 2026
        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {                          // 2027
            touches = event.originalEvent.touches[0];                                                                  // 2028
        }                                                                                                              // 2029
                                                                                                                       // 2030
        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;             // 2031
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;             // 2032
                                                                                                                       // 2033
        _.dragging = true;                                                                                             // 2034
                                                                                                                       // 2035
    };                                                                                                                 // 2036
                                                                                                                       // 2037
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {                                      // 2038
                                                                                                                       // 2039
        var _ = this;                                                                                                  // 2040
                                                                                                                       // 2041
        if (_.$slidesCache !== null) {                                                                                 // 2042
                                                                                                                       // 2043
            _.unload();                                                                                                // 2044
                                                                                                                       // 2045
            _.$slideTrack.children(this.options.slide).detach();                                                       // 2046
                                                                                                                       // 2047
            _.$slidesCache.appendTo(_.$slideTrack);                                                                    // 2048
                                                                                                                       // 2049
            _.reinit();                                                                                                // 2050
                                                                                                                       // 2051
        }                                                                                                              // 2052
                                                                                                                       // 2053
    };                                                                                                                 // 2054
                                                                                                                       // 2055
    Slick.prototype.unload = function() {                                                                              // 2056
                                                                                                                       // 2057
        var _ = this;                                                                                                  // 2058
                                                                                                                       // 2059
        $('.slick-cloned', _.$slider).remove();                                                                        // 2060
        if (_.$dots) {                                                                                                 // 2061
            _.$dots.remove();                                                                                          // 2062
        }                                                                                                              // 2063
        if (_.$prevArrow && (typeof _.options.prevArrow !== 'object')) {                                               // 2064
            _.$prevArrow.remove();                                                                                     // 2065
        }                                                                                                              // 2066
        if (_.$nextArrow && (typeof _.options.nextArrow !== 'object')) {                                               // 2067
            _.$nextArrow.remove();                                                                                     // 2068
        }                                                                                                              // 2069
        _.$slides.removeClass('slick-slide slick-active slick-visible').attr("aria-hidden","true").css('width', '');   // 2070
                                                                                                                       // 2071
    };                                                                                                                 // 2072
                                                                                                                       // 2073
    Slick.prototype.unslick = function() {                                                                             // 2074
                                                                                                                       // 2075
        var _ = this;                                                                                                  // 2076
        _.destroy();                                                                                                   // 2077
                                                                                                                       // 2078
    };                                                                                                                 // 2079
                                                                                                                       // 2080
    Slick.prototype.updateArrows = function() {                                                                        // 2081
                                                                                                                       // 2082
        var _ = this, centerOffset;                                                                                    // 2083
                                                                                                                       // 2084
        centerOffset = Math.floor(_.options.slidesToShow / 2);                                                         // 2085
                                                                                                                       // 2086
        if (_.options.arrows === true && _.options.infinite !==                                                        // 2087
            true && _.slideCount > _.options.slidesToShow) {                                                           // 2088
            _.$prevArrow.removeClass('slick-disabled');                                                                // 2089
            _.$nextArrow.removeClass('slick-disabled');                                                                // 2090
            if (_.currentSlide === 0) {                                                                                // 2091
                _.$prevArrow.addClass('slick-disabled');                                                               // 2092
                _.$nextArrow.removeClass('slick-disabled');                                                            // 2093
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {    // 2094
                _.$nextArrow.addClass('slick-disabled');                                                               // 2095
                _.$prevArrow.removeClass('slick-disabled');                                                            // 2096
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {                          // 2097
                _.$nextArrow.addClass('slick-disabled');                                                               // 2098
                _.$prevArrow.removeClass('slick-disabled');                                                            // 2099
            }                                                                                                          // 2100
        }                                                                                                              // 2101
                                                                                                                       // 2102
    };                                                                                                                 // 2103
                                                                                                                       // 2104
    Slick.prototype.updateDots = function() {                                                                          // 2105
                                                                                                                       // 2106
        var _ = this;                                                                                                  // 2107
                                                                                                                       // 2108
        if (_.$dots !== null) {                                                                                        // 2109
                                                                                                                       // 2110
            _.$dots.find('li').removeClass('slick-active').attr("aria-hidden","true");                                 // 2111
            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active').attr("aria-hidden","false");
                                                                                                                       // 2113
        }                                                                                                              // 2114
                                                                                                                       // 2115
    };                                                                                                                 // 2116
                                                                                                                       // 2117
    Slick.prototype.visibility = function() {                                                                          // 2118
                                                                                                                       // 2119
        var _ = this;                                                                                                  // 2120
                                                                                                                       // 2121
        if( document[ _.hidden ] ) {                                                                                   // 2122
            _.paused = true;                                                                                           // 2123
            _.autoPlayClear();                                                                                         // 2124
        } else {                                                                                                       // 2125
            _.paused = false;                                                                                          // 2126
            _.autoPlay();                                                                                              // 2127
        }                                                                                                              // 2128
                                                                                                                       // 2129
    };                                                                                                                 // 2130
                                                                                                                       // 2131
    $.fn.slick = function() {                                                                                          // 2132
        var _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments,1), l = _.length, i = 0, ret;    // 2133
        for(i; i < l; i++) {                                                                                           // 2134
            if (typeof opt == 'object' || typeof opt == 'undefined')                                                   // 2135
                _[i].slick =  new Slick(_[i], opt);                                                                    // 2136
            else                                                                                                       // 2137
                ret = _[i].slick[opt].apply(_[i].slick, args);                                                         // 2138
                if (typeof ret != 'undefined') return ret;                                                             // 2139
        }                                                                                                              // 2140
        return _;                                                                                                      // 2141
    };                                                                                                                 // 2142
                                                                                                                       // 2143
    $(function(){                                                                                                      // 2144
        $('[data-slick]').slick();                                                                                     // 2145
    });                                                                                                                // 2146
                                                                                                                       // 2147
}));                                                                                                                   // 2148
                                                                                                                       // 2149
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 2745
}).call(this);                                                       // 2746
                                                                     // 2747
                                                                     // 2748
                                                                     // 2749
                                                                     // 2750
                                                                     // 2751
                                                                     // 2752
(function () {                                                       // 2753
                                                                     // 2754
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionActionSheet/template.ionActionSheet.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionActionSheet");                                                                                // 2
Template["ionActionSheet"] = new Template("Template.ionActionSheet", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "action-sheet-backdrop"                                                                                   // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "action-sheet-wrapper"                                                                                    // 8
  }, "\n      ", HTML.DIV({                                                                                            // 9
    "class": "action-sheet"                                                                                            // 10
  }, "\n        ", HTML.DIV({                                                                                          // 11
    "class": "action-sheet-group"                                                                                      // 12
  }, "\n          ", Blaze.If(function() {                                                                             // 13
    return Spacebars.call(view.lookup("titleText"));                                                                   // 14
  }, function() {                                                                                                      // 15
    return [ "\n            ", HTML.DIV({                                                                              // 16
      "class": "action-sheet-title"                                                                                    // 17
    }, "\n              ", Blaze.View("lookup:titleText", function() {                                                 // 18
      return Spacebars.mustache(view.lookup("titleText"));                                                             // 19
    }), "\n            "), "\n          " ];                                                                           // 20
  }), "\n          ", Blaze.Each(function() {                                                                          // 21
    return Spacebars.call(view.lookup("buttons"));                                                                     // 22
  }, function() {                                                                                                      // 23
    return [ "\n            ", HTML.BUTTON({                                                                           // 24
      "class": "button",                                                                                               // 25
      "data-index": function() {                                                                                       // 26
        return Spacebars.mustache(view.lookup("index"));                                                               // 27
      }                                                                                                                // 28
    }, Blaze.View("lookup:text", function() {                                                                          // 29
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("text")));                                               // 30
    })), "\n          " ];                                                                                             // 31
  }), "\n        "), "\n        ", Blaze.If(function() {                                                               // 32
    return Spacebars.call(view.lookup("destructiveText"));                                                             // 33
  }, function() {                                                                                                      // 34
    return [ "\n          ", HTML.DIV({                                                                                // 35
      "class": "action-sheet-group"                                                                                    // 36
    }, "\n            ", HTML.BUTTON({                                                                                 // 37
      "class": "button destructive",                                                                                   // 38
      "data-destructive": ""                                                                                           // 39
    }, Blaze.View("lookup:destructiveText", function() {                                                               // 40
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("destructiveText")));                                    // 41
    })), "\n          "), "\n        " ];                                                                              // 42
  }), "\n        ", Blaze.If(function() {                                                                              // 43
    return Spacebars.call(view.lookup("cancelText"));                                                                  // 44
  }, function() {                                                                                                      // 45
    return [ "\n          ", HTML.DIV({                                                                                // 46
      "class": "action-sheet-group"                                                                                    // 47
    }, "\n            ", HTML.BUTTON({                                                                                 // 48
      "class": "button",                                                                                               // 49
      "data-cancel": ""                                                                                                // 50
    }, Blaze.View("lookup:cancelText", function() {                                                                    // 51
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("cancelText")));                                         // 52
    })), "\n          "), "\n        " ];                                                                              // 53
  }), "\n      "), "\n    "), "\n  ");                                                                                 // 54
}));                                                                                                                   // 55
                                                                                                                       // 56
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 2818
}).call(this);                                                       // 2819
                                                                     // 2820
                                                                     // 2821
                                                                     // 2822
                                                                     // 2823
                                                                     // 2824
                                                                     // 2825
(function () {                                                       // 2826
                                                                     // 2827
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionActionSheet/ionActionSheet.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonActionSheet = {                                                                                                     // 1
  transitionEndEvent: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',                              // 2
                                                                                                                       // 3
  show: function (options) {                                                                                           // 4
    this.template = Template.ionActionSheet;                                                                           // 5
                                                                                                                       // 6
    var buttons = [];                                                                                                  // 7
    for (var i = 0; i < options.buttons.length; i++) {                                                                 // 8
      var button = options.buttons[i];                                                                                 // 9
      buttons.push({                                                                                                   // 10
        text: button.text,                                                                                             // 11
        index: i                                                                                                       // 12
      });                                                                                                              // 13
    }                                                                                                                  // 14
                                                                                                                       // 15
    var data = {                                                                                                       // 16
      titleText: options.titleText,                                                                                    // 17
      destructiveText: options.destructiveText,                                                                        // 18
      cancelText: options.cancelText,                                                                                  // 19
      buttons: buttons                                                                                                 // 20
    };                                                                                                                 // 21
                                                                                                                       // 22
    this.callbacks = {                                                                                                 // 23
      cancel: options.cancel,                                                                                          // 24
      destructiveButtonClicked: options.destructiveButtonClicked,                                                      // 25
      buttonClicked: options.buttonClicked                                                                             // 26
    };                                                                                                                 // 27
                                                                                                                       // 28
    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));                                    // 29
    $('body').addClass('action-sheet-open');                                                                           // 30
                                                                                                                       // 31
    var $backdrop = $(this.view.firstNode());                                                                          // 32
    $backdrop.addClass('active');                                                                                      // 33
                                                                                                                       // 34
    var $wrapper = $backdrop.find('.action-sheet-wrapper');                                                            // 35
    Meteor.setTimeout(function () {                                                                                    // 36
      $wrapper.addClass('action-sheet-up');                                                                            // 37
    }, 20);                                                                                                            // 38
  },                                                                                                                   // 39
                                                                                                                       // 40
  cancel: function () {                                                                                                // 41
    this.close(this.callbacks.cancel);                                                                                 // 42
  },                                                                                                                   // 43
                                                                                                                       // 44
  buttonClicked: function (index) {                                                                                    // 45
    var callback = this.callbacks.buttonClicked;                                                                       // 46
    if (callback(index) === true) {                                                                                    // 47
      IonActionSheet.close();                                                                                          // 48
    }                                                                                                                  // 49
  },                                                                                                                   // 50
                                                                                                                       // 51
  destructiveButtonClicked: function () {                                                                              // 52
    var callback = this.callbacks.destructiveButtonClicked;                                                            // 53
    if (callback() === true) {                                                                                         // 54
      IonActionSheet.close();                                                                                          // 55
    }                                                                                                                  // 56
  },                                                                                                                   // 57
                                                                                                                       // 58
  close: function (callback) {                                                                                         // 59
    var $backdrop = $(this.view.firstNode());                                                                          // 60
    $backdrop.removeClass('active');                                                                                   // 61
                                                                                                                       // 62
    var $wrapper = $backdrop.find('.action-sheet-wrapper');                                                            // 63
    Meteor.setTimeout(function() {                                                                                     // 64
      $wrapper.removeClass('action-sheet-up');                                                                         // 65
    }.bind(this), 10);                                                                                                 // 66
                                                                                                                       // 67
    $wrapper.on(this.transitionEndEvent, function () {                                                                 // 68
      $('body').removeClass('action-sheet-open');                                                                      // 69
      Blaze.remove(this.view);                                                                                         // 70
                                                                                                                       // 71
      if (typeof(callback) === 'function') {                                                                           // 72
        callback();                                                                                                    // 73
      }                                                                                                                // 74
    }.bind(this));                                                                                                     // 75
  }                                                                                                                    // 76
};                                                                                                                     // 77
                                                                                                                       // 78
Template.ionActionSheet.rendered = function () {                                                                       // 79
  $(window).on('keyup.ionActionSheet', function(event) {                                                               // 80
    if (event.which == 27) {                                                                                           // 81
      IonActionSheet.cancel();                                                                                         // 82
    }                                                                                                                  // 83
  });                                                                                                                  // 84
};                                                                                                                     // 85
                                                                                                                       // 86
Template.ionActionSheet.destroyed = function () {                                                                      // 87
  $(window).off('keyup.ionActionSheet');                                                                               // 88
};                                                                                                                     // 89
                                                                                                                       // 90
Template.ionActionSheet.events({                                                                                       // 91
  // Handle clicking the backdrop                                                                                      // 92
  'click': function (event, template) {                                                                                // 93
    if ($(event.target).hasClass('action-sheet-backdrop')) {                                                           // 94
      IonActionSheet.cancel();                                                                                         // 95
    }                                                                                                                  // 96
  },                                                                                                                   // 97
                                                                                                                       // 98
  'click [data-index]': function (event, template) {                                                                   // 99
    var index = $(event.target).data('index');                                                                         // 100
    IonActionSheet.buttonClicked(index);                                                                               // 101
  },                                                                                                                   // 102
                                                                                                                       // 103
  'click [data-destructive]': function (event, template) {                                                             // 104
    IonActionSheet.destructiveButtonClicked();                                                                         // 105
  },                                                                                                                   // 106
                                                                                                                       // 107
  'click [data-cancel]': function (event, template) {                                                                  // 108
    IonActionSheet.cancel();                                                                                           // 109
  }                                                                                                                    // 110
                                                                                                                       // 111
});                                                                                                                    // 112
                                                                                                                       // 113
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 2948
}).call(this);                                                       // 2949
                                                                     // 2950
                                                                     // 2951
                                                                     // 2952
                                                                     // 2953
                                                                     // 2954
                                                                     // 2955
(function () {                                                       // 2956
                                                                     // 2957
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionBackdrop/template.ionBackdrop.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionBackdrop");                                                                                   // 2
Template["ionBackdrop"] = new Template("Template.ionBackdrop", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="backdrop"></div>');                                                                     // 5
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 2972
}).call(this);                                                       // 2973
                                                                     // 2974
                                                                     // 2975
                                                                     // 2976
                                                                     // 2977
                                                                     // 2978
                                                                     // 2979
(function () {                                                       // 2980
                                                                     // 2981
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionBackdrop/ionBackdrop.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonBackdrop = {                                                                                                        // 1
  holds: 0,                                                                                                            // 2
  retain: function () {                                                                                                // 3
    this.holds++;                                                                                                      // 4
                                                                                                                       // 5
    if (this.holds === 1) {                                                                                            // 6
      this.template = Template['ionBackdrop'];                                                                         // 7
      this.view = Blaze.renderWithData(this.template, {}, $('.ionic-body').get(0));                                    // 8
                                                                                                                       // 9
      var $backdropEl = $(this.view.firstNode());                                                                      // 10
      $backdropEl.addClass('visible');                                                                                 // 11
                                                                                                                       // 12
      Meteor.setTimeout(function () {                                                                                  // 13
        $backdropEl.addClass('active');                                                                                // 14
      }, 10);                                                                                                          // 15
    }                                                                                                                  // 16
  },                                                                                                                   // 17
                                                                                                                       // 18
  release: function () {                                                                                               // 19
    this.holds--;                                                                                                      // 20
                                                                                                                       // 21
    if (this.holds === 0) {                                                                                            // 22
      var $backdropEl = $(this.view.firstNode());                                                                      // 23
      $backdropEl.removeClass('active');                                                                               // 24
                                                                                                                       // 25
      Meteor.setTimeout(function () {                                                                                  // 26
        $backdropEl.removeClass('visible');                                                                            // 27
        Blaze.remove(this.view);                                                                                       // 28
      }.bind(this), 400);                                                                                              // 29
    }                                                                                                                  // 30
  }                                                                                                                    // 31
};                                                                                                                     // 32
                                                                                                                       // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3022
}).call(this);                                                       // 3023
                                                                     // 3024
                                                                     // 3025
                                                                     // 3026
                                                                     // 3027
                                                                     // 3028
                                                                     // 3029
(function () {                                                       // 3030
                                                                     // 3031
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionBody/template.ionBody.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionBody");                                                                                       // 2
Template["ionBody"] = new Template("Template.ionBody", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return [ "ionic-body ", Spacebars.mustache(view.lookup("platformClasses")) ];                                    // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3054
}).call(this);                                                       // 3055
                                                                     // 3056
                                                                     // 3057
                                                                     // 3058
                                                                     // 3059
                                                                     // 3060
                                                                     // 3061
(function () {                                                       // 3062
                                                                     // 3063
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionBody/ionBody.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Platform = {                                                                                                           // 1
  isIOS: function () {                                                                                                 // 2
    return (!!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i))
           || Session.get('platformOverride') === 'iOS';                                                               // 4
  },                                                                                                                   // 5
                                                                                                                       // 6
  isAndroid: function () {                                                                                             // 7
    return navigator.userAgent.indexOf('Android') > 0                                                                  // 8
           || Session.get('platformOverride') === 'Android';                                                           // 9
  }                                                                                                                    // 10
};                                                                                                                     // 11
                                                                                                                       // 12
Template.registerHelper('isIOS', function () {                                                                         // 13
  return Platform.isIOS();                                                                                             // 14
});                                                                                                                    // 15
                                                                                                                       // 16
Template.registerHelper('isAndroid', function () {                                                                     // 17
  return Platform.isAndroid();                                                                                         // 18
});                                                                                                                    // 19
                                                                                                                       // 20
Template.ionBody.helpers({                                                                                             // 21
  platformClasses: function () {                                                                                       // 22
    var classes = ['grade-a'];                                                                                         // 23
                                                                                                                       // 24
    if (Meteor.isCordova) {                                                                                            // 25
      classes.push('platform-cordova');                                                                                // 26
    }                                                                                                                  // 27
    if (Meteor.isClient) {                                                                                             // 28
      classes.push('platform-web');                                                                                    // 29
    }                                                                                                                  // 30
    if ((Meteor.isCordova && Platform.isIOS()) || Session.get('platformOverride') === 'iOS') {                         // 31
      classes.push('platform-ios');                                                                                    // 32
    }                                                                                                                  // 33
    if ((Meteor.isCordova && Platform.isAndroid()) || Session.get('platformOverride') === 'Android') {                 // 34
      classes.push('platform-android');                                                                                // 35
    }                                                                                                                  // 36
                                                                                                                       // 37
    return classes.join(' ');                                                                                          // 38
  }                                                                                                                    // 39
});                                                                                                                    // 40
                                                                                                                       // 41
Template.ionBody.rendered = function () {                                                                              // 42
  window.addEventListener('statusTap', function() {                                                                    // 43
    $('.content.overflow-scroll').animate({                                                                            // 44
      scrollTop: 0                                                                                                     // 45
    }, 500);                                                                                                           // 46
  });                                                                                                                  // 47
};                                                                                                                     // 48
                                                                                                                       // 49
Template.ionBody.events({                                                                                              // 50
  'click [data-ion-modal]': function (event, template) {                                                               // 51
    var templateName = $(event.currentTarget).data('ion-modal');                                                       // 52
    IonModal.open(templateName, $(event.currentTarget).data());                                                        // 53
  },                                                                                                                   // 54
                                                                                                                       // 55
  'click [data-ion-popover]': function (event, template) {                                                             // 56
    var templateName = $(event.currentTarget).data('ion-popover');                                                     // 57
    IonPopover.show(templateName, $(event.currentTarget).data(), event.currentTarget);                                 // 58
  },                                                                                                                   // 59
                                                                                                                       // 60
  'click [data-nav-direction]': function (event, template) {                                                           // 61
    $('[data-nav-container]').addClass('nav-view-direction-' + $(event.target).data('nav-direction'));                 // 62
    $('[data-navbar-container]').addClass('nav-bar-direction-' + $(event.target).data('nav-direction'));               // 63
  },                                                                                                                   // 64
                                                                                                                       // 65
  'click [data-ion-menu-toggle]': function (event, template) {                                                         // 66
    if (!IonSideMenu.snapper) {                                                                                        // 67
      return;                                                                                                          // 68
    }                                                                                                                  // 69
                                                                                                                       // 70
    var direction;                                                                                                     // 71
    var $el = $(event.target);                                                                                         // 72
                                                                                                                       // 73
    if ($el.data('ion-menu-toggle') !== '') {                                                                          // 74
      direction = $el.data('ion-menu-toggle');                                                                         // 75
    } else {                                                                                                           // 76
      direction = 'left';                                                                                              // 77
    }                                                                                                                  // 78
                                                                                                                       // 79
    if(IonSideMenu.snapper.state().state === direction){                                                               // 80
      IonSideMenu.snapper.close();                                                                                     // 81
    } else {                                                                                                           // 82
      IonSideMenu.snapper.open(direction);                                                                             // 83
    }                                                                                                                  // 84
  },                                                                                                                   // 85
                                                                                                                       // 86
  'click [data-ion-menu-close]': function (event, template) {                                                          // 87
    if (!IonSideMenu.snapper) {                                                                                        // 88
      return;                                                                                                          // 89
    }                                                                                                                  // 90
    IonSideMenu.snapper.close();                                                                                       // 91
  },                                                                                                                   // 92
                                                                                                                       // 93
  'mousedown .button, touchstart .button': function (event, template) {                                                // 94
    $(event.target).addClass('active');                                                                                // 95
  },                                                                                                                   // 96
                                                                                                                       // 97
  'mouseup .button, touchend .button': function (event, template) {                                                    // 98
    $(event.target).removeClass('active');                                                                             // 99
  }                                                                                                                    // 100
});                                                                                                                    // 101
                                                                                                                       // 102
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3173
}).call(this);                                                       // 3174
                                                                     // 3175
                                                                     // 3176
                                                                     // 3177
                                                                     // 3178
                                                                     // 3179
                                                                     // 3180
(function () {                                                       // 3181
                                                                     // 3182
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionContent/template.ionContent.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionContent");                                                                                    // 2
Template["ionContent"] = new Template("Template.ionContent", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "scroll-content ionic-scroll"                                                                             // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": function() {                                                                                              // 8
      return Spacebars.mustache(view.lookup("classes"));                                                               // 9
    }                                                                                                                  // 10
  }, "\n      ", Blaze._InOuterTemplateScope(view, function() {                                                        // 11
    return Spacebars.include(function() {                                                                              // 12
      return Spacebars.call(view.templateContentBlock);                                                                // 13
    });                                                                                                                // 14
  }), "\n    "), "\n  ");                                                                                              // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3207
}).call(this);                                                       // 3208
                                                                     // 3209
                                                                     // 3210
                                                                     // 3211
                                                                     // 3212
                                                                     // 3213
                                                                     // 3214
(function () {                                                       // 3215
                                                                     // 3216
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionContent/ionContent.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionContent.helpers({                                                                                          // 1
  classes: function () {                                                                                               // 2
    var classes = ['content'];                                                                                         // 3
                                                                                                                       // 4
    if (this.class) {                                                                                                  // 5
      classes.push(this.class);                                                                                        // 6
    }                                                                                                                  // 7
                                                                                                                       // 8
    if (this.scroll !== false) {                                                                                       // 9
      classes.push('overflow-scroll');                                                                                 // 10
    }                                                                                                                  // 11
                                                                                                                       // 12
    if (Session.get('hasHeader')) {                                                                                    // 13
      classes.push('has-header');                                                                                      // 14
    }                                                                                                                  // 15
                                                                                                                       // 16
    if (Session.get('hasSubheader')) {                                                                                 // 17
      classes.push('has-subheader');                                                                                   // 18
    }                                                                                                                  // 19
                                                                                                                       // 20
    if (Session.get('hasTabs')) {                                                                                      // 21
      classes.push('has-tabs');                                                                                        // 22
    }                                                                                                                  // 23
                                                                                                                       // 24
    if (Session.get('hasTabsTop')) {                                                                                   // 25
      classes.push('has-tabs-top');                                                                                    // 26
    }                                                                                                                  // 27
                                                                                                                       // 28
    if (Session.get('hasFooter')) {                                                                                    // 29
      classes.push('has-footer');                                                                                      // 30
    }                                                                                                                  // 31
                                                                                                                       // 32
    if (Session.get('hasSubfooter')) {                                                                                 // 33
      classes.push('has-subfooter');                                                                                   // 34
    }                                                                                                                  // 35
                                                                                                                       // 36
    return classes.join(' ');                                                                                          // 37
  }                                                                                                                    // 38
});                                                                                                                    // 39
                                                                                                                       // 40
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3264
}).call(this);                                                       // 3265
                                                                     // 3266
                                                                     // 3267
                                                                     // 3268
                                                                     // 3269
                                                                     // 3270
                                                                     // 3271
(function () {                                                       // 3272
                                                                     // 3273
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionFooterBar/template.ionFooterBar.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionFooterBar");                                                                                  // 2
Template["ionFooterBar"] = new Template("Template.ionFooterBar", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3296
}).call(this);                                                       // 3297
                                                                     // 3298
                                                                     // 3299
                                                                     // 3300
                                                                     // 3301
                                                                     // 3302
                                                                     // 3303
(function () {                                                       // 3304
                                                                     // 3305
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionFooterBar/ionFooterBar.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionFooterBar.rendered = function () {                                                                         // 1
  Session.set('hasFooter', true);                                                                                      // 2
};                                                                                                                     // 3
                                                                                                                       // 4
Template.ionFooterBar.destroyed = function () {                                                                        // 5
  Session.set('hasFooter', false);                                                                                     // 6
};                                                                                                                     // 7
                                                                                                                       // 8
Template.ionFooterBar.helpers({                                                                                        // 9
  classes: function () {                                                                                               // 10
    var classes = ['bar', 'bar-footer'];                                                                               // 11
                                                                                                                       // 12
    if (this.class) {                                                                                                  // 13
      classes.push(this.class);                                                                                        // 14
    } else {                                                                                                           // 15
      classes.push('bar-stable');                                                                                      // 16
    }                                                                                                                  // 17
                                                                                                                       // 18
    if (Session.get('hasTabs')) {                                                                                      // 19
      classes.push('has-tabs');                                                                                        // 20
    }                                                                                                                  // 21
                                                                                                                       // 22
    return classes.join(' ');                                                                                          // 23
  }                                                                                                                    // 24
});                                                                                                                    // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3339
}).call(this);                                                       // 3340
                                                                     // 3341
                                                                     // 3342
                                                                     // 3343
                                                                     // 3344
                                                                     // 3345
                                                                     // 3346
(function () {                                                       // 3347
                                                                     // 3348
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionHeaderBar/template.ionHeaderBar.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionHeaderBar");                                                                                  // 2
Template["ionHeaderBar"] = new Template("Template.ionHeaderBar", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3371
}).call(this);                                                       // 3372
                                                                     // 3373
                                                                     // 3374
                                                                     // 3375
                                                                     // 3376
                                                                     // 3377
                                                                     // 3378
(function () {                                                       // 3379
                                                                     // 3380
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionHeaderBar/ionHeaderBar.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonHeaderBar = {                                                                                                       // 1
  alignTitle: function () {                                                                                            // 2
    var align = this.alignTitle || 'center';                                                                           // 3
    var $title = this.$('.title');                                                                                     // 4
                                                                                                                       // 5
    if (Platform.isAndroid() && !this.alignTitle) {                                                                    // 6
      $title.addClass('title-left');                                                                                   // 7
      return;                                                                                                          // 8
    }                                                                                                                  // 9
                                                                                                                       // 10
    if (align === 'center') {                                                                                          // 11
      $title.addClass('title-center');                                                                                 // 12
    } else if (align === 'left') {                                                                                     // 13
      $title.addClass('title-left');                                                                                   // 14
    } else if (align === 'right') {                                                                                    // 15
      $title.addClass('title-right');                                                                                  // 16
    }                                                                                                                  // 17
  },                                                                                                                   // 18
                                                                                                                       // 19
  positionTitle: function () {                                                                                         // 20
    var $title = this.$('.title');                                                                                     // 21
    var $leftButton = $('.button.pull-left');                                                                          // 22
    var $rightButton = $('.button.pull-right');                                                                        // 23
                                                                                                                       // 24
    // Find out which button is wider,                                                                                 // 25
    // use that to offset the title on both sides                                                                      // 26
    var leftButtonWidth = 0;                                                                                           // 27
    var rightButtonWidth = 0;                                                                                          // 28
    if ($leftButton.length) {                                                                                          // 29
      $leftButton.each(function(index, element){                                                                       // 30
        leftButtonWidth += $(element).outerWidth();                                                                    // 31
      });                                                                                                              // 32
    }                                                                                                                  // 33
    if ($rightButton.length) {                                                                                         // 34
      $rightButton.each(function(index, element){                                                                      // 35
        rightButtonWidth += $(element).outerWidth();                                                                   // 36
      });                                                                                                              // 37
    }                                                                                                                  // 38
                                                                                                                       // 39
    // If we're on Android, we only care about the left button                                                         // 40
    var margin;                                                                                                        // 41
    if (Platform.isAndroid()) {                                                                                        // 42
      margin = leftButtonWidth;                                                                                        // 43
    } else {                                                                                                           // 44
      margin = Math.max(leftButtonWidth, rightButtonWidth);                                                            // 45
    }                                                                                                                  // 46
    $title.css('left', margin);                                                                                        // 47
    $title.css('right', margin);                                                                                       // 48
  }                                                                                                                    // 49
};                                                                                                                     // 50
                                                                                                                       // 51
Template.ionHeaderBar.created = function () {                                                                          // 52
  this.data = this.data || {};                                                                                         // 53
};                                                                                                                     // 54
                                                                                                                       // 55
Template.ionHeaderBar.rendered = function () {                                                                         // 56
  Session.set('hasHeader', true);                                                                                      // 57
  IonHeaderBar.alignTitle.call(this);                                                                                  // 58
  IonHeaderBar.positionTitle.call(this);                                                                               // 59
};                                                                                                                     // 60
                                                                                                                       // 61
Template.ionHeaderBar.destroyed = function () {                                                                        // 62
  Session.set('hasHeader', false);                                                                                     // 63
};                                                                                                                     // 64
                                                                                                                       // 65
Template.ionHeaderBar.helpers({                                                                                        // 66
  classes: function () {                                                                                               // 67
    var classes = ['bar', 'bar-header'];                                                                               // 68
                                                                                                                       // 69
    if (this.class) {                                                                                                  // 70
      classes.push(this.class);                                                                                        // 71
    } else {                                                                                                           // 72
      classes.push('bar-stable');                                                                                      // 73
    }                                                                                                                  // 74
                                                                                                                       // 75
    return classes.join(' ');                                                                                          // 76
  }                                                                                                                    // 77
});                                                                                                                    // 78
                                                                                                                       // 79
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3467
}).call(this);                                                       // 3468
                                                                     // 3469
                                                                     // 3470
                                                                     // 3471
                                                                     // 3472
                                                                     // 3473
                                                                     // 3474
(function () {                                                       // 3475
                                                                     // 3476
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionIcon/template.ionIcon.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionIcon");                                                                                       // 2
Template["ionIcon"] = new Template("Template.ionIcon", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.I({                                                                                                      // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  });                                                                                                                  // 9
}));                                                                                                                   // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3495
}).call(this);                                                       // 3496
                                                                     // 3497
                                                                     // 3498
                                                                     // 3499
                                                                     // 3500
                                                                     // 3501
                                                                     // 3502
(function () {                                                       // 3503
                                                                     // 3504
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionIcon/ionIcon.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionIcon.helpers({                                                                                             // 1
  classes: function () {                                                                                               // 2
    var classes = ['icon'];                                                                                            // 3
    classes.push('ion-' + this.icon);                                                                                  // 4
                                                                                                                       // 5
    if (this.class) {                                                                                                  // 6
      classes.push(this.class);                                                                                        // 7
    }                                                                                                                  // 8
                                                                                                                       // 9
    return classes.join(' ');                                                                                          // 10
  }                                                                                                                    // 11
});                                                                                                                    // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3525
}).call(this);                                                       // 3526
                                                                     // 3527
                                                                     // 3528
                                                                     // 3529
                                                                     // 3530
                                                                     // 3531
                                                                     // 3532
(function () {                                                       // 3533
                                                                     // 3534
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionItem/template.ionItem.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionItem");                                                                                       // 2
Template["ionItem"] = new Template("Template.ionItem", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("isAnchor"));                                                                    // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", HTML.A({                                                                                        // 8
      "class": function() {                                                                                            // 9
        return Spacebars.mustache(view.lookup("itemClasses"));                                                         // 10
      },                                                                                                               // 11
      href: function() {                                                                                               // 12
        return Spacebars.mustache(view.lookup("url"));                                                                 // 13
      },                                                                                                               // 14
      id: function() {                                                                                                 // 15
        return Spacebars.mustache(view.lookup("idAttribute"));                                                         // 16
      },                                                                                                               // 17
      target: function() {                                                                                             // 18
        return Spacebars.mustache(view.lookup("target"));                                                              // 19
      }                                                                                                                // 20
    }, "\n      ", Blaze._InOuterTemplateScope(view, function() {                                                      // 21
      return Spacebars.include(function() {                                                                            // 22
        return Spacebars.call(view.templateContentBlock);                                                              // 23
      });                                                                                                              // 24
    }), "\n    "), "\n  " ];                                                                                           // 25
  }, function() {                                                                                                      // 26
    return [ "\n    ", HTML.DIV({                                                                                      // 27
      "class": function() {                                                                                            // 28
        return Spacebars.mustache(view.lookup("itemClasses"));                                                         // 29
      },                                                                                                               // 30
      id: function() {                                                                                                 // 31
        return Spacebars.mustache(view.lookup("idAttribute"));                                                         // 32
      }                                                                                                                // 33
    }, "\n      ", Blaze._InOuterTemplateScope(view, function() {                                                      // 34
      return Spacebars.include(function() {                                                                            // 35
        return Spacebars.call(view.templateContentBlock);                                                              // 36
      });                                                                                                              // 37
    }), "\n    "), "\n  " ];                                                                                           // 38
  });                                                                                                                  // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3583
}).call(this);                                                       // 3584
                                                                     // 3585
                                                                     // 3586
                                                                     // 3587
                                                                     // 3588
                                                                     // 3589
                                                                     // 3590
(function () {                                                       // 3591
                                                                     // 3592
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionItem/ionItem.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionItem.helpers({                                                                                             // 1
  idAttribute: function () {                                                                                           // 2
    if (this.id) {                                                                                                     // 3
      return this.id;                                                                                                  // 4
    }                                                                                                                  // 5
  },                                                                                                                   // 6
  itemClasses: function () {                                                                                           // 7
    var classes = ['item'];                                                                                            // 8
                                                                                                                       // 9
    if (this.class) {                                                                                                  // 10
      var customClasses = this.class.split(' ');                                                                       // 11
      _(customClasses).each(function (customClass) {                                                                   // 12
        classes.push(customClass);                                                                                     // 13
      });                                                                                                              // 14
    }                                                                                                                  // 15
                                                                                                                       // 16
    if (this.avatar) {                                                                                                 // 17
      classes.push('item-avatar' + (this.avatar === 'right' ? '-right' : ''));                                         // 18
    }                                                                                                                  // 19
                                                                                                                       // 20
    if (this.iconLeft) {                                                                                               // 21
      classes.push('item-icon-left');                                                                                  // 22
    }                                                                                                                  // 23
                                                                                                                       // 24
    if (this.iconRight) {                                                                                              // 25
      classes.push('item-icon-right');                                                                                 // 26
    }                                                                                                                  // 27
                                                                                                                       // 28
    if (this.buttonLeft) {                                                                                             // 29
      classes.push('item-button-left');                                                                                // 30
    }                                                                                                                  // 31
                                                                                                                       // 32
    if (this.buttonRight) {                                                                                            // 33
      classes.push('item-button-right');                                                                               // 34
    }                                                                                                                  // 35
                                                                                                                       // 36
    if (this.textWrap) {                                                                                               // 37
      classes.push('item-text-wrap');                                                                                  // 38
    }                                                                                                                  // 39
                                                                                                                       // 40
    return classes.join(' ');                                                                                          // 41
  },                                                                                                                   // 42
                                                                                                                       // 43
  isAnchor: function () {                                                                                              // 44
    return _.some([this.href,this.path,this.url,this.route],function(path){return path != undefined});                 // 45
  },                                                                                                                   // 46
                                                                                                                       // 47
  target: function () {                                                                                                // 48
    return this.target;                                                                                                // 49
  },                                                                                                                   // 50
                                                                                                                       // 51
  url: function () {                                                                                                   // 52
    if (this.href) {                                                                                                   // 53
      return this.href;                                                                                                // 54
    }                                                                                                                  // 55
                                                                                                                       // 56
    if ( this.path || this.url || this.route ) {                                                                       // 57
                                                                                                                       // 58
      var path = _.find([this.path,this.url,this.route],function(path){return path !=undefined});                      // 59
                                                                                                                       // 60
      if ( this.query || this.hash || this.data ){                                                                     // 61
                                                                                                                       // 62
        var hash = {};                                                                                                 // 63
        hash.route = path;                                                                                             // 64
        hash.query = this.query;                                                                                       // 65
        hash.hash = this.hash;                                                                                         // 66
        hash.data = this.data;                                                                                         // 67
        var options = new Spacebars.kw(hash);                                                                          // 68
                                                                                                                       // 69
        // Devs may pass 'route=x' instead of 'path=' or 'url='                                                        // 70
        // Should doing that throw an error? Not sure but we decided to                                                // 71
        // parse it as if the dev passed it as 'path='                                                                 // 72
        if (this.url){                                                                                                 // 73
          return Blaze._globalHelpers.urlFor(options)                                                                  // 74
        } else if( this.path || this.route ) {                                                                         // 75
          return Blaze._globalHelpers.pathFor(options)                                                                 // 76
        }                                                                                                              // 77
                                                                                                                       // 78
      } else {                                                                                                         // 79
        return Router.routes[path].path(Template.parentData(1));                                                       // 80
      }                                                                                                                // 81
    }                                                                                                                  // 82
  }                                                                                                                    // 83
});                                                                                                                    // 84
                                                                                                                       // 85
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3685
}).call(this);                                                       // 3686
                                                                     // 3687
                                                                     // 3688
                                                                     // 3689
                                                                     // 3690
                                                                     // 3691
                                                                     // 3692
(function () {                                                       // 3693
                                                                     // 3694
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionKeyboard/ionKeyboard.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
  if (Meteor.isCordova) {                                                                                              // 2
    IonKeyboard.disableScroll();                                                                                       // 3
  }                                                                                                                    // 4
});                                                                                                                    // 5
                                                                                                                       // 6
IonKeyboard = {                                                                                                        // 7
  close: function () {                                                                                                 // 8
    if (Meteor.isCordova) {                                                                                            // 9
      cordova.plugins.Keyboard.close();                                                                                // 10
    }                                                                                                                  // 11
  },                                                                                                                   // 12
                                                                                                                       // 13
  show: function () {                                                                                                  // 14
    if (Meteor.isCordova) {                                                                                            // 15
      cordova.plugins.Keyboard.show();                                                                                 // 16
    }                                                                                                                  // 17
  },                                                                                                                   // 18
                                                                                                                       // 19
  hideKeyboardAccessoryBar: function () {                                                                              // 20
    if (Meteor.isCordova) {                                                                                            // 21
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);                                                         // 22
    }                                                                                                                  // 23
  },                                                                                                                   // 24
                                                                                                                       // 25
  showKeyboardAccessoryBar: function () {                                                                              // 26
    if (Meteor.isCordova) {                                                                                            // 27
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);                                                        // 28
    }                                                                                                                  // 29
  },                                                                                                                   // 30
                                                                                                                       // 31
  disableScroll: function () {                                                                                         // 32
    if (Meteor.isCordova) {                                                                                            // 33
      cordova.plugins.Keyboard.disableScroll(true);                                                                    // 34
    }                                                                                                                  // 35
  },                                                                                                                   // 36
                                                                                                                       // 37
  enableScroll: function () {                                                                                          // 38
    if (Meteor.isCordova) {                                                                                            // 39
      cordova.plugins.Keyboard.disableScroll(false);                                                                   // 40
    }                                                                                                                  // 41
  }                                                                                                                    // 42
};                                                                                                                     // 43
                                                                                                                       // 44
window.addEventListener('native.keyboardshow', function (event) {                                                      // 45
                                                                                                                       // 46
  // TODO: Android is having problems                                                                                  // 47
  if (Platform.isAndroid()) {                                                                                          // 48
    return;                                                                                                            // 49
  }                                                                                                                    // 50
                                                                                                                       // 51
  $('body').addClass('keyboard-open');                                                                                 // 52
  var keyboardHeight = event.keyboardHeight;                                                                           // 53
                                                                                                                       // 54
  // Attach any elements that want to be attached                                                                      // 55
  $('[data-keyboard-attach]').each(function (index, el) {                                                              // 56
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));                                                             // 57
    $(el).css({bottom: keyboardHeight});                                                                               // 58
  });                                                                                                                  // 59
                                                                                                                       // 60
  // Move the bottom of the content area(s) above the top of the keyboard                                              // 61
  $('.content.overflow-scroll').each(function (index, el) {                                                            // 62
    $(el).data('ionkeyboard.bottom', $(el).css('bottom'));                                                             // 63
    $(el).css({bottom: keyboardHeight});                                                                               // 64
  });                                                                                                                  // 65
                                                                                                                       // 66
  // Scroll to the focused element                                                                                     // 67
  scrollToFocusedElement(null, keyboardHeight);                                                                        // 68
                                                                                                                       // 69
});                                                                                                                    // 70
                                                                                                                       // 71
window.addEventListener('native.keyboardhide', function (event) {                                                      // 72
                                                                                                                       // 73
  // TODO: Android is having problems                                                                                  // 74
  if (Platform.isAndroid()) {                                                                                          // 75
    return;                                                                                                            // 76
  }                                                                                                                    // 77
                                                                                                                       // 78
  // $('input, textarea').blur();                                                                                      // 79
  $('body').removeClass('keyboard-open');                                                                              // 80
                                                                                                                       // 81
  // Detach any elements that were attached                                                                            // 82
  $('[data-keyboard-attach]').each(function (index, el) {                                                              // 83
    $(el).css({bottom: $(el).data('ionkeyboard.bottom')});                                                             // 84
  });                                                                                                                  // 85
                                                                                                                       // 86
  // Reset the content area(s)                                                                                         // 87
  $('.content.overflow-scroll').each(function (index, el) {                                                            // 88
    $(el).css({bottom: $(el).data('ionkeyboard.bottom')});                                                             // 89
  });                                                                                                                  // 90
                                                                                                                       // 91
});                                                                                                                    // 92
                                                                                                                       // 93
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3795
}).call(this);                                                       // 3796
                                                                     // 3797
                                                                     // 3798
                                                                     // 3799
                                                                     // 3800
                                                                     // 3801
                                                                     // 3802
(function () {                                                       // 3803
                                                                     // 3804
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionKeyboard/ionInputFocus.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  if (Meteor.isCordova) {                                                                                              // 2
                                                                                                                       // 3
    var getScrollContainer = function($element) {                                                                      // 4
      return $($element.parents('.content.overflow-scroll').get(0));                                                   // 5
    }                                                                                                                  // 6
                                                                                                                       // 7
    var focusPadding = 20;                                                                                             // 8
    var isBehindKeyboard = function($focused, keyboardHeight) {                                                        // 9
      var keyboardTop = $(window).innerHeight() - keyboardHeight;                                                      // 10
      var focusedBottom = $focused.offset().top + $focused.innerHeight();                                              // 11
      var focusedIsBehindKeyboard = focusedBottom > keyboardTop - focusPadding;                                        // 12
      return focusedIsBehindKeyboard;                                                                                  // 13
    }                                                                                                                  // 14
                                                                                                                       // 15
    var getScrollToPosition = function($focused, $container, keyboardHeight) {                                         // 16
                                                                                                                       // 17
      var scrollTo = $container.scrollTop() + $focused.offset().top - $container.offset().top - focusPadding;          // 18
      return scrollTo;                                                                                                 // 19
                                                                                                                       // 20
    }                                                                                                                  // 21
                                                                                                                       // 22
    // Scroll to make input on top of the page                                                                         // 23
    // #TODO Correct behavior should be: if the input is behind the keyboard, scroll to make it visible on top of the keyboard
    scrollToFocusedElement = function($focused, keyboardHeight) {                                                      // 25
      $focused = $focused || $(':focus');                                                                              // 26
      var $container = getScrollContainer($focused);                                                                   // 27
      if (!$focused.length || !$container.length) return;                                                              // 28
      var focusedIsBehindKeyboard = isBehindKeyboard($focused, keyboardHeight);                                        // 29
      if (!focusedIsBehindKeyboard) return;                                                                            // 30
      var scrollTo = getScrollToPosition($focused, $container, keyboardHeight);                                        // 31
      setTimeout(function() {                                                                                          // 32
        $container.animate({ scrollTop: scrollTo }, {                                                                  // 33
          duration: 400,                                                                                               // 34
          complete: function() {                                                                                       // 35
            // Fix floating input cursor bug (https://github.com/twbs/bootstrap/issues/14708, https://github.com/cubiq/iscroll/issues/178)
            var display = $focused.css('display');                                                                     // 37
            $focused.css({ display: 'none' }).css({ display: display });                                               // 38
          }                                                                                                            // 39
        });                                                                                                            // 40
      }, 0);                                                                                                           // 41
    }                                                                                                                  // 42
                                                                                                                       // 43
    var $scrollContainer, scrollPosStart, scrollPosEnd, scrollDistance, scrollHappened, scrollThreshold = 10;          // 44
                                                                                                                       // 45
    // Trigger focus on input through touchend for long taps                                                           // 46
    $(document).on('touchstart', function(event) {                                                                     // 47
      $scrollContainer = getScrollContainer($(event.target));                                                          // 48
      scrollPosStart = $scrollContainer.scrollTop();                                                                   // 49
    });                                                                                                                // 50
                                                                                                                       // 51
    $(document).on('touchend', function(event) {                                                                       // 52
      $scrollContainer = getScrollContainer($(event.target));                                                          // 53
      scrollPosEnd = $scrollContainer.scrollTop();                                                                     // 54
      scrollDistance = Math.abs(scrollPosStart - scrollPosEnd);                                                        // 55
      scrollHappened = scrollDistance > scrollThreshold;                                                               // 56
      var $target = $(event.target);                                                                                   // 57
      var isInput = _.contains(['INPUT', 'TEXTAREA'], event.target.tagName);                                           // 58
      var isFocused = $target.is(':focus');                                                                            // 59
      if (isInput && !isFocused && !scrollHappened) $target.focus();                                                   // 60
    });                                                                                                                // 61
                                                                                                                       // 62
  }                                                                                                                    // 63
});                                                                                                                    // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3877
}).call(this);                                                       // 3878
                                                                     // 3879
                                                                     // 3880
                                                                     // 3881
                                                                     // 3882
                                                                     // 3883
                                                                     // 3884
(function () {                                                       // 3885
                                                                     // 3886
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionList/template.ionList.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionList");                                                                                       // 2
Template["ionList"] = new Template("Template.ionList", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3909
}).call(this);                                                       // 3910
                                                                     // 3911
                                                                     // 3912
                                                                     // 3913
                                                                     // 3914
                                                                     // 3915
                                                                     // 3916
(function () {                                                       // 3917
                                                                     // 3918
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionList/ionList.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionList.helpers({                                                                                             // 1
  classes: function () {                                                                                               // 2
    var classes = ['list'];                                                                                            // 3
                                                                                                                       // 4
    if (this.class) {                                                                                                  // 5
      var customClasses = this.class.split(' ');                                                                       // 6
      _(customClasses).each(function (customClass) {                                                                   // 7
        classes.push(customClass);                                                                                     // 8
      });                                                                                                              // 9
    }                                                                                                                  // 10
                                                                                                                       // 11
    return classes.join(' ');                                                                                          // 12
  }                                                                                                                    // 13
});                                                                                                                    // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3941
}).call(this);                                                       // 3942
                                                                     // 3943
                                                                     // 3944
                                                                     // 3945
                                                                     // 3946
                                                                     // 3947
                                                                     // 3948
(function () {                                                       // 3949
                                                                     // 3950
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionLoading/template.ionLoading.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionLoading");                                                                                    // 2
Template["ionLoading"] = new Template("Template.ionLoading", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "loading-container"                                                                                       // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "loading"                                                                                                 // 8
  }, "\n      ", Blaze.If(function() {                                                                                 // 9
    return Spacebars.call(view.lookup("template"));                                                                    // 10
  }, function() {                                                                                                      // 11
    return [ "\n        ", Blaze.View("lookup:template", function() {                                                  // 12
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("template")));                                           // 13
    }), "\n      " ];                                                                                                  // 14
  }, function() {                                                                                                      // 15
    return [ "\n        ", HTML.I({                                                                                    // 16
      "class": "icon ion-loading-d"                                                                                    // 17
    }), "\n      " ];                                                                                                  // 18
  }), "\n    "), "\n  ");                                                                                              // 19
}));                                                                                                                   // 20
                                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 3979
}).call(this);                                                       // 3980
                                                                     // 3981
                                                                     // 3982
                                                                     // 3983
                                                                     // 3984
                                                                     // 3985
                                                                     // 3986
(function () {                                                       // 3987
                                                                     // 3988
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionLoading/ionLoading.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonLoading = {                                                                                                         // 1
  show: function (userOptions) {                                                                                       // 2
    var userOptions = userOptions || {};                                                                               // 3
    var options = _.extend({                                                                                           // 4
      delay: 0,                                                                                                        // 5
      duration: null,                                                                                                  // 6
      customTemplate: null,                                                                                            // 7
      backdrop: false                                                                                                  // 8
    }, userOptions);                                                                                                   // 9
                                                                                                                       // 10
    if (options.backdrop) {                                                                                            // 11
      IonBackdrop.retain();                                                                                            // 12
      $('.backdrop').addClass('backdrop-loading');                                                                     // 13
    }                                                                                                                  // 14
                                                                                                                       // 15
    Meteor.setTimeout(function () {                                                                                    // 16
      this.template = Template['ionLoading'];                                                                          // 17
      this.view = Blaze.renderWithData(this.template, {template: options.customTemplate}, $('.ionic-body').get(0));    // 18
                                                                                                                       // 19
      var $loadingEl = $(this.view.firstNode());                                                                       // 20
      $loadingEl.addClass('visible');                                                                                  // 21
                                                                                                                       // 22
      Meteor.setTimeout(function () {                                                                                  // 23
        $loadingEl.addClass('active');                                                                                 // 24
      }, 10);                                                                                                          // 25
    }.bind(this), options.delay);                                                                                      // 26
                                                                                                                       // 27
    if (options.duration) {                                                                                            // 28
      Meteor.setTimeout(function () {                                                                                  // 29
        this.hide();                                                                                                   // 30
      }.bind(this), options.duration);                                                                                 // 31
    }                                                                                                                  // 32
  },                                                                                                                   // 33
                                                                                                                       // 34
  hide: function () {                                                                                                  // 35
    if (this.view) {                                                                                                   // 36
      var $loadingEl = $(this.view.firstNode());                                                                       // 37
      $loadingEl.removeClass('active');                                                                                // 38
                                                                                                                       // 39
      Meteor.setTimeout(function () {                                                                                  // 40
        IonBackdrop.release();                                                                                         // 41
        $loadingEl.removeClass('visible');                                                                             // 42
        Blaze.remove(this.view);                                                                                       // 43
        this.view = null;                                                                                              // 44
      }.bind(this), 0);                                                                                                // 45
    }                                                                                                                  // 46
    Meteor.setTimeout(function() {                                                                                     // 47
      $('.loading-container').remove();                                                                                // 48
    }, 0)                                                                                                              // 49
  }                                                                                                                    // 50
};                                                                                                                     // 51
                                                                                                                       // 52
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4048
}).call(this);                                                       // 4049
                                                                     // 4050
                                                                     // 4051
                                                                     // 4052
                                                                     // 4053
                                                                     // 4054
                                                                     // 4055
(function () {                                                       // 4056
                                                                     // 4057
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionModal/template.ionModal.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionModal");                                                                                      // 2
Template["ionModal"] = new Template("Template.ionModal", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "modal-backdrop"                                                                                          // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "modal-wrapper"                                                                                           // 8
  }, "\n      ", HTML.DIV({                                                                                            // 9
    "class": function() {                                                                                              // 10
      return Spacebars.mustache(view.lookup("classes"));                                                               // 11
    }                                                                                                                  // 12
  }, "\n\n        ", Blaze.If(function() {                                                                             // 13
    return Spacebars.call(view.lookup("customTemplate"));                                                              // 14
  }, function() {                                                                                                      // 15
    return [ "\n          ", Blaze._InOuterTemplateScope(view, function() {                                            // 16
      return Spacebars.include(function() {                                                                            // 17
        return Spacebars.call(view.templateContentBlock);                                                              // 18
      });                                                                                                              // 19
    }), "\n        " ];                                                                                                // 20
  }, function() {                                                                                                      // 21
    return [ "\n          ", HTML.DIV({                                                                                // 22
      "class": function() {                                                                                            // 23
        return Spacebars.mustache(view.lookup("barClass"));                                                            // 24
      }                                                                                                                // 25
    }, "\n            ", HTML.H2({                                                                                     // 26
      "class": function() {                                                                                            // 27
        return Spacebars.mustache(view.lookup("titleClass"));                                                          // 28
      }                                                                                                                // 29
    }, Blaze.View("lookup:title", function() {                                                                         // 30
      return Spacebars.mustache(view.lookup("title"));                                                                 // 31
    })), "\n            ", Blaze.If(function() {                                                                       // 32
      return Spacebars.call(view.lookup("closeText"));                                                                 // 33
    }, function() {                                                                                                    // 34
      return [ "\n              ", HTML.BUTTON({                                                                       // 35
        "data-dismiss": "modal",                                                                                       // 36
        "class": "button button-positive button-clear"                                                                 // 37
      }, Blaze.View("lookup:closeText", function() {                                                                   // 38
        return Spacebars.mustache(view.lookup("closeText"));                                                           // 39
      })), "\n            " ];                                                                                         // 40
    }, function() {                                                                                                    // 41
      return [ "\n              ", HTML.BUTTON({                                                                       // 42
        "data-dismiss": "modal",                                                                                       // 43
        "class": "button button-icon"                                                                                  // 44
      }, HTML.I({                                                                                                      // 45
        "class": "icon ion-ios-close-empty"                                                                            // 46
      })), "\n            " ];                                                                                         // 47
    }), "\n          "), "\n          ", HTML.DIV({                                                                    // 48
      "class": "content has-header overflow-scroll"                                                                    // 49
    }, "\n            ", Blaze._InOuterTemplateScope(view, function() {                                                // 50
      return Spacebars.include(function() {                                                                            // 51
        return Spacebars.call(view.templateContentBlock);                                                              // 52
      });                                                                                                              // 53
    }), "\n          "), "\n        " ];                                                                               // 54
  }), "\n\n      "), "\n    "), "\n  ");                                                                               // 55
}));                                                                                                                   // 56
                                                                                                                       // 57
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4122
}).call(this);                                                       // 4123
                                                                     // 4124
                                                                     // 4125
                                                                     // 4126
                                                                     // 4127
                                                                     // 4128
                                                                     // 4129
(function () {                                                       // 4130
                                                                     // 4131
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionModal/ionModal.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonModal = {                                                                                                           // 1
  transitionEndEvent: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',                              // 2
  animationEndEvent: 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',                                   // 3
  enterClasses: ['ng-enter', 'slide-in-up'],                                                                           // 4
  enterActiveClass: 'ng-enter-active',                                                                                 // 5
  leaveClasses: ['ng-leave', 'slide-in-up'],                                                                           // 6
  leaveActiveClass: 'ng-leave-active',                                                                                 // 7
  view: {},                                                                                                            // 8
  views: [],                                                                                                           // 9
  open: function (templateName, data) {                                                                                // 10
                                                                                                                       // 11
    Meteor.setTimeout(function () {                                                                                    // 12
                                                                                                                       // 13
      this.template = Template[templateName];                                                                          // 14
      this.views.push(templateName);                                                                                   // 15
      if (!this.view[templateName]) this.view[templateName] = [];                                                      // 16
                                                                                                                       // 17
      var view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));                                   // 18
      this.view[templateName].push(view);                                                                              // 19
                                                                                                                       // 20
      var $modalBackdrop = $(view.firstNode());                                                                        // 21
      var $modal = $('.modal', $modalBackdrop);                                                                        // 22
                                                                                                                       // 23
      if (this.views.length === 1) {                                                                                   // 24
        $modalBackdrop.addClass('active');                                                                             // 25
      }                                                                                                                // 26
                                                                                                                       // 27
      $modal.addClass(this.enterClasses.join(' '));                                                                    // 28
      Meteor.setTimeout(function () {                                                                                  // 29
        $modal.addClass(this.enterActiveClass);                                                                        // 30
      }.bind(this), 50);                                                                                               // 31
                                                                                                                       // 32
    }.bind(this), 0);                                                                                                  // 33
                                                                                                                       // 34
  },                                                                                                                   // 35
  close: function (templateName) {                                                                                     // 36
                                                                                                                       // 37
    this.templateClosed = templateName;                                                                                // 38
    Meteor.setTimeout(function () {                                                                                    // 39
                                                                                                                       // 40
      var templateName = this.templateClosed || this.views.slice(-1)[0];                                               // 41
      delete this.templateClosed;                                                                                      // 42
                                                                                                                       // 43
      var view = (this.view[templateName] || []).slice(-1)[0];                                                         // 44
      if (!view) return;                                                                                               // 45
                                                                                                                       // 46
      var $modalBackdrop = $(view.firstNode());                                                                        // 47
      var $modal = $('.modal', $modalBackdrop);                                                                        // 48
                                                                                                                       // 49
      $modal.addClass(this.leaveClasses.join(' '));                                                                    // 50
      Meteor.setTimeout(function () {                                                                                  // 51
        $modal.addClass(this.leaveActiveClass);                                                                        // 52
      }.bind(this), 50);                                                                                               // 53
                                                                                                                       // 54
      $modalBackdrop.fadeOut(500, function() {                                                                         // 55
        $('body').removeClass('modal-open');                                                                           // 56
      });                                                                                                              // 57
                                                                                                                       // 58
    }.bind(this), 0);                                                                                                  // 59
                                                                                                                       // 60
  }                                                                                                                    // 61
};                                                                                                                     // 62
                                                                                                                       // 63
$(document).delegate('.modal', IonModal.transitionEndEvent, function(e) {                                              // 64
  var $modal = $(e.currentTarget);                                                                                     // 65
  if ($modal.hasClass(IonModal.enterClasses.join(' ')) || $modal.hasClass(IonModal.enterActiveClasse)) {               // 66
    $modal.removeClass(IonModal.enterClasses.join(' ')).removeClass(IonModal.enterActiveClass);                        // 67
    $('body').addClass('modal-open');                                                                                  // 68
  } else if ($modal.hasClass(IonModal.leaveClasses.join(' ')) || $modal.hasClass(IonModal.leaveActiveClasse)) {        // 69
    var firstChild = $modal.children().first();                                                                        // 70
    var templateName = getElementModalTemplateName(firstChild);                                                        // 71
    IonModal.views = _.without(IonModal.views, templateName);                                                          // 72
    var view = IonModal.view[templateName].pop();                                                                      // 73
    var $modalBackdrop = $(view.firstNode());                                                                          // 74
    $modalBackdrop.removeClass('active');                                                                              // 75
    $modal.removeClass(IonModal.leaveClasses.join(' ')).removeClass(IonModal.leaveActiveClass).off(IonModal.transitionEndEvent);
    $('body').removeClass('modal-open');                                                                               // 77
    $(e.target).parents('.modal-backdrop').remove();                                                                   // 78
    Blaze.remove(view);                                                                                                // 79
  }                                                                                                                    // 80
});                                                                                                                    // 81
                                                                                                                       // 82
Template.ionModal.created = function () {                                                                              // 83
  this.data = this.data || {};                                                                                         // 84
  this.customTemplate = this.data.customTemplate || false;                                                             // 85
  this.title = this.data.title;                                                                                        // 86
  this.title = this.data.closeText;                                                                                    // 87
  this.focusFirstInput = _.isUndefined(this.data.focusFirstInput) ? true : this.data.focusFirstInput;                  // 88
  this.animation = this.data.animation || 'slide-in-up';                                                               // 89
};                                                                                                                     // 90
                                                                                                                       // 91
Template.ionModal.rendered = function () {                                                                             // 92
  if (this.focusFirstInput) {                                                                                          // 93
    Meteor.setTimeout(function () {                                                                                    // 94
      if (!this._domrange) return;                                                                                     // 95
      this.$('input:first').focus();                                                                                   // 96
    }.bind(this), 600);                                                                                                // 97
  }                                                                                                                    // 98
  $(window).on('keyup.ionModal', function(event) {                                                                     // 99
    event.stopImmediatePropagation();                                                                                  // 100
    if (event.which == 27) {                                                                                           // 101
      IonModal.close();                                                                                                // 102
    }                                                                                                                  // 103
  });                                                                                                                  // 104
};                                                                                                                     // 105
                                                                                                                       // 106
Template.ionModal.destroyed = function () {                                                                            // 107
  if (!IonModal.views.length) {                                                                                        // 108
    $(window).off('keyup.ionModal');                                                                                   // 109
  }                                                                                                                    // 110
};                                                                                                                     // 111
                                                                                                                       // 112
Template.ionModal.helpers({                                                                                            // 113
  barClass: function () {                                                                                              // 114
    var defaultClasses = ['bar', 'bar-header', 'bar-stable'].join(' ');                                                // 115
    var customClasses = _.isString(this.barClass) ? this.barClass : '';                                                // 116
    return [defaultClasses, customClasses].join(' ');                                                                  // 117
  },                                                                                                                   // 118
                                                                                                                       // 119
  titleClass: function () {                                                                                            // 120
    var classes = ['title'];                                                                                           // 121
                                                                                                                       // 122
    if (Platform.isAndroid()) {                                                                                        // 123
      classes.push('title-left');                                                                                      // 124
    }                                                                                                                  // 125
                                                                                                                       // 126
    return classes.join(' ');                                                                                          // 127
  },                                                                                                                   // 128
                                                                                                                       // 129
  title: function () {                                                                                                 // 130
    return this.title;                                                                                                 // 131
  },                                                                                                                   // 132
                                                                                                                       // 133
  closeText: function () {                                                                                             // 134
    return this.closeText;                                                                                             // 135
  },                                                                                                                   // 136
                                                                                                                       // 137
  animation: function () {                                                                                             // 138
    return this.animation || 'slide-in-up';                                                                            // 139
  },                                                                                                                   // 140
                                                                                                                       // 141
  customTemplate: function () {                                                                                        // 142
    return this.customTemplate;                                                                                        // 143
  },                                                                                                                   // 144
                                                                                                                       // 145
  classes: function () {                                                                                               // 146
    var classes = ['modal'];                                                                                           // 147
                                                                                                                       // 148
    if (this.class) {                                                                                                  // 149
      classes.push(this.class);                                                                                        // 150
    }                                                                                                                  // 151
                                                                                                                       // 152
    return classes.join(' ');                                                                                          // 153
  }                                                                                                                    // 154
                                                                                                                       // 155
});                                                                                                                    // 156
                                                                                                                       // 157
Template.ionModal.events({                                                                                             // 158
  // Handle clicking the backdrop                                                                                      // 159
  'click': function (event, template) {                                                                                // 160
    if ($(event.target).hasClass('modal-backdrop')) {                                                                  // 161
      IonModal.close();                                                                                                // 162
    }                                                                                                                  // 163
  },                                                                                                                   // 164
  'click [data-dismiss=modal]': function (event, template) {                                                           // 165
    var tplName = getElementModalTemplateName(event.currentTarget);                                                    // 166
    IonModal.close(tplName);                                                                                           // 167
  }                                                                                                                    // 168
});                                                                                                                    // 169
                                                                                                                       // 170
var getElementModalTemplateName = function(element) {                                                                  // 171
  var modal = $(element).parents('.modal').get(0);                                                                     // 172
  var modalView = Blaze.getView(modal);                                                                                // 173
  var tplView = Meteor._get(modalView, 'parentView', 'parentView'); // Twice because the parent view is a #with block  // 174
  var tplName = tplView.name.slice('Template.'.length, tplView.name.length);                                           // 175
  return tplName;                                                                                                      // 176
};                                                                                                                     // 177
                                                                                                                       // 178
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4317
}).call(this);                                                       // 4318
                                                                     // 4319
                                                                     // 4320
                                                                     // 4321
                                                                     // 4322
                                                                     // 4323
                                                                     // 4324
(function () {                                                       // 4325
                                                                     // 4326
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionNavBar/template.ionNavBar.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionNavBar");                                                                                     // 2
Template["ionNavBar"] = new Template("Template.ionNavBar", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return [ Spacebars.mustache(view.lookup("classes")), " nav-bar-block nav-bar-transition-", Spacebars.mustache(view.lookup("transition")), " nav-bar-direction-forward" ];
    },                                                                                                                 // 8
    "data-navbar-container": ""                                                                                        // 9
  }, "\n    ", Blaze._TemplateWith(function() {                                                                        // 10
    return "headerButtonLeft";                                                                                         // 11
  }, function() {                                                                                                      // 12
    return Spacebars.include(view.lookupTemplate("yield"));                                                            // 13
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 14
    return "headerTitle";                                                                                              // 15
  }, function() {                                                                                                      // 16
    return Spacebars.include(view.lookupTemplate("yield"));                                                            // 17
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 18
    return "headerButtonRight";                                                                                        // 19
  }, function() {                                                                                                      // 20
    return Spacebars.include(view.lookupTemplate("yield"));                                                            // 21
  }), "\n  ");                                                                                                         // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4358
}).call(this);                                                       // 4359
                                                                     // 4360
                                                                     // 4361
                                                                     // 4362
                                                                     // 4363
                                                                     // 4364
                                                                     // 4365
(function () {                                                       // 4366
                                                                     // 4367
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionNavBar/ionNavBar.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionNavBar.created = function () {                                                                             // 1
  this.data = this.data || {};                                                                                         // 2
                                                                                                                       // 3
  if (Platform.isAndroid()) {                                                                                          // 4
    this.transition = 'android';                                                                                       // 5
  } else {                                                                                                             // 6
    this.transition = 'ios';                                                                                           // 7
  }                                                                                                                    // 8
                                                                                                                       // 9
  // Allow overriding the transition                                                                                   // 10
  if (this.data.transition) {                                                                                          // 11
    this.transition = this.data.transition;                                                                            // 12
  }                                                                                                                    // 13
                                                                                                                       // 14
  if (this.transition === 'ios') {                                                                                     // 15
    this.transitionDuration = 450;                                                                                     // 16
  } else {                                                                                                             // 17
    this.transitionDuration = 200;                                                                                     // 18
  }                                                                                                                    // 19
};                                                                                                                     // 20
                                                                                                                       // 21
Template.ionNavBar.rendered = function () {                                                                            // 22
  Session.set('hasHeader', true);                                                                                      // 23
                                                                                                                       // 24
  IonHeaderBar.alignTitle.call(this);                                                                                  // 25
  IonHeaderBar.positionTitle.call(this);                                                                               // 26
                                                                                                                       // 27
  var template = this;                                                                                                 // 28
  var container = this.find('[data-navbar-container]');                                                                // 29
  container._uihooks = {                                                                                               // 30
    insertElement: function(node, next) {                                                                              // 31
      var $node = $(node);                                                                                             // 32
                                                                                                                       // 33
      if (!$node.hasClass('title') && !$node.hasClass('button') || IonNavigation.skipTransitions) {                    // 34
        container.insertBefore(node, next);                                                                            // 35
        // Changing tabs skips transition animations, but we still want to update the position of the title            // 36
        IonHeaderBar.alignTitle.call(template);                                                                        // 37
        IonHeaderBar.positionTitle.call(template);                                                                     // 38
        return;                                                                                                        // 39
      }                                                                                                                // 40
                                                                                                                       // 41
      if ($node.hasClass('title')) {                                                                                   // 42
        container.insertBefore(node, next);                                                                            // 43
        $node.addClass('title-entering title-stage');                                                                  // 44
                                                                                                                       // 45
        IonHeaderBar.alignTitle.call(template);                                                                        // 46
        IonHeaderBar.positionTitle.call(template);                                                                     // 47
                                                                                                                       // 48
        Meteor.setTimeout(function() {                                                                                 // 49
          $node.removeClass('title-stage').addClass('title-active');                                                   // 50
        }, 16);                                                                                                        // 51
                                                                                                                       // 52
        Meteor.setTimeout(function () {                                                                                // 53
          $(this).removeClass('title-entering');                                                                       // 54
          $('[data-navbar-container]').removeClass('nav-bar-direction-back').addClass('nav-bar-direction-forward');    // 55
        }, template.transitionDuration + 16);                                                                          // 56
      }                                                                                                                // 57
                                                                                                                       // 58
      if ($node.hasClass('button')) {                                                                                  // 59
        container.insertBefore(node, next);                                                                            // 60
        $node.addClass('button-entering button-stage');                                                                // 61
        Meteor.setTimeout(function() {                                                                                 // 62
          $node.removeClass('button-stage').addClass('button-active');                                                 // 63
        }, 16);                                                                                                        // 64
                                                                                                                       // 65
        Meteor.setTimeout(function () {                                                                                // 66
          $(this).removeClass('button-entering');                                                                      // 67
        }, template.transitionDuration + 16);                                                                          // 68
      }                                                                                                                // 69
    },                                                                                                                 // 70
                                                                                                                       // 71
    removeElement: function(node) {                                                                                    // 72
      var $node = $(node);                                                                                             // 73
      if (!$node.hasClass('title') && !$node.hasClass('button') || IonNavigation.skipTransitions) {                    // 74
        $node.remove();                                                                                                // 75
        return;                                                                                                        // 76
      }                                                                                                                // 77
                                                                                                                       // 78
      if ($node.hasClass('title')) {                                                                                   // 79
        $node.addClass('title-leaving title-stage');                                                                   // 80
        Meteor.setTimeout(function() {                                                                                 // 81
          $node.removeClass('title-stage').addClass('title-active');                                                   // 82
        }, 16);                                                                                                        // 83
                                                                                                                       // 84
        Meteor.setTimeout(function () {                                                                                // 85
          $node.remove();                                                                                              // 86
        }, template.transitionDuration + 16);                                                                          // 87
      }                                                                                                                // 88
                                                                                                                       // 89
      if ($node.hasClass('button')) {                                                                                  // 90
        $node.remove();                                                                                                // 91
      }                                                                                                                // 92
    }                                                                                                                  // 93
  };                                                                                                                   // 94
};                                                                                                                     // 95
                                                                                                                       // 96
Template.ionNavBar.destroyed = function () {                                                                           // 97
  Session.set('hasHeader', false);                                                                                     // 98
};                                                                                                                     // 99
                                                                                                                       // 100
Template.ionNavBar.helpers({                                                                                           // 101
  classes: function () {                                                                                               // 102
    var classes = ['bar', 'bar-header'];                                                                               // 103
                                                                                                                       // 104
    if (this.class) {                                                                                                  // 105
      classes.push(this.class);                                                                                        // 106
    } else {                                                                                                           // 107
      classes.push('bar-stable');                                                                                      // 108
    }                                                                                                                  // 109
                                                                                                                       // 110
    return classes.join(' ');                                                                                          // 111
  },                                                                                                                   // 112
                                                                                                                       // 113
  transition: function () {                                                                                            // 114
    return Template.instance().transition;                                                                             // 115
  }                                                                                                                    // 116
});                                                                                                                    // 117
                                                                                                                       // 118
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4493
}).call(this);                                                       // 4494
                                                                     // 4495
                                                                     // 4496
                                                                     // 4497
                                                                     // 4498
                                                                     // 4499
                                                                     // 4500
(function () {                                                       // 4501
                                                                     // 4502
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionNavBackButton/template.ionNavBackButton.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionNavBackButton");                                                                              // 2
Template["ionNavBackButton"] = new Template("Template.ionNavBackButton", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.BUTTON({                                                                                                 // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._TemplateWith(function() {                                                                        // 9
    return {                                                                                                           // 10
      icon: Spacebars.call(view.lookup("icon"))                                                                        // 11
    };                                                                                                                 // 12
  }, function() {                                                                                                      // 13
    return Spacebars.include(view.lookupTemplate("ionIcon"));                                                          // 14
  }), "\n    ", Blaze.Unless(function() {                                                                              // 15
    return Spacebars.call(view.lookup("isAndroid"));                                                                   // 16
  }, function() {                                                                                                      // 17
    return [ "\n      ", HTML.SPAN({                                                                                   // 18
      "class": "back-text"                                                                                             // 19
    }, "\n        ", Blaze.View("lookup:text", function() {                                                            // 20
      return Spacebars.mustache(view.lookup("text"));                                                                  // 21
    }), "\n      "), "\n    " ];                                                                                       // 22
  }), "\n  ");                                                                                                         // 23
}));                                                                                                                   // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4535
}).call(this);                                                       // 4536
                                                                     // 4537
                                                                     // 4538
                                                                     // 4539
                                                                     // 4540
                                                                     // 4541
                                                                     // 4542
(function () {                                                       // 4543
                                                                     // 4544
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionNavBackButton/ionNavBackButton.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonScrollPositions = {};                                                                                               // 1
                                                                                                                       // 2
Router.onStop(function () {                                                                                            // 3
  IonScrollPositions[this.route.path(this.params)] = $('.overflow-scroll').scrollTop();                                // 4
});                                                                                                                    // 5
                                                                                                                       // 6
Template.ionNavBackButton.events({                                                                                     // 7
  'click': function (event, template) {                                                                                // 8
    $('[data-nav-container]').addClass('nav-view-direction-back');                                                     // 9
    $('[data-navbar-container]').addClass('nav-bar-direction-back');                                                   // 10
                                                                                                                       // 11
    //get most up-to-date url, if it exists                                                                            // 12
    backUrl = template.getBackUrl()                                                                                    // 13
    if (backUrl) {                                                                                                     // 14
      Router.go(backUrl);                                                                                              // 15
    } else {                                                                                                           // 16
      window.history.back();                                                                                           // 17
    }                                                                                                                  // 18
  }                                                                                                                    // 19
});                                                                                                                    // 20
                                                                                                                       // 21
Template.ionNavBackButton.created = function () {                                                                      // 22
  this.data = this.data || {};                                                                                         // 23
};                                                                                                                     // 24
                                                                                                                       // 25
Template.ionNavBackButton.rendered = function () {                                                                     // 26
  var self = this;                                                                                                     // 27
  this.getBackUrl = function () {                                                                                      // 28
    var backUrl = null;                                                                                                // 29
                                                                                                                       // 30
    self.data = self.data || {};                                                                                       // 31
                                                                                                                       // 32
    if (self.data.href) {                                                                                              // 33
      backUrl = self.data.href;                                                                                        // 34
    }                                                                                                                  // 35
                                                                                                                       // 36
    if (self.data.path) {                                                                                              // 37
      backRoute = Router.routes[self.data.path]                                                                        // 38
      if (!backRoute) {                                                                                                // 39
        console.warn("back to nonexistent route: ", self.data.path);                                                   // 40
        return;                                                                                                        // 41
      }                                                                                                                // 42
      backUrl = backRoute.path(Template.parentData(1));                                                                // 43
    }                                                                                                                  // 44
    return backUrl;                                                                                                    // 45
  };                                                                                                                   // 46
};                                                                                                                     // 47
                                                                                                                       // 48
Template.ionNavBackButton.helpers({                                                                                    // 49
  classes: function () {                                                                                               // 50
    var classes = ['buttons button button-clear back-button pull-left'];                                               // 51
                                                                                                                       // 52
    if (this.class) {                                                                                                  // 53
      classes.push(this.class);                                                                                        // 54
    }                                                                                                                  // 55
                                                                                                                       // 56
    return classes.join(' ');                                                                                          // 57
  },                                                                                                                   // 58
                                                                                                                       // 59
  icon: function () {                                                                                                  // 60
    if (this.icon) {                                                                                                   // 61
      return this.icon;                                                                                                // 62
    }                                                                                                                  // 63
                                                                                                                       // 64
    if (Platform.isAndroid()) {                                                                                        // 65
      return 'android-arrow-back';                                                                                     // 66
    }                                                                                                                  // 67
                                                                                                                       // 68
    return 'ios-arrow-back';                                                                                           // 69
  },                                                                                                                   // 70
                                                                                                                       // 71
  text: function () {                                                                                                  // 72
    if (this.text) {                                                                                                   // 73
      return this.text;                                                                                                // 74
    } else if(this.text !== false) {                                                                                   // 75
      return 'Back';                                                                                                   // 76
    }                                                                                                                  // 77
  }                                                                                                                    // 78
});                                                                                                                    // 79
                                                                                                                       // 80
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4632
}).call(this);                                                       // 4633
                                                                     // 4634
                                                                     // 4635
                                                                     // 4636
                                                                     // 4637
                                                                     // 4638
                                                                     // 4639
(function () {                                                       // 4640
                                                                     // 4641
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionNavView/template.ionNavView.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionNavView");                                                                                    // 2
Template["ionNavView"] = new Template("Template.ionNavView", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "data-nav-container": "",                                                                                          // 6
    "class": function() {                                                                                              // 7
      return [ "nav-view-transition-", Spacebars.mustache(view.lookup("transition")), " nav-view-direction-forward" ]; // 8
    }                                                                                                                  // 9
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 10
    return Spacebars.include(function() {                                                                              // 11
      return Spacebars.call(view.templateContentBlock);                                                                // 12
    });                                                                                                                // 13
  }), "\n  ");                                                                                                         // 14
}));                                                                                                                   // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4665
}).call(this);                                                       // 4666
                                                                     // 4667
                                                                     // 4668
                                                                     // 4669
                                                                     // 4670
                                                                     // 4671
                                                                     // 4672
(function () {                                                       // 4673
                                                                     // 4674
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionNavView/ionNavView.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonNavigation = {                                                                                                      // 1
  skipTransitions: false                                                                                               // 2
};                                                                                                                     // 3
                                                                                                                       // 4
Template.ionNavView.created = function () {                                                                            // 5
  this.data = this.data || {};                                                                                         // 6
  Session.setDefault('ionNavDirection', 'forward');                                                                    // 7
                                                                                                                       // 8
  if (Platform.isAndroid()) {                                                                                          // 9
    this.transition = 'android';                                                                                       // 10
  } else {                                                                                                             // 11
    this.transition = 'ios';                                                                                           // 12
  }                                                                                                                    // 13
                                                                                                                       // 14
  // Allow overriding the transition                                                                                   // 15
  if (this.data && this.data.transition) {                                                                             // 16
    this.transition = this.data.transition;                                                                            // 17
  }                                                                                                                    // 18
                                                                                                                       // 19
  if (this.transition === 'ios') {                                                                                     // 20
    this.transitionDuration = 450;                                                                                     // 21
  } else {                                                                                                             // 22
    this.transitionDuration = 320;                                                                                     // 23
  }                                                                                                                    // 24
};                                                                                                                     // 25
                                                                                                                       // 26
Template.ionNavView.rendered = function () {                                                                           // 27
  var template = this;                                                                                                 // 28
  var container = this.find('[data-nav-container]');                                                                   // 29
                                                                                                                       // 30
  container._uihooks = {                                                                                               // 31
    insertElement: function(node, next) {                                                                              // 32
      var $node = $(node);                                                                                             // 33
      if (!template.transition || !$node.hasClass('view') || IonNavigation.skipTransitions) {                          // 34
        container.insertBefore(node, next);                                                                            // 35
        return;                                                                                                        // 36
      }                                                                                                                // 37
                                                                                                                       // 38
      $node.addClass('nav-view-entering nav-view-stage');                                                              // 39
      container.insertBefore(node, next);                                                                              // 40
      Meteor.setTimeout(function() {                                                                                   // 41
        $node.removeClass('nav-view-stage').addClass('nav-view-active');                                               // 42
      }, 0);                                                                                                           // 43
                                                                                                                       // 44
      Meteor.setTimeout(function () {                                                                                  // 45
        $(this).removeClass('nav-view-entering');                                                                      // 46
        $('[data-nav-container]').removeClass('nav-view-direction-back').addClass('nav-view-direction-forward');       // 47
      }, template.transitionDuration);                                                                                 // 48
    },                                                                                                                 // 49
                                                                                                                       // 50
    removeElement: function(node) {                                                                                    // 51
      var $node = $(node);                                                                                             // 52
      if (!template.transition || !$node.hasClass('view') || IonNavigation.skipTransitions) {                          // 53
        $node.remove();                                                                                                // 54
        return;                                                                                                        // 55
      }                                                                                                                // 56
                                                                                                                       // 57
      $node.addClass('nav-view-leaving nav-view-stage');                                                               // 58
      Meteor.setTimeout(function() {                                                                                   // 59
        $node.removeClass('nav-view-stage').addClass('nav-view-active');                                               // 60
      }, 0);                                                                                                           // 61
                                                                                                                       // 62
      Meteor.setTimeout(function () {                                                                                  // 63
        $node.remove();                                                                                                // 64
        Session.set('ionNavDirection', 'forward');                                                                     // 65
      }, template.transitionDuration);                                                                                 // 66
    }                                                                                                                  // 67
  };                                                                                                                   // 68
};                                                                                                                     // 69
                                                                                                                       // 70
Template.ionNavView.helpers({                                                                                          // 71
  transition: function () {                                                                                            // 72
    return Template.instance().transition;                                                                             // 73
  }                                                                                                                    // 74
});                                                                                                                    // 75
                                                                                                                       // 76
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4758
}).call(this);                                                       // 4759
                                                                     // 4760
                                                                     // 4761
                                                                     // 4762
                                                                     // 4763
                                                                     // 4764
                                                                     // 4765
(function () {                                                       // 4766
                                                                     // 4767
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionPane/template.ionPane.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionPane");                                                                                       // 2
Template["ionPane"] = new Template("Template.ionPane", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "pane"                                                                                                    // 6
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 7
    return Spacebars.include(function() {                                                                              // 8
      return Spacebars.call(view.templateContentBlock);                                                                // 9
    });                                                                                                                // 10
  }), "\n  ");                                                                                                         // 11
}));                                                                                                                   // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4788
}).call(this);                                                       // 4789
                                                                     // 4790
                                                                     // 4791
                                                                     // 4792
                                                                     // 4793
                                                                     // 4794
                                                                     // 4795
(function () {                                                       // 4796
                                                                     // 4797
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionPane/ionPane.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4806
}).call(this);                                                       // 4807
                                                                     // 4808
                                                                     // 4809
                                                                     // 4810
                                                                     // 4811
                                                                     // 4812
                                                                     // 4813
(function () {                                                       // 4814
                                                                     // 4815
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionPopover/template.ionPopover.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionPopover");                                                                                    // 2
Template["ionPopover"] = new Template("Template.ionPopover", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "popover-backdrop"                                                                                        // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "popover-wrapper"                                                                                         // 8
  }, "\n      ", HTML.DIV({                                                                                            // 9
    "class": "popover"                                                                                                 // 10
  }, "\n        ", HTML.Raw('<div class="popover-arrow"></div>'), "\n        ", Blaze._InOuterTemplateScope(view, function() {
    return Spacebars.include(function() {                                                                              // 12
      return Spacebars.call(view.templateContentBlock);                                                                // 13
    });                                                                                                                // 14
  }), "\n      "), "\n    "), "\n  ");                                                                                 // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4840
}).call(this);                                                       // 4841
                                                                     // 4842
                                                                     // 4843
                                                                     // 4844
                                                                     // 4845
                                                                     // 4846
                                                                     // 4847
(function () {                                                       // 4848
                                                                     // 4849
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionPopover/ionPopover.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
POPOVER_BODY_PADDING = 6;                                                                                              // 1
                                                                                                                       // 2
IonPopover = {                                                                                                         // 3
  show: function (templateName, data, button) {                                                                        // 4
    this.template = Template[templateName];                                                                            // 5
    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));                                    // 6
                                                                                                                       // 7
    var $backdrop = $(this.view.firstNode());                                                                          // 8
    var $popover = $backdrop.find('.popover');                                                                         // 9
    var $button = $(button);                                                                                           // 10
    var $arrow = $backdrop.find('.popover-arrow');                                                                     // 11
                                                                                                                       // 12
    var bodyWidth = $('body').width();                                                                                 // 13
    var bodyHeight = $(window).innerHeight();                                                                          // 14
    var buttonPosition = $button.offset();                                                                             // 15
    var buttonWidth = $button.outerWidth();                                                                            // 16
    var buttonHeight = $button.outerHeight();                                                                          // 17
    var popoverWidth = $popover.outerWidth();                                                                          // 18
    var popoverHeight = $popover.outerHeight();                                                                        // 19
                                                                                                                       // 20
    var popoverCSS = {                                                                                                 // 21
      marginLeft: '0',                                                                                                 // 22
      opacity: 1,                                                                                                      // 23
      left: buttonPosition.left + buttonWidth / 2 - popoverWidth / 2                                                   // 24
    };                                                                                                                 // 25
                                                                                                                       // 26
    if (popoverCSS.left < POPOVER_BODY_PADDING) {                                                                      // 27
      popoverCSS.left = POPOVER_BODY_PADDING;                                                                          // 28
    } else if(popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {                                     // 29
      popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;                                               // 30
    }                                                                                                                  // 31
                                                                                                                       // 32
    if (buttonPosition.top + buttonHeight + popoverHeight > bodyHeight) {                                              // 33
      popoverCSS.top = buttonPosition.top - popoverHeight;                                                             // 34
      $popover.addClass('popover-bottom');                                                                             // 35
    } else {                                                                                                           // 36
      popoverCSS.top = buttonPosition.top + buttonHeight;                                                              // 37
      $popover.removeClass('popover-bottom');                                                                          // 38
    }                                                                                                                  // 39
                                                                                                                       // 40
    $backdrop.addClass('active');                                                                                      // 41
    $arrow.css({                                                                                                       // 42
      left: buttonPosition.left + buttonWidth / 2 - $arrow.outerWidth() / 2 - popoverCSS.left + 'px'                   // 43
    });                                                                                                                // 44
    $popover.css(popoverCSS);                                                                                          // 45
  },                                                                                                                   // 46
                                                                                                                       // 47
  hide: function () {                                                                                                  // 48
    if (typeof this.view !== 'undefined') {                                                                            // 49
      var $backdrop = $(this.view.firstNode());                                                                        // 50
      $backdrop.removeClass('active');                                                                                 // 51
                                                                                                                       // 52
      var $popover = $backdrop.find('.popover');                                                                       // 53
      $popover.css({opacity: 0});                                                                                      // 54
                                                                                                                       // 55
      Blaze.remove(this.view);                                                                                         // 56
    }                                                                                                                  // 57
  }                                                                                                                    // 58
};                                                                                                                     // 59
                                                                                                                       // 60
Template.ionPopover.rendered = function () {                                                                           // 61
  $(window).on('keyup.ionPopover', function(event) {                                                                   // 62
    if (event.which == 27) {                                                                                           // 63
      IonPopover.hide();                                                                                               // 64
    }                                                                                                                  // 65
  });                                                                                                                  // 66
};                                                                                                                     // 67
                                                                                                                       // 68
Template.ionPopover.destroyed = function () {                                                                          // 69
  $(window).off('keyup.ionPopover');                                                                                   // 70
};                                                                                                                     // 71
                                                                                                                       // 72
Template.ionPopover.events({                                                                                           // 73
  // Handle clicking the backdrop                                                                                      // 74
  'click': function (event, template) {                                                                                // 75
    if ($(event.target).hasClass('popover-backdrop')) {                                                                // 76
      IonPopover.hide();                                                                                               // 77
    }                                                                                                                  // 78
  }                                                                                                                    // 79
});                                                                                                                    // 80
                                                                                                                       // 81
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4938
}).call(this);                                                       // 4939
                                                                     // 4940
                                                                     // 4941
                                                                     // 4942
                                                                     // 4943
                                                                     // 4944
                                                                     // 4945
(function () {                                                       // 4946
                                                                     // 4947
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionPopup/template.ionPopup.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionPopup");                                                                                      // 2
Template["ionPopup"] = new Template("Template.ionPopup", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "backdrop"                                                                                                // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "popup-container"                                                                                         // 8
  }, "\n      ", HTML.DIV({                                                                                            // 9
    "class": "popup"                                                                                                   // 10
  }, "\n        ", Blaze.If(function() {                                                                               // 11
    return Spacebars.call(view.lookup("hasHead"));                                                                     // 12
  }, function() {                                                                                                      // 13
    return [ "\n          ", HTML.DIV({                                                                                // 14
      "class": "popup-head"                                                                                            // 15
    }, "\n            ", Blaze.If(function() {                                                                         // 16
      return Spacebars.call(view.lookup("title"));                                                                     // 17
    }, function() {                                                                                                    // 18
      return [ "\n              ", HTML.H3({                                                                           // 19
        "class": "popup-title"                                                                                         // 20
      }, Blaze.View("lookup:title", function() {                                                                       // 21
        return Spacebars.mustache(view.lookup("title"));                                                               // 22
      })), "\n            " ];                                                                                         // 23
    }), "\n            ", Blaze.If(function() {                                                                        // 24
      return Spacebars.call(view.lookup("subTitle"));                                                                  // 25
    }, function() {                                                                                                    // 26
      return [ "\n              ", HTML.H5({                                                                           // 27
        "class": "popup-sub-title"                                                                                     // 28
      }, Blaze.View("lookup:subTitle", function() {                                                                    // 29
        return Spacebars.mustache(view.lookup("subTitle"));                                                            // 30
      })), "\n            " ];                                                                                         // 31
    }), "\n          "), "\n        " ];                                                                               // 32
  }), "\n        ", Blaze.If(function() {                                                                              // 33
    return Spacebars.call(view.lookup("template"));                                                                    // 34
  }, function() {                                                                                                      // 35
    return [ "\n          ", HTML.DIV({                                                                                // 36
      "class": "popup-body"                                                                                            // 37
    }, "\n            ", Blaze.View("lookup:template", function() {                                                    // 38
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("template")));                                           // 39
    }), "\n          "), "\n        " ];                                                                               // 40
  }), "\n        ", Blaze.If(function() {                                                                              // 41
    return Spacebars.call(Spacebars.dot(view.lookup("buttons"), "length"));                                            // 42
  }, function() {                                                                                                      // 43
    return [ "\n          ", HTML.DIV({                                                                                // 44
      "class": "popup-buttons"                                                                                         // 45
    }, "\n            ", Blaze.Each(function() {                                                                       // 46
      return Spacebars.call(view.lookup("buttons"));                                                                   // 47
    }, function() {                                                                                                    // 48
      return [ "\n              ", HTML.BUTTON({                                                                       // 49
        "data-action": "buttonTapped",                                                                                 // 50
        "data-index": function() {                                                                                     // 51
          return Spacebars.mustache(view.lookup("index"));                                                             // 52
        },                                                                                                             // 53
        "class": function() {                                                                                          // 54
          return [ "button ", Spacebars.mustache(view.lookup("type")) ];                                               // 55
        }                                                                                                              // 56
      }, "\n                ", Blaze.View("lookup:text", function() {                                                  // 57
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("text")));                                             // 58
      }), "\n              "), "\n            " ];                                                                     // 59
    }), "\n          "), "\n        " ];                                                                               // 60
  }), "\n      "), "\n    "), "\n  ");                                                                                 // 61
}));                                                                                                                   // 62
                                                                                                                       // 63
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5018
}).call(this);                                                       // 5019
                                                                     // 5020
                                                                     // 5021
                                                                     // 5022
                                                                     // 5023
                                                                     // 5024
                                                                     // 5025
(function () {                                                       // 5026
                                                                     // 5027
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionPopup/ionPopup.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonPopup = {                                                                                                           // 1
  show: function (options) {                                                                                           // 2
    this.template = Template.ionPopup;                                                                                 // 3
    this.buttons = [];                                                                                                 // 4
                                                                                                                       // 5
    for (var i = 0; i < options.buttons.length; i++) {                                                                 // 6
      var button = options.buttons[i];                                                                                 // 7
      this.buttons.push({                                                                                              // 8
        text: button.text,                                                                                             // 9
        type: button.type,                                                                                             // 10
        index: i,                                                                                                      // 11
        onTap: button.onTap                                                                                            // 12
      });                                                                                                              // 13
    }                                                                                                                  // 14
                                                                                                                       // 15
    // Figure out if a template or just a html string was passed                                                       // 16
    var innerTemplate = '';                                                                                            // 17
    if (options.templateName) {                                                                                        // 18
      innerTemplate = Template[options.templateName].renderFunction().value;                                           // 19
    } else if (options.template) {                                                                                     // 20
      innerTemplate = '<span>' + options.template + '</span>';                                                         // 21
    }                                                                                                                  // 22
                                                                                                                       // 23
    var data = {                                                                                                       // 24
      title: options.title,                                                                                            // 25
      subTitle: options.subTitle,                                                                                      // 26
      buttons: this.buttons,                                                                                           // 27
      template: innerTemplate                                                                                          // 28
    };                                                                                                                 // 29
                                                                                                                       // 30
    this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));                                    // 31
    $('body').addClass('popup-open');                                                                                  // 32
                                                                                                                       // 33
    var $backdrop = $(this.view.firstNode());                                                                          // 34
    $backdrop.addClass('visible active');                                                                              // 35
    var $popup = $backdrop.find('.popup-container');                                                                   // 36
    $popup.addClass('popup-showing active');                                                                           // 37
  },                                                                                                                   // 38
                                                                                                                       // 39
  alert: function (options) {                                                                                          // 40
    IonPopup.show({                                                                                                    // 41
      title: options.title,                                                                                            // 42
      subTitle: options.subTitle,                                                                                      // 43
      template: options.template,                                                                                      // 44
      templateName: options.templateName,                                                                              // 45
      buttons: [                                                                                                       // 46
        {                                                                                                              // 47
          text: options.okText ? options.okText : 'Ok',                                                                // 48
          type: options.okType ? options.okType : 'button-positive',                                                   // 49
          onTap: function(event, template) {                                                                           // 50
            if (options.onOk) options.onOk(event, template);                                                           // 51
            return true;                                                                                               // 52
          }                                                                                                            // 53
        }                                                                                                              // 54
      ]                                                                                                                // 55
    });                                                                                                                // 56
  },                                                                                                                   // 57
                                                                                                                       // 58
  confirm: function (options) {                                                                                        // 59
    IonPopup.show({                                                                                                    // 60
      title: options.title,                                                                                            // 61
      subTitle: options.subTitle,                                                                                      // 62
      template: options.template,                                                                                      // 63
      templateName: options.templateName,                                                                              // 64
      buttons: [                                                                                                       // 65
        {                                                                                                              // 66
          text: options.cancelText ? options.cancelText : 'Cancel',                                                    // 67
          type: options.cancelType ? options.cancelType : 'button-default',                                            // 68
          onTap: function (event, template) {                                                                          // 69
            if (options.onCancel) options.onCancel(event, template);                                                   // 70
            return true;                                                                                               // 71
          }                                                                                                            // 72
        },                                                                                                             // 73
        {                                                                                                              // 74
          text: options.okText ? options.okText : 'Ok',                                                                // 75
          type: options.okType ? options.okType : 'button-positive',                                                   // 76
          onTap: function (event, template) {                                                                          // 77
            if (options.onOk) options.onOk(event, template);                                                           // 78
            return true;                                                                                               // 79
          }                                                                                                            // 80
        }                                                                                                              // 81
      ]                                                                                                                // 82
    });                                                                                                                // 83
  },                                                                                                                   // 84
                                                                                                                       // 85
  prompt: function (options) {                                                                                         // 86
                                                                                                                       // 87
    var template = '';                                                                                                 // 88
    if (options.templateName) {                                                                                        // 89
      template = Template[options.templateName].renderFunction().value;                                                // 90
    } else if (options.template) {                                                                                     // 91
      template = '<span class="popup-prompt-text">' + options.template + '</span>';                                    // 92
    }                                                                                                                  // 93
                                                                                                                       // 94
    options.inputType = options.inputType || 'text';                                                                   // 95
    options.inputPlaceholder = options.inputPlaceholder || '';                                                         // 96
    template += '<input type="' + options.inputType + '" placeholder="' +                                              // 97
      options.inputPlaceholder + '" name="prompt" >';                                                                  // 98
                                                                                                                       // 99
    IonPopup.show({                                                                                                    // 100
      title: options.title,                                                                                            // 101
      subTitle: options.subTitle,                                                                                      // 102
      template: template,                                                                                              // 103
      buttons: [                                                                                                       // 104
        {                                                                                                              // 105
          text: options.cancelText ? options.cancelText : 'Cancel',                                                    // 106
          type: options.cancelType ? options.cancelType : 'button-default',                                            // 107
          onTap: function (event, template) {                                                                          // 108
            if (options.onCancel) options.onCancel(event, template);                                                   // 109
            return true;                                                                                               // 110
          }                                                                                                            // 111
        },                                                                                                             // 112
        {                                                                                                              // 113
          text: options.okText ? options.okText : 'Ok',                                                                // 114
          type: options.okType ? options.okType : 'button-positive',                                                   // 115
          onTap: function (event, template) {                                                                          // 116
            var inputVal = $(template.firstNode).find('[name=prompt]').val();                                          // 117
            if (options.onOk) options.onOk(event, inputVal);                                                           // 118
            return true;                                                                                               // 119
          }                                                                                                            // 120
        }                                                                                                              // 121
      ]                                                                                                                // 122
    });                                                                                                                // 123
  },                                                                                                                   // 124
                                                                                                                       // 125
  close: function () {                                                                                                 // 126
    var $popup = this._domrange ? $(this.view.firstNode()).find('.popup-container') : $('.popup-container');           // 127
    $popup.addClass('popup-hidden').removeClass('active');                                                             // 128
                                                                                                                       // 129
    setTimeout(function () {                                                                                           // 130
      $('body').removeClass('popup-open');                                                                             // 131
      $('.backdrop').remove();                                                                                         // 132
      Blaze.remove(this.view);                                                                                         // 133
    }.bind(this), 100);                                                                                                // 134
  },                                                                                                                   // 135
                                                                                                                       // 136
  buttonClicked: function (index, event, template) {                                                                   // 137
    var callback = this.buttons[index].onTap;                                                                          // 138
    if(callback){                                                                                                      // 139
      if (callback(event, template) === true) {                                                                        // 140
        IonPopup.close();                                                                                              // 141
      }                                                                                                                // 142
    }                                                                                                                  // 143
  }                                                                                                                    // 144
};                                                                                                                     // 145
                                                                                                                       // 146
Template.ionPopup.rendered = function () {                                                                             // 147
  $(window).on('keyup.ionPopup', function(event) {                                                                     // 148
    if (event.which == 27) {                                                                                           // 149
      IonPopup.close();                                                                                                // 150
    }                                                                                                                  // 151
  });                                                                                                                  // 152
};                                                                                                                     // 153
                                                                                                                       // 154
Template.ionPopup.destroyed = function () {                                                                            // 155
  $(window).off('keyup.ionPopup');                                                                                     // 156
};                                                                                                                     // 157
                                                                                                                       // 158
Template.ionPopup.events({                                                                                             // 159
  // Handle clicking the backdrop                                                                                      // 160
  'click': function (event, template) {                                                                                // 161
    if ($(event.target).hasClass('popup-container')) {                                                                 // 162
      IonPopup.close();                                                                                                // 163
    }                                                                                                                  // 164
  },                                                                                                                   // 165
                                                                                                                       // 166
  'click [data-index]': function (event, template) {                                                                   // 167
    var index = $(event.target).data('index');                                                                         // 168
    IonPopup.buttonClicked(index, event, template);                                                                    // 169
  }                                                                                                                    // 170
                                                                                                                       // 171
});                                                                                                                    // 172
                                                                                                                       // 173
Template.ionPopup.helpers({                                                                                            // 174
  hasHead: function() {                                                                                                // 175
    return this.title || this.subTitle;                                                                                // 176
  }                                                                                                                    // 177
});                                                                                                                    // 178
                                                                                                                       // 179
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5214
}).call(this);                                                       // 5215
                                                                     // 5216
                                                                     // 5217
                                                                     // 5218
                                                                     // 5219
                                                                     // 5220
                                                                     // 5221
(function () {                                                       // 5222
                                                                     // 5223
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionRadio/template.ionRadio.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionRadio");                                                                                      // 2
Template["ionRadio"] = new Template("Template.ionRadio", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.LABEL({                                                                                                  // 5
    "class": "item item-radio"                                                                                         // 6
  }, "\n    ", HTML.INPUT(HTML.Attrs(function() {                                                                      // 7
    return Spacebars.attrMustache(view.lookup("inputAttrs"));                                                          // 8
  })), "\n    ", HTML.DIV({                                                                                            // 9
    "class": "item-content disable-pointer-events"                                                                     // 10
  }, "\n      ", Blaze._InOuterTemplateScope(view, function() {                                                        // 11
    return Spacebars.include(function() {                                                                              // 12
      return Spacebars.call(view.templateContentBlock);                                                                // 13
    });                                                                                                                // 14
  }), "\n    "), HTML.Raw('\n    <i class="radio-icon disable-pointer-events icon ion-checkmark"></i>\n  '));          // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5248
}).call(this);                                                       // 5249
                                                                     // 5250
                                                                     // 5251
                                                                     // 5252
                                                                     // 5253
                                                                     // 5254
                                                                     // 5255
(function () {                                                       // 5256
                                                                     // 5257
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionRadio/ionRadio.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionRadio.helpers({                                                                                            // 1
  inputAttrs: function () {                                                                                            // 2
    var attrs = {                                                                                                      // 3
      type: 'radio'                                                                                                    // 4
    };                                                                                                                 // 5
                                                                                                                       // 6
    if (this.name) {                                                                                                   // 7
      attrs.name = this.name;                                                                                          // 8
    } else {                                                                                                           // 9
      attrs.name = 'radio-group';                                                                                      // 10
    }                                                                                                                  // 11
                                                                                                                       // 12
    if (this.value) {                                                                                                  // 13
      attrs.value = this.value;                                                                                        // 14
    } else {                                                                                                           // 15
      attrs.value = '';                                                                                                // 16
    }                                                                                                                  // 17
                                                                                                                       // 18
    if (this.disabled) {                                                                                               // 19
      attrs.disabled = true;                                                                                           // 20
    }                                                                                                                  // 21
                                                                                                                       // 22
    if (this.checked) {                                                                                                // 23
      attrs.checked = true;                                                                                            // 24
    }                                                                                                                  // 25
                                                                                                                       // 26
    return attrs;                                                                                                      // 27
  }                                                                                                                    // 28
})                                                                                                                     // 29
                                                                                                                       // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5295
}).call(this);                                                       // 5296
                                                                     // 5297
                                                                     // 5298
                                                                     // 5299
                                                                     // 5300
                                                                     // 5301
                                                                     // 5302
(function () {                                                       // 5303
                                                                     // 5304
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenu/template.ionSideMenu.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSideMenu");                                                                                   // 2
Template["ionSideMenu"] = new Template("Template.ionSideMenu", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5327
}).call(this);                                                       // 5328
                                                                     // 5329
                                                                     // 5330
                                                                     // 5331
                                                                     // 5332
                                                                     // 5333
                                                                     // 5334
(function () {                                                       // 5335
                                                                     // 5336
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenu/ionSideMenu.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSideMenu.helpers({                                                                                         // 1
  classes: function () {                                                                                               // 2
    var classes = ['snap-drawer'];                                                                                     // 3
                                                                                                                       // 4
    if (this.side) {                                                                                                   // 5
      classes.push('menu-' + this.side);                                                                               // 6
      classes.push('snap-drawer-' + this.side);                                                                        // 7
    } else {                                                                                                           // 8
      classes.push('menu-left');                                                                                       // 9
      classes.push('snap-drawer-left');                                                                                // 10
    }                                                                                                                  // 11
                                                                                                                       // 12
    return classes.join(' ');                                                                                          // 13
  }                                                                                                                    // 14
});                                                                                                                    // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5360
}).call(this);                                                       // 5361
                                                                     // 5362
                                                                     // 5363
                                                                     // 5364
                                                                     // 5365
                                                                     // 5366
                                                                     // 5367
(function () {                                                       // 5368
                                                                     // 5369
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenuContainer/template.ionSideMenuContainer.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSideMenuContainer");                                                                          // 2
Template["ionSideMenuContainer"] = new Template("Template.ionSideMenuContainer", (function() {                         // 3
  var view = this;                                                                                                     // 4
  return Blaze._InOuterTemplateScope(view, function() {                                                                // 5
    return Spacebars.include(function() {                                                                              // 6
      return Spacebars.call(view.templateContentBlock);                                                                // 7
    });                                                                                                                // 8
  });                                                                                                                  // 9
}));                                                                                                                   // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5388
}).call(this);                                                       // 5389
                                                                     // 5390
                                                                     // 5391
                                                                     // 5392
                                                                     // 5393
                                                                     // 5394
                                                                     // 5395
(function () {                                                       // 5396
                                                                     // 5397
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenuContainer/ionSideMenuContainer.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
IonSideMenu = {                                                                                                        // 1
  snapper: null                                                                                                        // 2
};                                                                                                                     // 3
                                                                                                                       // 4
Template.ionSideMenuContainer.created = function () {                                                                  // 5
  this.data = this.data || {};                                                                                         // 6
  this.side = this.data.side || 'both';                                                                                // 7
  this.dragContent = true;                                                                                             // 8
  if (typeof this.data.dragContent != 'undefined') {                                                                   // 9
    this.dragContent = this.data.dragContent                                                                           // 10
  }                                                                                                                    // 11
};                                                                                                                     // 12
                                                                                                                       // 13
Template.ionSideMenuContainer.rendered = function () {                                                                 // 14
  $snapperEl = this.$('.snap-content');                                                                                // 15
  if (!$snapperEl) {                                                                                                   // 16
    return;                                                                                                            // 17
  }                                                                                                                    // 18
                                                                                                                       // 19
  var disable;                                                                                                         // 20
  if (this.side == 'both') {                                                                                           // 21
    disable = 'none';                                                                                                  // 22
  }                                                                                                                    // 23
  if (this.side == 'left') {                                                                                           // 24
    disable = 'right';                                                                                                 // 25
  }                                                                                                                    // 26
  if (this.side == 'right') {                                                                                          // 27
    disable = 'left';                                                                                                  // 28
  }                                                                                                                    // 29
                                                                                                                       // 30
  IonSideMenu.snapper = new Snap({                                                                                     // 31
    element: $snapperEl.get(0),                                                                                        // 32
    disable: disable,                                                                                                  // 33
    touchToDrag: this.dragContent                                                                                      // 34
  });                                                                                                                  // 35
};                                                                                                                     // 36
                                                                                                                       // 37
Template.ionSideMenuContainer.destroyed = function () {                                                                // 38
  IonSideMenu.snapper = null;                                                                                          // 39
};                                                                                                                     // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5446
}).call(this);                                                       // 5447
                                                                     // 5448
                                                                     // 5449
                                                                     // 5450
                                                                     // 5451
                                                                     // 5452
                                                                     // 5453
(function () {                                                       // 5454
                                                                     // 5455
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenuContent/template.ionSideMenuContent.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSideMenuContent");                                                                            // 2
Template["ionSideMenuContent"] = new Template("Template.ionSideMenuContent", (function() {                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5478
}).call(this);                                                       // 5479
                                                                     // 5480
                                                                     // 5481
                                                                     // 5482
                                                                     // 5483
                                                                     // 5484
                                                                     // 5485
(function () {                                                       // 5486
                                                                     // 5487
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenuContent/ionSideMenuContent.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSideMenuContent.helpers({                                                                                  // 1
  classes: function () {                                                                                               // 2
    var classes = ['menu-content', 'snap-content', 'pane'];                                                            // 3
    return classes.join(' ');                                                                                          // 4
  }                                                                                                                    // 5
});                                                                                                                    // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5502
}).call(this);                                                       // 5503
                                                                     // 5504
                                                                     // 5505
                                                                     // 5506
                                                                     // 5507
                                                                     // 5508
                                                                     // 5509
(function () {                                                       // 5510
                                                                     // 5511
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenus/template.ionSideMenus.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSideMenus");                                                                                  // 2
Template["ionSideMenus"] = new Template("Template.ionSideMenus", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5534
}).call(this);                                                       // 5535
                                                                     // 5536
                                                                     // 5537
                                                                     // 5538
                                                                     // 5539
                                                                     // 5540
                                                                     // 5541
(function () {                                                       // 5542
                                                                     // 5543
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSideMenus/ionSideMenus.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSideMenus.helpers({                                                                                        // 1
  classes: function () {                                                                                               // 2
    var classes = ['view', 'snap-drawers'];                                                                            // 3
    return classes.join(' ');                                                                                          // 4
  }                                                                                                                    // 5
});                                                                                                                    // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5558
}).call(this);                                                       // 5559
                                                                     // 5560
                                                                     // 5561
                                                                     // 5562
                                                                     // 5563
                                                                     // 5564
                                                                     // 5565
(function () {                                                       // 5566
                                                                     // 5567
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSlideBox/template.ionSlideBox.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSlideBox");                                                                                   // 2
Template["ionSlideBox"] = new Template("Template.ionSlideBox", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "ion-slide-box"                                                                                           // 6
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 7
    return Spacebars.include(function() {                                                                              // 8
      return Spacebars.call(view.templateContentBlock);                                                                // 9
    });                                                                                                                // 10
  }), "\n  ");                                                                                                         // 11
}));                                                                                                                   // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5588
}).call(this);                                                       // 5589
                                                                     // 5590
                                                                     // 5591
                                                                     // 5592
                                                                     // 5593
                                                                     // 5594
                                                                     // 5595
(function () {                                                       // 5596
                                                                     // 5597
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSlideBox/ionSlideBox.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSlideBox.created = function () {                                                                           // 1
  this.data = this.data || {};                                                                                         // 2
  this.doesContinue = this.data.doesContinue || false;                                                                 // 3
  this.autoPlay = this.data.autoPlay || false;                                                                         // 4
  this.slideInterval = this.data.slideInterval || 4000;                                                                // 5
  this.showPager = typeof this.data.showPager != 'undefined' ? this.data.showPager : true;                             // 6
  this.initialSlide = this.data.initialSlide || Session.get('ion-slide-initial-slide') || 0;                           // 7
};                                                                                                                     // 8
                                                                                                                       // 9
Template.ionSlideBox.rendered = function () {                                                                          // 10
  this.$('.ion-slide-box').slick({                                                                                     // 11
    infinite: this.doesContinue,                                                                                       // 12
    autoplay: this.autoPlay,                                                                                           // 13
    autoplaySpeed: this.slideInterval,                                                                                 // 14
    arrows: false,                                                                                                     // 15
    dots: this.showPager,                                                                                              // 16
    dotsClass: 'slider-pager',                                                                                         // 17
    initialSlide: this.initialSlide,                                                                                   // 18
    customPaging: function(slider, i) {                                                                                // 19
      return '<span class="slider-pager-page icon ion-record"></span>';                                                // 20
    }                                                                                                                  // 21
  });                                                                                                                  // 22
  this.$('.ion-slide-box').on('afterChange', function (event, slick, currentSlide) {                                   // 23
    $(this).trigger({type: 'onSlideChanged', index: currentSlide});                                                    // 24
  });                                                                                                                  // 25
};                                                                                                                     // 26
                                                                                                                       // 27
Template.ionSlideBox.destroyed = function () {                                                                         // 28
  var $slideBox = this.$('.ion-slide-box');                                                                            // 29
  if ($slideBox.hasClass('slick-initialized')) $slideBox.slick('unslick');                                             // 30
};                                                                                                                     // 31
                                                                                                                       // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5637
}).call(this);                                                       // 5638
                                                                     // 5639
                                                                     // 5640
                                                                     // 5641
                                                                     // 5642
                                                                     // 5643
                                                                     // 5644
(function () {                                                       // 5645
                                                                     // 5646
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSpinner/template.ionSpinner.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSpinner");                                                                                    // 2
Template["ionSpinner"] = new Template("Template.ionSpinner", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.I({                                                                                                      // 5
    "class": function() {                                                                                              // 6
      return [ "spinner ", Spacebars.mustache(view.lookup("classes")), " ", Spacebars.mustache(view.lookup("icon")) ]; // 7
    }                                                                                                                  // 8
  });                                                                                                                  // 9
}));                                                                                                                   // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 5665
}).call(this);                                                       // 5666
                                                                     // 5667
                                                                     // 5668
                                                                     // 5669
                                                                     // 5670
                                                                     // 5671
                                                                     // 5672
(function () {                                                       // 5673
                                                                     // 5674
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSpinner/ionSpinner.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.ionSpinner.helpers({                                                                                          // 2
  classes: function() {                                                                                                // 3
    classes = [];                                                                                                      // 4
    if (this.class) {                                                                                                  // 5
      var customClasses = this.class.split(' ');                                                                       // 6
      _(customClasses).each(function(customClass) {                                                                    // 7
        classes.push(customClass);                                                                                     // 8
      });                                                                                                              // 9
    }                                                                                                                  // 10
    return classes.join(' ');                                                                                          // 11
  },                                                                                                                   // 12
                                                                                                                       // 13
  icon: function() {                                                                                                   // 14
   iconName = "spinner-" + (this.icon || 'ios');                                                                       // 15
                                                                                                                       // 16
   return iconName;                                                                                                    // 17
  }                                                                                                                    // 18
});                                                                                                                    // 19
                                                                                                                       // 20
// the relevant code for getting the spinner element and assigning the                                                 // 21
// spinner names is in the init function at the bottom of this file.                                                   // 22
// Almost all of the rest of the code is from the ionic version.                                                       // 23
                                                                                                                       // 24
Template.ionSpinner.rendered = function() {                                                                            // 25
                                                                                                                       // 26
                                                                                                                       // 27
  var TRANSLATE32 = 'translate(32,32)';                                                                                // 28
  var STROKE_OPACITY = 'stroke-opacity';                                                                               // 29
  var ROUND = 'round';                                                                                                 // 30
  var INDEFINITE = 'indefinite';                                                                                       // 31
  var DURATION = '750ms';                                                                                              // 32
  var NONE = 'none';                                                                                                   // 33
  var SHORTCUTS = {                                                                                                    // 34
    a: 'animate',                                                                                                      // 35
    an: 'attributeName',                                                                                               // 36
    at: 'animateTransform',                                                                                            // 37
    c: 'circle',                                                                                                       // 38
    da: 'stroke-dasharray',                                                                                            // 39
    os: 'stroke-dashoffset',                                                                                           // 40
    f: 'fill',                                                                                                         // 41
    lc: 'stroke-linecap',                                                                                              // 42
    rc: 'repeatCount',                                                                                                 // 43
    sw: 'stroke-width',                                                                                                // 44
    t: 'transform',                                                                                                    // 45
    v: 'values'                                                                                                        // 46
  };                                                                                                                   // 47
                                                                                                                       // 48
  var SPIN_ANIMATION = {                                                                                               // 49
    v: '0,32,32;360,32,32',                                                                                            // 50
    an: 'transform',                                                                                                   // 51
    type: 'rotate',                                                                                                    // 52
    rc: INDEFINITE,                                                                                                    // 53
    dur: DURATION                                                                                                      // 54
  };                                                                                                                   // 55
                                                                                                                       // 56
  //get icon name and element from blaze template                                                                      // 57
                                                                                                                       // 58
  var iconElement = this.firstNode;                                                                                    // 59
  this.data = this.data || {};                                                                                         // 60
  iconName = this.data.icon || 'ios';                                                                                  // 61
                                                                                                                       // 62
                                                                                                                       // 63
  function createSvgElement(tagName, data, parent, spinnerName) {                                                      // 64
    var ele = document.createElement(SHORTCUTS[tagName] || tagName);                                                   // 65
    var k, x, y;                                                                                                       // 66
    for (k in data) {                                                                                                  // 67
                                                                                                                       // 68
      if (Array.isArray(data[k])) {                                                                                    // 69
        for (x = 0; x < data[k].length; x++) {                                                                         // 70
          if (data[k][x].fn) {                                                                                         // 71
            for (y = 0; y < data[k][x].t; y++) {                                                                       // 72
              createSvgElement(k, data[k][x].fn(y, spinnerName), ele, spinnerName);                                    // 73
            }                                                                                                          // 74
          } else {                                                                                                     // 75
            createSvgElement(k, data[k][x], ele, spinnerName);                                                         // 76
          }                                                                                                            // 77
        }                                                                                                              // 78
                                                                                                                       // 79
      } else {                                                                                                         // 80
        setSvgAttribute(ele, k, data[k]);                                                                              // 81
      }                                                                                                                // 82
    }                                                                                                                  // 83
                                                                                                                       // 84
    parent.appendChild(ele);                                                                                           // 85
  }                                                                                                                    // 86
                                                                                                                       // 87
  function setSvgAttribute(ele, k, v) {                                                                                // 88
    ele.setAttribute(SHORTCUTS[k] || k, v);                                                                            // 89
  }                                                                                                                    // 90
                                                                                                                       // 91
  function animationValues(strValues, i) {                                                                             // 92
    var values = strValues.split(';');                                                                                 // 93
    var back = values.slice(i);                                                                                        // 94
    var front = values.slice(0, values.length - back.length);                                                          // 95
    values = back.concat(front).reverse();                                                                             // 96
    return values.join(';') + ';' + values[0];                                                                         // 97
  }                                                                                                                    // 98
                                                                                                                       // 99
  var IOS_SPINNER = {                                                                                                  // 100
    sw: 4,                                                                                                             // 101
    lc: ROUND,                                                                                                         // 102
    line: [{                                                                                                           // 103
      fn: function(i, spinnerName) {                                                                                   // 104
        return {                                                                                                       // 105
          y1: spinnerName == 'ios' ? 17 : 12,                                                                          // 106
          y2: spinnerName == 'ios' ? 29 : 20,                                                                          // 107
          t: TRANSLATE32 + ' rotate(' + (30 * i + (i < 6 ? 180 : -180)) + ')',                                         // 108
          a: [{                                                                                                        // 109
            fn: function() {                                                                                           // 110
              return {                                                                                                 // 111
                an: STROKE_OPACITY,                                                                                    // 112
                dur: DURATION,                                                                                         // 113
                v: animationValues('0;.1;.15;.25;.35;.45;.55;.65;.7;.85;1', i),                                        // 114
                rc: INDEFINITE                                                                                         // 115
              };                                                                                                       // 116
            },                                                                                                         // 117
            t: 1                                                                                                       // 118
          }]                                                                                                           // 119
        };                                                                                                             // 120
      },                                                                                                               // 121
      t: 12                                                                                                            // 122
    }]                                                                                                                 // 123
  };                                                                                                                   // 124
                                                                                                                       // 125
  var spinners = {                                                                                                     // 126
                                                                                                                       // 127
    android: {                                                                                                         // 128
      c: [{                                                                                                            // 129
        sw: 6,                                                                                                         // 130
        da: 128,                                                                                                       // 131
        os: 82,                                                                                                        // 132
        r: 26,                                                                                                         // 133
        cx: 32,                                                                                                        // 134
        cy: 32,                                                                                                        // 135
        f: NONE                                                                                                        // 136
      }]                                                                                                               // 137
    },                                                                                                                 // 138
                                                                                                                       // 139
    ios: IOS_SPINNER,                                                                                                  // 140
                                                                                                                       // 141
    'ios-small': IOS_SPINNER,                                                                                          // 142
                                                                                                                       // 143
    bubbles: {                                                                                                         // 144
      sw: 0,                                                                                                           // 145
      c: [{                                                                                                            // 146
        fn: function(i) {                                                                                              // 147
          return {                                                                                                     // 148
            cx: 24 * Math.cos(2 * Math.PI * i / 8),                                                                    // 149
            cy: 24 * Math.sin(2 * Math.PI * i / 8),                                                                    // 150
            t: TRANSLATE32,                                                                                            // 151
            a: [{                                                                                                      // 152
              fn: function() {                                                                                         // 153
                return {                                                                                               // 154
                  an: 'r',                                                                                             // 155
                  dur: DURATION,                                                                                       // 156
                  v: animationValues('1;2;3;4;5;6;7;8', i),                                                            // 157
                  rc: INDEFINITE                                                                                       // 158
                };                                                                                                     // 159
              },                                                                                                       // 160
              t: 1                                                                                                     // 161
            }]                                                                                                         // 162
          };                                                                                                           // 163
        },                                                                                                             // 164
        t: 8                                                                                                           // 165
      }]                                                                                                               // 166
    },                                                                                                                 // 167
                                                                                                                       // 168
    circles: {                                                                                                         // 169
                                                                                                                       // 170
      c: [{                                                                                                            // 171
        fn: function(i) {                                                                                              // 172
          return {                                                                                                     // 173
            r: 5,                                                                                                      // 174
            cx: 24 * Math.cos(2 * Math.PI * i / 8),                                                                    // 175
            cy: 24 * Math.sin(2 * Math.PI * i / 8),                                                                    // 176
            t: TRANSLATE32,                                                                                            // 177
            sw: 0,                                                                                                     // 178
            a: [{                                                                                                      // 179
              fn: function() {                                                                                         // 180
                return {                                                                                               // 181
                  an: 'fill-opacity',                                                                                  // 182
                  dur: DURATION,                                                                                       // 183
                  v: animationValues('.3;.3;.3;.4;.7;.85;.9;1', i),                                                    // 184
                  rc: INDEFINITE                                                                                       // 185
                };                                                                                                     // 186
              },                                                                                                       // 187
              t: 1                                                                                                     // 188
            }]                                                                                                         // 189
          };                                                                                                           // 190
        },                                                                                                             // 191
        t: 8                                                                                                           // 192
      }]                                                                                                               // 193
    },                                                                                                                 // 194
                                                                                                                       // 195
    crescent: {                                                                                                        // 196
      c: [{                                                                                                            // 197
        sw: 4,                                                                                                         // 198
        da: 128,                                                                                                       // 199
        os: 82,                                                                                                        // 200
        r: 26,                                                                                                         // 201
        cx: 32,                                                                                                        // 202
        cy: 32,                                                                                                        // 203
        f: NONE,                                                                                                       // 204
        at: [SPIN_ANIMATION]                                                                                           // 205
      }]                                                                                                               // 206
    },                                                                                                                 // 207
                                                                                                                       // 208
    dots: {                                                                                                            // 209
                                                                                                                       // 210
      c: [{                                                                                                            // 211
        fn: function(i) {                                                                                              // 212
          return {                                                                                                     // 213
            cx: 16 + (16 * i),                                                                                         // 214
            cy: 32,                                                                                                    // 215
            sw: 0,                                                                                                     // 216
            a: [{                                                                                                      // 217
              fn: function() {                                                                                         // 218
                return {                                                                                               // 219
                  an: 'fill-opacity',                                                                                  // 220
                  dur: DURATION,                                                                                       // 221
                  v: animationValues('.5;.6;.8;1;.8;.6;.5', i),                                                        // 222
                  rc: INDEFINITE                                                                                       // 223
                };                                                                                                     // 224
              },                                                                                                       // 225
              t: 1                                                                                                     // 226
            }, {                                                                                                       // 227
              fn: function() {                                                                                         // 228
                return {                                                                                               // 229
                  an: 'r',                                                                                             // 230
                  dur: DURATION,                                                                                       // 231
                  v: animationValues('4;5;6;5;4;3;3', i),                                                              // 232
                  rc: INDEFINITE                                                                                       // 233
                };                                                                                                     // 234
              },                                                                                                       // 235
              t: 1                                                                                                     // 236
            }]                                                                                                         // 237
          };                                                                                                           // 238
        },                                                                                                             // 239
        t: 3                                                                                                           // 240
      }]                                                                                                               // 241
    },                                                                                                                 // 242
                                                                                                                       // 243
    lines: {                                                                                                           // 244
      sw: 7,                                                                                                           // 245
      lc: ROUND,                                                                                                       // 246
      line: [{                                                                                                         // 247
        fn: function(i) {                                                                                              // 248
          return {                                                                                                     // 249
            x1: 10 + (i * 14),                                                                                         // 250
            x2: 10 + (i * 14),                                                                                         // 251
            a: [{                                                                                                      // 252
              fn: function() {                                                                                         // 253
                return {                                                                                               // 254
                  an: 'y1',                                                                                            // 255
                  dur: DURATION,                                                                                       // 256
                  v: animationValues('16;18;28;18;16', i),                                                             // 257
                  rc: INDEFINITE                                                                                       // 258
                };                                                                                                     // 259
              },                                                                                                       // 260
              t: 1                                                                                                     // 261
            }, {                                                                                                       // 262
              fn: function() {                                                                                         // 263
                return {                                                                                               // 264
                  an: 'y2',                                                                                            // 265
                  dur: DURATION,                                                                                       // 266
                  v: animationValues('48;44;36;46;48', i),                                                             // 267
                  rc: INDEFINITE                                                                                       // 268
                };                                                                                                     // 269
              },                                                                                                       // 270
              t: 1                                                                                                     // 271
            }, {                                                                                                       // 272
              fn: function() {                                                                                         // 273
                return {                                                                                               // 274
                  an: STROKE_OPACITY,                                                                                  // 275
                  dur: DURATION,                                                                                       // 276
                  v: animationValues('1;.8;.5;.4;1', i),                                                               // 277
                  rc: INDEFINITE                                                                                       // 278
                };                                                                                                     // 279
              },                                                                                                       // 280
              t: 1                                                                                                     // 281
            }]                                                                                                         // 282
          };                                                                                                           // 283
        },                                                                                                             // 284
        t: 4                                                                                                           // 285
      }]                                                                                                               // 286
    },                                                                                                                 // 287
                                                                                                                       // 288
    ripple: {                                                                                                          // 289
      f: NONE,                                                                                                         // 290
      'fill-rule': 'evenodd',                                                                                          // 291
      sw: 3,                                                                                                           // 292
      circle: [{                                                                                                       // 293
        fn: function(i) {                                                                                              // 294
          return {                                                                                                     // 295
            cx: 32,                                                                                                    // 296
            cy: 32,                                                                                                    // 297
            a: [{                                                                                                      // 298
              fn: function() {                                                                                         // 299
                return {                                                                                               // 300
                  an: 'r',                                                                                             // 301
                  begin: (i * -1) + 's',                                                                               // 302
                  dur: '2s',                                                                                           // 303
                  v: '0;24',                                                                                           // 304
                  keyTimes: '0;1',                                                                                     // 305
                  keySplines: '0.1,0.2,0.3,1',                                                                         // 306
                  calcMode: 'spline',                                                                                  // 307
                  rc: INDEFINITE                                                                                       // 308
                };                                                                                                     // 309
              },                                                                                                       // 310
              t: 1                                                                                                     // 311
            }, {                                                                                                       // 312
              fn: function() {                                                                                         // 313
                return {                                                                                               // 314
                  an: STROKE_OPACITY,                                                                                  // 315
                  begin: (i * -1) + 's',                                                                               // 316
                  dur: '2s',                                                                                           // 317
                  v: '.2;1;.2;0',                                                                                      // 318
                  rc: INDEFINITE                                                                                       // 319
                };                                                                                                     // 320
              },                                                                                                       // 321
              t: 1                                                                                                     // 322
            }]                                                                                                         // 323
          };                                                                                                           // 324
        },                                                                                                             // 325
        t: 2                                                                                                           // 326
      }]                                                                                                               // 327
    },                                                                                                                 // 328
                                                                                                                       // 329
    spiral: {                                                                                                          // 330
      defs: [{                                                                                                         // 331
        linearGradient: [{                                                                                             // 332
          id: 'sGD',                                                                                                   // 333
          gradientUnits: 'userSpaceOnUse',                                                                             // 334
          x1: 55,                                                                                                      // 335
          y1: 46,                                                                                                      // 336
          x2: 2,                                                                                                       // 337
          y2: 46,                                                                                                      // 338
          stop: [{                                                                                                     // 339
            offset: 0.1,                                                                                               // 340
            class: 'stop1'                                                                                             // 341
          }, {                                                                                                         // 342
            offset: 1,                                                                                                 // 343
            class: 'stop2'                                                                                             // 344
          }]                                                                                                           // 345
        }]                                                                                                             // 346
      }],                                                                                                              // 347
      g: [{                                                                                                            // 348
        sw: 4,                                                                                                         // 349
        lc: ROUND,                                                                                                     // 350
        f: NONE,                                                                                                       // 351
        path: [{                                                                                                       // 352
          stroke: 'url(#sGD)',                                                                                         // 353
          d: 'M4,32 c0,15,12,28,28,28c8,0,16-4,21-9'                                                                   // 354
        }, {                                                                                                           // 355
          d: 'M60,32 C60,16,47.464,4,32,4S4,16,4,32'                                                                   // 356
        }],                                                                                                            // 357
        at: [SPIN_ANIMATION]                                                                                           // 358
      }]                                                                                                               // 359
    }                                                                                                                  // 360
                                                                                                                       // 361
  };                                                                                                                   // 362
                                                                                                                       // 363
  var animations = {                                                                                                   // 364
                                                                                                                       // 365
    android: function(ele) {                                                                                           // 366
                                                                                                                       // 367
      var rIndex = 0;                                                                                                  // 368
      var rotateCircle = 0;                                                                                            // 369
      var startTime;                                                                                                   // 370
      var svgEle = ele.querySelector('g');                                                                             // 371
      var circleEle = ele.querySelector('circle');                                                                     // 372
                                                                                                                       // 373
      function run() {                                                                                                 // 374
        var v = easeInOutCubic(Date.now() - startTime, 650);                                                           // 375
        var scaleX = 1;                                                                                                // 376
        var translateX = 0;                                                                                            // 377
        var dasharray = (188 - (58 * v));                                                                              // 378
        var dashoffset = (182 - (182 * v));                                                                            // 379
                                                                                                                       // 380
        if (rIndex % 2) {                                                                                              // 381
          scaleX = -1;                                                                                                 // 382
          translateX = -64;                                                                                            // 383
          dasharray = (128 - (-58 * v));                                                                               // 384
          dashoffset = (182 * v);                                                                                      // 385
        }                                                                                                              // 386
                                                                                                                       // 387
        var rotateLine = [0, -101, -90, -11, -180, 79, -270, -191][rIndex];                                            // 388
                                                                                                                       // 389
        setSvgAttribute(circleEle, 'da', Math.max(Math.min(dasharray, 188), 128));                                     // 390
        setSvgAttribute(circleEle, 'os', Math.max(Math.min(dashoffset, 182), 0));                                      // 391
        setSvgAttribute(circleEle, 't', 'scale(' + scaleX + ',1) translate(' + translateX + ',0) rotate(' + rotateLine + ',32,32)');
                                                                                                                       // 393
        rotateCircle += 4.1;                                                                                           // 394
        if (rotateCircle > 359) rotateCircle = 0;                                                                      // 395
        setSvgAttribute(svgEle, 't', 'rotate(' + rotateCircle + ',32,32)');                                            // 396
                                                                                                                       // 397
        if (v >= 1) {                                                                                                  // 398
          rIndex++;                                                                                                    // 399
          if (rIndex > 7) rIndex = 0;                                                                                  // 400
          startTime = Date.now();                                                                                      // 401
        }                                                                                                              // 402
                                                                                                                       // 403
        window.requestAnimationFrame(run);                                                                             // 404
      }                                                                                                                // 405
                                                                                                                       // 406
      return function() {                                                                                              // 407
        startTime = Date.now();                                                                                        // 408
        run();                                                                                                         // 409
      };                                                                                                               // 410
                                                                                                                       // 411
    }                                                                                                                  // 412
                                                                                                                       // 413
  };                                                                                                                   // 414
                                                                                                                       // 415
  function easeInOutCubic(t, c) {                                                                                      // 416
    t /= c / 2;                                                                                                        // 417
    if (t < 1) return 1 / 2 * t * t * t;                                                                               // 418
    t -= 2;                                                                                                            // 419
    return 1 / 2 * (t * t * t + 2);                                                                                    // 420
  }                                                                                                                    // 421
                                                                                                                       // 422
  init();                                                                                                              // 423
                                                                                                                       // 424
  function init() {                                                                                                    // 425
                                                                                                                       // 426
    var spinnerName = iconName;                                                                                        // 427
    var $element = $(iconElement);                                                                                     // 428
    var container = iconElement;                                                                                       // 429
    createSvgElement('svg', {                                                                                          // 430
      viewBox: '0 0 64 64',                                                                                            // 431
      g: [spinners[spinnerName]]                                                                                       // 432
    }, container, spinnerName);                                                                                        // 433
                                                                                                                       // 434
    // Specifically for animations to work,                                                                            // 435
    // Android 4.3 and below requires the element to be                                                                // 436
    // added as an html string, rather than dynmically                                                                 // 437
    // building up the svg element and appending it.                                                                   // 438
    $element.html(container.innerHTML);                                                                                // 439
                                                                                                                       // 440
    start(spinnerName, $element);                                                                                      // 441
                                                                                                                       // 442
  };                                                                                                                   // 443
                                                                                                                       // 444
  function start(spinnerName, ele) {                                                                                   // 445
    animations[spinnerName] && animations[spinnerName](ele[0])();                                                      // 446
  };                                                                                                                   // 447
                                                                                                                       // 448
                                                                                                                       // 449
}                                                                                                                      // 450
                                                                                                                       // 451
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6133
}).call(this);                                                       // 6134
                                                                     // 6135
                                                                     // 6136
                                                                     // 6137
                                                                     // 6138
                                                                     // 6139
                                                                     // 6140
(function () {                                                       // 6141
                                                                     // 6142
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSlide/template.ionSlide.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSlide");                                                                                      // 2
Template["ionSlide"] = new Template("Template.ionSlide", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6165
}).call(this);                                                       // 6166
                                                                     // 6167
                                                                     // 6168
                                                                     // 6169
                                                                     // 6170
                                                                     // 6171
                                                                     // 6172
(function () {                                                       // 6173
                                                                     // 6174
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSlide/ionSlide.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSlide.helpers({                                                                                            // 1
  classes: function () {                                                                                               // 2
    var classes = ['ion-slide'];                                                                                       // 3
                                                                                                                       // 4
    if (this.class) {                                                                                                  // 5
      classes.push(this.class);                                                                                        // 6
    }                                                                                                                  // 7
                                                                                                                       // 8
    return classes.join(' ');                                                                                          // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
                                                                                                                       // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6194
}).call(this);                                                       // 6195
                                                                     // 6196
                                                                     // 6197
                                                                     // 6198
                                                                     // 6199
                                                                     // 6200
                                                                     // 6201
(function () {                                                       // 6202
                                                                     // 6203
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSubfooterBar/template.ionSubfooterBar.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSubfooterBar");                                                                               // 2
Template["ionSubfooterBar"] = new Template("Template.ionSubfooterBar", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6226
}).call(this);                                                       // 6227
                                                                     // 6228
                                                                     // 6229
                                                                     // 6230
                                                                     // 6231
                                                                     // 6232
                                                                     // 6233
(function () {                                                       // 6234
                                                                     // 6235
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSubfooterBar/ionSubfooterBar.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSubfooterBar.rendered = function () {                                                                      // 1
  Session.set('hasSubfooter', true);                                                                                   // 2
};                                                                                                                     // 3
                                                                                                                       // 4
Template.ionSubfooterBar.destroyed = function () {                                                                     // 5
  Session.set('hasSubfooter', false);                                                                                  // 6
};                                                                                                                     // 7
                                                                                                                       // 8
Template.ionSubfooterBar.helpers({                                                                                     // 9
  classes: function () {                                                                                               // 10
    var classes = ['bar', 'bar-subfooter'];                                                                            // 11
                                                                                                                       // 12
    if (this.class) {                                                                                                  // 13
      classes.push(this.class);                                                                                        // 14
    } else {                                                                                                           // 15
      classes.push('bar-stable');                                                                                      // 16
    }                                                                                                                  // 17
                                                                                                                       // 18
    return classes.join(' ');                                                                                          // 19
  }                                                                                                                    // 20
});                                                                                                                    // 21
                                                                                                                       // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6265
}).call(this);                                                       // 6266
                                                                     // 6267
                                                                     // 6268
                                                                     // 6269
                                                                     // 6270
                                                                     // 6271
                                                                     // 6272
(function () {                                                       // 6273
                                                                     // 6274
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSubheaderBar/template.ionSubheaderBar.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionSubheaderBar");                                                                               // 2
Template["ionSubheaderBar"] = new Template("Template.ionSubheaderBar", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 9
    return Spacebars.include(function() {                                                                              // 10
      return Spacebars.call(view.templateContentBlock);                                                                // 11
    });                                                                                                                // 12
  }), "\n  ");                                                                                                         // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6297
}).call(this);                                                       // 6298
                                                                     // 6299
                                                                     // 6300
                                                                     // 6301
                                                                     // 6302
                                                                     // 6303
                                                                     // 6304
(function () {                                                       // 6305
                                                                     // 6306
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionSubheaderBar/ionSubheaderBar.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionSubheaderBar.rendered = function () {                                                                      // 1
  Session.set('hasSubheader', true);                                                                                   // 2
};                                                                                                                     // 3
                                                                                                                       // 4
Template.ionSubheaderBar.destroyed = function () {                                                                     // 5
  Session.set('hasSubheader', false);                                                                                  // 6
};                                                                                                                     // 7
                                                                                                                       // 8
Template.ionSubheaderBar.helpers({                                                                                     // 9
  classes: function () {                                                                                               // 10
    var classes = ['bar', 'bar-subheader'];                                                                            // 11
                                                                                                                       // 12
    if (this.class) {                                                                                                  // 13
      classes.push(this.class);                                                                                        // 14
    } else {                                                                                                           // 15
      classes.push('bar-stable');                                                                                      // 16
    }                                                                                                                  // 17
                                                                                                                       // 18
    if (Session.get('hasTabsTop')) {                                                                                   // 19
      classes.push('has-tabs-top');                                                                                    // 20
    }                                                                                                                  // 21
                                                                                                                       // 22
    return classes.join(' ');                                                                                          // 23
  }                                                                                                                    // 24
});                                                                                                                    // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6340
}).call(this);                                                       // 6341
                                                                     // 6342
                                                                     // 6343
                                                                     // 6344
                                                                     // 6345
                                                                     // 6346
                                                                     // 6347
(function () {                                                       // 6348
                                                                     // 6349
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionTabs/template.ionTabs.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionTabs");                                                                                       // 2
Template["ionTabs"] = new Template("Template.ionTabs", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("classes"));                                                               // 7
    }                                                                                                                  // 8
  }, "\n    ", HTML.DIV({                                                                                              // 9
    "class": "tabs"                                                                                                    // 10
  }, "\n      ", Blaze._InOuterTemplateScope(view, function() {                                                        // 11
    return Spacebars.include(function() {                                                                              // 12
      return Spacebars.call(view.templateContentBlock);                                                                // 13
    });                                                                                                                // 14
  }), "\n    "), "\n  ");                                                                                              // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6374
}).call(this);                                                       // 6375
                                                                     // 6376
                                                                     // 6377
                                                                     // 6378
                                                                     // 6379
                                                                     // 6380
                                                                     // 6381
(function () {                                                       // 6382
                                                                     // 6383
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionTabs/ionTabs.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionTabs.created = function () {                                                                               // 1
  this.data = this.data || {};                                                                                         // 2
};                                                                                                                     // 3
                                                                                                                       // 4
Template.ionTabs.rendered = function () {                                                                              // 5
  if ((this.data.class && this.data.class.indexOf('tabs-top') > -1) || this.data.style === 'android' || ( !this.data.style && Platform.isAndroid())) {
    Session.set('hasTabsTop', true);                                                                                   // 7
  } else {                                                                                                             // 8
    Session.set('hasTabs', true);                                                                                      // 9
  }                                                                                                                    // 10
                                                                                                                       // 11
  this.$('.tabs').children().each(function() {                                                                         // 12
    var href = $(this).attr('href');                                                                                   // 13
    var current = Router.current().location.get().path;                                                                // 14
    if(href === current){                                                                                              // 15
      Session.set('ionTab.current', href);                                                                             // 16
    }                                                                                                                  // 17
  });                                                                                                                  // 18
};                                                                                                                     // 19
                                                                                                                       // 20
Template.ionTabs.destroyed = function () {                                                                             // 21
  Session.set('hasTabs', false);                                                                                       // 22
  Session.set('hasTabsTop', false);                                                                                    // 23
};                                                                                                                     // 24
                                                                                                                       // 25
Template.ionTabs.helpers({                                                                                             // 26
  classes: function () {                                                                                               // 27
    var classes = [];                                                                                                  // 28
                                                                                                                       // 29
    if (this.class) {                                                                                                  // 30
      classes.push(this.class);                                                                                        // 31
    }                                                                                                                  // 32
                                                                                                                       // 33
    if (this.style === 'android' || ( !this.style && Platform.isAndroid()) ) {                                         // 34
      classes.push('tabs-top tabs-striped tabs-icon-left');                                                            // 35
    }                                                                                                                  // 36
                                                                                                                       // 37
    if (this.style === 'ios' || ( !this.style && Platform.isIOS()) ) {                                                 // 38
      classes.push('tabs-icon-top');                                                                                   // 39
    }                                                                                                                  // 40
                                                                                                                       // 41
    return classes.join(' ');                                                                                          // 42
  }                                                                                                                    // 43
});                                                                                                                    // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6436
}).call(this);                                                       // 6437
                                                                     // 6438
                                                                     // 6439
                                                                     // 6440
                                                                     // 6441
                                                                     // 6442
                                                                     // 6443
(function () {                                                       // 6444
                                                                     // 6445
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionTab/template.ionTab.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionTab");                                                                                        // 2
Template["ionTab"] = new Template("Template.ionTab", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.A({                                                                                                      // 5
    "class": function() {                                                                                              // 6
      return [ Spacebars.mustache(view.lookup("classes")), " ", Spacebars.mustache(view.lookup("isActive")) ];         // 7
    },                                                                                                                 // 8
    href: function() {                                                                                                 // 9
      return Spacebars.mustache(view.lookup("url"));                                                                   // 10
    },                                                                                                                 // 11
    "data-ion-tab": ""                                                                                                 // 12
  }, "\n    ", Blaze.If(function() {                                                                                   // 13
    return Spacebars.call(view.lookup("defaultIcon"));                                                                 // 14
  }, function() {                                                                                                      // 15
    return [ "\n      ", Blaze.If(function() {                                                                         // 16
      return Spacebars.call(view.lookup("isActive"));                                                                  // 17
    }, function() {                                                                                                    // 18
      return [ "\n        ", Blaze._TemplateWith(function() {                                                          // 19
        return {                                                                                                       // 20
          icon: Spacebars.call(view.lookup("activeIcon"))                                                              // 21
        };                                                                                                             // 22
      }, function() {                                                                                                  // 23
        return Spacebars.include(view.lookupTemplate("ionIcon"));                                                      // 24
      }), "\n      " ];                                                                                                // 25
    }, function() {                                                                                                    // 26
      return [ "\n        ", Blaze._TemplateWith(function() {                                                          // 27
        return {                                                                                                       // 28
          icon: Spacebars.call(view.lookup("defaultIcon"))                                                             // 29
        };                                                                                                             // 30
      }, function() {                                                                                                  // 31
        return Spacebars.include(view.lookupTemplate("ionIcon"));                                                      // 32
      }), "\n      " ];                                                                                                // 33
    }), "\n    " ];                                                                                                    // 34
  }), "\n\n    ", Blaze.View("lookup:title", function() {                                                              // 35
    return Spacebars.mustache(view.lookup("title"));                                                                   // 36
  }), "\n\n    ", Blaze.If(function() {                                                                                // 37
    return Spacebars.call(view.lookup("badgeNumber"));                                                                 // 38
  }, function() {                                                                                                      // 39
    return [ "\n      ", HTML.DIV({                                                                                    // 40
      "class": function() {                                                                                            // 41
        return [ "badge badge-", Spacebars.mustache(view.lookup("badgeColor")) ];                                      // 42
      }                                                                                                                // 43
    }, "\n        ", Blaze.View("lookup:badgeNumber", function() {                                                     // 44
      return Spacebars.mustache(view.lookup("badgeNumber"));                                                           // 45
    }), "\n      "), "\n    " ];                                                                                       // 46
  }), "\n  ");                                                                                                         // 47
}));                                                                                                                   // 48
                                                                                                                       // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6502
}).call(this);                                                       // 6503
                                                                     // 6504
                                                                     // 6505
                                                                     // 6506
                                                                     // 6507
                                                                     // 6508
                                                                     // 6509
(function () {                                                       // 6510
                                                                     // 6511
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionTab/ionTab.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionTab.events({                                                                                               // 1
  'click': function (event, template) {                                                                                // 2
    if (template.data.path) {                                                                                          // 3
      Session.set('ionTab.current', template.data.path);                                                               // 4
    }                                                                                                                  // 5
                                                                                                                       // 6
    // If the tab's content is being rendered inside of a ionNavView                                                   // 7
    // we don't want to slide it in when switching tabs                                                                // 8
    IonNavigation.skipTransitions = true;                                                                              // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
                                                                                                                       // 12
Template.ionTab.helpers({                                                                                              // 13
  classes: function () {                                                                                               // 14
    var classes = ['tab-item'];                                                                                        // 15
    if (this.class) {                                                                                                  // 16
      classes.push(this.class);                                                                                        // 17
    }                                                                                                                  // 18
    if (this.badgeNumber) {                                                                                            // 19
      classes.push('has-badge');                                                                                       // 20
    }                                                                                                                  // 21
    return classes.join(' ');                                                                                          // 22
  },                                                                                                                   // 23
                                                                                                                       // 24
  url: function () {                                                                                                   // 25
    if (this.href) {                                                                                                   // 26
      return this.href;                                                                                                // 27
    }                                                                                                                  // 28
                                                                                                                       // 29
    if (this.path && Router.routes[this.path]) {                                                                       // 30
      return Router.routes[this.path].path(Template.currentData());                                                    // 31
    }                                                                                                                  // 32
  },                                                                                                                   // 33
                                                                                                                       // 34
  isActive: function () {                                                                                              // 35
    var ionTabCurrent = Session.get('ionTab.current');                                                                 // 36
                                                                                                                       // 37
    if (this.path && this.path === ionTabCurrent) {                                                                    // 38
      return 'active';                                                                                                 // 39
    }                                                                                                                  // 40
                                                                                                                       // 41
    // The initial case where there is no localStorage value and                                                       // 42
    // no session variable has been set, this attempts to set the correct tab                                          // 43
    // to active based on the router                                                                                   // 44
    var route = Router.routes[this.path];                                                                              // 45
    if(route && route.path(Template.currentData()) === ionTabCurrent){                                                 // 46
      return 'active';                                                                                                 // 47
    }                                                                                                                  // 48
  },                                                                                                                   // 49
                                                                                                                       // 50
  activeIcon: function () {                                                                                            // 51
    if (this.iconOn) {                                                                                                 // 52
      return this.iconOn;                                                                                              // 53
    } else {                                                                                                           // 54
      return this.icon;                                                                                                // 55
    }                                                                                                                  // 56
  },                                                                                                                   // 57
                                                                                                                       // 58
  defaultIcon: function () {                                                                                           // 59
    if (this.iconOff) {                                                                                                // 60
      return this.iconOff;                                                                                             // 61
    } else {                                                                                                           // 62
      return this.icon;                                                                                                // 63
    }                                                                                                                  // 64
  },                                                                                                                   // 65
                                                                                                                       // 66
  badgeNumber: function () {                                                                                           // 67
    return this.badgeNumber;                                                                                           // 68
  },                                                                                                                   // 69
                                                                                                                       // 70
  badgeColor: function () {                                                                                            // 71
    return this.badgeColor||'assertive';                                                                               // 72
  }                                                                                                                    // 73
});                                                                                                                    // 74
                                                                                                                       // 75
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6594
}).call(this);                                                       // 6595
                                                                     // 6596
                                                                     // 6597
                                                                     // 6598
                                                                     // 6599
                                                                     // 6600
                                                                     // 6601
(function () {                                                       // 6602
                                                                     // 6603
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionView/template.ionView.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("ionView");                                                                                       // 2
Template["ionView"] = new Template("Template.ionView", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return [ Blaze.If(function() {                                                                                       // 5
    return Spacebars.call(view.lookup("title"));                                                                       // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", Blaze._TemplateWith(function() {                                                                // 8
      return "headerTitle";                                                                                            // 9
    }, function() {                                                                                                    // 10
      return Spacebars.include(view.lookupTemplate("contentFor"), function() {                                         // 11
        return [ "\n      ", HTML.H1({                                                                                 // 12
          "class": "title"                                                                                             // 13
        }, Blaze.View("lookup:title", function() {                                                                     // 14
          return Spacebars.mustache(view.lookup("title"));                                                             // 15
        })), "\n    " ];                                                                                               // 16
      });                                                                                                              // 17
    }), "\n  " ];                                                                                                      // 18
  }), "\n\n  ", HTML.DIV({                                                                                             // 19
    "class": function() {                                                                                              // 20
      return Spacebars.mustache(view.lookup("classes"));                                                               // 21
    }                                                                                                                  // 22
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                          // 23
    return Spacebars.include(function() {                                                                              // 24
      return Spacebars.call(view.templateContentBlock);                                                                // 25
    });                                                                                                                // 26
  }), "\n  ") ];                                                                                                       // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6640
}).call(this);                                                       // 6641
                                                                     // 6642
                                                                     // 6643
                                                                     // 6644
                                                                     // 6645
                                                                     // 6646
                                                                     // 6647
(function () {                                                       // 6648
                                                                     // 6649
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteoric:ionic/components/ionView/ionView.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.ionView.rendered = function () {                                                                              // 1
  // Reset our transition preference                                                                                   // 2
  IonNavigation.skipTransitions = false;                                                                               // 3
                                                                                                                       // 4
  // Reset our scroll position                                                                                         // 5
  var routePath = Router.current().route.path(Router.current().params);                                                // 6
  if(IonScrollPositions[routePath]) {                                                                                  // 7
    $('.overflow-scroll').not('.nav-view-leaving .overflow-scroll').scrollTop(IonScrollPositions[routePath]);          // 8
    delete IonScrollPositions[routePath];                                                                              // 9
  }                                                                                                                    // 10
};                                                                                                                     // 11
                                                                                                                       // 12
Template.ionView.helpers({                                                                                             // 13
  classes: function () {                                                                                               // 14
    var classes = ['view'];                                                                                            // 15
                                                                                                                       // 16
    if (this.class) {                                                                                                  // 17
      classes.push(this.class);                                                                                        // 18
    }                                                                                                                  // 19
                                                                                                                       // 20
    return classes.join(' ');                                                                                          // 21
  },                                                                                                                   // 22
  title: function () {                                                                                                 // 23
    if ( Template.instance().data && Template.instance().data.title ) {                                                // 24
      return Template.instance().data.title;                                                                           // 25
    }                                                                                                                  // 26
  }                                                                                                                    // 27
});                                                                                                                    // 28
                                                                                                                       // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 6686
}).call(this);                                                       // 6687
                                                                     // 6688
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteoric:ionic'] = {
  Platform: Platform,
  IonActionSheet: IonActionSheet,
  IonBackdrop: IonBackdrop,
  IonHeaderBar: IonHeaderBar,
  IonKeyboard: IonKeyboard,
  IonLoading: IonLoading,
  IonModal: IonModal,
  IonNavigation: IonNavigation,
  IonPopover: IonPopover,
  IonPopup: IonPopup,
  IonSideMenu: IonSideMenu
};

})();
