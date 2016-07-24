var message = require('../services/messages');
module.exports = function(app){
app.get('/messages', function (req,res){
	res.json(message.messageList);
});

app.post('/messages', function(req,res){
	message.addMessage(req.body);
	res.json(req.body);
});
};