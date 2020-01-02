import React from 'react';
import './nav.css';

class Nav extends React.Component {

  copyRoom = (e) => {
    console.log("here");
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
  }

  render(){
    var { userRoom, users } = this.props;

    var returnCom =
    <div>
      <textarea style={{opacity: "0"}}
        ref={(textarea) => this.textArea = textarea}
        value={userRoom} readOnly
      />
      <div className="nav">
        <ul>
          <li>
            <a className="addNote"><button className="buttonAdd"
              onClick={this.props.addNote}>Add Note</button></a>
          </li><li>
            <a className="titleNav">Note Collab</a>
          </li><li>
            <a className="roomCopy">Room Number: {userRoom}<br></br>
            <button className="buttonRoom" onClick={this.copyRoom}>click me to copy</button></a>
          </li><li>
            <a className="usersConnected">
              <div className="dropUsers">
                <p className="userNumber">{users.length} users connected</p>
                <div className="dropdownUsers">
                  {users.map((item, key) =>
                    <p key={key}>{item}</p>
                  )}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    return (returnCom);
  }
}

export default Nav;
