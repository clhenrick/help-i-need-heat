var config = require('../config.js'),
    CartoDB = require('cartodb'),
    squel = require('squel');

var client = new CartoDB({
  user: config.cartodb_user,
  api_key: config.cartodb_key
});

client.acceptString = function(value) {
  client.on('connect', function() {
    console.log('cartodb connect success');

    // test query
    var test = client.query(
      squel.select().from(config.cartodb_test_table).toString()),
      null,
      function(err, data){
        if (err) { console.log('cartodb test query err: ', err ); return; }
      }
    )

    console.log(test);

  });

  client.connect();

}

module.exports = client;