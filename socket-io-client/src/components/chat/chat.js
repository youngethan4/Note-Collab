import React from 'react';
import ChatButton from '../pics/chat.png';
import Send from '../pics/send.png';
import './chat.css';

class Chat extends React.Component {
  constructor(){
    super();

    this.state = {
      messages: [],
      userMessage: "",
      chatToggle: false
    };
  };

  componentDidMount(){
    this.props.socket.on('new chat', (message, user) => {

    });

    this.props.socket.on('typing', (user) => {

    });
  }

  sendMessageHandler = (e) => {

  }

  sendTypingHandler = (e) => {

  }

  toggleChat = (e) => {
    this.setState({chatToggle: !this.chatToggle});
  }

  messageInputChange = (e) => {
    this.setState({userMessage: e.target.value})
  }

  render(){
    var {messages, chatToggle, userMessage} = this.state;
    var returnCom =
      <div>
        <div className="chatButton">
          <img className="chatToggleButton" src={ChatButton}></img>
        </div>
        <div className="messaging">
          <p className="chatTitle">Messaging</p>
          <button className="minButton">-</button>
          <input className="messageInput" onChange={this.messageInputChange} value={userMessage}></input>
          <img className="sendButton" src={Send}></img>
        </div>
      </div>



    return (returnCom);
  }
}

export default Chat;
