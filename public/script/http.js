(function(){
		getElems = (arg) => {let result = []; arg.split(' ').forEach((item) => result.push(document.getElementById(item))); return result};
		let [nameButton,nameInput,messages,text,textSubmit] = getElems('nameSend name messages text textSend');
		let userName = 'Anonymous';


		nameButton.onclick = () => userName = nameInput.value || userName;

		textSubmit.onclick = () => {ajaxRequest('/messages','POST',getData,{name: userName, text: text.value}); text.value = ''};

		ajaxRequest = ( url = '/' , method = 'GET' , callback, data = {}) => {
			let xmlHttp = new XMLHttpRequest();

			xmlHttp.open(method, url, true);
			xmlHttp.setRequestHeader('Content-Type', 'application/json');
			xmlHttp.send(JSON.stringify(data));
			xmlHttp.onreadystatechange = () => (xmlHttp.status == 200 && xmlHttp.readyState === 4) ? callback(xmlHttp.responseText) : {};
		};

		getData = () => {
			ajaxRequest('/messages', 'GET', callback = function(msg){
				msg = JSON.parse(msg);
				messages.innerHTML = '';
				for(let i in msg){
					if(msg.hasOwnProperty(i)){
						let el = document.createElement('li');
						el.innerText = `${msg[i].name} : ${msg[i].text}`;
						messages.appendChild(el)
					}
				}
			})
		}

		setInterval(()=>{
			getData();
		}, 1000);
})()