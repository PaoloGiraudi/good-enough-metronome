import { browser } from '$app/environment';
import { normalizeSetting, settingKeys, type SettingKey, type Settings } from '$lib/settings';

const maxAge = 60 * 60 * 24 * 365;

function readCookie(name: string): string | null {
	const prefix = `${name}=`;
	const match = document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix));

	return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

function writeLocalStorage(name: string, value: string): void {
	try {
		localStorage.setItem(name, value);
	} catch {
		return;
	}
}

export function readSetting<K extends SettingKey>(key: K, fallback: Settings[K]): Settings[K] {
	if (!browser) return fallback;

	const name = settingKeys[key];

	try {
		const stored = localStorage.getItem(name);
		const legacy = stored === null ? localStorage.getItem(`gem:${key}`) : null;
		const raw = stored ?? legacy ?? readCookie(name);
		if (raw === null) return fallback;

		const value = normalizeSetting(key, JSON.parse(raw)) ?? fallback;

		if (legacy !== null) writeSetting(key, value);

		return value;
	} catch {
		return fallback;
	}
}

export function writeSetting<K extends SettingKey>(key: K, value: Settings[K]): void {
	if (!browser) return;

	const name = settingKeys[key];
	const raw = JSON.stringify(value);

	writeLocalStorage(name, raw);

	const secure = location.protocol === 'https:' ? '; Secure' : '';
	document.cookie = `${name}=${encodeURIComponent(raw)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}
