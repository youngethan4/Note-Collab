import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Font from './pics/font.png';
import Number from './pics/number.png';
import Bold from './pics/bold.png';
import Italic from './pics/italic.png';
import Underline from './pics/underline.png';
import AlignLeft from './pics/leftAlign.png';
import AlignCenter from './pics/centerAlign.png';
import AlignRight from './pics/rightAlign.png';
import Bullet from './pics/bullet.png';
import './rich.css';

const styleMap = {
  '25FONT': {
    fontSize: '25px',
  },
};

class MyEditor extends React.Component {

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

 handleTab = (e) => {
   e.preventDefault();
   this.onChange(RichUtils.onTab(e, this.props.note.body, 4 /* maxDepth */));
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

  changeFontHandler = (e) => {
    e.preventDefault();
     this.onChange(RichUtils.toggleInlineStyle(this.props.note.body, '25FONT'));
  }

  bulletListHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.props.note.body, 'unordered-list-item'));
  }

  numberListHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.props.note.body, 'ordered-list-item'));
  }

  render() {
    var { align, body, color, height, width } = this.props.note;

    var returnCom =
      <div className="noteBodyStyle">
        <div className="noteBody" style={{background: color, height: height, width: width}}>
          <Editor editorState={body} onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand} textAlignment={align}
          customStyleMap={styleMap} onTab={this.handleTab}/>
        </div>
        <div className="styleContent">
          <button onMouseDown={this.changeFontHandler} alt="font-size"><img src={Font}></img></button>
          <button onMouseDown={this.boldHandler} alt="bold"><img src={Bold}></img></button>
          <button onMouseDown={this.italicHandler} alt="italic"><img src={Italic}></img></button>
          <button onMouseDown={this.underlineHandler} alt="underline"><img src={Underline}></img></button>
          <button onMouseDown={this.bulletListHandler} alt="bullet"><img src={Bullet}></img></button>
          <button onMouseDown={this.numberListHandler} alt="number"><img src={Number}></img></button>
          <button onMouseDown={this.alignLeftHandler} alt="align left"><img src={AlignLeft}></img></button>
          <button onMouseDown={this.alignCenterHandler} alt="align center"><img src={AlignCenter}></img></button>
          <button onMouseDown={this.alignRightHandler} alt="align right"><img src={AlignRight}></img></button>
        </div>
      </div>
    return (returnCom);
  }
}

export default MyEditor;
