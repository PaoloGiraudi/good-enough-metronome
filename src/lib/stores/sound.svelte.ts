import { readSetting, writeSetting } from '$lib/storage';

export const soundTypes = ['click', 'wood', 'beep'] as const;
export type SoundType = (typeof soundTypes)[number];

export const soundLabels: Record<SoundType, string> = {
	click: 'Click',
	wood: 'Wood',
	beep: 'Beep'
};

const isSoundType = (value: unknown): value is SoundType => soundTypes.includes(value as SoundType);

class SoundSetting {
	value = $state<SoundType>('click');

	set = (value: SoundType) => {
		this.value = value;
		writeSetting('sound', value);
	};

	cycle = () => {
		const index = soundTypes.indexOf(this.value);
		this.set(soundTypes[(index + 1) % soundTypes.length]);
	};

	hydrate = () => {
		this.value = readSetting('sound', this.value, (value) => (isSoundType(value) ? value : null));
	};
}

export const sound = new SoundSetting();
