<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { AuthApi } from '../../plugins/api/modules/auth';
	import Button from '../form/Button.svelte';
	import NcCodeInput from '../form/NCCodeInput.svelte';
	import UserModal from './UserModal.svelte';
	import { notification } from '../../stores/notifyStore';
	import { ApiError } from '../../plugins/api';

	const dispatch = createEventDispatcher<{ close: void }>();

	type AuthMode = 'login' | 'register';
	let mode: AuthMode = $state('login');
	let registerStep = $state(1);

	let dto = $state({
		phone: '',
		code: ''
	});

	let authInstanceApi: AuthApi;

	onMount(() => {
		authInstanceApi = new AuthApi(fetch);
	});

	const title = $derived(mode === 'login' ? 'Вход' : 'Регистрация');
	const buttonText = $derived(mode === 'register' && registerStep === 1 ? 'Отправить код' : 'Войти');

	async function submitLogin() {
		try {
			const tokens = await authInstanceApi.signIn(dto.phone, dto.code);
			window.location.href = `/auth?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
		} catch (error) {
			if (error instanceof ApiError) {
				notification.error(error.message);
			}
		}
	}

	async function submitRegister() {
		try {
			if (registerStep === 1) {
				await authInstanceApi.sendCode(dto.phone);
				registerStep = 2;
				dto.code = '';
				return;
			}

			const tokens = await authInstanceApi.signIn(dto.phone, dto.code);
			window.location.href = `/auth?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
		} catch (error) {
			if (error instanceof ApiError) {
				notification.error(error.message);
			}
		}
	}

	async function onPrimaryClick() {
		if (mode === 'login') {
			await submitLogin();
			return;
		}

		await submitRegister();
	}

	function switchToLogin() {
		mode = 'login';
		registerStep = 1;
		dto.code = '';
	}

	function switchToRegister() {
		mode = 'register';
		registerStep = 1;
		dto.code = '';
	}
</script>

<UserModal close={() => dispatch('close')} class="auth-modal">
	<h2 class="auth-modal__title">{title}</h2>

	{#if mode === 'register' && registerStep === 2}
		<p class="auth-modal__code-title">Введите код из SMS</p>
		<NcCodeInput class="auth-modal__code-input" bind:value={dto.code} />
		<p class="auth-modal__resend">Отправить повторно (00:12)</p>
	{:else}
		<div class="auth-modal__field">
			<label class="auth-modal__label" for="auth-phone">номер телефона</label>
			<input id="auth-phone" type="tel" class="auth-modal__input" placeholder="+7" bind:value={dto.phone} />
		</div>
		<div class="auth-modal__field">
			<label class="auth-modal__label" for="auth-password">пароль</label>
			<input
				id="auth-password"
				type="password"
				class="auth-modal__input"
				placeholder="ваш пароль"
				bind:value={dto.code}
			/>
		</div>
	{/if}

	<div class="auth-modal__progress">
		<span></span>
	</div>

	<Button primary class="auth-modal__button" on:click={onPrimaryClick}>{buttonText}</Button>

	{#if mode === 'login'}
		<button type="button" class="auth-modal__switch" on:click={switchToRegister}>Регистрация</button>
	{:else}
		<button type="button" class="auth-modal__switch" on:click={switchToLogin}>Уже есть аккаунт? Войти</button>
	{/if}
</UserModal>

<style>
	.auth-modal {
		background: #f3f3f3;
		border-radius: 56px;
		width: 580px;
		max-width: calc(100vw - 32px);
		padding: 44px 58px;
	}

	.auth-modal__title {
		margin: 0 0 26px;
		text-align: center;
		font-size: 42px;
		line-height: 1;
		font-weight: 700;
		color: #1a73e8;
	}

	.auth-modal__field {
		position: relative;
		margin-bottom: 20px;
	}

	.auth-modal__label {
		position: absolute;
		left: 26px;
		top: -9px;
		padding: 0 12px;
		font-size: 16px;
		line-height: 1;
		background: #f3f3f3;
		color: #b1b1b1;
		text-transform: lowercase;
	}

	.auth-modal__input {
		width: 100%;
		height: 62px;
		padding: 0 38px;
		border-radius: 36px;
		border: 1px solid #b6b6b6;
		background: transparent;
		font-size: 22px;
		color: #7f7f87;
		outline: none;
	}

	.auth-modal__input::placeholder {
		color: #b8b8be;
		font-weight: 600;
	}

	.auth-modal__code-title {
		margin: 6px 0 18px;
		text-align: center;
		font-size: 30px;
		line-height: 1.1;
		font-weight: 600;
		color: #8a8b94;
	}

	.auth-modal__resend {
		margin: 16px 0 18px;
		text-align: center;
		font-size: 20px;
		line-height: 1;
		color: #a5a7af;
	}

	:global(.auth-modal__code-input.nc-code-input) {
		grid-gap: 20px;
		grid-template-rows: 80px;
	}

	:global(.auth-modal__code-input.nc-code-input input) {
		border-radius: 16px;
		border-color: #b6b6b6;
		font-size: 30px;
		background: transparent;
	}

	.auth-modal__progress {
		height: 8px;
		width: 100%;
		margin: 10px 0 24px;
		border-radius: 999px;
		background: #cccccf;
		overflow: hidden;
	}

	.auth-modal__progress span {
		display: block;
		width: 46%;
		height: 100%;
		border-radius: inherit;
		background: #1a73e8;
	}

	.auth-modal__button {
		display: flex;
		width: min(100%, 464px);
		margin: 0 auto;
		height: 74px;
		border-radius: 38px;
		font-size: 28px;
		font-weight: 600;
	}

	.auth-modal__switch {
		display: block;
		margin: 14px auto 0;
		padding: 0;
		border: none;
		background: none;
		font-size: 16px;
		color: #6f7078;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
