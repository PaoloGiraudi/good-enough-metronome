import { defaultSettings } from '#lib/settings.ts';
import { readSetting, writeSetting } from '#lib/storage.ts';

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
