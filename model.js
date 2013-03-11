/**
 * Code common to the client and server
 */

// Define a mongo collection

/**
 *  Notes: on Mongodb data modeling - http://docs.mongodb.org/manual/core/data-modeling/
 *
 *  We will store a reference to message owner on the message object as per
 *  http://docs.mongodb.org/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/
 *
 *  Note there is no join to pull back the user document (// http://stackoverflow.com/questions/4067197/mongodb-and-joins),
 *  We have to pull the user back separately.
 *
 */

Messages = new Meteor.Collection("messages");

// this restricts what the client can do
Messages.allow({
    insert: function (userId, message) {
        return false; // no cowboy inserts -- use create method
    },
    update: function(userId, message) {
        return false; // todo
    },
    remove: function(userId, message) {
        return false; // todo
    }
});

// Defines the methods that can be invoked over the network by clients
Meteor.methods({
    // options just message for now
    createMessage: function(options) {
        // todo validation here?
        if (typeof options.message !== "string" && options.message.length) {
                throw new Meteor.Error(400, "Required parameter missing");
        }
        if (options.message.length > 1000) {
            throw new Meteor.Error(413, "Message too long");
        }
        // Note the userId is baked in to meteor for the logged in user
        if (! this.userId) {
            // todo investigate security?
            throw new Meteor.Error(403, "You must be logged in");
        }

        var messageId =  Messages.insert({
            owner: this.userId,
            message: options.message,
            createdAt: new Date()
        });

        // Now update the numberOfMessages attribute on the owner user's document
        Meteor.users.update(this.userId, {$inc: {numberOfMessages: 1}});

        return messageId;
    }
});