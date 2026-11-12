import { beatsSpecs, defaultSettings, type BeatPattern } from '$lib/settings';
import { readSetting, writeSetting } from '$lib/storage';

export { beatsSpecs };

class Beats {
	values = $state<BeatPattern>([...defaultSettings.beats]);

	increment = (amount = 1) => {
		const added = Math.min(amount, beatsSpecs.max - this.values.length);
		if (added <= 0) return;

		this.values = [...this.values, ...Array.from({ length: added }, () => false)];
		this.#persist();
	};

	decrement = (amount = 1) => {
		const removed = Math.min(amount, this.values.length - beatsSpecs.min);
		if (removed <= 0) return;

		this.values = this.values.slice(0, this.values.length - removed);
		this.#persist();
	};

	toggle = (i: number) => {
		this.values = this.values.map((beat, index) => (index === i ? !beat : beat));
		this.#persist();
	};

	hydrate = (fallback: BeatPattern = defaultSettings.beats) => {
		this.values = [...readSetting('beats', fallback)];
	};

	#persist = () => writeSetting('beats', this.values);
}

export const beats = new Beats();
