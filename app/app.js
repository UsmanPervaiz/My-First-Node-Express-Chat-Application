var express = require('express');
var app = express();
var reload = require('reload');
var io = require('socket.io')();

var users = [];
var lowerCaseUsers = [];
var connections = [];

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", "app/views");

app.use(require("./routes/index"));

var server = app.listen(app.get("port"), function() {
	console.log("Listening on port: ", app.get("port"))
})

io.attach(server)

io.on('connection', function(socket) {
	connections.push(socket);
	console.log(socket.id, " connected")
	console.log("Connected: %s sockets connected.", connections.length);

	//Disconnect:

	socket.on("disconnect", function(data) {
		connections.splice(connections.indexOf(socket), 1);
		users.splice(users.indexOf(socket.username), 1);
		lowerCaseUsers.splice(lowerCaseUsers.indexOf(socket.username), 1);
		io.emit("update usernames", users);
		console.log(socket.id, " disconnected")
		console.log("Connected: %s sockets connected.", connections.length);
	})

	//New User:

	socket.on("new user", function(username, fn) {
		if(lowerCaseUsers.includes(username.toLowerCase())) {
			socket.emit("username exists")
		} else {
			socket.username = username;
			users.push(username);
			lowerCaseUsers.push(username.toLowerCase());
			fn(true);
			io.emit("update usernames", users);
		}
	});

	//Send Message:

	socket.on("send message", function(data) {
		io.emit("new message", {username: socket.username, msg: data})
	});

	//The user will use the message form in his browser to submit
	//a new chat message. On the client side we will fire a submit
	//event once the user hits enter/submit, in this submit event
	//handler we will emit a "send message" event from that specific 
	//user/socket.

	//Now remember that every user that connects to our server gets
	//a unique socket id, which means that every user gets their own
	//private socket to emit and listen for events. Below we are attaching 
	//an event listener called "new message" on every unique socket id.
	//A user shares the same socket.id between the browser and
	//the server, in other words, he is known by the same socket as
	//long as he is connected to our server, when he disconnects and 
	//reconnects, he gets a new unique socket.id every time.

	//From the browser the user will emit a new event from his socket, 
	//which will be caught on the server side by the same socket. 
	//Below we are asking the socket to listen for an event called 
	//"new message". Now when this event is caught on the server side,
	//we will emit a new event, but this time we won't use the "socket"
	//to emit, instead we will use "io.emit" so that every user or
	//socket that is currently connected to our server/io can listen
	//for this new event from the server. If we again use "socket.emit"
	//we will simply be sending messages back and forth to the same 
	//socket and other sockets connected to our server, will not be
	//notified of new events.


});

reload(app)


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