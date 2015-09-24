(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
  layoutTemplate: 'layout'                                             // 2
});                                                                    //
                                                                       //
Router.map(function () {                                               // 5
  this.route('contacts', { path: '/' }), this.route('new'), this.route('edit', { path: 'edit/:_id' });
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
