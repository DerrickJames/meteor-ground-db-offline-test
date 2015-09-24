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

/* Package-scope variables */
var Dictionary;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/ground_dictionary/packages/ground_dictionary.js                                              //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
(function () {                                                                                           // 1
                                                                                                         // 2
////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                //     // 4
// packages/ground:dictionary/dictionary.js                                                       //     // 5
//                                                                                                //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                  //     // 8
var _splice = function(array, begin) {                                                            // 1   // 9
  var result = [];                                                                                // 2   // 10
                                                                                                  // 3   // 11
  begin = begin || 0;                                                                             // 4   // 12
                                                                                                  // 5   // 13
  // Add the ones we need                                                                         // 6   // 14
  for (var i = begin; i < array.length; i++)                                                      // 7   // 15
    result.push(array[i]);                                                                        // 8   // 16
                                                                                                  // 9   // 17
  return result;                                                                                  // 10  // 18
};                                                                                                // 11  // 19
                                                                                                  // 12  // 20
Dictionary = function(list) {                                                                     // 13  // 21
  var self = this;                                                                                // 14  // 22
  // Dictionary                                                                                   // 15  // 23
  self.lookupString = {};                                                                         // 16  // 24
  self.lookupNumber = {};                                                                         // 17  // 25
  self.lookupDate = {}; // Special lookup making sure date lookups are acurate                    // 18  // 26
  self.lookupBoolean = {};                                                                        // 19  // 27
                                                                                                  // 20  // 28
  self.list = [];                                                                                 // 21  // 29
                                                                                                  // 22  // 30
  self.initial = [];                                                                              // 23  // 31
                                                                                                  // 24  // 32
  // If user sets a list                                                                          // 25  // 33
  if (list instanceof Dictionary) {                                                               // 26  // 34
    // Clone the initial list                                                                     // 27  // 35
    self.initial = list.clone();                                                                  // 28  // 36
    // We set the clone                                                                           // 29  // 37
    self.set(list.clone());                                                                       // 30  // 38
  } else if (list) {                                                                              // 31  // 39
    // Clone the array                                                                            // 32  // 40
    self.initial = _splice(list);                                                                 // 33  // 41
    // Just set the list                                                                          // 34  // 42
    self.set(list);                                                                               // 35  // 43
  }                                                                                               // 36  // 44
                                                                                                  // 37  // 45
};                                                                                                // 38  // 46
                                                                                                  // 39  // 47
Dictionary.prototype.lookup = function(key) {                                                     // 40  // 48
  var self = this;                                                                                // 41  // 49
                                                                                                  // 42  // 50
  var lookup = self.lookupString;                                                                 // 43  // 51
                                                                                                  // 44  // 52
  if (key instanceof Date) {                                                                      // 45  // 53
    lookup = self.lookupDate;                                                                     // 46  // 54
    key = +key;                                                                                   // 47  // 55
  } else if (key === +key) {                                                                      // 48  // 56
    lookup = self.lookupNumber;                                                                   // 49  // 57
  } else if (key === !!key) {                                                                     // 50  // 58
    lookup = self.lookupBoolean;                                                                  // 51  // 59
  }                                                                                               // 52  // 60
                                                                                                  // 53  // 61
  if (arguments.length === 2) {                                                                   // 54  // 62
    // Setter                                                                                     // 55  // 63
    lookup[key] = arguments[1];                                                                   // 56  // 64
  }                                                                                               // 57  // 65
                                                                                                  // 58  // 66
  return lookup[key];                                                                             // 59  // 67
};                                                                                                // 60  // 68
                                                                                                  // 61  // 69
Dictionary.prototype.add = function(value) {                                                      // 62  // 70
  var self = this;                                                                                // 63  // 71
  // Make sure not to add existing values / words                                                 // 64  // 72
  if (!self.exists(value)) {                                                                      // 65  // 73
    // Add value to keyword list                                                                  // 66  // 74
    // We return the index - note this can be 0 :)                                                // 67  // 75
    var index = this.list.push(value) - 1;                                                        // 68  // 76
    // Set the normal lookup                                                                      // 69  // 77
    this.lookup(value, index);                                                                    // 70  // 78
  }                                                                                               // 71  // 79
                                                                                                  // 72  // 80
  return this.index(value);                                                                       // 73  // 81
};                                                                                                // 74  // 82
                                                                                                  // 75  // 83
Dictionary.prototype.addList = function(list) {                                                   // 76  // 84
  // Iterate over the list of values                                                              // 77  // 85
  if (list)                                                                                       // 78  // 86
    for (var i = 0; i < list.length; i++)                                                         // 79  // 87
      this.add(list[i]);                                                                          // 80  // 88
};                                                                                                // 81  // 89
                                                                                                  // 82  // 90
Dictionary.prototype.set = function(list) {                                                       // 83  // 91
  // Reset the this.lookup                                                                        // 84  // 92
  this.lookupString = {};                                                                         // 85  // 93
  this.lookupNumber = {};                                                                         // 86  // 94
  this.lookupBoolean = {};                                                                        // 87  // 95
  this.lookupDate = {};                                                                           // 88  // 96
  this.list = [];                                                                                 // 89  // 97
  // Add the list                                                                                 // 90  // 98
  this.addList(list);                                                                             // 91  // 99
};                                                                                                // 92  // 100
                                                                                                  // 93  // 101
Dictionary.prototype.remove = function(value) {                                                   // 94  // 102
  var self = this;                                                                                // 95  // 103
  // Make sure theres something to remove                                                         // 96  // 104
  if (self.exists(value)) {                                                                       // 97  // 105
    var result = [];                                                                              // 98  // 106
    // copy the this.lookup                                                                       // 99  // 107
    for (var i = 0; i < this.list.length; i++)                                                    // 100
      if (i !== self.index(value)) result.push(this.list[i]);                                     // 101
    // Set the new list of this.lookup                                                            // 102
    this.set(result);                                                                             // 103
  }                                                                                               // 104
};                                                                                                // 105
                                                                                                  // 106
Dictionary.prototype.withoutInitial = function() {                                                // 107
  return _splice(this.list, this.initial.length);                                                 // 108
};                                                                                                // 109
                                                                                                  // 110
Dictionary.prototype.value = function(index) {                                                    // 111
  return this.list[index];                                                                        // 112
};                                                                                                // 113
                                                                                                  // 114
Dictionary.prototype.index = function(value) {                                                    // 115
  // We have to use the Date lookup in order to get the correct lookup value                      // 116
  // otherwise there are some slight diviation in the result - We want this                       // 117
  // 100% accurate                                                                                // 118
  return this.lookup(value);                                                                      // 119
};                                                                                                // 120
                                                                                                  // 121
Dictionary.prototype.exists = function(value) {                                                   // 122
  return (typeof this.index(value) !== 'undefined');                                              // 123
};                                                                                                // 124
                                                                                                  // 125
Dictionary.prototype.clone = function() {                                                         // 126
  return _splice(this.list);                                                                      // 127
};                                                                                                // 128
                                                                                                  // 129
Dictionary.prototype.toArray = function() {                                                       // 130
  return this.list;                                                                               // 131
};                                                                                                // 132
                                                                                                  // 133
Dictionary.prototype.toObject = function() {                                                      // 134
  return _.extend({}, this.lookupString, this.lookupNumber, this.lookupDate, this.lookupBoolean); // 135
};                                                                                                // 136
                                                                                                  // 137
////////////////////////////////////////////////////////////////////////////////////////////////////     // 146
                                                                                                         // 147
}).call(this);                                                                                           // 148
                                                                                                         // 149
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:dictionary'] = {
  Dictionary: Dictionary
};

})();
