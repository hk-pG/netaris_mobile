'use strict';
// **************************************************************** 4. database.js ****************************************************************
console.log('remove judge var number ');

const db = firebase.firestore();

const scores = db.collection('scores');
const userName = document.getElementById('userName');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (score > 0) {
		//スコアが０点の情報はfirebaseにつなぐ前に弾く

		scores
			.doc(userName.value)
			.set({
				name: userName.value,
				score: score,
			})
			.then(() => {
				console.log('successfully');
				console.log(`userName is ${userName.value}`);
				console.log(`score is ${score}`);
				setTimeout(() => {
					document.location.reload();
				}, 2500);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		document.location.reload();
		//スコアが０点の場合は単純にリロードのみをする
	}
});
