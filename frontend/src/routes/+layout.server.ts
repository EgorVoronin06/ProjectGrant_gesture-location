// import { error, redirect } from '@sveltejs/kit';

// export const load = async ({ url, fetch, locals }) => {
// const [categories, settings, attributes] = await Promise.all([
// categoriesApi.getCategories(),
// settingsApi.getAll(),
// attributesApi.getAttributes()
// ]);
// if (
// 	url.pathname === '/off' &&
// 	(locals.user?.role === 'user' || locals.user === undefined) &&
// 	settings.siteEnabled
// ) {
// 	redirect(303, '/');
// }
// if (url.pathname.startsWith('/admin') && !locals.user) {
// 	redirect(303, '/login');
// }
// if (
// 	locals.user &&
// 	url.pathname.startsWith('/admin') &&
// 	locals.user.role !== 'admin' &&
// 	locals.user.role !== 'staff'
// ) {
// 	error(403, 'Access denied');
// }
// if (url.pathname === '/admin' || url.pathname === '/admin/') {
// 	redirect(303, '/admin/categories');
// }
// return {
// 	pathname: url.pathname,
// 	settings,
// 	attributes,
// 	user: locals.user,
// 	categories
// };
// };
