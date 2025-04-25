<script lang="ts">
	import { invalidate } from '$app/navigation';

	// let editingFeedback: Partial<CreateFeedbackDto> | undefined;

	// function createFeedback(data: Partial<CreateFeedbackDto>) {
	// 	editingFeedback = data;
	// }

	// function onRefreshPage() {
	// 	editingFeedback = undefined;
	// 	invalidate('fetch:feedback');
	// }
</script>

<footer class="footer">
	<div class="container mx-auto px-[15px]">
		<div class="footer__content">
			<div class="footer__logo-wrap">
				<img src="/icons/logo-light.svg" class="footer__logo" alt="Дядя дёнер" />
			</div>
			<div>
				<div>
					<a href="/" class="link link_light"> Главная </a>
				</div>
				<div>
					<a href="/faq" class="link link_light"> F.A.Q. </a>
				</div>
			</div>
			<div>
				<div>
					<a href="/delivery" class="link link_light"> Доставка </a>
				</div>
				<div>
					<a href="/cabinet" class="link link_light"> Личный кабинет </a>
				</div>
				<div>
					<!-- svelte-ignore a11y-missing-content -->
					<a class="footer__social-icon icon-vk link link_light mr-2" href="https://vk.com/ddsgt" />
					<!-- svelte-ignore a11y-missing-content -->
					<a
						class="footer__social-icon icon-instagram link link_light"
						href="https://www.instagram.com/ddenersgt/"
					/>
				</div>
			</div>
			<div class="footer__contacts">
				<div>
					<a href="tel:+79227736373" class="link link_light">+7(922)773-63-73</a>
				</div>
				<div>
					<a href="mailto:DDener.surgut@yandex.ru" class="link link_light"
						>DDener.surgut@yandex.ru</a
					>
				</div>
				<div>
					<!-- svelte-ignore a11y-interactive-supports-focus -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- <span role="button" class="link link_underlined" on:click={() => createFeedback({})}> -->
					<!-- Связаться с нами</span -->
					<!-- > -->
				</div>
			</div>
		</div>
		<div class="footer__bottom">
			<!-- <a href="https://w1cked.ru/" class="d-flex align-items-center">
				<img src="/icons/logo-wicked_light.png" alt="wicked" />
			</a> -->
			<div class="footer__company">
				<div>Компания ООО "ВКС"</div>
				<div>ИНН 8602173213</div>
				<div>ОГРН 1108602007260</div>
				<div>Филиал компании Дядя Дёнер</div>
			</div>
			<div class="d-flex align-items-center">
				<a href="/terms" class="link link_light"> Политики конфиденциальности </a>
			</div>
			<div class="d-flex align-items-center">
				<a href="/offer" class="link link_light"> Договор оферты </a>
			</div>
			<div class="footer__payments">
				<img src="/icons/payments/jsb.svg" alt="jsb" />
				<img src="/icons/payments/visa.svg" alt="visa" />
				<img src="/icons/payments/master_card.svg" alt="master" />
				<img src="/icons/payments/world.svg" alt="world" />
			</div>
		</div>
	</div>
</footer>

<style lang="postcss">
	.footer {
		margin-top: 50px;
		padding: 30px 0;
		background-color: var(--dark);
		color: var(--white);

		&__content {
			display: grid;
			grid-template-columns: 1fr 1fr;
			flex-direction: column;
			grid-row-gap: 20px;
			font-size: 12px;
			line-height: 26px;

			@media laptop {
				grid-template-columns: 1fr 1fr 1fr 1fr;
				font-size: 14px;
				line-height: 30px;
			}
		}

		&__bottom {
			display: grid;
			grid-template-columns: 1fr;

			align-items: center;
			@media laptop {
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}
		}

		&__bottom,
		&__company {
			margin-top: 30px;
			font-size: 12px;
			line-height: 14px;
			color: var(--light-descr);
			grid-gap: 15px;

			@media laptop {
				grid-gap: unset;
			}
		}

		&__logo-wrap {
			order: -2;
			align-self: center;
			width: 85px;
			@media laptop {
				width: 150px;
				order: unset;
			}
		}

		&__contacts {
			text-align: left;
			order: -1;

			@media laptop {
				text-align: right;
				order: unset;
			}
		}

		&__logo {
			width: 150px;
			max-width: 100%;
		}

		&__payments {
			display: grid;
			grid-auto-flow: column;
			grid-gap: 15px;
			justify-content: flex-start;

			@media laptop {
				justify-content: flex-end;
				margin-top: 0px;
			}
		}

		&__social-icon {
			font-size: 24px;
		}
	}

	.link_underlined:hover {
		color: var(--primary);
	}
</style>
