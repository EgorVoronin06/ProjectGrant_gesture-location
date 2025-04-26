export async function load() {
	console.log('lllll');
	return {
		redirect: {
			status: 307,
			location: '/lk/lessons/1'
		}
	};
}
