/**
 * Example of using server side routing to create an API endpoint
 */
Meteor.Router.add('/data/messages/:id.json', 'GET', function(id) {
        return EJSON.stringify(Messages.findOne(id));
    }
);