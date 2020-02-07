import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Bold from './pics/bold.png';
import Italic from './pics/italic.png';
import Underline from './pics/underline.png';
import AlignLeft from './pics/leftAlign.png';
import AlignCenter from './pics/centerAlign.png';
import AlignRight from './pics/rightAlign.png';
import './rich.css';

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  '10FONT': {
    fontSize: '10px',
  },
  '15FONT': {
    fontSize: '15px',
  },
  '20FONT': {
    fontSize: '20px',
  },
  '25FONT': {
    fontSize: '25px',
  },
};

class MyEditor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      font: 15
    }
  }

  onChange = (e) => {
    this.props.noteBodyChange(e, this.props.id);
  }

  handleKeyCommand = (command, editorState) => {
   const newState = RichUtils.handleKeyCommand(editorState, command);
   if (newState) {
     this.onChange(newState);
     return 'handled';
   }
   return 'not-handled';
 }

  boldHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.note.body, 'BOLD'));
  }

  italicHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.note.body, 'ITALIC'));
  }

  underlineHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.note.body, 'UNDERLINE'));
  }

  alignLeftHandler = (e) => {
    e.preventDefault();
    this.props.noteAllignmentChanged("left", this.props.id);
  }

  alignCenterHandler = (e) => {
    e.preventDefault();
    this.props.noteAllignmentChanged("center", this.props.id);
  }

  alignRightHandler = (e) => {
    e.preventDefault();
    this.props.noteAllignmentChanged("right", this.props.id);
  }

  fontIncreaseHandler = (e) => {
    e.preventDefault();
    console.log(this.state.font);
    switch(this.state.font){
      case 10:
        this.changeFont(15, '15FONT');
        break;
      case 15:
        this.changeFont(20, '20FONT');
        break;
      case 20:
        this.changeFont(25, '25FONT');
        break;
      default:
        break;
    }
  }

  fontDecreaseHandler = (e) => {
    e.preventDefault();
    console.log(this.state.font);
    switch(this.state.font){
      case 15:
        this.changeFont(10, '10FONT');
        break;
      case 20:
        this.changeFont(15, '15FONT');
        break;
      case 25:
        this.changeFont(20, '20FONT');
        break;
      default:
        break;
    }
  }

  changeFont = (font, style) => {
    this.setState({font: font});
    this.onChange(RichUtils.toggleInlineStyle(this.props.note.body, style));
  }

  render() {
    var { align, body, color } = this.props.note;

    var returnCom =
      <div className="noteBodyStyle">
        <div className="noteBody" style={{background: color}}>
          <Editor editorState={body} onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand} textAlignment={align}
          customStyleMap={styleMap}/>
        </div>
        <div className="styleContent">
          <button onMouseDown={this.fontIncreaseHandler} alt="increase"><img src={Bold}></img></button>
          <button onMouseDown={this.fontDecreaseHandler} alt="decrease"><img src={Bold}></img></button>
          <button onMouseDown={this.boldHandler} alt="bold"><img src={Bold}></img></button>
          <button onMouseDown={this.italicHandler} alt="italic"><img src={Italic}></img></button>
          <button onMouseDown={this.underlineHandler} alt="underline"><img src={Underline}></img></button>
          <button onMouseDown={this.alignLeftHandler} alt="align left"><img src={AlignLeft}></img></button>
          <button onMouseDown={this.alignCenterHandler} alt="align center"><img src={AlignCenter}></img></button>
          <button onMouseDown={this.alignRightHandler} alt="align right"><img src={AlignRight}></img></button>
        </div>
      </div>
    return (returnCom);
  }
}

export default MyEditor;
