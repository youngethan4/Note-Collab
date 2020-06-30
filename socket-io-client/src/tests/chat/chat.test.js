//chaat.test.js
import React from 'react';
import { shallow } from 'enzyme';
import Chat from '../../components/chat/chat.js';
const io = require('socket.io-client');
const socketURI = 'localhost:4001';
const socket = io(socketURI);

var user1 = "Bob";
var user2 = "Joe";
var room = "8520";
describe("Render Chat", () => {
  it("should render my component", () => {
    const wrapper = shallow(
      <Chat socket={socket} currentUser={user1} room={room}/>
    );
  });
  it("should render two components", () => {
    const wrapper1 = shallow(
      <Chat socket={socket} currentUser={user1} room={room}/>
    );
    const wrapper2 = shallow(
      <Chat socket={socket} currentUser={user2} room={room}/>
    );
  });
});

describe("Toggle Chat", () => {
  it("toggle chat view for 1 user", () => {
    const wrapper = shallow(
      <Chat socket={socket} currentUser={user1} room={room}/>
    );
    wrapper.find('.chatToggleButton').simulate('click');
    expect(wrapper.find('.innerChatTitle').get(0).props.children).toEqual("Messaging");
  });
  it("toggle chat view for 2 user", () => {
    const wrapper1 = shallow(
      <Chat socket={socket} currentUser={user1} room={room}/>
    );
    wrapper1.find('.chatToggleButton').simulate('click');
    expect(wrapper1.find('.innerChatTitle').get(0).props.children).toEqual("Messaging");
    const wrapper2 = shallow(
      <Chat socket={socket} currentUser={user2} room={room}/>
    );
    wrapper2.find('.chatToggleButton').simulate('click');
    expect(wrapper2.find('.innerChatTitle').get(0).props.children).toEqual("Messaging");
  });
});

describe("Post Message", () => {
  it("post message for 1 user", () => {
    const wrapper = shallow(
      <Chat socket={socket} currentUser={user1} room={room}/>
    );
    wrapper.find('.chatToggleButton').simulate('click');
    wrapper.find('.messageInput').simulate('change', { target: { value: "hello there" } });
    expect(wrapper.state('userMessage')).toEqual("hello there");
    wrapper.find('.messageSend').simulate('click');
    expect(wrapper.state('messages')[0]).toEqual({ "class": "outgoing", "message": "hello there", "name": "Bob"});
  });
  it("post messages for 2 users", () => {
    const wrapper1 = shallow(
      <Chat socket={socket} currentUser={user1} room={room}/>
    );
    const wrapper2 = shallow(
      <Chat socket={socket} currentUser={user2} room={room}/>
    );
    wrapper1.find('.chatToggleButton').simulate('click');
    wrapper1.find('.messageInput').simulate('change', { target: { value: "hello there" } });
    wrapper1.find('.messageSend').simulate('click');
    wrapper1.find('.messageInput').simulate('change', { target: { value: "hi?" } });
    wrapper1.find('.messageSend').simulate('click');
    expect(wrapper1.state('messages')[0]).toEqual({ "class": "outgoing", "message": "hi?", "name": "Bob"});
    expect(wrapper1.state('messages')[1]).toEqual({ "class": "outgoing", "message": "hello there", "name": "Bob"});
    wrapper2.find('.chatToggleButton').simulate('click');
    wrapper2.find('.messageInput').simulate('change', { target: { value: "oh hi" } });
    wrapper2.find('.messageSend').simulate('click');
    expect(wrapper2.state('messages')[0]).toEqual({ "class": "outgoing", "message": "oh hi", "name": "Joe"});
  });
});
