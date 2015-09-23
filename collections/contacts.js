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

