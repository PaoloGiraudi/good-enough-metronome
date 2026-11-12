import { defaultSettings, modeLabels, modes, type Mode } from '#lib/settings.ts';
import { readSetting, writeSetting } from '#lib/storage.ts';

export { modeLabels, modes };
export type { Mode };

class ModeSetting {
	value = $state<Mode>(defaultSettings.mode);

	set = (value: Mode) => {
		this.value = value;
		writeSetting('mode', value);
	};

	cycle = () => {
		const index = modes.indexOf(this.value);
		this.set(modes[(index + 1) % modes.length]);
	};

	hydrate = (fallback: Mode = defaultSettings.mode) => {
		this.value = readSetting('mode', fallback);
	};
}

export const mode = new ModeSetting();
