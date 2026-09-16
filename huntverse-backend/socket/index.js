const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected: ' + socket.id);

    // Join a specific game room or global chat
    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Handle chat messages
    socket.on('send_message', async (data) => {
      try {
        const { user, text, avatar, room, audio } = data;
        
        // Save to DB
        const newMessage = new Message({
          user,
          text,
          avatar,
          audio,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        await newMessage.save();

        // Broadcast to room
        io.to(room).emit('receive_message', newMessage);
      } catch (err) {
        console.error('Error saving message:', err);
      }
    });

    // Handle zone captures (real-time notification)
    socket.on('capture_zone', (data) => {
      io.emit('zone_captured', data); // Broadcast to everyone
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id);
    });
  });
};
