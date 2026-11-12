import { readSetting, writeSetting } from '$lib/storage';

class PendulumSetting {
	visible = $state(true);

	toggle = () => {
		this.visible = !this.visible;
		writeSetting('pendulum', this.visible);
	};

	hydrate = () => {
		this.visible = readSetting('pendulum', this.visible, (value) =>
			typeof value === 'boolean' ? value : null
		);
	};
}

export const pendulum = new PendulumSetting();
