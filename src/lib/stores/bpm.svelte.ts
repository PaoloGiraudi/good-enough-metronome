const startingSpeed = 120;

export const bpmSpecs = { min: 35, max: 300 };

class Bpm {
	speed = $state(startingSpeed);

	set = (value: number) => {
		this.speed = value;
	};

	increment = () => {
		this.speed++;
	};

	decrement = () => {
		this.speed--;
	};

	reset = () => {
		this.speed = startingSpeed;
	};
}

export const bpm = new Bpm();
