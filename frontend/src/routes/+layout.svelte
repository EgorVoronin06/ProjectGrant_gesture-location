<script lang="ts">
	let { children } = $props();

	import '$lib/assets/css/app.css';
	import Footer from '$lib/components/Footer.svelte';
	import StatusNotification from '$lib/components/form/StatusNotification.svelte';
	import Header from '$lib/components/Header.svelte';
	import { notification } from '$lib/stores/notifyStore';
	import AuthModal from '../lib/components/modals/AuthModal.svelte';
	import { user } from '../lib/stores/authStore';
	import { settings } from '../lib/stores/settingsStore';
	import { categoriesStore } from '$lib/stores/categoryStore';
	import { attributesStore } from '../lib/stores/attributesStore';

	// export let data;

	// user.set(data.user);

	let authModalOpened = $state(false);

	// const siteTitle = 'Дядя Дёнер';
</script>

<div class="page">
	<div class="page-navbar">
		<Header on:auth={() => (authModalOpened = true)} />
	</div>
	<main class="px-[15px] page-content">
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
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex-grow: 1;
		/* z-index: 1; */

		@media tablet {
			gap: 50px;
		}
	}
</style>
