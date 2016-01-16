// creates user or retrieves their data
var config = require('../config'),
    CartoDB = require('cartodb'),
    squel = require('squel');

var user = new CartoDB({
  user: config.cartodb_user,
  api_key: config.cartodb_key
});

var User = function(props, action, callback) {

  if (!props) {
    callback('error: user props not defined');
  }

  if (action === 'getAllUsers') {

    user.acceptString = function(props) {

      props = JSON.parse(props);

      if (props.name !== "*") { callback('getAllUsers err: incorrect usage'); }

      user.on('connect', function() {
        console.log('cartodb connected');

        var query = squel.select()
              .from(config.cartodb_users)
              .toString();

        console.log('get all users query:', query);

        user.query(query, {table: config.cartodb_users}, function(err, data) {
          if (err) { callback(err); }

          if (callback && typeof callback === 'function') {
            callback(null, data);
          }
        });

      });

    }

    user.acceptString(JSON.stringify(props));
    user.connect();

  } else if (action === 'getUser') {
  
    user.acceptString = function(props) {

      props = JSON.parse(props);

      user.on('connect', function() {
        console.log('cartodb connected');

        var query = squel.select()
              .from(config.cartodb_users)
              .where("name = " + props.name)
              .toString();

        console.log('get user query:', query);

        user.query(query, {table: config.cartodb_users}, function(err, data) {
          if (err) { callback(err); }

          if (callback && typeof callback === 'function') {
            callback(null, data);
          }

        });

      });

    }

    user.acceptString(JSON.stringify(props));
    user.connect();
  
  } else if (action === 'createUser') {

    user.acceptString = function(props) {

      props = JSON.parse(props);

      user.on('connect', function() {
        console.log('cartodb connected');

        var query = squel.insert()
              .into(config.cartodb_users)
              .set("name", props.name)
              .set("password", props.pw)
              .set("admin", props.admin)
              .toString();
        
        console.log('create user query:', query);

        user.query(query, {table: config.cartodb_users}, function(err, data) {
          if (err) { console.log('cartodb insert error'); }

          if (callback && typeof callback === 'function') {
            callback(null, data);
          }
        
        });

      });

    }

    user.acceptString(JSON.stringify(props));
    user.connect();

  } else {
    console.log('error: action must be getUser or createUser');
    return;
  }

}


module.exports = User;