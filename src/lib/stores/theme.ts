import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const prefersDarkMode = browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
const userTheme = browser && localStorage.getItem('color-scheme');

export const theme = writable(userTheme ? userTheme : prefersDarkMode ? 'dark' : 'light');

export const setTheme = (value: Theme) => {
	theme.set(value);
	document.documentElement.setAttribute('color-scheme', value);
	localStorage.setItem('color-scheme', value);
};
