(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publications.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish('contacts', function () {                               // 1
  return Contacts.find();                                              // 2
});                                                                    //
                                                                       //
Meteor.publish('contact', function (_id) {                             // 5
  return Contacts.find({ _id: _id });                                  // 6
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publications.js.map
