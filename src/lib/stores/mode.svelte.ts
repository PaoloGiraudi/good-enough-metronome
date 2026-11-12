import { readSetting, writeSetting } from '$lib/storage';

export const modes = ['sound', 'mute', 'flash'] as const;
export type Mode = (typeof modes)[number];

export const modeLabels: Record<Mode, string> = {
	sound: 'Sound',
	mute: 'No sound',
	flash: 'Flash'
};

const isMode = (value: unknown): value is Mode => modes.includes(value as Mode);

class ModeSetting {
	value = $state<Mode>('sound');

	set = (value: Mode) => {
		this.value = value;
		writeSetting('mode', value);
	};

	cycle = () => {
		const index = modes.indexOf(this.value);
		this.set(modes[(index + 1) % modes.length]);
	};

	hydrate = () => {
		const stored = readSetting<Mode | null>('mode', null, (value) =>
			isMode(value) ? value : null
		);
		if (stored !== null) {
			this.value = stored;
			return;
		}

		const legacyFlash = readSetting('flash', false, (value) =>
			typeof value === 'boolean' ? value : null
		);
		this.value = legacyFlash ? 'flash' : 'sound';
	};
}

export const mode = new ModeSetting();
