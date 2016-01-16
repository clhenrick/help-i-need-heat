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
});

routes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) console.log(err);
    res.json(users);
  });
});

app.get('/setup', function(req, res) {

  // create a sample user
  var john = new User({
    name : 'John Doe', 
    pw : 'password',
    admin : true 
  }, 'createUser');

  console.log(john);

});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
routes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
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

