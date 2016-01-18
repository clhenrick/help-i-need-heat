var express = require('express'),
    router = express.Router(),
    pg = require('pg'),
    squel = require('squel'),
    config = require('../config');


router.param('userinfo', function(req, res, next, user) {
  // to do: validation on user to prevent sql injection!  
  console.log(user);
  req.user = JSON.parse(user);
  console.log('req.userinfo: ', req.user);
  next();
});

// get user info route
router.get('/:userinfo', function(req, res) {
  getUser(req.user, res);
});

// create new user route
router.post('/:userinfo', function(req, res) {
  createUser(req.user, res);
});

// get the user info from the users table
function getUser(req, res) {

  var user = req;

  var client = new pg.Client({
    user: process.env.USER || 'clhenrick',
    database: process.env.DATABASE_URL || 'hinh'
  });
  client.on('drain', client.end.bind(client)); // disconnect when query finishes
  client.connect();

  var userQuery = squel.select()
        .from(config.users_table)
        .where("name = $1")
        .toString();

  var queryConfig = {
    text: userQuery,
    values: [user.name]
  };

  console.log('queryConfig: ', queryConfig);

  client.query(queryConfig, function(err, data){
    if (err) { console.error(err); }
    console.log(data);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data.rows[0]);
  });
}

// insert new user data into the users table
function createUser(req, res) {
  var user = req;

  var client = new pg.Client({
    user: process.env.USER || 'clhenrick',
    database: process.env.DATABASE_URL || 'hinh'
  });
  client.on('drain', client.end.bind(client)); // disconnect when query finishes
  client.connect();
  
  var userQuery = squel.insert({numberedParameters: true})
        .into(config.users_table)
        .set("name", "$1")
        .set("password", "$2")
        .set("admin", "$3")
        .set("email", "$4")
        .toParam();

  var queryConfig = {
    text: userQuery.text,
    values: [user.name, user.password, user.admin, user.email]
  };

  console.log(queryConfig);
  
  client.query(queryConfig, function(err, data){
    if (err) { console.error(err); }
    console.log(data);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data);
  });

}

module.exports = router;