<div class="train-page">
	<div class="train-page__bar">
		<h1>Тренажеры</h1>
	</div>
	<div class="train-page__content">
		<div class="train-page__card">
			<h3 class="train-page__card-title">Спринт</h3>
			<img class="train-page__card-img" src="/images/dactil.jpg" alt="dactil" />
			<div>Описание</div>
			<a href="/lk/train/sprint" class="train-page__card-btn">Начать</a>
		</div>
	</div>
</div>

<style>
	.train-page {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
	}
	.train-page__bar {
		background: white;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border: 1px solid var(--color-primary-transparent);
	}
	.train-page__content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;
		padding: 10px 35px;

		background-color: white;
		border: 1px solid var(--color-primary-transparent);
		padding: 10px;
		border-radius: 10px;
		flex-grow: 1;
	}
	.train-page__card {
		border: 1px solid var(--color-primary-transparent);
		height: fit-content;
		overflow: hidden;
		border-radius: 15px;
		position: relative;
	}
	.train-page__card-img {
		width: 100%;
	}
	.train-page__card-btn {
		display: block;
		text-align: center;
		width: 100%;
		border: none;
		padding: 10px;
		background: var(--color-primary);
		color: white;
	}
	.train-page__card-title {
		position: absolute;
		top: 0;
		left: 50%;
		background: green;
		padding: 5px;
		border-radius: 0 0 5px 5px;
		font-weight: 600;
		color: white;
		transform: translateX(-50%);
	}
</style>
