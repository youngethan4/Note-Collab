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
import Bold from './pics/bold.png';
import Italic from './pics/italic.png';
import Underline from './pics/underline.png';
import AlignLeft from './pics/leftAlign.png';
import AlignCenter from './pics/centerAlign.png';
import AlignRight from './pics/rightAlign.png';

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
    if (newX < 0 || e.pageX <= 235) newX = 0;
    if (newY < 45 || e.pageY <= 60) newY = 45;
    this.props.noteMoved(newX, newY, this.props.moveID);
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

  boldHandler = (e) => {

  }

  italicHandler = (e) => {

  }

  underlineHandler = (e) => {

  }

  alignLeftHandler = (e) => {

  }

  alignCenterHandler = (e) => {

  }

  alignRightHandler = (e) => {

  }

  render(){
    var { x, y, title, body, color } = this.props.note;
    x += 'px';
    y += 'px';
    var returnCom =
    <div id="note" style={{left: x, top: y, backgroundColor: color}} className="mydiv">
      <div className="styleDropdown">
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
        <div>
          <textarea className="noteBody" placeholder="Body" type="text" onChange={this.handleNoteBodyChange} value={body}></textarea>
          <div className="styleContent">
            <img src={Bold} onClick={this.boldHandler} alt="bold" ></img>
            <img src={Italic} onClick={this.italicHandler} alt="italic" ></img>
            <img src={Underline} onClick={this.underlineHandler} alt="underline" ></img>
            <img src={AlignLeft} onClick={this.alignLeftHandler} alt="align left" ></img>
            <img src={AlignCenter} onClick={this.alignCenterHandler} alt="align center" ></img>
            <img src={AlignRight} onClick={this.alignRightHandler} alt="align right" ></img>
          </div>
        </div>
      </div>
    </div>

      return(returnCom);
  }
}

  export default Note;
