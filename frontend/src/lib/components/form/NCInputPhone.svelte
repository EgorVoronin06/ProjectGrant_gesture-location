<script lang="ts">
	import NcErrorInput from './NCErrorInput.svelte';
	import IMask from 'imask';

	export let value: string | null = '';
	export let error: Array<string> | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let label: string | null = null;
	const maska = IMask.createMask({
		mask: '{+7}(000)000-0000'
	});
	$: {
		maska.value = value || '';
	}
	const onInput = () => {
		value = maska.unmaskedValue.slice(1); // slice for remove +
	};
</script>

<div class="nc-input-phone">
	<input
		type="tel"
		class="nc-input-phone__field"
		bind:value={maska.value}
		{placeholder}
		{pattern}
		on:input={onInput}
	/>
	{#if label !== null}
		<label class="nc-input-phone__label" for="nc-input-phone">
			{label}
		</label>
	{/if}
	<NcErrorInput {error} />
</div>

<style lang="postcss">
	.nc-input-phone {
		position: relative;
		padding-top: 5px;
		padding-bottom: 10px;
		margin-bottom: 10px;

		&__field {
			border: none;
			border-bottom: 1px solid var(--grey);
			appearance: none;
			font-size: 16px;
			width: 100%;
			height: 40px;
			background: none;
			&:focus-visible {
				outline: none;
			}
			&:focus {
				border-bottom: 1px solid var(--primary);
			}
		}
		&__label {
			white-space: nowrap;
			width: 100%;
			color: var(--grey);
			position: absolute;
			left: 0;
			top: 10px;
			transition: all 0.1s linear;
			cursor: text;
			pointer-events: none;
			font-size: 12px;
			top: -4px;
		}
	}
</style>
