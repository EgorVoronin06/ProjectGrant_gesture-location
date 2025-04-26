<script lang="ts">
	let { children } = $props();
	const menuItems = [
		{
			title: 'Курсы',
			url: '/admin/cources'
		},
		{
			title: 'Словарь',
			url: '/admin/dict'
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
					<a class="admin-layout__menu-item" href={item.url}>{item.title}</a>
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
		height: calc(100vh - 20px);
		padding: 10px;
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 10px;
		background: #f3f6ff;
	}
	.admin-layout__sidebar {
		border-radius: 10px;
		background: white;
		display: flex;
		flex-direction: column;
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
</style>
