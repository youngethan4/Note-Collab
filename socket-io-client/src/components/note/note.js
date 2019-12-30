import React, {Component} from 'react';
import './styles.css';

class Note extends Component {
render() {
    return (
    //  <script src="drag.js"></script>
      <div id="mydiv">
		    <div id="mydivheader" width="50" height="50">Click here to move</div>
			     <p contenteditable="true">Edit Here</p>
        </div>
    );
  }
}
export default Note;
