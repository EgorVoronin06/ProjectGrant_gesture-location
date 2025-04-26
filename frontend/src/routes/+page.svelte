<script lang="ts">
	import About from '$lib/components/about/About.svelte';
	import Platform from '$lib/components/platform/Platform.svelte';
</script>

<div class="container content">
	<Platform />
	<About />
</div>

<style>
	.content {
		margin-top: 60px;
	}
</style>
