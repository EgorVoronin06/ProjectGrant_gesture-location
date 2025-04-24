<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let iconId: string = '';
	export let width: number = 20;
	export let height: number = width;
	export let fill: string = 'light';
	export let clickable: boolean = false;

	const dispatch = createEventDispatcher();
	const onClick = () => {
		if (clickable) {
			dispatch('click');
		}
	};
	const onKeyUp = (e: KeyboardEvent) => {
		if (clickable) {
			dispatch('keyup', e);
		}
	};
</script>

{#if iconId}
	<svg
		class="nc-icon {$$props.class}"
		class:clickable
		viewBox="0 0 {width} {height}"
		{width}
		{height}
		fill="var(--{fill})"
		on:click={onClick}
		on:keyup={onKeyUp}
		role="button"
		tabindex="0"
	>
		<use xlink:href="/icons/sprite.svg#{iconId}" />
	</svg>
{/if}

<style>
	.nc-icon:focus {
		outline: none;
	}
	svg {
		display: block;
		transition: fill 0.1s linear;
	}

	.clickable:hover {
		cursor: pointer;
		fill: var(--primary) !important;
	}
</style>
