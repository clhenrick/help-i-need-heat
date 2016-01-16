// creates user or retrieves their data
var config = require('../config'),
    CartoDB = require('cartodb'),
    squel = require('squel');

var user = new CartoDB({
  user: config.cartodb_user,
  api_key: config.cartodb_key
});

var User = function(props, action) {

  if (!props) {
    console.log('error: user props not defined');
    return;
  }

  if (action === 'getUser') {
  
    user.acceptString = function(props) {

      var query = squel.select()
            .from(config.cartodb_users)
            .where("name = " + props.name)
            .toString();

      user.query(query, null, function(err, data) {
        if (err) { console.log('cartodb error'); }
        return data.rows;
      });
    }
  
  } else if (action === 'createUser') {

    user.acceptString = function(props) {

      var query = squel.insert()
            .into(config.cartodb_users)
            .set("name", props.name)
            .set("pw", props.pw)
            .admin("admin", props.admin)
            .toString();

      user.query(query, null, function(err, data) {
        if (err) { console.log('cartodb insert error'); }
        console.log('create user success!');
      });

    }

  } else {
    console.log('error: action must be getUser or createUser');
    return;
  }

}


module.exports = User;