// taking help from:
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// and https://github.com/jueyang/scavenger-carto/blob/master/server.js

var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    config = require('./config'),
    User = require('./models/user'),
    routes = require('./routes/index'),
    userPG = require('./routes/user_pg'),
    path = require('path');

var port = process.env.PORT || 3000;

var app = express();

// secret variable
app.set('superSecret', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/users', userPG);

app.route('/login')
  .get(function(req, res) {
    res.send('this is the log-in form');
  })
  .post(function(req,res) {
    res.send('processing the log-in form');
  });

app.get('/test', function(req, res) {
  res.send('testing...');
});

// routes.get('/users', function(req, res, next){
//   var username = req.params.username;
//   console.log(username);
//   res.send('fucking work');
// })

// app.get('/', function(req, res) {
//   res.send('Hello World! Checkout this sweet app at http://localhost:' + port + '/static/');
// });

// routes.get('/', function(req, res) {
//   res.json({message: 'welcome to the Help I Need Heat API'});
//   res.end();
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// go to http://localhost:3000/api/users
// routes.get('/users', function(req, res) {
  
//   User({name: '*'}, 'getAllUsers', function(err, users) {
//     if (err) { console.log(err); return; }
//     if (res.headersSent) return;
//     res.status(200).json(users);
//   });

// });

// go to http://localhost:3000/setup
// app.get('/setup', function(req, res) {

//   console.log('route: /setup');

//   // create a sample user
//   var john = new User({
//     name : 'John Doe', 
//     pw : 'password',
//     admin : true 
//   }, 
//   'createUser',
//   function(err, user){
//     if (err) { console.log(err); return; }
//     if (res.headersSent) return;
//     res.status(200).json(user);
//   });

// });

// route to authenticate a user (POST http://localhost:3000/api/authenticate)
// routes.post('/authenticate', function(req, res) {

//   // find the user
//   Users({
//     name: req.body.name
//   }, function(err, user) {

//     if (err) throw err;

//     if (!user) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' });
//     } 
//     else if (user) {

//       // check if password matches
//       if (user.password != req.body.password) {
//         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       } else {

//         // if user is found and password is right
//         // create a token
//         var token = jwt.sign(user, app.get('superSecret'), {
//           expiresInMinutes: 1440 // expires in 24 hours
//         });

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         });
//       }   

//     }

//   });
// });

// app.use('/api', router);

app.listen(port, function () {
  console.log('listening on port: ', port);
});
