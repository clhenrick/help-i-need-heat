#!/usr/bin/env node

var pg = require('pg'),
    squel = require('squel');

var client = new pg.Client({
  user: process.env.USER || 'clhenrick',
  database: process.env.DATABASE_URL || 'hinh'
});
client.on('drain', client.end.bind(client)); // disconnect when query finishes
client.connect();

var queryBlock = squel.select()
      .from('users')
      .toString();

// test pg to get user info
client.query({ text: queryBlock, values: []})
  .on('row', function(row, result){
    result.addRow(row);
  }).on('end', function(result){
    console.log(JSON.stringify(result.rows, null, ' '));
    // client.end();
  }).on('error', function(error){
    console.log('error: ', error);
  })


// test pg to create a user 
var queryBlock = squel.insert({numberedParameters: true})
      .into('users')
      .set("name", "$1")
      .set("password", "$2")
      .set("admin", "$3")
      .set("email", "$4")
      .toParam();

var queryConfig = {
  text : queryBlock.text,
  values : ['Hella Hella', 'abc123', false, 'test@example.com']
}

var query = client.query(queryConfig);

query.on('row', function(row, result){
    result.addRow(row);
  })
  .on('end', function(result){
    console.log(JSON.stringify(result));
    client.end();
  })
  .on('error', function(error) {
    console.error(error);
  });







