import { error, redirect } from '@sveltejs/kit';
import { SettingsApi } from '../lib/plugins/api/modules/settings';
import { CategoriesApi } from '$lib/plugins/api/modules/categories';
import { AttributesApi } from '../lib/plugins/api/modules/attributes';

export const load = async ({ url, fetch, locals }) => {
	const categoriesApi = new CategoriesApi(fetch);
	const settingsApi = new SettingsApi(fetch);
	const attributesApi = new AttributesApi(fetch);
	const [categories, settings, attributes] = await Promise.all([
		categoriesApi.getCategories(),
		settingsApi.getAll(),
		attributesApi.getAttributes()
	]);

	if (
		!settings.siteEnabled &&
		!url.pathname.startsWith('/admin') &&
		url.pathname !== '/off' &&
		locals.user?.role !== 'admin' &&
		locals.user?.role !== 'staff'
	) {
		redirect(303, '/off');
	}
	if (
		url.pathname === '/off' &&
		(locals.user?.role === 'user' || locals.user === undefined) &&
		settings.siteEnabled
	) {
		redirect(303, '/');
	}
	if (url.pathname.startsWith('/admin') && !locals.user) {
		redirect(303, '/login');
	}

	if (
		locals.user &&
		url.pathname.startsWith('/admin') &&
		locals.user.role !== 'admin' &&
		locals.user.role !== 'staff'
	) {
		error(403, 'Access denied');
	}

	if (url.pathname === '/admin' || url.pathname === '/admin/') {
		redirect(303, '/admin/categories');
	}

	return {
		pathname: url.pathname,
		settings,
		attributes,
		user: locals.user,
		categories
	};
};
