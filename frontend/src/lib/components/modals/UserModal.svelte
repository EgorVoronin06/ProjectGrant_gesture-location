<script>
	import { fade, slide } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

let { children, close, class: modalClass = '' } = $props();

	// const dispatch = createEventDispatcher();

	// export let idOpenModal = false;

	function onClose() {
		// dispatch('close');
		close();
	}

	onMount(() => {
		document.body.style.overflowY = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflowY = 'auto';
	});
</script>

<div class="shadow" transition:fade={{ duration: 150 }}>
	<div class={`modal ${modalClass}`}>
		<button class="modal__btn" onclick={onClose}>X</button>
		{@render children()}
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
		background-color: white;
		overflow: hidden;
		overflow-y: auto;
		min-width: 500px;
		border-radius: 15px;
		padding: 50px 30px 30px 30px;
	}
	.modal__btn {
		position: absolute;
		right: 18px;
		top: 18px;
		z-index: 3;

		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 36px;

		background: linear-gradient(135deg, #1a73e8 0%, #3b8cff 100%);
		color: #ffffff;
		font-size: 18px;
		font-weight: 700;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.55);
		box-shadow: 0 6px 14px rgba(26, 115, 232, 0.35);

		transition: all 0.15s ease-in;

		cursor: pointer;
		outline: none;

		&:focus-visible {
			box-shadow:
				0 0 0 3px rgba(26, 115, 232, 0.25),
				0 6px 14px rgba(26, 115, 232, 0.35);
		}

		&:hover {
			transform: translateY(-1px);
			filter: brightness(1.04);
		}

		&:active {
			transform: scale(0.96);
		}
	}
</style>
