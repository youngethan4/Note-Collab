import React from 'react';
import './style.css';
import './note.css';
import Move from './pics/move.png';
import Trash from './pics/trash.png';
import Options from './pics/options.png';
import Blue from './pics/blue.png';
import Yellow from './pics/yellow.png';
import Green from './pics/green.png';
import Orange from './pics/orange.png';

class Note extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dragging: false,
      posRX: null,
      posRY: null
    }
  }

  //Creates an event to handle the position changes of the notes
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  //When the mouse is clicked it created a relative position based on the offset of the page
  dragMouseDown = (e) => {
    if (e.button !== 0) return
    var rect = document.getElementById(this.props.moveID).getBoundingClientRect();
    this.setState({
      dragging: true,
      posRX: e.pageX - rect.left,
      posRY: e.pageY - rect.top
    });
    e.preventDefault();
    e.stopPropagation();
  }

  //While the mouse is down and moving, this method sends updates to the parent component for processing
  onMouseMove = (e) => {
    if (!this.state.dragging) return;
    this.props.noteMoved(e.pageX, e.pageY, this.state.posRX, this.state.posRY, this.props.moveID);
    e.stopPropagation();
    e.preventDefault();
  }

  //As soon as the mouse is unclicked, the note will stop dragging
  onMouseUp = (e) => {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  }

  //Sends the title changes to the parent component for processing
  handleNoteTitleChange = (e) => {
    this.props.noteTitleChange(e.target.value, this.props.moveID);
  }

  //Sends the body changes to the parent component for processing
  handleNoteBodyChange = (e) => {
    this.props.noteBodyChange(e.target.value, this.props.moveID);
  }

  //Sends the color changes to the parent component for processing
  changeBlue = (e) => {
    this.props.noteColorChange("#2196F3", this.props.moveID);
  }

  //Sends the color changes to the parent component for processing
  changeYellow = (e) => {
    this.props.noteColorChange("#f3ec21", this.props.moveID);
  }

  //Sends the color changes to the parent component for processing
  changeGreen = (e) => {
    this.props.noteColorChange("#21f32f", this.props.moveID);
  }

  //Sends the color changes to the parent component for processing
  changeOrange = (e) => {
    this.props.noteColorChange("#f39121", this.props.moveID);
  }

  //Sends the note id to the parent component for processing
  handleNoteRemove = (e) => {
    this.props.noteRemoved(this.props.moveID);
  }

  render(){
    var { x, y, title, body, color } = this.props.note;
    x += 'px';
    y += 'px';
    var returnCom =
    <div id="note" style={{left: x, top: y, backgroundColor: color}} className="mydiv">
      <div className="mydivheader" >
        <input className="noteTitle" placeholder="Title" type="text" onChange={this.handleNoteTitleChange} value={title}></input>
        <img className="noteMove" id={this.props.moveID} src={Move} onMouseDown={this.dragMouseDown} alt="move" ></img>
        <div className="dropdown">
          <img className="noteOptions" src={Options} alt="options" ></img>
          <div className="dropdownContent">
            <img src={Blue} onClick={this.changeBlue} alt="blue" ></img>
            <img src={Yellow} onClick={this.changeYellow} alt="yellow" ></img>
            <img src={Green} onClick={this.changeGreen} alt="green" ></img>
            <img src={Orange} onClick={this.changeOrange} alt="orange" ></img>
            <img src={Trash} onClick={this.handleNoteRemove} alt="remove" ></img>
          </div>
        </div>
      </div>
      <textarea className="noteBody" placeholder="Body" type="text" onChange={this.handleNoteBodyChange} value={body}></textarea>
    </div>

      return(returnCom);
  }
}

  export default Note;
