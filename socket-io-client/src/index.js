import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import './index.css';
import Login from './components/login/login.js';
import Notes from './components/note/notes.js';
import * as serviceWorker from './serviceWorker';
const io = require('socket.io-client');

const socketURI = 'localhost:4001';
//var socketURI = '173.22.77.190:3000';
var socket;


class Index extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
      room: '',
      notes: [],
      users: []
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
       for (var note of notes){
         note.body = EditorState.createWithContent(convertFromRaw(JSON.parse(note.body)));
       }
      const addNotes = this.state.notes.concat(notes);
      this.setState({notes: addNotes});
    });

    socket.on('note changed', (note, num) => {
      note.body = EditorState.createWithContent(convertFromRaw(JSON.parse(note.body)));
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
      note.body = EditorState.createWithContent(convertFromRaw(JSON.parse(note.body)));
      const addNotes = this.state.notes.concat(note);
      this.setState({notes: addNotes});
    });

    socket.on('note removed', (notes) => {
      for (var note of notes){
        note.body = EditorState.createWithContent(convertFromRaw(JSON.parse(note.body)));
      }
      this.setState({notes: notes});
    });

    socket.on('user joined or left', (users) => {
      this.setState({users: users});
    });
  }



  sendAddedNote = (note) =>{
    const content = note.body.getCurrentContent();
    var rawContent = JSON.stringify(convertToRaw(content));
    var sendNote = {
      x: note.x,
      y: note.y,
      body: rawContent,
      color: note.color,
      height: note.height,
      width: note.width
    };
    socket.emit('created note', note);
  }

  addNote = (note) => {
    const notes = this.state.notes.concat(note);
    this.setNotes(notes);
  }

  setNotes = (notes) => {
    this.setState({notes: notes});
  }

  sendChangedNote = (note, num) => {
    const content = note.body.getCurrentContent();
    var rawContent = JSON.stringify(convertToRaw(content));
    var changedNote = {
      x: note.x,
      y: note.y,
      body: rawContent,
      color: note.color,
      height: note.height,
      width: note.width
    }
    socket.emit('changed note', changedNote, num);
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
        users={this.state.users} socket={socket} addNote={this.addNote}
        setNotes={this.setNotes} sendChangedNote={this.sendChangedNote}
        sendAddedNote={this.sendAddedNote} currentUser={this.state.name}/>;
    }
    return (returnCom);
  };
};

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
