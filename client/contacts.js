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

Template.contacts.events({
	'click .button-assertive': function(e) {
		e.preventDefault();
		Meteor.call('removeContact', this._id, function(error, result) {
			if (error) alert(error.reason);
		});
		return;
	}
});

Template.edit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
      		Meteor.subscribe("contact", Router.current().params._id);
    	}
  	});
});