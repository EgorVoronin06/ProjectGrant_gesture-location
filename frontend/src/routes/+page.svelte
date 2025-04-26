<script lang="ts">
	import About from '$lib/components/about/About.svelte';
	import Benefit from '$lib/components/benefit/Benefit.svelte';
	import Platform from '$lib/components/platform/Platform.svelte';
	import Team from '$lib/components/team/Team.svelte';
</script>

<div class="container content">
	<Platform />
	<About />
	<Benefit />
</div>
<Team />

<style>
	.content {
		margin-top: 60px;
	}
</style>
