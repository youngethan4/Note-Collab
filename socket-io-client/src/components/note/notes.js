import React from 'react';
import Note from './note.js';
import Nav from '../nav/nav.js';
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js';

const newNoteX = 20;
const newNoteY = 60;
const newNoteColor = "#2196F3";
const newNoteWidth = 250;
const newNoteHeight = 250;
var newNoteBody = EditorState.createEmpty();
const newNoteAlign = "left";

class Notes extends React.Component {
  constructor(){
    super();

    this.state = {
      notes: []
    };
  };

  static getDerivedStateFromProps(props, state){
    return {notes:  props.notes};
  }

  //Adds a note to the notes[] var and sends it to the socket
  addNote = (e) => {
    var note = {
      x: newNoteX,
      y: newNoteY,
      body: newNoteBody,
      color: newNoteColor,
      height: newNoteHeight,
      width: newNoteWidth,
      align: newNoteAlign
    };

    this.props.addNote(note);
    this.props.sendAddedNote(note);
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
    this.props.setNotes(notes);
    this.props.sendChangedNote(note, num);
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
    this.props.setNotes(notes);
    this.props.sendChangedNote(note, num);
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
    this.props.setNotes(notes);
    this.props.sendChangedNote(note, num);
  }

  noteResize = (width, height, num) => {
    var note = null;
    const notes = this.state.notes.map((item, key) => {
        if (key === num) {
          item.height = height;
          item.width = width;
          note = item;
          return item;
        } else {
          return item;
        }
      });
    this.props.setNotes(notes);
    this.props.sendChangedNote(note, num);
  }

  noteAllignmentChanged = (alignment, num) => {
    var note = null;
    const notes = this.state.notes.map((item, key) => {
        if (key === num) {
          item.align = alignment;
          note = item;
          return item;
        } else {
          return item;
        }
      });
    this.props.setNotes(notes);
    this.props.sendChangedNote(note, num);
  }

  render(){
    var {notes, userRoom, socket, users, currentUser} = this.props;

    var returnCom =
    <div className="setup">
      <Nav userRoom={userRoom} addNote={this.addNote} users={users} socket={socket}
      currentUser={currentUser}/>
      <div id="notes">
        {notes.map((item, key) =>
          <Note note={item} key={key} ID={key} noteBodyChange={this.noteBodyChange}
            noteMoved={this.noteMoved} noteColorChange={this.noteColorChange}
            noteRemoved={this.noteRemoved} noteAllignmentChanged={this.noteAllignmentChanged}
            noteResize={this.noteResize}/>
        )}
      </div>
    </div>

    return (returnCom);
  }
}

export default Notes;
