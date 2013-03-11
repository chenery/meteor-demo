Meteor.startup(function () {
    // code to run on server at startup

    /**
     * Notes on security.
     *
     * We only publish data if the user is logged in
     */

    // get all the messages for now
    Meteor.publish("messages", function () {
        if (this.userId) {
            return Messages.find();
        }
    });

    // specify which user fields are available to the client
    Meteor.publish("allUserData", function () {
        if (this.userId) {
            return Meteor.users.find({}, {fields: {
                '_id' : 1,
                'profile' : 1,
                'createdAt': 1,
                'services.google.email': 1,
                'numberOfMessages': 1
            }});
        }
    });
});