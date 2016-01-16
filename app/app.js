// taking help from https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// and https://github.com/jueyang/scavenger-carto/blob/master/server.js

var express = require('express'),
    app = express(),
    routes = express.Router(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    config = require('./config'),
    User = require('./models/user');

var port = process.env.PORT || 3000;

// secret variable
app.set('superSecret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('Hello World! Checkout this sweet app at http://localhost:' + port + '/static/');
});

routes.get('/', function(req, res) {
  res.json({message: 'welcome to the Help I Need Heat API'});
  res.end();
});

// go to http://localhost:3000/api/users
routes.get('/users', function(req, res) {
  
  User({name: '*'}, 'getAllUsers', function(err, users) {
    if (err) { console.log(err); }
    res.json(users);
    res.end();
  });

});

// go to http://localhost:3000/setup
app.get('/setup', function(req, res) {

  console.log('route: /setup');

  // create a sample user
  var john = new User({
    name : 'John Doe', 
    pw : 'password',
    admin : true 
  }, 
  'createUser',
  function(err, user){
    if (err) { console.log(err); }
    res.status(200).json(user);
    res.end();
  });

});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
routes.post('/authenticate', function(req, res) {

  // find the user
  Users({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

app.use('/api', routes);

app.listen(port, function () {
  console.log('listening on port: ', port);
});

