import React from 'react';
import './style.css';

class Login extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userCreate:'',
      userJoin:'',
      room:''
    }
  }

  //Sends the toom and users name back to the parent method
  joinRoom = () => {
    if (this.state.userJoin !== '' && this.state.room !== ''){
      this.props.connectUser(this.state.userJoin, this.state.room, () => {
        document.getElementById("error").style.visibility = 'visible';
      });
    }
  }

  //Creates a randomized room for the user
  createRoom = () => {
    if (this.state.userCreate !== ''){
      this.props.connectUser(this.state.userCreate, "");
    }
  }

  //Changes the userCreate variable which is the users name
  handleUserCreateChange = (e) => {
    this.setState({userCreate:e.target.value});
  }

  //Changes the userJoin variable which is the users name
  handleUserJoinChange = (e) => {
    this.setState({userJoin:e.target.value});
  }

  //Changes the room variable
  handleRoomChange = (e) => {
    this.setState({room:e.target.value});
  }

  render() {
    var { userJoin, userCreate, room } = this.state
    return (
      <div className='login'>
        <div className='login_inner'>
          <div className="flex_box">
            <div id="Name">
              <h1 className="headings">Create Room:</h1>
              <label htmlFor="name">Name: </label>
              <input className="name" id="createName" name="name" type="text" value={userCreate} onChange={this.handleUserCreateChange}/><br></br><br></br>
              <button className="buttons" id="createButton" onClick={this.createRoom}>Create</button>
            </div>
            <div id="Name" className="join_room">
              <h1 className="headings">Join Room:</h1>
              <label htmlFor="name">Name: </label>
              <input className="name" id="joinName" name="name" type="text" value={userJoin} onChange={this.handleUserJoinChange}/><br></br><br></br>
              <label htmlFor="room">Room: </label>
              <input className="room" id="room" name="room" type="text" value={room} onChange={this.handleRoomChange}/><br></br><br></br>
              <button className="buttons" id="joinButton" onClick={this.joinRoom}>Join</button>
              <p className="error" id="error">No room detected.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
