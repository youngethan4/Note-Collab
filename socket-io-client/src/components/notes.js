import React from 'react';
import './style.css';
import Note from './note.js';

class Notes extends React.Component {
  constructor(props){
    super(props);
  }

  copyRoom = (e) => {
    console.log("here");
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
  }

  render(){
    var { notes, userRoom } = this.props;

    var returnCom =
    <div className="setup">
      <textarea style={{visibility: "gone"}}
        ref={(textarea) => this.textArea = textarea}
        value={userRoom} readOnly
      />
      <div className="nav">
        <ul>
          <li>
            <a><button className="buttonAdd" onClick={this.props.addNote}>Add Note</button></a>
          </li><li>
            <a>Room Number: {userRoom}<br></br>
            <button className="buttonRoom" onClick={this.copyRoom}>click me to copy</button></a>
          </li>
        </ul>
      </div>
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
