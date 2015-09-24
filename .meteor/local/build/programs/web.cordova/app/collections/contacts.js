(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// collections/contacts.js                                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
ContactsSchema = new SimpleSchema({                                    // 1
  name: {                                                              // 2
    type: String,                                                      // 3
    min: 3,                                                            // 4
    max: 20                                                            // 5
  },                                                                   //
  email: {                                                             // 7
    type: String                                                       // 8
  },                                                                   //
  createdAt: {                                                         // 10
    type: Date,                                                        // 11
    optional: true                                                     // 12
  },                                                                   //
  lastUpdated: {                                                       // 14
    type: Date,                                                        // 15
    optional: true                                                     // 16
  }                                                                    //
});                                                                    //
                                                                       //
Contacts = new Meteor.Collection('Contacts');                          // 20
                                                                       //
if (Meteor.isCordova) Ground.Collection(Contacts);                     // 22
                                                                       //
Meteor.methods({                                                       // 24
  addContact: function (doc) {                                         // 25
    check(doc, ContactsSchema);                                        // 26
    var obj = { name: doc.name, email: doc.email, createdAt: new Date() };
    return Contacts.insert(obj);                                       // 28
  },                                                                   //
  editContact: function (obj) {                                        // 30
    _.extend(obj.updateDoc.$set, { lastUpdated: new Date() });         // 31
    check(obj._id, String);                                            // 32
    check(obj.updateDoc.$set, ContactsSchema);                         // 33
    return Contacts.update({ _id: obj._id }, obj.updateDoc);           // 34
  },                                                                   //
  removeContact: function (id) {                                       // 36
    check(id, String);                                                 // 37
    return Contacts.remove(id);                                        // 38
  }                                                                    //
});                                                                    //
                                                                       //
if (Meteor.isClient) {                                                 // 42
  Ground.methodResume(['addContact', 'editContact', 'removeContact']);
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
