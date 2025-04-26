<script lang="ts">
	import '$lib/assets/css/app.css';
	import { page } from '$app/state';
	import NcIconSvg from '$lib/components/general/NCIconSvg.svelte';

	let { children } = $props();

	const pageName = $derived(page.route.id);

	let currentPage = $state('courses');

	const menuItems = [
		{
			title: 'Курсы',
			url: '/lk/courses',
			icon: 'academic-cap'
		},
		{
			title: 'Мои уроки',
			url: '/lk/lessons',
			icon: 'books'
		},
		{
			title: 'Тесты',
			url: '/lk/tests',
			icon: 'tests'
		},
		{
			title: 'Достижения',
			url: '/lk/achievements',
			icon: 'cup'
		}
	];
</script>

<div class="admin-layout">
	<aside class="admin-layout__sidebar">
		<div class="admin-layout__person">
			<img class="admin-layout__person-avatar" src="/images/avatar.jpg" alt="avatar" />
			<span>Кокорин Михаил</span>
		</div>
		<div class="admin-layout__sidebar-splitter">
			<nav class="admin-layout__menu">
				{#each menuItems as item (item.url)}
					<div class="admin-layout__option">
						<NcIconSvg iconId={item.icon} />
						<a class="admin-layout__menu-item" href={item.url}>{item.title}</a>
					</div>
				{/each}
			</nav>
			<nav class="admin-layout__menu">
				<a class="admin-layout__menu-item" href="/">Выход</a>
			</nav>
		</div>
	</aside>
	<div class="admin-layout__content">
		{@render children()}
	</div>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	.admin-layout {
		height: 100vh;
		padding: 10px;
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 10px;
		background: #f3f6ff;
	}

	.admin-layout__sidebar {
		display: flex;
		flex-direction: column;
		padding-left: 10px;
		border-radius: 10px;
		background: white;
	}

	.admin-layout__sidebar-splitter {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		justify-content: space-between;
	}

	.admin-layout__person {
		display: flex;
		gap: 20px;
		padding: 10px;
		align-items: center;
	}

	.admin-layout__person-avatar {
		width: 70px;
		border-radius: 50%;
	}

	.admin-layout__menu {
		display: flex;
		flex-direction: column;
	}

	.admin-layout__menu-item {
		padding: 10px;
	}

	.admin-layout__option {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
