<script lang="ts">
	const items = [
		{
			title: 'Помочь ближнему',
			description:
				'Знание языка жестов позволит общаться с глухими и слабослышащими людьми, помогать им в повседневной жизни',
			img: '/images/help.png',
			width: '336',
			alt: 'Изображение иконки с запросом помощи'
		},
		{
			title: 'Расширение кругозора',
			description:
				'Изучение жестового языка — это не только новый способ коммуникации, но и погружение в уникальную культуру',
			img: '/images/book.png',
			width: '289',
			alt: 'Изображение открытой книги с лампочкой над ней'
		},
		{
			title: 'Развитие когнитивных способностей',
			description:
				'развивает зрительную память, внимание, координацию, способность к невербальной коммуникации',
			img: '/images/brain.png',
			width: '224',
			alt: 'Изображение мозга'
		},
		{
			title: 'Увлекательное хобби',
			description:
				'Это не только новый способ коммуникации, но и погружение в уникальную изучение языка жестов — это новый способ самовыражения, умение передавать эмоции и мысли без слов.',
			img: '/images/hobbies.png',
			width: '339',
			alt: 'Изображение различных предметов над экраном телефона'
		},
		{
			title: 'Возможности для карьеры',
			description:
				'Знание языка жестов — это востребованный навык во многих сферах: образовании, медицине, социальной работе, юриспруденции, искусстве',
			img: '/images/avatar_2.png',
			width: '433',
			alt: 'Изображение мозга'
		}
	];
</script>

<section class="about container mx-auto min-w-[360px] pb-14" id="about">
	<h2 class="about__title">Чем полезны<br /> тренировки в нашем центре?</h2>
	<ul class="about__list">
		{#each items as item}
			<li class="about__card card">
				<h3 class="card__title">{item.title}</h3>
				<p class="card__description">{item.description}</p>
				<img class="card__img" src={item.img} alt={item.alt} width={item.width} />
			</li>
		{/each}
	</ul>
</section>

<style lang="postcss">
</style>
