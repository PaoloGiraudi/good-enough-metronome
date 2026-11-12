import { readSetting, writeSetting } from '$lib/storage';

type BeatPattern = boolean[];

const startingBeats: BeatPattern = [true, false, false, false];

export const beatsSpecs = { min: 2, max: 9 };

const isBeatPattern = (value: unknown): value is BeatPattern =>
	Array.isArray(value) &&
	value.length >= beatsSpecs.min &&
	value.length <= beatsSpecs.max &&
	value.every((beat) => typeof beat === 'boolean');

class Beats {
	values = $state(startingBeats);

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

	hydrate = () => {
		this.values = readSetting('beats', this.values, (value) =>
			isBeatPattern(value) ? value : null
		);
	};

	#persist = () => writeSetting('beats', this.values);
}

export const beats = new Beats();
