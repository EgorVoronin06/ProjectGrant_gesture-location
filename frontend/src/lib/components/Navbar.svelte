<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from './form/Button.svelte';
	import { goto } from '$app/navigation';
	import { user } from '../stores/authStore';
	import { categoriesStore } from '$lib/stores/categoryStore';
	import Cart from './orders/Cart.svelte';
	import Icon from './general/Icon.svelte';
	import { orderPrice } from '../stores/orderStore';
	import { page } from '$app/stores';

	$: categories = $categoriesStore;

	const dispatch = createEventDispatcher();
	let navbar: HTMLElement;
	let showCart = false;
	let isAdmin = false;

	$: isAdminPage = $page.url.pathname.startsWith('/admin');
	$: isAdminPage ? (isAdmin = true) : (isAdmin = false);

	onMount(() => {
		page.subscribe(() => {
			showCart = false;
		});
		window.addEventListener(
			'scroll',
			(event) => {
				navbar.classList.toggle('navbar--sticky', window.scrollY > 0);
			},
			{
				passive: true
			}
		);
	});

	let btnText: string;
	$: {
		if ($user === undefined) {
			btnText = 'Войти';
		}
		if ($user?.role === 'admin' || $user?.role === 'staff') {
			btnText = 'Админ панель';
		}
		if ($user?.role === 'user') {
			btnText = 'Профиль';
		}
	}

	function onLoginClick() {
		if ($user === undefined) {
			dispatch('auth');
			return;
		}
		if ($user.role === 'admin' || $user.role === 'staff') {
			goto('/admin/categories');
			return;
		}
		if ($user.role === 'user') {
			goto('/profile');
			return;
		}
	}
</script>

<header class="navbar" bind:this={navbar} class:navbar--sticky={false}>
	<div class="container mx-auto">
		<div class="navbar__top">
			<a href="/" class="navbar__logo">
				<img src="/icons/logo.svg" alt="Дядя дёнер" />
			</a>

			<div class="navbar__info">
				<a class="navbar__phone" href="tel:+79227736373">+7(922)773-63-73</a>
				<div class="navbar__text">
					Круглосуточно
					<span class="navbar__rating">
						<Icon iconId="star" fill="primary" class="pr-1" />
						4.2
					</span>
				</div>
			</div>
			<Button class="ml-auto" size="medium" on:click={onLoginClick}
				><span class="button_text-hidden">{btnText}</span>
				<span class="button_icon-hidden">
					<Icon iconId="user" />
				</span>
			</Button>
			{#if $page.url.pathname !== '/order'}
				<div class="relative button_adaptive">
					<Button class="z-10" size="medium" color="black" on:click={() => (showCart = !showCart)}>
						<Icon iconId="bag" fill="primary" />
						{#if $orderPrice > 0}
							<span class="font-bold">
								{$orderPrice}₽
							</span>
						{:else}
							Корзина
						{/if}
					</Button>
					{#if showCart}
						<Cart clickOutsideHandler={() => (showCart = !showCart)} />
					{/if}
				</div>
			{/if}
		</div>
		<div class="navbar__bottom" class:navbar__bottom_hidden={isAdmin}>
			<ul class="navbar__list">
				<li class="navbar__item link_dark" data-sveltekit-preload-data="false">
					<a href="#combos">Комбо</a>
				</li>
				{#each categories as category}
					<li class="navbar__item link_dark" data-sveltekit-preload-data="false">
						<a href={'#category' + category.id}>{category.name}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>

<style lang="postcss">
	.navbar {
		background-color: var(--white);
		position: relative;
		&--sticky {
			box-shadow: 0 5px 10px 0 #0000001c;
		}
		&__top {
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 15px 15px 10px 15px;
		}

		&__logo {
			width: 100px;
			height: 35px;

			transition: transform 0.1s ease-in;
			&:hover {
				transform: scale(1.1);
			}

			& img {
				width: 100%;
				height: 100%;
			}

			@screen laptop {
				margin-right: 40px;
				height: unset;
			}
		}

		&__info {
			display: none;
			@screen laptop {
				display: block;
			}
		}

		&__phone {
			font-size: 18px;
			line-height: 20px;
			font-weight: bold;
		}

		&__text {
			display: flex;
			align-items: center;
			gap: 5px;

			font-size: 14px;
			line-height: 18px;

			opacity: 0.6;
		}

		&__rating {
			display: flex;
			align-items: center;
			color: var(--primary);
		}

		&__bottom {
			padding: 0px 15px 15px 15px;
			&_hidden {
				display: none;
			}
		}

		&__list {
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: min-content;
			grid-gap: 15px;
			align-items: center;

			white-space: nowrap;
			overflow: auto;

			height: 50px;
			font-size: 14px;
			font-weight: 600;

			@screen laptop {
				font-size: 16px;
				grid-gap: 30px;
			}
		}
	}

	.button_text-hidden {
		display: none;
		@screen laptop {
			display: unset;
		}
	}

	.button_icon-hidden {
		@screen laptop {
			display: none;
		}
	}

	.button_adaptive {
		position: fixed;
		bottom: 15px;
		right: 15px;
		z-index: 3;
		@screen laptop {
			position: relative;
			bottom: unset;
			right: unset;
		}
	}
</style>
