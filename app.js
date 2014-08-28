var express = require('express');
var http = require('http');
var ejs = require('ejs');
var url = require('url');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var config = require('./config/config.js');


var port = process.env.PORT || 3000;


var app = express();
console.log(config.twitterKey);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/bower_components/',express.static(__dirname + '/gif/bower_components'));
app.use('/',express.static(__dirname + '/gif/app'));
console.log(__dirname+ '/gif', 'dirname');
// app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.get('/', function(req, res) {
  // res.end("<p>get gif</p>" +
  //         '<p>example: http://getgif.azurewebsites.net/gif/funny/dog.gif searches giphy for the tags "funny" and "dog" and returns the first gif it finds with those tags.</p>' +
  //         '<p>The last term must end with ".gif" if you want to use it in hipchat.</p>'
  //         );
   // res.sendFile('/uploads/' + uid + '/' + file);
    res.sendFile(__dirname + '/gif/app/index.html');
});

app.post('/', function(req, res){

  console.log(req.body);

  // var imgurTerms = req.body.imgu;
  // console.log(imgurTerms);
   var giphyTerms = req.body;
  // var imgurDone = false;
  // var giphyDone = false;

  // //Go get the imgur list
  var completeResponse = {};

  var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphyTerms + "&api_key=dc6zaTOxFJmzC";
  console.log(giphyUrl);
  request(giphyUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body);
    var giphyUrls = [];
    for ( var i = 0; i < JSON.parse(body).data.length; i++){
      giphyUrls.push(JSON.parse(body).data[i].images.original.url);
    }
    completeResponse.giphy = giphyUrls;
    res.send(completeResponse);
  }
  });

});



// app.get('/*', function(req, res) {
//   var gif = false;
//   var path = url.parse(req.url).pathname;
//   path = path.substring(5);
//   var terms = path.split("/").join("+");
//   terms = terms.split('.');
//   if (terms[1] === 'gif') {
//     var gif = true;
//     terms = terms[0];
//   } else {
//     var gif = false;
//     terms = terms[0];
//   }
//   var stuff = "http://api.giphy.com/v1/gifs/search?q=" + terms + "&api_key=dc6zaTOxFJmzC&limit=5";
  
//   request(stuff, function(error, response, body) {
//     try {
//       var image = JSON.parse(body).data[0].images.original;
//       // http.get(image.url).on('response', function (response) {
//       if (gif === true) {
//         res.writeHead(301,{'Content-Type':'text/html', 'Location': image.url});
//       } else {
//         var loc = 'http://getgif.azurewebsites.net/gif/' + path + '.gif';
//         console.log('LOC', loc);
//         res.writeHead(301,{'Content-Type':'text/html', 'Location': loc});
//       }
//       res.end();
//       //   response.on('data', function(chunk) {
//       //     res.write(chunk);
//       //   });
//       //   response.on('end', function() {
//       //     res.end();
//       //   });
//       // });
//     } catch (err) {
//       res.writeHead(301,{'Content-Type':'text/html', 'Location': 'http://media4.giphy.com/media/zLCiUWVfex7ji/giphy.gif'});
//       res.end();
//       // res.writeHead(200,{'Content-Type':'image/GIF'});
//       // var img = fs.readFileSync(__dirname + '/public/default.gif');
//       // res.sendFile(__dirname + '/public/default.gif')
//       // res.end(img, 'binary');
//     }
//   });
// });





var server = app.listen(port, function() {
  console.log("Listening on port %d", port);
});