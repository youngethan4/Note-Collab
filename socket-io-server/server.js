var express = require('express');
var  app = express();
const path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var  bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
var  port = 4001;

//sends the index page to the client
app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var rooms = {};
io.on('connection', (socket) => {
			//joins a room that is specified by the user or creates a new room
    	socket.on('join', (name, room, callback) => {
				var userRoom = room;
				if(userRoom === ""){
					var createdRoom = false;
					do {
						var newRoom = makeRoom(4);
						if (rooms[newRoom] == undefined){
							rooms[newRoom] = [];
							userRoom = newRoom;
							createdRoom = true;
						}
					}
					while (!createdRoom);
				}
				if(rooms[userRoom] != undefined){
					console.log(name +" has joined the room " + userRoom + ".");
					socket.user = name;
					socket.room = userRoom;
					socket.join(socket.room);
					//Sends all notes to the new user
	        socket.emit('send notes', rooms[socket.room]);
				}
				else{
					userRoom = '';
					console.log(name + " tryed to join a nonexsistant room.")
				}
        callback(userRoom);
    	});

			//When a note is changed or added this handler is called.
			socket.on('changed note', (note, num) => {
				rooms[socket.room][num] = note;
				socket.to(socket.room).emit('note changed', note, num);
			});

      //handles a created note
      socket.on('created note', (note) => {
        rooms[socket.room].push(note);
        socket.to(socket.room).emit('new note', note);
      });

      //handles a deleted note
      socket.on('delete note', (num) => {
        rooms[socket.room].splice(num, 1);
        io.to(socket.room).emit('note removed', rooms[socket.room]);
      });

			//Lets console know when usre dissconnects.
    	socket.on('disconnect', () => {
	 	   		console.log(socket.user + ' has left room ' + socket.room +".");
	  	});
		});

//Creates a randomized room for security
function makeRoom(length) {
	var result           = '';
	var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

server.listen(port);
console.log("Listening on port " + port);
