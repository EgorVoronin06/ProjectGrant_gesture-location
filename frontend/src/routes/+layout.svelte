<script lang="ts">
	import '$lib/assets/css/app.css';
	import Footer from '$lib/components/Footer.svelte';
	import StatusNotification from '$lib/components/form/StatusNotification.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { notification } from '$lib/stores/notifyStore';
	import AuthModal from '../lib/components/modals/AuthModal.svelte';
	import { user } from '../lib/stores/authStore';
	import { settings } from '../lib/stores/settingsStore';
	import { categoriesStore } from '$lib/stores/categoryStore';
	import { attributesStore } from '../lib/stores/attributesStore';

	export let data;
	let { children } = $props();

	categoriesStore.set(data.categories);
	attributesStore.set(data.attributes);
	settings.set(data.settings);
	user.set(data.user);

	let authModalOpened = false;

	const siteTitle = 'Дядя Дёнер';
</script>

<svelte:head>
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
	<link rel="canonical" href="https://ddsgt.ru" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="images/chicken_classic.png" />

	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:locale" content="ru" />
	<meta property="og:url" content={'https://ddsgt.ru'} />
	<meta property="og:type" content={'website'} />
	<meta property="og:image" content="images/chicken_classic.png" />
	<meta property="og:image:alt" content="Классический дёнер" />
</svelte:head>

<div class="page">
	<div class="page-navbar">
		<Navbar on:auth={() => (authModalOpened = true)} />
	</div>
	<main class="container mx-auto px-[15px] page-content">
		{@render children()}
	</main>
	<Footer />
	{#if authModalOpened}
		<AuthModal on:close={() => (authModalOpened = false)} />
	{/if}
	{#if $notification}
		<StatusNotification {...$notification} />
	{/if}
</div>

<style lang="postcss">
	.page {
		position: relative;

		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.page-navbar {
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.page-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex-grow: 1;

		@screen tablet {
			gap: 50px;
		}
	}
</style>
