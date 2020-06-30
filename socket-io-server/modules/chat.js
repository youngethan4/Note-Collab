exports.chat = (socket) =>{
  socket.on('chat sent', (chat, user, room) => {
    socket.to(room).emit('new chat', chat, user);
  });

  socket.on('user typing', (user, room) => {
    socket.to(room).emit('typing', user);
  });
}
