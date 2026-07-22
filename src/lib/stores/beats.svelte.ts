type BeatPattern = boolean[];

const startingBeats: BeatPattern = [true, false, false, false];

const flipIndex = (beats: BeatPattern, i: number) =>
	beats.map((beat, idx) => (i === idx ? !beat : beat));

export const beatsSpecs = { min: 2, max: 9 };

class Beats {
	values = $state(startingBeats);

	increment = () => {
		if (this.values.length < beatsSpecs.max) {
			this.values = [...this.values, false];
		}
	};

	decrement = () => {
		if (this.values.length > beatsSpecs.min) {
			this.values = this.values.slice(0, -1);
		}
	};

	toggle = (i: number) => {
		this.values = flipIndex(this.values, i);
	};
}

export const beats = new Beats();
