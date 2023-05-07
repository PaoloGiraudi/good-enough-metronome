import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const userTheme = browser && localStorage.getItem('color-scheme');

export const theme = writable(userTheme || 'dark');

export const setTheme = (value: Theme) => {
	theme.set(value);
	document.documentElement.setAttribute('color-scheme', value);
	localStorage.setItem('color-scheme', value);
};
