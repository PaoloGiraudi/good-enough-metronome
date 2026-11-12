import { browser } from '$app/environment';

const PREFIX = 'gem:';

export function readSetting<T>(
	key: string,
	fallback: T,
	normalize: (value: unknown) => T | null
): T {
	if (!browser) return fallback;

	try {
		const raw = localStorage.getItem(PREFIX + key);
		if (raw === null) return fallback;

		return normalize(JSON.parse(raw)) ?? fallback;
	} catch {
		return fallback;
	}
}

export function writeSetting(key: string, value: unknown): void {
	if (!browser) return;

	try {
		localStorage.setItem(PREFIX + key, JSON.stringify(value));
	} catch {
		return;
	}
}
