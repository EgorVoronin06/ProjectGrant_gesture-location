<script>
	import Button from '$lib/components/form/Button.svelte';
</script>

<div class="dict-page">
	<div class="dict-page__bar">
		<h1>Словарь</h1>
		<Button primary>Добавить</Button>
	</div>
	<div class="dict-page__content">123</div>
</div>

<style>
	.dict-page {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
	}
	.dict-page__bar {
		background: white;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border: 1px solid var(--color-primary-transparent);
	}
	.dict-page__content {
		background: white;
		border: 1px solid var(--color-primary-transparent);
		padding: 10px;
		border-radius: 10px;
		flex-grow: 1;
	}
</style>
