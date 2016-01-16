var express = require('express'),
    app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.use('/static', express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

