exports.chat = (socket) =>{
  socket.on('chat sent', (chat, room) => {
    socket.to(room).emit('new chat', chat);
  });

  socket.on('user typing', (name, room) => {
    socket.to(room).emit('typing', name);
  });
}
