Template.contacts.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
			Meteor.subscribe("contacts");
    	};
  	});
});

Template.contacts.helpers({
	'contacts': function() {
		return Contacts.find({});
	}
});