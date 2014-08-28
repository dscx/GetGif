var express = require('express');
var http = require('http');
var ejs = require('ejs');
var url = require('url');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var config = require('./config/config.js');


var port = process.env.PORT || 3000;
var trendCounter = 0;
var trendStop;
var trendsObject = {};
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


app.get('/twitter', function(req, res){

var options = {
    url: 'https://api.twitter.com/1.1/trends/place.json?id=23424977',
    headers: {
        'Authorization': 'Bearer ' + config.twitterKey
    }
};

request( options, function (error, response, body){
  console.log(error);
  var trendsResult = JSON.parse(body)[0].trends;
  var trends = [];
  for ( var i = 0; i < trendsResult.length; i++){
    trends.push(trendsResult[i].name);
  }
  trendStop = trendsResult.length - 1;
    console.log(trends);

    //request images for trends
    var counter = 0;
    for ( var k = 0; k < trends.length; k++){
      searchTerm = trends[k];
      searchTerm = searchTerm.split('');
      for ( var l = 0; l < searchTerm.length; l++){
        if ( searchTerm[l] === '#'){
          searchTerm[l] = '';
        }
      }

      var objectKey = trends[k];

      searchTerm = searchTerm.join('');
      console.log(trends[k], 'trends k');
      
        // console.log(giphyUrl);
        getTrendGifs(searchTerm, function (){
          res.send(trendsObject);
        });
    }
  }

  );

var getTrendGifs = function (searchTerm, callback){
  var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC";
        request(giphyUrl, function (error, response, body) {
          if(JSON.parse(body).data[0]){

          // console.log(JSON.parse(body).data[0].images);
          var tempObject = JSON.parse(body).data[0];
          // console.log(tempObject.images);
          // console.log(trends[k], 'trends k');
          trendsObject[searchTerm] = JSON.parse(body).data[0].images.original.url;
          console.log(trendsObject);
          // counter++;
          // if (counter >= trends.length - 1){
          //   console.log('alll done');
          // }
          trendCounter++;
            if (trendCounter >= trendStop){
              callback();
              trendCounter = 0;
            }

          }
          else{
            trendCounter++;
            if (trendCounter >= trendStop){
              callback();
              trendCounter = 0;
            }
          }
        });

};


// "Bearer " + twitterKey


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