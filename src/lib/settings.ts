export const bpmSpecs = { min: 30, max: 300 };

export const beatsSpecs = { min: 2, max: 9 };

export type BeatPattern = boolean[];

export const clampBpm = (value: number) =>
	Math.round(Math.min(Math.max(value, bpmSpecs.min), bpmSpecs.max));

const isBeatPattern = (value: unknown): value is BeatPattern =>
	Array.isArray(value) &&
	value.length >= beatsSpecs.min &&
	value.length <= beatsSpecs.max &&
	value.every((beat) => typeof beat === 'boolean');

export const soundTypes = ['click', 'wood', 'beep'] as const;
export type SoundType = (typeof soundTypes)[number];

export const soundLabels: Record<SoundType, string> = {
	click: 'Click',
	wood: 'Wood',
	beep: 'Beep'
};

const isSoundType = (value: unknown): value is SoundType => soundTypes.includes(value as SoundType);

export const modes = ['sound', 'mute', 'flash'] as const;
export type Mode = (typeof modes)[number];

export const modeLabels: Record<Mode, string> = {
	sound: 'Sound',
	mute: 'No sound',
	flash: 'Flash'
};

const isMode = (value: unknown): value is Mode => modes.includes(value as Mode);

export interface Settings {
	bpm: number;
	beats: BeatPattern;
	sound: SoundType;
	mode: Mode;
	pendulum: boolean;
}

export const defaultSettings: Settings = {
	bpm: 120,
	beats: [true, false, false, false],
	sound: 'click',
	mode: 'sound',
	pendulum: true
};

export const settingKeys = {
	bpm: 'gem_bpm',
	beats: 'gem_beats',
	sound: 'gem_sound',
	mode: 'gem_mode',
	pendulum: 'gem_pendulum'
} as const;

export type SettingKey = keyof typeof settingKeys;

const normalizers: { [K in SettingKey]: (value: unknown) => Settings[K] | null } = {
	bpm: (value) => (typeof value === 'number' && Number.isFinite(value) ? clampBpm(value) : null),
	beats: (value) => (isBeatPattern(value) ? value : null),
	sound: (value) => (isSoundType(value) ? value : null),
	mode: (value) => (isMode(value) ? value : null),
	pendulum: (value) => (typeof value === 'boolean' ? value : null)
};

export function normalizeSetting<K extends SettingKey>(key: K, value: unknown): Settings[K] | null {
	return normalizers[key](value);
}
