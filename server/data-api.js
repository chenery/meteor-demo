/**
 * Example of using server side routing to create an API endpoint
 * // todo how do we set headers e.g. content type?
 */
Meteor.Router.add('/data/messages/first.json', 'GET', function() {
        return EJSON.stringify(Messages.findOne());
    }
);