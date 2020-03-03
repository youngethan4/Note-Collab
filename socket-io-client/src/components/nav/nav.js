import React from 'react';
import Chat from '../chat/chat.js';
import './nav.css';

class Nav extends React.Component {

  copyRoom = (e) => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
  }

  render(){
    var {userRoom, users, currentUser, socket} = this.props;

    var returnCom =
    <div>
      <textarea className="copyTextArea" style={{opacity: "0"}}
        ref={(textarea) => this.textArea = textarea}
        value={userRoom} readOnly/>
      <div className="nav">
        <button className="buttonAdd"onClick={this.props.addNote}>Add Note</button>
        <div className="titleNav">Note Collab</div>
        <a className="roomCopy">Room Number: {userRoom}<br></br>
        <button className="buttonRoom" onClick={this.copyRoom}>click to copy</button></a>
        <div className="dropUsers">
          <p className="userNumber">{users.length} users connected</p>
          <div className="dropdownUsers">
            {users.map((item, key) =>
              <p key={key}>{item}</p>
            )}
          </div>
        </div>
        <div className="chat">
          <Chat currentUser={currentUser} room={userRoom} socket={socket}/>
        </div>
      </div>
    </div>

    return (returnCom);
  }
}

export default Nav;
