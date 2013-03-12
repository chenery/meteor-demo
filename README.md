meteor-demo
===========

Small app to demo how to build an app using meteor, running here http://chenery.meteor.com/.

- Templates are reactive to data changes from the these data sources: logged in user, messages, users, modal window trigger and error data.
- Add community packages such as moment.js using meteorite and npm https://atmosphere.meteor.com/wtf/app
- Page URLs are added client side using the meteor router https://github.com/tmeasday/meteor-router.
- Example of how to produce a JSON API endpoint server side using the meteor router.
- Using the accounts-google meteor package to login and persist user accounts.
- Show how to structure you app code and add assets (e.g. flat-ui).
- Show basics of data modelling with Mongodb.
- Site made Spiderable to google as per http://meteor.com/blog/2012/08/09/search-engine-optimization as per https://developers.google.com/webmasters/ajax-crawling/
- HTML5-History-API to get working in IE8+

# Installation instructions

To setup the basic environment we require meteorite with can be installed using npm (install with Node.js http://nodejs.org/download/).

    npm install -g meteorite

Then we are run using the meteorite commands:

    git clone https://github.com/chenery/meteor-demo.git
    cd meteor-demo/
    mrt

You will need to configure the google login widget to get a client id and secret.

# Other stuff

How to connect to the local mongodb instance installed with meteor:

    mongo localhost:3002/meteor
    use meteor
    db.users.find()

# Todos
- Meteor with Jasmine tests: https://github.com/sebastianmaier/meteor-jasmine
- http://stackoverflow.com/questions/12987525/meteor-test-driven-development
- integrate serverside debugger http://stackoverflow.com/questions/11034941/meteor-debug-on-server-side
- 404 page client and server side
- Deploy to Heroku: http://bytesofpi.com/post/20898722298/pushing-your-meteor-project-to-heroku, https://github.com/jordansissel/heroku-buildpack-meteor
- Deploy to EC2: http://julien-c.fr/2012/10/meteor-amazon-ec2/, https://groups.google.com/forum/?fromgroups=#!topic/meteor-talk/lsaJwYK4lmQ
