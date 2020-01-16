import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import Notes from './components/notes';
import * as serviceWorker from './serviceWorker';
const io = require('socket.io-client');

var socketURI = 'localhost:4001';
//var socketURI = '173.22.77.190:3000';
var socket;

class Index extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
      name: '',
      room: '',
      notes: []
    };
  };

  //Connects the user to a room then handles all incoming socket pushes
  connectUser = (userName, userRoom, callback) =>{
    this.setState({name : userName});
    socket = io(socketURI);
    socket.emit('join', userName, userRoom, (room) => {
      if(room === ''){
        callback();
      }
      this.setState({room : room});
    });

    socket.on('send notes', (notes) => {
      const addNotes = this.state.notes.concat(notes);
      this.setState({notes: addNotes});
    });

    socket.on('note changed', (note, num) => {
      const notes = this.state.notes.map((item, key) => {
          if (key === num) {
            return note;
          } else {
            return item;
          }
        });
        this.setState({notes: notes});
    });

    socket.on('new note', (note) => {
      const addNotes = this.state.notes.concat(note);
      this.setState({notes: addNotes});
    });

    socket.on('note removed', (notes) => {
      this.setState({notes: notes});
    });

    socket.on('user joined or left', (users) => {
      this.setState({users: users});
    });
  }

  //Adds a note to the notes[] var and sends it to the socket
  addNote = (e) => {
    var note = {
      x: 20,
      y: 60,
      body: "",
      color: "#2196F3"
    };
    const notes = this.state.notes.concat(note);
    this.setState({notes: notes});
    socket.emit('created note', note);
  }

  //Handles the note body change
  noteBodyChange = (body, num) => {
    var note = null;
    const notes = this.state.notes.map((item, key) => {
        if (key === num) {
          item.body = body;
          note = item;
          return item;
        } else {
          return item;
        }
      });
    this.setState({notes: notes});
    socket.emit('changed note', note, num);
  }

  //Handles the note color change
  noteColorChange = (color, num) => {
    var note = null;
    const notes = this.state.notes.map((item, key) => {
        if (key === num) {
          item.color = color;
          note = item;
          return item;
        } else {
          return item;
        }
      });
    this.setState({notes: notes});
    socket.emit('changed note', note, num);
  }

  //Handles the note position change
  noteMoved = (pageX, pageY, num) => {
    var note = null;
    const notes = this.state.notes.map((item, key) => {
        if (key === num) {
          item.x = pageX;
          item.y = pageY;
          note = item;
          return item;
        } else {
          return item;
        }
      });
    this.setState({notes: notes});
    socket.emit('changed note', note, num);
  }

  //send the id of the note to be removed to the server
  noteRemoved = (num) => {
    socket.emit('delete note', num);
  }

  render(){
    var returnCom;
    if(this.state.name === '' || this.state.room === ''){
      returnCom = <Login connectUser={this.connectUser} />;
    }
    else {
      returnCom = <Notes notes={this.state.notes} userRoom={this.state.room}
        addNote={this.addNote} noteBodyChange={this.noteBodyChange}
        noteMoved={this.noteMoved} noteColorChange={this.noteColorChange}
        noteRemoved={this.noteRemoved} users={this.state.users}/>;
    }
    return (returnCom);
  };
};

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
