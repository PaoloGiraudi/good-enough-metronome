import { defaultSettings } from '$lib/settings';
import { readSetting, writeSetting } from '$lib/storage';

class PendulumSetting {
	visible = $state(defaultSettings.pendulum);

	toggle = () => {
		this.visible = !this.visible;
		writeSetting('pendulum', this.visible);
	};

	hydrate = (fallback: boolean = defaultSettings.pendulum) => {
		this.visible = readSetting('pendulum', fallback);
	};
}

export const pendulum = new PendulumSetting();
