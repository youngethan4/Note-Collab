import React from 'react';
import './style.css';
import Note from './note.js';
import Nav from './nav.js';

class Notes extends React.Component {

  render(){
    var { notes, userRoom, users } = this.props;

    var returnCom =
    <div className="setup">
      <Nav userRoom={userRoom} addNote={this.props.addNote} users={users}/>
      <div id="notes">
        {notes.map((item, key) =>
          <Note note={item} key={key} moveID={key} noteBodyChange={this.props.noteBodyChange}
            noteTitleChange={this.props.noteTitleChange} noteMoved={this.props.noteMoved}
            noteColorChange={this.props.noteColorChange} noteRemoved={this.props.noteRemoved}/>
        )}
      </div>
    </div>

    return (returnCom);
  }
}

export default Notes;
