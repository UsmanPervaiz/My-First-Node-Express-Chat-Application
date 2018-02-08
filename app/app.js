var express = require('express');
var app = express();
var io = require('socket.io')();

var users = [];
var connections = [];

app.set('port', process.env.PORT || 3000);

app.use(require("./routes/index"));

var server = app.listen(app.get("port"), function() {
	console.log("Listening on port: ", app.get("port"))
})

io.attach(server)





//===================================================================

//var server = app.listen(app.get('port'), function() {
  //console.log('Listening on port ' + app.get('port'));
//});

// var http = require('http');
//
// var myServer = http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type" : "text/html"});
//   response.write('<h1>Roux Meetups</h1>');
//   response.end();
// });
//
// myServer.listen(3000);
// console.log('Go to http://localhost:3000 on your browser');

//====================================================================

//app.use(express.static(path.join(__dirname, '/public')))

//The file "background.jpg" from "public/images" directory can now
//be accessed via the url: localhost:3000/misc/background.jpg

//By setting a static folder, all the files and folders inside the 
//static folder can now be accessed via the url. The static directory
// is now accessible from the root (/) of our document.

//Files can also be accessed via the <img> element, by setting its
//"src" property = "/misc/background.jpg". Again, remember that the
//"public/images" folder can be accessed from the root directory 
//to serve static files and that is why we set src="/misc/background.jpg",
//here "/"=/public/images (root directory to serve static files).

//=======================================================================

//var server = app.listen(app.get('port'), function() {
  //console.log('Listening on port ' + app.get('port'));
//});

//app.listen(port,[hostname], [backlog], [callback]);
//Binds and listens for connections on the specified host and port.
//This method is identical to Node's "http.Server.listen()";

//The "app" returned by "app = express()" is in fact a javascript Function.
//designed to be passed to Node's HTTp servers s a callback to handle requests.
//This makes it easy to provide both HTTP and HTTPS versions of your app
//with the same code base, as the app does not inherit from these
//(it is simply a callback).

//var express = require('express');
//var app = express();
//var http = require('http');
//var https = require('https');

//http.createServer(app).listen(80);
//https:.createServer(options, app).listen(443);

//OR

//app.listen(3000);

//The "app.listen() method returns an "http.Server object and (for HTTP)
//is a convenience method for the following:

//app.listen = function() {
	//var server = http.createServer(this);
	//return server.listen.apply(server, arguments);
//}


//=========================================================================

//reload(app);

//NODEMON and RELOAD

//npm install -g nodemon
//"scripts": {
    //"start": "nodemon app/app.js"
//}
//This package is used to make node rerun the server after every change 
//that we make in our project. After installing the nodemon package, we 
//must add the above line in "package.json.scripts".

//After that we must restart our server, "npm start".
//Now node will rerun the server after every change, but still doesnt 
//refresh the webpage for us.

//To make node automatically refresh and reload your code in your browser
//after any code change, we have to install a node plugin called "reload". 
//"reload" will work side by side with the "nodemon" package to give us 
//what we need.

//npm install -g reload

//Now we need to install this package as a dependency for any project 
//that you are currently working on:

//npm install --save reload

//After the installation reload will show up in package.json.dependencies:

	//"dependencies": {
		//"express": "^4.14.0",
		//"reload": "^1.0.0"
	//}

//Now all we have to do is "require" the reload package in our application.

	//var reload = require('reload');
	//...
	//reload(server, app);

//When used with Express "reload" creates a new Express route for reload. 
//When you restart the server, the client will detect the server being 
//restarted and automatically refresh the page.

//At the end, you must enter a script in all your pages that allows 
//the browser to know thatit is time to reload the page:

	//<script src="/reload/reload.js"</script>

//Instead of doing "app.listen()" for reload, we can also do:

// var server = http.createServer(app);
// reload(app);
// server.listen(app.get('port'), function() {
// 	console.log("Web server listening on port " + app.get('port'))
// })

//That is it for nodemon and reload.

//========================================================================

//"scripts": {
    //"start": "nodemon -e css,ejs,js,json --watch app"
  //}