import { browser } from '$app/environment';

let sentinel: WakeLockSentinel | null = null;
let wanted = false;

async function request(): Promise<void> {
	if (!browser || !wanted || sentinel || document.visibilityState !== 'visible') return;
	if (!('wakeLock' in navigator)) return;

	try {
		sentinel = await navigator.wakeLock.request('screen');
		sentinel.addEventListener('release', () => {
			sentinel = null;
			void request();
		});
	} catch {
		return;
	}
}

export function keepScreenAwake(): void {
	wanted = true;
	void request();
}

export function allowScreenSleep(): void {
	wanted = false;
	void sentinel?.release();
	sentinel = null;
}

if (browser) {
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') void request();
	});
}
