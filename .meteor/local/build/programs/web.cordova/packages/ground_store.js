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
var Store;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/ground_store/packages/ground_store.js                                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
(function () {                                                                          // 1
                                                                                        // 2
////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                //    // 4
// packages/ground:store/storage.scope.js                                         //    // 5
//                                                                                //    // 6
////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                  //    // 8
// Define the Storage scope                                                       // 1  // 9
Store = {};                                                                       // 2  // 10
////////////////////////////////////////////////////////////////////////////////////    // 11
                                                                                        // 12
}).call(this);                                                                          // 13
                                                                                        // 14
                                                                                        // 15
                                                                                        // 16
                                                                                        // 17
                                                                                        // 18
                                                                                        // 19
(function () {                                                                          // 20
                                                                                        // 21
////////////////////////////////////////////////////////////////////////////////////    // 22
//                                                                                //    // 23
// packages/ground:store/client.js                                                //    // 24
//                                                                                //    // 25
////////////////////////////////////////////////////////////////////////////////////    // 26
                                                                                  //    // 27
// Users can add multiple storage adapters to Storage, but we might dont care     // 1  // 28
// about wich to use, so here we provide a small helper api to the Storage object // 2  // 29
// to get the "best" storage available.                                           // 3  // 30
                                                                                  // 4  // 31
// List of possible storage adapters, the best is at the top                      // 5  // 32
var _rankedStorageAdapterList = [                                                 // 6  // 33
  'localStorage'                                                                  // 7  // 34
];                                                                                // 8  // 35
                                                                                  // 9  // 36
// This function will return the name of best storage adapter available.          // 10
var _getTheBestStorageAdapterAvailable = function() {                             // 11
                                                                                  // 12
  // Iterate over the ranked list of storge adapters                              // 13
  for (var i = 0; i < _rankedStorageAdapterList.length; i++) {                    // 14
                                                                                  // 15
    // Set surgestion to the name of a storage adapter                            // 16
    var surgestion = _rankedStorageAdapterList[i];                                // 17
                                                                                  // 18
    // If the storage is found then this must be the best storage adapter         // 19
    if (Store[surgestion]) return surgestion;                                     // 20
  }                                                                               // 21
                                                                                  // 22
  // Got nothing, we return null                                                  // 23
  return null;                                                                    // 24
};                                                                                // 25
                                                                                  // 26
// This function will return the name of the passed in storage adapter            // 27
var _getStorageNameFromStorageAdapter = function(storageAdapterInstance) {        // 28
                                                                                  // 29
  // Iterate over the ranked list of storge adapters                              // 30
  for (var i = 0; i <_rankedStorageAdapterList.length; i++) {                     // 31
                                                                                  // 32
    // Set storageAdapterName to the name of a storage adapter                    // 33
    var storageAdapterName = _rankedStorageAdapterList[i];                        // 34
                                                                                  // 35
    // StorageAdapter                                                             // 36
    var StorageAdapter = Store[storageAdapterName];                               // 37
                                                                                  // 38
    // Check if the storage adapter is found,                                     // 39
    if (StorageAdapter) {                                                         // 40
                                                                                  // 41
      // check if the handed objectis an instance of the storage adapter, if so   // 42
      // return the storage adapter name                                          // 43
      if (storageAdapterInstance instanceof StorageAdapter)                       // 44
        return storageAdapterName;                                                // 45
                                                                                  // 46
      // We could add a === check allowing a class check                          // 47
      if (storageAdapterInstance === StorageAdapter)                              // 48
        return storageAdapterName;                                                // 49
                                                                                  // 50
    }                                                                             // 51
  }                                                                               // 52
};                                                                                // 53
                                                                                  // 54
// Get the storage name from storage adapter or its instance                      // 55
Store.getName = function(storageAdapterInstance) {                                // 56
                                                                                  // 57
  // Tries to find the name of the storage adapter or instance given              // 58
  // returns null if no match                                                     // 59
  return _getStorageNameFromStorageAdapter(storageAdapterInstance);               // 60
                                                                                  // 61
};                                                                                // 62
                                                                                  // 63
// Returns a storage adapter, either the best on the system or a specific if      // 64
// name is set as an argument.                                                    // 65
Store.getStorage = function(name /* Optional */) {                                // 66
                                                                                  // 67
  // Check if name is set and is a string, if not set it to the best storage      // 68
  // adapter available                                                            // 69
  if (name !== ''+name) name = _getTheBestStorageAdapterAvailable();              // 70
                                                                                  // 71
  // Return the storage by name, if none found then return noop                   // 72
  return Store[name] || function() {};                                            // 73
                                                                                  // 74
};                                                                                // 75
                                                                                  // 76
// Returns an instance of the best possible storage                               // 77
Store.create = function(options) {                                                // 78
                                                                                  // 79
  // Get the best storage available                                               // 80
  var storage = Store.getStorage();                                               // 81
                                                                                  // 82
  // Return the instance                                                          // 83
  return new storage(options);                                                    // 84
                                                                                  // 85
};                                                                                // 86
////////////////////////////////////////////////////////////////////////////////////    // 114
                                                                                        // 115
}).call(this);                                                                          // 116
                                                                                        // 117
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ground:store'] = {
  Store: Store
};

})();
