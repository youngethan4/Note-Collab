import React from 'react';
import './resize.css';
import Font from './pics/resize.png';

class Resize extends React.Component {
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
    var newWidth = this.props.note.width + offsetX;
    var newHeight = this.props.note.height + offsetY;
    const minWidth = 225;
    const minHeight = 100;
    if (newWidth >= minWidth && newHeight >= minHeight) {
      this.props.noteResize(newWidth, newHeight, this.props.ID);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  //As soon as the mouse is unclicked, the note will stop dragging
  onMouseUp = (e) => {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  }

  render(){
    var { width, height } = this.props.note;

    var returnCom =
    <img className="imageResize" onMouseDown={this.dragMouseDown} src={Font}></img>

    return(returnCom);
  }
}

export default Resize;
