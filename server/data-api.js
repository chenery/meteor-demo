/**
 * Example of using server side routing to create an API endpoint
 */
Meteor.Router.add('/data/messages/first.json', 'GET', function() {

        this.response.writeHead(200, {'Content-Type':'application/json'});

        return EJSON.stringify(Messages.findOne());
    }
);