const img = document.querySelector('.gif-bar img');

fetch('https://api.catboys.com/baka')
	.then((response) => response.json())
	.then((gif) => {
		// let newImg = new Image();
		img.src =  `${gif.url}`;
		// document.body.appendChild(newImg);
	});
