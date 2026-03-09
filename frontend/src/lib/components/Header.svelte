<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ auth: void }>();

	const menuItems = [
		{
			title: 'О центре',
			url: '/#header'
		},
		{
			title: 'Алфавит',
			url: '/lk/courses#alphabet'
		},
		{
			title: 'Словарь',
			url: '/#dictionary'
		},
		{
			title: 'Войти',
			url: '/lk/courses',
			openAuth: true
		}
	];

	let open = false;

	function handleItemClick(item: (typeof menuItems)[0]) {
		open = false;
		if (item.openAuth) {
			dispatch('auth');
		}
	}
</script>

<header class="header">
	<div class="container header__wrapper">
		<a class="header__logo" href="/">
			<img src="/icons/logo.svg" alt="logo" />
		</a>
		<nav class="navbar" class:navbar_active={open}>
			{#each menuItems as item}
				{#if item.openAuth}
					<button
						type="button"
						class="navbar__item navbar__item--button"
						on:click={() => handleItemClick(item)}
					>
						{item.title}
					</button>
				{:else}
					<a class="navbar__item" on:click={() => (open = !open)} href={item.url}>
						{item.title}
					</a>
				{/if}
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
		display: flex;
		align-items: center;
		justify-content: center;

		min-width: 120px;
		padding: 8px 24px;

		border-radius: 999px;
		background: var(--color-grey);
		color: var(--color-black);
		font-weight: 500;
		text-decoration: none;
		transition:
			background-color 0.25s ease,
			color 0.25s ease,
			box-shadow 0.25s ease,
			transform 0.25s ease;

		&:hover {
			background-color: #0077ff;
			color: #ffffff;
			box-shadow: 0 8px 16px rgba(0, 119, 255, 0.3);
			transform: translateY(-1px);
		}
	}

	.navbar__item--button {
		border: none;
		cursor: pointer;
		font: inherit;
	}

	.navbar__burger {
		display: none;
	}

	/* Первая кнопка в меню – как активная, как на макете */
	.navbar__item:first-child {
		background-color: #0077ff;
		color: #ffffff;
	}

	/* Ховер для бургер-кнопки (мобильное меню) */
	.navbar__burger {
		display: none;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		border: none;
		background-color: transparent;
		display: none;
		align-items: center;
		justify-content: center;
		padding: 0;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			box-shadow 0.25s ease,
			transform 0.25s ease;
	}

	.navbar__burger-middle {
		width: 18px;
		height: 2px;
		border-radius: 999px;
		background-color: #0077ff;
		position: relative;
	}

	.navbar__burger-middle::before,
	.navbar__burger-middle::after {
		content: '';
		position: absolute;
		left: 0;
		width: 18px;
		height: 2px;
		border-radius: 999px;
		background-color: #0077ff;
	}

	.navbar__burger-middle::before {
		top: -6px;
	}

	.navbar__burger-middle::after {
		top: 6px;
	}

	.navbar__burger:hover {
		background-color: #e3efff;
		box-shadow: 0 8px 16px rgba(0, 119, 255, 0.25);
		transform: translateY(-1px);
	}

	.navbar__burger:hover .navbar__burger-middle,
	.navbar__burger:hover .navbar__burger-middle::before,
	.navbar__burger:hover .navbar__burger-middle::after {
		background-color: #0077ff;
	}
</style>
