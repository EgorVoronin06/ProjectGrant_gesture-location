<script lang="ts">
	import Recognizer from './Recognizer.svelte';

	let gameStarted = $state(false);
	let targetLetter = $state('');
	let gameOver = $state(false);
	let score = $state(0);
	let total = $state(10); // сколько всего букв надо показать
	let timePerLetter = $state(5); // секунд на букву
	let remainingTime = $state(timePerLetter);
	let lettersShown = $state(0);
	let timerInterval: ReturnType<typeof setInterval>;

	const letters = [
		'Ё',
		'А',
		'Б',
		'В',
		'Г',
		'Д',
		'Е',
		'Ж',
		'З',
		'И',
		'Й',
		'К',
		'Л',
		'М',
		'Н',
		'О',
		'П',
		'Р',
		'С',
		'Т',
		'У',
		'Ф',
		'Х',
		'Ц',
		'Ч',
		'Ш',
		'Щ',
		'Ъ',
		'Ы',
		'Ь',
		'Э',
		'Ю',
		'Я'
	];

	// Данные от нейросети
	let predict = $state('');
	let confidence = $state(0);

	function startGame() {
		gameStarted = true;
		score = 0;
		lettersShown = 0;
		nextLetter();
		timerInterval = setInterval(gameLoop, 1000);
	}

	function nextLetter() {
		const idx = Math.floor(Math.random() * letters.length);
		targetLetter = letters[idx];
		remainingTime = timePerLetter;
	}

	function gameLoop() {
		remainingTime--;

		if (remainingTime <= 0) {
			checkAnswer();
		}
	}

	function checkAnswer() {
		if (predict === targetLetter) {
			score++;
		}
		lettersShown++;

		if (lettersShown >= total) {
			endGame();
		} else {
			nextLetter();
		}
	}

	function endGame() {
		gameOver = true;
		gameStarted = false;
		clearInterval(timerInterval);
	}
</script>

<main class="flex flex-col items-center p-4 bg-gray-900 min-h-screen text-white">
	{#if !gameStarted && !gameOver}
		<div class="text-center">
			<h1 class="text-2xl mb-4">Тренировка жестов</h1>
			<label
				>Количество букв:
				<input type="number" bind:value={total} min="1" class="text-black px-2" />
			</label>
			<br />
			<label
				>Время на букву (сек):
				<input type="number" bind:value={timePerLetter} min="1" class="text-black px-2" />
			</label>
			<br />
			<button class="mt-4 bg-green-500 px-4 py-2 rounded" onclick={startGame}>Начать</button>
		</div>
	{:else if gameStarted}
		<div class="text-center">
			<h2 class="text-3xl mb-2">
				Покажи: <span class="font-bold text-yellow-400">{targetLetter}</span>
			</h2>
			<p>Оставшееся время: {remainingTime} сек</p>
			<p>Правильных: {score} / {lettersShown}</p>
			<Recognizer bind:predict bind:confidence showPredict />
		</div>
	{:else if gameOver}
		<div class="text-center">
			<h1 class="text-2xl mb-4">Игра окончена!</h1>
			<p>Ваш результат: {score} из {total}</p>
			<button
				class="mt-4 bg-blue-500 px-4 py-2 rounded"
				onclick={() => {
					gameOver = false;
				}}>Играть снова</button
			>
		</div>
	{/if}
</main>

<style>
	input {
		margin: 0.5rem 0;
	}
</style>
