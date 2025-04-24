<script>
	import { fade, fly, slide } from 'svelte/transition';
	import Icon from './general/Icon.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	function onClose() {
		dispatch('close');
	}

	onMount(() => {
		document.body.style.overflowY = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflowY = 'auto';
	});
</script>

<div class="shadow" transition:fade>
	<div class="modal {$$props.class}" transition:fly={{ x: 500, duration: 300, delay: 200 }}>
		<button class="modal__btn" on:click={onClose}>
			<Icon iconId="close-cross" width={40} />
		</button>
		<slot />
	</div>
</div>

<style lang="postcss">
	.shadow {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	.modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;

		max-width: 100%;
		width: 910px;
		padding: 15px;

		background-color: white;

		overflow-y: auto;

		@screen tablet {
			padding: 50px 80px;
		}
	}
	.modal__btn {
		position: absolute;
		right: 0;
		top: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;

		background-color: var(--light-grey);
		border-radius: 0 0 0 50%;

		transition: all 0.15s ease-in;

		cursor: pointer;
		outline: none;

		&:hover {
			background: var(--grey);
		}
	}
</style>
