import { Loop, MembraneSynth, Synth, getDraw, getTransport, start } from 'tone';
import { allowScreenSleep, keepScreenAwake } from '$lib/wake-lock';
import { beats } from './beats.svelte';
import { bpm } from './bpm.svelte';
import { mode } from './mode.svelte';
import { sound } from './sound.svelte';

const FLASH_ACCENT_MS = 100;
const FLASH_BEAT_MS = 70;

class Metronome {
	on = $state(false);
	playing = $state(false);
	currentBeat = $state(0);
	beatCount = $state(0);
	flashLevel = $state(0);

	#synth: Synth | null = null;
	#beep: Synth | null = null;
	#wood: MembraneSynth | null = null;
	#loop: Loop | null = null;
	#tick = 0;
	#startToken = 0;
	#flashTimer: ReturnType<typeof setTimeout> | null = null;

	constructor() {
		$effect.root(() => {
			$effect(() => {
				const speed = bpm.speed;
				if (this.#synth) getTransport().bpm.value = speed;
			});

			$effect(() => {
				if (this.on) {
					void this.#start();
				} else {
					this.#stop();
				}
			});
		});
	}

	toggle = () => {
		this.on = !this.on;
	};

	async #start() {
		const token = ++this.#startToken;

		try {
			await start();
		} catch {
			this.on = false;
			return;
		}

		if (!this.on || token !== this.#startToken) return;

		this.#init();

		this.#tick = 0;
		this.currentBeat = 0;
		this.beatCount = 0;
		this.playing = true;
		keepScreenAwake();

		const transport = getTransport();
		transport.bpm.value = bpm.speed;
		transport.stop();
		transport.position = 0;
		transport.start();

		this.#loop?.start(0);
	}

	#stop() {
		this.#startToken++;

		if (this.#synth) {
			getTransport().stop();
			this.#loop?.stop();
		}

		this.playing = false;
		this.#tick = 0;
		this.currentBeat = 0;
		this.beatCount = 0;
		this.#stopFlash();
		allowScreenSleep();
	}

	#init() {
		if (this.#synth) return;

		this.#synth = new Synth({
			oscillator: { type: 'triangle' },
			envelope: { attack: 0.001, decay: 0.03, sustain: 0, release: 0.02 }
		}).toDestination();
		this.#synth.volume.value = -8;

		this.#beep = new Synth({
			oscillator: { type: 'sine' },
			envelope: { attack: 0.001, decay: 0.09, sustain: 0, release: 0.04 }
		}).toDestination();
		this.#beep.volume.value = -10;

		this.#wood = new MembraneSynth({
			pitchDecay: 0.008,
			octaves: 2,
			oscillator: { type: 'sine' },
			envelope: { attack: 0.001, decay: 0.055, sustain: 0, release: 0.02 }
		}).toDestination();
		this.#wood.volume.value = -6;

		this.#loop = new Loop((time) => this.#onTick(time), '4n');
	}

	#onTick(time: number) {
		const beat = this.#tick % beats.values.length;
		this.#tick++;

		this.#hit(time, beats.values[beat]);
		this.#show(beat, time);
	}

	#hit(time: number, accent: boolean) {
		if (mode.value === 'flash') {
			this.#flash(time, accent);
			return;
		}

		if (mode.value === 'mute') return;

		const velocity = accent ? 1 : 0.7;

		switch (sound.value) {
			case 'wood':
				this.#wood?.triggerAttackRelease(accent ? 'C5' : 'A4', '32n', time, velocity);
				break;
			case 'beep':
				this.#beep?.triggerAttackRelease(accent ? 'A5' : 'F5', '32n', time, velocity);
				break;
			default:
				this.#synth?.triggerAttackRelease(accent ? 'C6' : 'A5', '32n', time, velocity);
		}
	}

	#flash(time: number, accent: boolean) {
		const level = accent ? 2 : 1;

		getDraw().schedule(() => {
			if (!this.playing) return;

			this.flashLevel = level;

			if (this.#flashTimer !== null) clearTimeout(this.#flashTimer);
			this.#flashTimer = setTimeout(
				() => {
					this.flashLevel = 0;
					this.#flashTimer = null;
				},
				accent ? FLASH_ACCENT_MS : FLASH_BEAT_MS
			);
		}, time);
	}

	#stopFlash() {
		if (this.#flashTimer !== null) {
			clearTimeout(this.#flashTimer);
			this.#flashTimer = null;
		}

		this.flashLevel = 0;
	}

	#show(beat: number, time: number) {
		getDraw().schedule(() => {
			if (this.playing) {
				this.currentBeat = beat;
				this.beatCount++;
			}
		}, time);
	}
}

export const metronome = new Metronome();
