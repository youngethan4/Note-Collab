import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import Bold from './pics/bold.png';
import Italic from './pics/italic.png';
import Underline from './pics/underline.png';
import AlignLeft from './pics/leftAlign.png';
import AlignCenter from './pics/centerAlign.png';
import AlignRight from './pics/rightAlign.png';
import './rich.css';

class MyEditor extends React.Component {

  onChange = (e) => {
    this.props.noteBodyChange(e, this.props.id);
  }

  boldHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.body, 'BOLD'));
  }

  italicHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.body, 'ITALIC'));
  }

  underlineHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.body, 'UNDERLINE'));
  }

  alignLeftHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.body, 'LEFT'));
  }

  alignCenterHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.body, 'CENTER'));
  }

  alignRightHandler = (e) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.props.body, 'RIGHT'));
  }

  render() {
    return (
      <div className="noteBodyStyle">
        <div className="noteBody" style={{background: this.props.color}}>
          <Editor editorState={this.props.body} onChange={this.onChange} textAlignment="right"/>
        </div>
        <div className="styleContent">
          <button onMouseDown={this.boldHandler} alt="bold"><img src={Bold}></img></button>
          <button onMouseDown={this.italicHandler} alt="italic"><img src={Italic}></img></button>
          <button onMouseDown={this.underlineHandler} alt="underline"><img src={Underline}></img></button>
          <button onMouseDown={this.alignLeftHandler} alt="align left"><img src={AlignLeft}></img></button>
          <button onMouseDown={this.alignCenterHandler} alt="align center"><img src={AlignCenter}></img></button>
          <button onMouseDown={this.alignRightHandler} alt="align right"><img src={AlignRight}></img></button>
        </div>
      </div>
    );
  }
}

export default MyEditor;
