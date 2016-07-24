const messages = require('./services/messages');

module.exports = function(io){
	io.on('connection',function(socket){
	console.log('Client connected');

	socket.on('disconnected', function(){console.log('Client disconnected')});
	socket.on('chat message', function(msg){
		messages.addMessage(msg);
		io.emit('chat message', msg);
	});
	socket.emit('chat history', messages.messageList);
});
};