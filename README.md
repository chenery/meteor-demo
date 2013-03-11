meteor-demo
===========

Small app to demo how to build an app using meteor.

- Templates are reactive to data changes from the these data sources: messages, users, modal window trigger and error data.
- Add community packages such as moment.js using meteorite and npm [https://atmosphere.meteor.com/wtf/app]
- Page URLs are added client side using the meteor router [https://github.com/tmeasday/meteor-router].
- Example of how to produce a JSON API endpoint server side using the meteor router.
- Using the accounts-google meteor package to login and persist user accounts.
- Show how to structure you app code and add assets (e.g. flat-ui).
- Show basics of data modelling with Mongodb.

# Installation instructions



- How to connect to the local mongodb instance installed with meteor:

    mongo localhost:3002/meteor
    use meteor
    db.users.find()


- Separate the code you write for the client and server apps.  Other code appears on both.  Done via convention or by isServer calls.

- Meteor with Jasmine tests: https://github.com/sebastianmaier/meteor-jasmine
- http://stackoverflow.com/questions/12987525/meteor-test-driven-development


- How to make your site Spiderable by google

    http://meteor.com/blog/2012/08/09/search-engine-optimization


Todo work out how to secure access to data for logged in users only
