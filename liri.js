var fs = require('fs');

fs.readFile("keys.js", "utf8", function(error, data) {
  if (error){
    return console.log(error);
  }
  // var dataArr = data.split(",");
  // console.log(data.consumer_key);

  // var jsn = JSON.stringify(data)
  // console.log(jsn);
});

var request = require("request");
var arg = process.argv[2];
// console.log(process.argv.length);
if (arg === 'my-tweets') {

}
else if (arg === 'spotify-this-song') {

  if (process.argv.length <4) {
    var songName = 'the sign';
  }
  else {
    var songName = process.argv[3];
  }

  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: 'b770aa08d0ca410ca2a2273c599f83cf',
    secret: '053a3b94963340acb0f87c4fbda41e54'
  });

// 0hrBpAOgrt8RXigk83LLNE
  // spotify.search({ type: 'track', query: songName }, function(err, data) {
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
      // console.log(JSON.stringify(data));
      var artistArr = [];
      for (var i=0; i<data.tracks.items[0].artists.length; i++) {
        artistArr.push(data.tracks.items[0].artists[i].name);
      }
      console.log("Artist(s): " + artistArr.join(", "));//data.tracks.items[0].artists[1].name);
      console.log("Album: " + data.tracks.items[0].name);
      console.log("Song: " + data.tracks.items[0].album.name);
      console.log("Preview: " + data.tracks.items[0].preview_url);
    }

  });


}
else if (arg === 'movie-this') {
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
else if (arg === 'do-what-it-says') {
  var fs = require('fs');

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error){
      return console.log(error);
    }
    var dataArr = data.split(",");
    var arg1 = process.argv[0];
    var arg2 = process.argv[1]
    var arg3 = dataArr[0];
    var arg4 = dataArr[1]
    console.log(arg1 + " " + arg2 + " " + arg3 + " " + arg4);

  });
}
