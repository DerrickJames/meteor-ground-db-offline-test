(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/contacts.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.contacts.onCreated(function () {                              // 1
	var self = this;                                                      // 2
	self.autorun(function () {                                            // 3
		if (Meteor.status().connected) {                                     // 4
			Meteor.subscribe("contacts");                                       // 5
		};                                                                   //
	});                                                                   //
});                                                                    //
                                                                       //
Template.contacts.helpers({                                            // 10
	'contacts': function () {                                             // 11
		return Contacts.find({});                                            // 12
	}                                                                     //
});                                                                    //
                                                                       //
Template.contacts.events({                                             // 16
	'click .button-assertive': function (e) {                             // 17
		e.preventDefault();                                                  // 18
		Meteor.call('removeContact', this._id, function (error, result) {    // 19
			if (error) alert(error.reason);                                     // 20
		});                                                                  //
		return;                                                              // 22
	}                                                                     //
});                                                                    //
                                                                       //
Template.edit.onCreated(function () {                                  // 26
	var self = this;                                                      // 27
	self.autorun(function () {                                            // 28
		if (Meteor.status().connected) {                                     // 29
			Meteor.subscribe("contact", Router.current().params._id);           // 30
		}                                                                    //
	});                                                                   //
});                                                                    //
                                                                       //
Template.edit.helpers({                                                // 35
	'selectedDoc': function () {                                          // 36
		return Contacts.findOne(Router.current().params._id);                // 37
	}                                                                     //
});                                                                    //
                                                                       //
AutoForm.hooks({                                                       // 41
	insertContactForm: {                                                  // 42
		onSubmit: function (insertDoc) {                                     // 43
			Meteor.call('addContact', insertDoc, function (error, result) {     // 44
				if (error) alert(error.reason);                                    // 45
			});                                                                 //
			$(".back-button").click();                                          // 47
			return false;                                                       // 48
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
AutoForm.hooks({                                                       // 53
	editContactForm: {                                                    // 54
		onSubmit: function (insertDoc, updateDoc, currentDoc) {              // 55
			var obj = { _id: Router.current().params._id, updateDoc: updateDoc };
			Meteor.call('editContact', obj, function (error, result) {          // 57
				if (error) alert(error.reason);                                    // 58
			});                                                                 //
			$(".back-button").click();                                          // 60
			return false;                                                       // 61
		}                                                                    //
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
