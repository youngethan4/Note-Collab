var express = require('express');
var  app = express();
const path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var  bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
var  port = 4001;
const {chat} = require('./modules/chat.js');
const {generateRoom} = require('./modules/roomGenerator.js');

//sends the index page to the client
app.get("/", (req, res) =>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var rooms = {};
const notes = "notes";
const users = "users";
io.on('connection', (socket) => {
			//joins a room that is specified by the user or creates a new room
    	socket.on('join', (name, room, callback) => {
				var userRoom = room;
				if(userRoom === ""){
					var createdRoom = false;
					do {
						var newRoom = generateRoom(4);
						if (rooms[newRoom] == undefined){
              rooms[newRoom] = {};
							rooms[newRoom][notes] = [];
              rooms[newRoom][users] = [];
							userRoom = newRoom;
							createdRoom = true;
						}
					}
					while (!createdRoom);
				}
				if(rooms[userRoom] != undefined){
					console.log(name +" has joined the room " + userRoom + ".");
          rooms[userRoom][users].push(name);
          console.log(rooms[userRoom][users]);
					socket.user = name;
					socket.room = userRoom;
					socket.join(socket.room);
					//Sends all notes to the new user
	        socket.emit('send notes', rooms[socket.room][notes]);
          io.to(socket.room).emit('user joined or left', rooms[socket.room][users]);
				}
				else{
					userRoom = '';
					console.log(name + " tryed to join a nonexsistant room.")
				}
        callback(userRoom);
    	});

			socketNotes(socket);
      chat(socket);

			//Lets console know when user dissconnects.
    	socket.on('disconnect', () => {
	 	   	//console.log(socket.user + ' has left room ' + socket.room +".");
        if (rooms[socket.room] == undefined || rooms[socket.room][users] == undefined
          || rooms[socket.room][users].length <= 1){
          rooms[socket.room] = undefined;
        }
        else {
          rooms[socket.room][users].splice(rooms[socket.room][users].indexOf(socket.user), 1);
          io.to(socket.room).emit('user joined or left', rooms[socket.room][users]);
          //console.log(rooms[socket.room][users]);
        }
	  	});
		});

function socketNotes(socket){
  //When a note is changed or added this handler is called.
  socket.on('changed note', (note, num) => {
    rooms[socket.room][notes][num] = note;
    socket.to(socket.room).emit('note changed', note, num);
  });

  //handles a created note
  socket.on('created note', (note) => {
    console.log(note);
    rooms[socket.room][notes].push(note);
    socket.to(socket.room).emit('new note', note);
  });

  //handles a deleted note
  socket.on('delete note', (num) => {
    rooms[socket.room][notes].splice(num, 1);
    io.to(socket.room).emit('note removed', rooms[socket.room][notes]);
  });
}

server.listen(port);
console.log("Listening on port " + port);
