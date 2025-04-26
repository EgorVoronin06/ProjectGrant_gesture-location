<script lang="ts">
	const menuItems = [
		{
			title: 'О центре',
			url: '/#header'
		},
		{
			title: 'Алфавит',
			url: '/#alphabet'
		},
		{
			title: 'Словарь',
			url: '/#dictionary'
		},
		{
			title: 'Войти',
			url: '/#login'
		}
	];

	let open = false;
</script>

<header class="header">
	<div class="container header__wrapper">
		<a class="header__logo" href="/">
			<img src="/icons/logo.svg" alt="logo" />
		</a>
		<nav class="navbar" class:navbar_active={open}>
			{#each menuItems as item}
				<a class="navbar__item" on:click={() => (open = !open)} href={item.url}>
					{item.title}
				</a>
			{/each}
		</nav>
		<button
			class="navbar__burger"
			on:click={() => (open = !open)}
			class:navbar__burger_active={open}
			aria-label="Открыть меню"
		>
			<span class="navbar__burger-middle"></span>
		</button>
	</div>
</header>

<style lang="postcss">
	.header {
		padding: 10px;

		background-color: var(--color-white);
		box-shadow: 0 5px 10px 0 #0000001c;
	}

	.header__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		margin: 0 auto;
	}

	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		max-width: 870px;
		flex: 1;
	}

	.navbar__item {
		width: 150px;
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 5px 20px;

		border-radius: 10px;
		background: var(--color-grey);

		&::hover {
			opacity: 0.5;
		}
	}

	.navbar__burger {
		display: none;
	}
</style>
