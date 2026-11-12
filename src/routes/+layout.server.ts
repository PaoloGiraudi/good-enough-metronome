import { readSettings } from '#lib/server/settings.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, setHeaders }) => {
	setHeaders({
		'cache-control': 'private, no-cache'
	});

	return { settings: readSettings(cookies) };
};
