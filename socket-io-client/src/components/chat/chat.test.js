//chaat.test.js
import React from 'react';
import { shallow } from 'enzyme';
import Chat from './chat.js';
import {io} from 'socket.io-client';
const socketURI = 'localhost:4001';
const socket = io(socketURI);

var currentUser = "Bob";
var room = "1234";
describe("Chat", () => {
  it("should render my component", () => {
    const wrapper = shallow(
      <Chat socket={socket} currentUser={currentUser} room={room}/>
    );
  });
});
