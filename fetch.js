let url = window.location.toString();
let arr = url.split('=');
let userName = arr[1];
if (userName == undefined) {
	userName = 'r-s-n';
}

let cssloadDots = document.getElementById('cssloadDots');

let load = function () {
	cssloadDots.style.display = 'none';
}

let getDate = new Promise((resolve, reject) => {
	setTimeout(() => {
		load();
		let data = document.createElement('div');
		data.textContent = `Текущая дата: ${Date()}`;
		document.body.append(data);
		resolve();
	}, 4000);
});

let getName = new Promise((resolve, reject) => {
	setTimeout(() => userName ? resolve(userName) : reject('имя не найдено'), 2000);
});

Promise.all([getDate, getName])
	.then(() => fetch(`https://api.github.com/users/${userName}`))

	.then(res => res.json())

	.then(json => {
		console.log(json);
		let img = document.createElement('img');
		img.src = json.avatar_url;
		img.alt = 'фото пользователя';
		document.body.append(img);
		let div = document.createElement('div');
		document.body.append(div);
		let name = document.createElement('a');
		if (json.name == null) {
			name.textContent = 'Имя пользователя недоступно'
		} else {
			name.textContent = json.name;
			name.href = json.html_url;
		}
		div.append(name);
		let info = document.createElement('p');
		if (json.bio == null) {
			info.textContent = 'Информация о пользователе недоступна'
		} else {
			info.textContent = json.bio;
		}
		div.append(info);
	})

	.catch(err => console.log(`"Что-то пошло не так "${err}`));