type BeatPattern = boolean[];

const startingBeats: BeatPattern = [true, false, false, false];

const flipIndex = (beats: BeatPattern, i: number) =>
	beats.map((beat, idx) => (i === idx ? !beat : beat));

class Beats {
	values = $state(startingBeats);

	increment = () => {
		this.values = [...this.values, false];
	};

	decrement = () => {
		this.values = this.values.slice(0, -1);
	};

	toggle = (i: number) => {
		this.values = flipIndex(this.values, i);
	};

	reset = () => {
		this.values = startingBeats;
	};
}

export const beats = new Beats();

export const beatsSpecs = { min: 2, max: 9 };
