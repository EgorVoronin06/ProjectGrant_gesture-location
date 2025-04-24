<script>
	import { fade, slide } from 'svelte/transition';
	import NCIconSvg from '../general/NCIconSvg.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	// export let idOpenModal = false;

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

<div class="shadow" transition:fade={{ duration: 150 }}>
	<div class="modal {$$props.class}">
		<button class="modal__btn" on:click={onClose}>
			<NCIconSvg iconId="close-cross" width={33} height={33} />
		</button>
		<slot />
	</div>
</div>

<style lang="postcss">
	.shadow {
		position: fixed;
		inset: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	.modal {
		position: relative;
		max-height: 100vh;
		background-color: var(--white);
		overflow: hidden;
		overflow-y: auto;

		border-radius: 15px;
	}
	.modal__btn {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3;

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
