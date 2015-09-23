ContactsSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3,
    max: 20
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  lastUpdated: {
    type: Date,
    optional: true
  }
});

Contacts = new Meteor.Collection('Contacts');

if (Meteor.isCordova) Ground.Collection(Contacts);

Meteor.methods({
  addContact: function(doc) {
    check(doc, ContactsSchema);
    var obj = {name: doc.name, email: doc.email, createdAt: new Date};
    return Contacts.insert(obj);
  }
});

