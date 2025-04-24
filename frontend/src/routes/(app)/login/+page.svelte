<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import NcCodeInput from '$lib/components/form/NCCodeInput.svelte';
	import NcInputPhone from '$lib/components/form/NCInputPhone.svelte';
	import { ApiError } from '$lib/plugins/api';
	import { AuthApi } from '$lib/plugins/api/modules/auth';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { notification } from '$lib/stores/notifyStore';

	let dto = {
		phone: '',
		code: ''
	};

	let step: number = 1;
	let authInstanceApi: AuthApi;

	onMount(() => {
		authInstanceApi = new AuthApi(fetch);
		const loadTelegramWidget = () => {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://telegram.org/js/telegram-widget.js?22';

			// Параметры виджета
			script.dataset.telegramLogin = 'ddsgt_auth_bot';
			script.dataset.size = 'large';
			script.dataset.userpic = 'false';
			script.dataset.radius = '8';
			script.dataset.authUrl = `${env.PUBLIC_API_URL}/auth/telegram/callback`;
			script.dataset.requestAccess = 'write';

			// Обработчики загрузки
			script.onload = () => console.log('Telegram Widget loaded');
			script.onerror = (e) => {
				console.error('Telegram Widget error:', e);
			};

			// Добавляем скрипт в контейнер
			const container = document.getElementById('telegram-widget-container');
			if (container) container.appendChild(script);
		};

		loadTelegramWidget();
	});
	async function onButtonClick() {
		try {
			if (step === 1) {
				await authInstanceApi.sendCode(dto.phone);
				step++;
				return;
			}
			if (step === 2) {
				const tokens = await authInstanceApi.signIn(dto.phone, dto.code);
				window.location.href = `/auth?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
			}
		} catch (error) {
			if (error instanceof ApiError) {
				console.log(error);
				notification.error(error.message);
			}
		}
	}
	$: buttonText = step === 1 ? 'Получить код' : 'Войти';
</script>

<div class="login-page container">
	<h2 class="mb-4">Вход в личный кабинет</h2>
	{#if step === 1}
		<NcInputPhone bind:value={dto.phone} placeholder="+7(___)-___-____" label="Телефон" />
	{/if}
	{#if step === 2}
		<NcCodeInput class="mb-4" bind:value={dto.code} />
		<p class="text-[14px] mb-3">
			На указанный номер вам поступит звонок и робот продиктует ваш код для входа. Его необходимо
			ввести в поле выше 🙂
		</p>
	{/if}
	<Button primary full on:click={onButtonClick}>{buttonText}</Button>
	{#if step === 1}
		<div class="splitter">Или</div>
		<div class="flex flex-col gap-[10px] items-center">
			<div class="modal-container__tg_auth" id="telegram-widget-container"></div>
			<a
				href="{env.PUBLIC_API_URL}/auth/vk"
				id="VKIDSDKAuthButton"
				class="VkIdWebSdk__button VkIdWebSdk__button_reset"
			>
				<div class="VkIdWebSdk__button_container">
					<div class="VkIdWebSdk__button_icon">
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.54648 4.54648C3 6.09295 3 8.58197 3 13.56V14.44C3 19.418 3 21.907 4.54648 23.4535C6.09295 25 8.58197 25 13.56 25H14.44C19.418 25 21.907 25 23.4535 23.4535C25 21.907 25
        19.418 25 14.44V13.56C25 8.58197 25 6.09295 23.4535 4.54648C21.907 3 19.418 3 14.44 3H13.56C8.58197 3 6.09295 3 4.54648 4.54648ZM6.79999 10.15C6.91798 15.8728 9.92951 19.31 14.8932 19.31H15.1812V16.05C16.989 16.2332 18.3371
        17.5682 18.8875 19.31H21.4939C20.7869 16.7044 18.9535 15.2604 17.8141 14.71C18.9526 14.0293 20.5641 12.3893 20.9436 10.15H18.5722C18.0747 11.971 16.5945 13.6233 15.1803 13.78V10.15H12.7711V16.5C11.305 16.1337 9.39237 14.3538 9.314 10.15H6.79999Z"
								fill="white"
							/>
						</svg>
					</div>
					<div class="VkIdWebSdk__button_text">Войти с VK ID</div>
				</div>
			</a>
		</div>
	{/if}
</div>

<style>
	.login-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		width: 300px;
		margin: 0 auto;
		padding: 80px 20px;
	}
	.VkIdWebSdk__button_reset {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		line-height: normal;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		-webkit-appearance: none;
	}

	.VkIdWebSdk__button {
		background: #0077ff;
		cursor: pointer;
		transition: all 0.1s ease-out;
	}

	.VkIdWebSdk__button:hover {
		opacity: 0.8;
	}

	.VkIdWebSdk__button:active {
		opacity: 0.7;
		transform: scale(0.97);
	}

	.VkIdWebSdk__button {
		border-radius: 8px;
		/* width: 100%; */
		width: 207px;
		min-height: 40px;
	}

	.VkIdWebSdk__button_container {
		display: flex;
		align-items: center;
		padding: 8px 10px;
	}

	.VkIdWebSdk__button_icon + .VkIdWebSdk__button_text {
		margin-left: -28px;
	}

	.VkIdWebSdk__button_text {
		display: flex;
		font-family: -apple-system, system-ui, 'Helvetica Neue', Roboto, sans-serif;
		flex: 1;
		justify-content: center;
		color: #ffffff;
	}

	.splitter {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px 0;
	}
	.splitter::before {
		content: '';
		height: 1px;
		background: var(--gray);
		position: absolute;
		left: 0;
		top: 50%;
		right: 60%;
	}
	.splitter::after {
		content: '';
		height: 1px;
		background: var(--gray);
		position: absolute;
		left: 60%;
		top: 50%;
		right: 0;
	}
</style>
