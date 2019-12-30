import React from 'react';
import './style.css';
import Note from './note.js';

class Notes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      notes: [],
      room: ""
    }
  }

  render(){
    var { notes, userRoom } = this.props;

    var returnCom =
    <div className="setup">
      <div className="room">
        <p><strong>Room Name:<br></br>{userRoom}</strong></p>
      </div>
      <div className="addNote">
        <button className="buttonAdd" onClick={this.props.addNote}>+</button>
      </div>
      {notes.map((item, key) =>
        <Note note={item} key={key} moveID={key} noteBodyChange={this.props.noteBodyChange}
          noteTitleChange={this.props.noteTitleChange} noteMoved={this.props.noteMoved}
          noteColorChange={this.props.noteColorChange} noteRemoved={this.props.noteRemoved}/>
      )}
    </div>

    return (returnCom);
  }
}

export default Notes;
