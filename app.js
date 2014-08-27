var express = require('express');
var http = require('http');
var ejs = require('ejs');
var url = require('url');
var request = require('request');
var fs = require('fs');


var port = process.env.PORT || 3000;


var app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));



app.get('/gif/*', function(req, res) {
  var path = url.parse(req.url).pathname;
  var terms = path.substring(5).split("/").join("+");
  var terms = "http://api.giphy.com/v1/gifs/search?q=" + terms + "&api_key=dc6zaTOxFJmzC&limit=1";

  request(terms, function(error, response, body) {
    try {
      var image = JSON.parse(body).data[0].images.original;
      var img = fs.readFileSync(image.url);
      res.writeHead(200, {'Content-Type': 'image/gif'});
      res.end(img, 'binary');
    } catch (err) {
      var img = fs.readFileSync('/default.gif');
      res.writeHead(200, {'Content-Type': 'image/gif'});
      res.end(img, 'binary');
    }
  });
});

app.get('/', function(req, res) {
  res.end("getgif");
})




var server = app.listen(port, function() {
  console.log("Listening on port %d", port);
});