(function(){
	getElems = (arg) => {let result = []; arg.split(' ').forEach((item) => result.push(document.getElementById(item))); return result};
		let [nameButton,nameInput,messages,text,textSubmit] = getElems('nameSend name messages text textSend');
		let userName = 'Anonymous';


		nameButton.onclick = () => userName = nameInput.value || userName;

		let socket = io.connect();

		textSubmit.onclick = () => {socket.emit('chat message', {name: userName, text: text.value}); text.value = ''};

		socket.on('chat history', (msg)=>{
			messages.innerHTML = '';
			for(let i in msg){
				if(msg.hasOwnProperty(i)){
					messages.innerHTML += `<li>${msg[i].name} : ${msg[i].text}</li>`
					}
				}
		});
		socket.on('chat message', (msg)=>messages.innerHTML += `<li>${msg.name} : ${msg.text}</li>`);
})()