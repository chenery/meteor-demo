/**
 * Router, map URLs to template names
 */

Meteor.Router.add({
    '/': 'homepage',

    '/messages': 'messages',

    '/users': 'users',

    '/user/:id': function(id) {
        Session.set('viewUserId', id);
        return 'user';
    }
});

// secure the app, only show a holding page if we are not signed in
// When the route function is called, this corresponds to a page.js Context object
Meteor.Router.filters({
    requireLogin: function(page) {
        console.log('userId at filter ' + Meteor.userId());
        if (Meteor.userId()) {
            return page;
        } else {
            return 'sign-in';
        }
    }
});

// applies to all pages except the homepage
Meteor.Router.filter('requireLogin', {except: 'homepage'});