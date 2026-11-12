import { clampBpm, defaultSettings } from '#lib/settings.ts';
import { readSetting, writeSetting } from '#lib/storage.ts';

export { bpmSpecs } from '#lib/settings.ts';

const resetAfterMs = 3000;
const persistAfterMs = 150;
const maxTaps = 8;

class Bpm {
	speed = $state(defaultSettings.bpm);

	#taps: number[] = [];
	#saveTimer: ReturnType<typeof setTimeout> | null = null;

	set = (value: number) => {
		this.#taps = [];
		this.#apply(value);
	};

	increment = (amount = 1) => {
		this.set(this.speed + amount);
	};

	decrement = (amount = 1) => {
		this.set(this.speed - amount);
	};

	tap = () => {
		const now = performance.now();
		const previousTap = this.#taps.at(-1);

		if (previousTap !== undefined && now - previousTap > resetAfterMs) {
			this.#taps = [];
		}

		this.#taps = [...this.#taps, now].slice(-maxTaps);

		if (this.#taps.length < 2) return;

		const firstTap = this.#taps[0];
		const lastTap = this.#taps[this.#taps.length - 1];
		const averageInterval = (lastTap - firstTap) / (this.#taps.length - 1);

		this.#apply(60000 / averageInterval);
	};

	hydrate = (fallback: number = defaultSettings.bpm) => {
		this.speed = readSetting('bpm', clampBpm(fallback));
	};

	#apply = (value: number) => {
		this.speed = clampBpm(value);
		this.#persist();
	};

	#persist = () => {
		if (this.#saveTimer !== null) clearTimeout(this.#saveTimer);

		this.#saveTimer = setTimeout(() => writeSetting('bpm', this.speed), persistAfterMs);
	};
}

export const bpm = new Bpm();
