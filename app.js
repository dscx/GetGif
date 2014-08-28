var express = require('express');
var http = require('http');
var ejs = require('ejs');
var url = require('url');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var config = require('./config/config.js');

var twitterResponse = {};
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

var trends = [];

app.get('/twitter', function(req, res){
  res.send(twitterResponse);
  }
  );


var getTrends = function(){
console.log('getTrends');
var options = {
    url: 'https://api.twitter.com/1.1/trends/place.json?id=23424977',
    headers: {
        'Authorization': 'Bearer ' + config.twitterKey
    }
  };


request( options, function (error, response, body){
  console.log(error);
  // console.log(response);
  var trendsResult = JSON.parse(body)[0].trends;
  
  for ( var i = 0; i < trendsResult.length; i++){
    trends.push(trendsResult[i].name);
  }

  trendStop = trendsResult.length - 1;
    // console.log(trends);

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
      // console.log(trends[k], 'trends k');
      
        // console.log(giphyUrl);
        getTrendGifs(searchTerm, function (){
          // res.send(trendsObject);
          twitterResponse = parseGiphyObject(trendsObject);
          // console.log(twitterResponse);
        }); 
    
  }
}); 
};

var getTrendGifs = function (searchTerm, callback){
  // console.log(callback);
  var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC";
        request(giphyUrl, function (error, response, body) {
          // console.log(body);
          if(JSON.parse(body).data[0]){

          // var tempObject = JSON.parse(body).data[0];
          // trendsObject[searchTerm] = [JSON.parse(body).data[0].images.original.url];
          trendsObject[searchTerm] = JSON.parse(body).data;
          trendCounter++;
            if (trendCounter >= trendStop){
              console.log(trendCounter, 'line 103');
              callback();
              trendCounter = 0;
            }

          }
          else{
            trendCounter++;

            if (trendCounter >= trendStop){
              console.log(trendCounter, 'line 113');
              callback();
              trendCounter = 0;
            }
          }
        });

};


var parseGiphyObject = function (obj){
  var tempObj = {};

  for ( var key in obj ){
    // console.log(obj[key][0].type, key);
    tempObj[key] = [];
      var topic = obj[key];
    for ( var i = 0; i < obj[key].length; i++){
      // console.log(i, ' i');
      tempObj[key].push(topic[i].images['original']['url']);
    }
    // console.log(obj[key][0].images.original);
  //   tempObj[key] = [];
  //   console.log(key, 'key');
  //   // console.log(obj[key].length);
  //   for ( var i = 0; i < obj[key].length; i++){
  //      // console.log(obj[key][i].images.orginal);
  //      // if ( obj[key][i].images.hasOwnProperty('orginal')){

  //     tempObj[key].push(obj[key]);
  //      // }
  //   }
  //   // console.log(tempObj);
  }
    return tempObj;

};


// });

app.post('/', function(req, res){

  var giphyTerms = req.body;
  var completeResponse = {};

  var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphyTerms + "&api_key=dc6zaTOxFJmzC&limit=100";
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



getTrends();

setInterval(getTrends, 1000000);



var server = app.listen(port, function() {
  console.log("Listening on port %d", port);
});