const startingSpeed = 120;

export const bpmSpecs = { min: 30, max: 300 };

class Bpm {
	speed = $state(startingSpeed);

	set = (value: number) => {
		this.speed = Math.min(Math.max(value, bpmSpecs.min), bpmSpecs.max);
	};

	increment = () => {
		this.speed = Math.min(this.speed + 1, bpmSpecs.max);
	};

	decrement = () => {
		this.speed = Math.max(this.speed - 1, bpmSpecs.min);
	};
}

export const bpm = new Bpm();
