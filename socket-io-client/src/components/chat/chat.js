import React from 'react';
import ChatButton from '../pics/chat.png';
import Send from '../pics/send.png';
import Min from '../pics/min.png';
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
    var newMessage = {};
    this.props.socket.on('new chat', (message, user) => {

      newMessage.message = message;
      newMessage.class = "outgoing";
      newMessage.name = user;
      this.updateMessages(newMessage);
    });

    this.props.socket.on('typing', (user) => {

    });
  }

  sendMessageHandler = (e) => {
    this.props.socket.emit("chat sent", this.state.userMessage, this.props.currentUser, this.props.room);
    var newMessage = {};
    newMessage.message = this.state.userMessage;
    newMessage.class = "outgoing";
    newMessage.name = this.props.currentUser;
    this.updateMessages(newMessage);
    this.setState({userMessage: ""});
  }

  updateMessages = (newMessage) => {
    const messages = [newMessage].concat(this.state.messages);
    this.setState({messages: messages});
  }

  sendTypingHandler = (e) => {

  }

  toggleChat = (e) => {
    this.setState({chatToggle: !this.state.chatToggle});
  }

  messageInputChange = (e) => {
    this.setState({userMessage: e.target.value})
  }

  render(){
    var {messages, chatToggle, userMessage} = this.state;
    let chatInterface = '';

    if(chatToggle){
      chatInterface =
        <div className="messaging">
          <div className="chatTitle">
            <p className="innerChatTitle">Messaging</p>
            <img className="minButton" onClick={this.toggleChat} src={Min}></img>
          </div>
          <div className="messageSending">
            <input className="messageInput" onChange={this.messageInputChange} value={userMessage}></input>
            <img className="sendButton" onClick={this.sendMessageHandler} src={Send}></img>
          </div>
          {messages.map((item, key) => (
            <div key={key} className={item.class}>
              <p key={key} className={item.class+"Name"}>{item.name}</p>
              <p key={key} className={item.class+"Message"}>{item.message}</p>
            </div>
          ))}
        </div>;
    } else {
      chatInterface = '';
    }

    return (
      <div>
        <div className="chatButton">
          <img className="chatToggleButton" onClick={this.toggleChat} src={ChatButton}></img>
        </div>
        {chatInterface}
      </div>
    );
  }
}

export default Chat;
