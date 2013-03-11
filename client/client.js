/**
 * Client subscriptions
 *
 * In Meteor, the client and server share the same database API. The same exact application code —
 * like validators and computed properties — can often run in both places.
 * But while code running on the server has direct access to the database,
 * code running on the client does not.
 *
 * Every Meteor client includes an in-memory database cache. To manage the client cache,
 * the server publishes sets of JSON documents, and the client subscribes to those sets.
 * As documents in a set change, the server patches each client's cache.
 *
 * When you run a data query on the client over a subscription data set you only get the subset of data
 * provided by the server.
 */
Meteor.subscribe("messages");
Meteor.subscribe("allUserData");

/**
 * Global Template Helpers
 */
Handlebars.registerHelper('fromNow', function(date) {
    if (date) {
        return moment(date).fromNow();
    } else {
        return 'unknown';
    }
});

var Utils = {};

Utils.log = function(value) {
    if (typeof console !== 'undefined') {
        console.log(value);
    }
};

/**
 * Top Navigation template helpers and events
 */

Template.navigation.pages = function()  {
    return [
        {
            url: '/',
            title: 'Home',
            page: 'homepage'
        },
        {
            url: '/messages',
            title: 'Messages',
            page: 'messages'
        },
        {
            url: '/users',
            title: 'Users',
            page: 'users'
        }];
};

Template.navigation.getNavigationStyle = function(pageName) {
    if (pageName === Meteor.Router.page()) {
        return 'class="active"';
    }
};

Template.navigation.getNavigationCountFragment = function(pageName) {

    var navCountFragment = '';

    if (pageName === 'messages') {

        var messageCount = Messages.find().count();
        if (messageCount > 0) {
            navCountFragment = '<span class="navbar-unread">'+ messageCount + '</span>';
        }

    } else if (pageName === 'users') {

        var userCount = Meteor.users.find().count();
        if (userCount > 0) {
            navCountFragment = '<span class="navbar-unread">' + userCount + '</span>';
        }
    }

    return navCountFragment;
};

/**
 * Messages template helpers and events
 */

Template.messages.messages = function()  {
    return Messages.find({}, {
        sort: {createdAt : -1}
    });
};

// Example of how you cannot join with mongo,
// we have to pull back the user for each message to get the user's name
// (could have stored the name on the message document though)
// Note: the users is baked into Meteor.
Template.messages.usersName = function(userId)  {
    var user =  Meteor.users.findOne(userId);
    if (user) {
        return user.profile.name;
    } else {
        return '';
    }

};

Template.messages.showAddMessageModal = function () {
    return Session.get("showAddMessageModal");
};

Template.messages.events({
    'click .showAddMessageModal' : function () {
        openAddMessageModal();
    }
});

/**
 * Add message modal
 */
var openAddMessageModal = function () {
    /**
     * Note on reactivity:
     * Data providers like Session send an invalidate signal when data changes.
     * This works when the data providers are using in a 'reactive' context,
     * in this case Templates.
     * todo work out it/how individual templates or all templates get re-rendered
     */

        // clear any previous state from the session
    Session.set("createError", null);
    Session.set("showAddMessageModal", true);
};

Template.addMessageModal.events({
    'click .cancel' : function() {
        Session.set("showAddMessageModal", false);
    },
    'click .save' : function(event, template) {
        // todo where do the params come from?
        var message = template.find(".message").value;

        // todo work out if this is encapsulated with the validation in here
        if (message.length) {

            // persist the message
            Meteor.call('createMessage', {
                message: message
            }, function (error, message) {
                if (error) {
                    Utils.log('error creating message ' + error);
                }
            });

            // hide the createModal
            Session.set("showAddMessageModal", false);
        } else {
            Session.set("createError",
                "Please enter a message");
        }

    }
});

Template.addMessageModal.error = function () {
    return Session.get("createError");
};

Template.users.helpers({
    users : function() {
        return Meteor.users.find();
    }
});