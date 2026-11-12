import type { Cookies } from '@sveltejs/kit';
import {
	defaultSettings,
	normalizeSetting,
	settingKeys,
	type SettingKey,
	type Settings
} from '#lib/settings.ts';

export function readSettings(cookies: Cookies): Settings {
	return {
		bpm: readSetting(cookies, 'bpm') ?? defaultSettings.bpm,
		beats: readSetting(cookies, 'beats') ?? [...defaultSettings.beats],
		sound: readSetting(cookies, 'sound') ?? defaultSettings.sound,
		mode: readSetting(cookies, 'mode') ?? defaultSettings.mode,
		pendulum: readSetting(cookies, 'pendulum') ?? defaultSettings.pendulum
	};
}

function readSetting<K extends SettingKey>(cookies: Cookies, key: K): Settings[K] | null {
	const raw = cookies.get(settingKeys[key]);
	if (raw === undefined) return null;

	try {
		return normalizeSetting(key, JSON.parse(raw));
	} catch {
		return null;
	}
}
