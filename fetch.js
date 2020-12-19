let url = window.location.toString();
let arr = url.split('=');
let userName = arr[1];
if (userName == undefined) {
	userName = 'r-s-n';
}

fetch(`https://api.github.com/users/${userName}`)

	.then(res => res.json())

	.then(json => {
		console.log(json);
		const img = document.createElement('img');
		img.src = json.avatar_url;
		img.alt = 'фото пользователя';
		document.body.append(img);
		const div = document.createElement('div');
		document.body.append(div);
		const name = document.createElement('a');
		if (json.name == null) {
			name.textContent = 'Имя пользователя недоступно'
		} else {
			name.textContent = json.name;
			name.href = json.html_url;
		}
		div.append(name);
		const info = document.createElement('p');
		if (json.bio == null) {
			info.textContent = 'Информация о пользователе недоступна'
		} else {
			info.textContent = json.bio;
		}
		div.append(info);
	})

	.catch(err => console.log(`"Что-то пошло не так "${err}`));