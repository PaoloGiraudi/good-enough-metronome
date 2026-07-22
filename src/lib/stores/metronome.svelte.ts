import { Loop, Synth, getDraw, getTransport, start } from 'tone';
import { beats } from './beats.svelte';
import { bpm } from './bpm.svelte';

class Metronome {
	on = $state(false);
	playing = $state(false);
	currentBeat = $state(0);

	#synth: Synth | null = null;
	#loop: Loop | null = null;
	#count = 0;

	constructor() {
		$effect.root(() => {
			$effect(() => {
				getTransport().bpm.value = bpm.speed;
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

	async #start() {
		await start();
		this.#init();
		getTransport().start();
		this.#loop?.start(0);
	}

	#stop() {
		getTransport().stop();
		this.#loop?.stop();
		this.playing = false;
		this.#count = 0;
		this.currentBeat = 0;
	}

	#init() {
		if (this.#synth) return;

		this.#synth = new Synth({
			envelope: {
				attack: 0.001,
				decay: 0.1,
				sustain: 0,
				release: 0.1
			}
		}).toDestination();

		this.#loop = new Loop((now) => {
			const beat = this.#count;
			const pitch = beats.values[beat] ? 'F6' : 'C6';
			this.#synth?.triggerAttackRelease(pitch, '16n', now);
			this.playing = true;
			getDraw().schedule(() => {
				this.currentBeat = beat;
			}, now);
			this.#count = (this.#count + 1) % beats.values.length;
		}, '4n');
	}
}

export const metronome = new Metronome();
