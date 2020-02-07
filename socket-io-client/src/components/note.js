import React from 'react';
import './style.css';
import './note.css';
import Rich from './rich.js';
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
      posRY: null,
      oldX: 0,
      oldY: 0
    }
  }

  //Creates an event to handle the position changes of the notes
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  //When the mouse is clicked it created a relative position based on the offset of the page
  dragMouseDown = (e) => {
    if (e.button !== 0) return
    var rect = document.getElementById(this.props.ID).getBoundingClientRect();
    this.setState({
      dragging: true,
      posRX: e.pageX,
      posRY: e.pageY
    });
    e.preventDefault();
    e.stopPropagation();
  }

  //While the mouse is down and moving, this method sends updates to the parent component for processing
  onMouseMove = (e) => {
    if (!this.state.dragging) return;
    var offsetX = e.pageX - this.state.posRX;
    var offsetY = e.pageY - this.state.posRY;
    this.setState({
      dragging: true,
      posRX: e.pageX,
      posRY: e.pageY
    });
    var newX = this.props.note.x + offsetX;
    var newY = this.props.note.y + offsetY;
    if (newX < 0) newX = 0;
    if (newY < 45) newY = 45;
    this.props.noteMoved(newX, newY, this.props.ID);
    e.stopPropagation();
    e.preventDefault();
  }

  //As soon as the mouse is unclicked, the note will stop dragging
  onMouseUp = (e) => {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  }

  //Sends the body changes to the parent component for processing
  handleNoteBodyChange = (e) => {
    console.log(e.target.value);
    this.props.noteBodyChange(e.target.value, this.props.ID);
  }

  //Sends the color changes to the parent component for processing
  changeBlue = (e) => {
    this.props.noteColorChange("#2196F3", this.props.ID);
  }

  //Sends the color changes to the parent component for processing
  changeYellow = (e) => {
    this.props.noteColorChange("#f3ec21", this.props.ID);
  }

  //Sends the color changes to the parent component for processing
  changeGreen = (e) => {
    this.props.noteColorChange("#21f32f", this.props.ID);
  }

  //Sends the color changes to the parent component for processing
  changeOrange = (e) => {
    this.props.noteColorChange("#f39121", this.props.ID);
  }

  //Sends the note id to the parent component for processing
  handleNoteRemove = (e) => {
    this.props.noteRemoved(this.props.ID);
  }

  handleResize = (e) => {
    console.log(e);
  }

  render(){
    var { x, y, body, color } = this.props.note;
    x += 'px';
    y += 'px';
    var returnCom =
    <div className="note" id={"note"+this.props.ID} style={{left: x, top: y}} >
      <Rich note={this.props.note} noteBodyChange={this.props.noteBodyChange} id={this.props.ID}
      noteAllignmentChanged={this.props.noteAllignmentChanged}/>
      <div className="moveOptions" >
        <img className="noteMove" id={this.props.ID} src={Move} onMouseDown={this.dragMouseDown} alt="move" ></img>
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
    </div>

      return(returnCom);
  }
}

export default Note;
