var request = require("request");
var command = process.argv[2];
var commandRef = 0;
var arg = process.argv[3];

var execute = function(command) {
  // tweets
  if (command === 'my-tweets') {
  const key = require('./keys.js');

    var params = {screen_name: 'veloxero'};
    key.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i=0; i<tweets.length; i++) {
          console.log(tweets[i].created_at, tweets[i].text);
        }
      }
    });
  }
  // spotify
  else if (command === 'spotify-this-song') {
    if (process.argv.length <4 && commandRef === 0) {
      var songName = 'the sign';
    }
    else {
      var songName = arg;
    }

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
      id: 'b770aa08d0ca410ca2a2273c599f83cf',
      secret: '053a3b94963340acb0f87c4fbda41e54'
    });

    spotify.search({ type: 'track', query: songName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      if (songName === 'the sign') {
        console.log("Artist(s): " + data.tracks.items[4].artists[0].name);
        console.log("Album: " + data.tracks.items[4].name);
        console.log("Song: " + data.tracks.items[4].album.name);
        console.log("Preview: " + data.tracks.items[4].preview_url);
      }
      else {
        var artistArr = [];
        for (var i=0; i<data.tracks.items[0].artists.length; i++) {
          artistArr.push(data.tracks.items[0].artists[i].name);
        }
        console.log("Artist(s): " + artistArr.join(", "));
        console.log("Album: " + data.tracks.items[0].name);
        console.log("Song: " + data.tracks.items[0].album.name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
      }
    });
  }
  // movie
  else if (command === 'movie-this') {
    // check to make sure there are four arguments, if not use default movie
    if (process.argv.length <4) {
      var movieName = 'Mr. Nobody'; //default movie
    }
    else {
      // replace all instances of space with the "+" symbol
      var movieName = process.argv[3].replace(/ /g, "+");
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var title = JSON.parse(body).Title;
        var year = JSON.parse(body).Year;
        var imdbRating = JSON.parse(body).imdbRating;
        var rottenTomatoes = JSON.parse(body).Ratings[1].Source;
        var rottenTomatoesRating = JSON.parse(body).Ratings[1].Value;
        var country = JSON.parse(body).Country;
        var language = JSON.parse(body).Language;
        var plot = JSON.parse(body).Plot;
        var actors = JSON.parse(body).Actors;

        console.log("Title: " + title);
        console.log("Release Year: " + year);
        console.log("IMDB Rating: " + imdbRating);
        console.log(rottenTomatoes + " Rating: " + rottenTomatoesRating);
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Plot: " + plot);
        console.log("Actors: " + actors);
      }
    });
  }
  //do what
  else if (command === 'do-what-it-says') {
    var fs = require('fs');
      fs.readFile("random.txt", "utf8", function(error, data) {
        if (error){
          return console.log(error);
        }
        var dataArr = data.split(",");
        var str1 = dataArr[0];
        var str2 = dataArr[1];
        commandRef = 1;
        arg = str2;
        execute(str1);
    });

  } // do-what-it-says
  else {
    console.log('usage: node liri.js [my-tweets] | [spotify-this-song] "string"| [movie-this] "string"| [do-what-it-says]');
    // console.log(process.env);
  }

}
execute(command);
