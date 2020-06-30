import React from 'react';
import ChatButton from './pics/chat.png';
import Send from './pics/send.png';
import Min from './pics/min.png';
import './chat.css';

var newMessage = () => {
  return(
    {
      message: "",
      class: "",
      name: ""
    }
  );
};

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
      var newMsg = newMessage();
      newMsg.message = message;
      newMsg.class = "incomming";
      newMsg.name = user;
      this.updateMessages(newMsg);
    });

    this.props.socket.on('typing', (user) => {

    });
  }

  sendMessageHandler = (e) => {
    this.props.socket.emit("chat sent", this.state.userMessage, this.props.currentUser, this.props.room);
    var newMsg = newMessage();
    newMsg.message = this.state.userMessage;
    newMsg.class = "outgoing";
    newMsg.name = this.props.currentUser;
    console.log(newMsg);
    this.updateMessages(newMsg);
    this.setState({userMessage: ""});
  }

  updateMessages = (newMsg) => {
    var messages = [newMsg, ...this.state.messages];
    this.setState({messages: messages});
    console.log(messages);
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
            <img className="messageSend" onClick={this.sendMessageHandler} src={Send}></img>
          </div>
          {messages.map((item, key) => (
            <div key={key} className={item.class}>
              <p className='senderName'>{item.name}</p>
              <p>{item.message}</p>
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
