import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const prefersDarkMode = browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
const userTheme: string | null = browser ? localStorage.getItem('color-scheme') : null;

class ThemeState {
	value = $state<Theme>(
		userTheme === 'dark' || userTheme === 'light' ? userTheme : prefersDarkMode ? 'dark' : 'light'
	);

	set = (value: Theme) => {
		this.value = value;
		document.documentElement.setAttribute('color-scheme', value);
		localStorage.setItem('color-scheme', value);
	};
}

export const theme = new ThemeState();
