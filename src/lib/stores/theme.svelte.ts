import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

class ThemeState {
	value = $state<Theme>('light');

	sync = () => {
		if (!browser) return;

		const stored = localStorage.getItem('color-scheme');
		const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		this.value = stored === 'dark' || stored === 'light' ? stored : preferred;
	};

	set = (value: Theme) => {
		this.value = value;
		document.documentElement.setAttribute('color-scheme', value);
		localStorage.setItem('color-scheme', value);
	};
}

export const theme = new ThemeState();
