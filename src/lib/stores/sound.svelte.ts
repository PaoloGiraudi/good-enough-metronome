import { defaultSettings, soundLabels, soundTypes, type SoundType } from '$lib/settings';
import { readSetting, writeSetting } from '$lib/storage';

export { soundLabels, soundTypes };
export type { SoundType };

class SoundSetting {
	value = $state<SoundType>(defaultSettings.sound);

	set = (value: SoundType) => {
		this.value = value;
		writeSetting('sound', value);
	};

	cycle = () => {
		const index = soundTypes.indexOf(this.value);
		this.set(soundTypes[(index + 1) % soundTypes.length]);
	};

	hydrate = (fallback: SoundType = defaultSettings.sound) => {
		this.value = readSetting('sound', fallback);
	};
}

export const sound = new SoundSetting();
