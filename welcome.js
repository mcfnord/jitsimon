// var re = require('re');

var http = require('https');

var options = {
  host: 'explorer.jamulus.io',
  port: 443,
  path: '/servers.php?query=77.161.84.130:22124'
}

var v = http.get(options, function(res) {
//  console.log("Got response: " + res.statusCode);

  res.on("data", function(chunk) {
    // console.log( "BODY: " + chunk );
 result_body = JSON.parse(chunk) ;
 var welcome = result_body[0].welcome ;

 const regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
 const array = [...welcome.matchAll(regexp)];
 for(i = 0; i < array.length; i++)
 {
	 var url = array[i][0];
	 if(url.includes("https://meet.jit.si/"))
		 console.log(url);
 }

  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

