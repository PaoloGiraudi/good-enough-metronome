<script lang="ts">
	import * as Tone from 'tone';
	import ButtonControls from '$components/button-controls.svelte';
	import { beats } from '$stores/beats';
	import { bpm } from '$stores/bpm';
	import { isPlaying, metronomeOn } from '$stores/metronome';
	import BeatsToggle from '$components/beats-toggle.svelte';
	import RangeSlider from '$components/range-slider.svelte';
	import PlayButton from '$components/play-button.svelte';

	const click = new Tone.Synth({
		envelope: {
			attack: 0.001,
			decay: 0.1,
			sustain: 0,
			release: 0.1
		}
	}).toDestination();

	let beatCount = 0;
	$: beatsNumber = $beats.length;
	$: Tone.Transport.bpm.value = $bpm;

	const changeBeats = (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		if (parseInt(value) > $beats.length) {
			beats.set([...$beats, false]);
		}
	};

	const loop = new Tone.Loop((now) => {
		if ($beats[beatCount]) {
			click.triggerAttackRelease('F6', '16n', now);
		} else {
			click.triggerAttackRelease('C6', '16n', now);
		}
		beatCount = (beatCount + 1) % beatsNumber;
	}, '4n');

	$: if ($metronomeOn) {
		Tone.start();
		Tone.Transport.start();
		$isPlaying = true;
		loop.start();
	} else {
		Tone.Transport.stop();
		$isPlaying = false;
		loop.stop();
		beatCount = 0;
	}
</script>

<BeatsToggle {beatCount} />

<div class="flex-1 grid grid-cols-5">
	<RangeSlider type="bpm" on:input={() => bpm.set($bpm)} bind:value={$bpm} />

	<div class="col-span-3 flex flex-col items-center gap-12 mt-12">
		<div class="flex flex-col items-center">
			<h1 class="text-8xl font-bold">
				{$bpm}
			</h1>
			<span class="text-lg font-normal">bpm</span>
		</div>
		<div class="flex flex-col items-center">
			<h2 class="text-4xl font-bold">
				{beatsNumber}
			</h2>
			<span class="text-lg font-normal">beats</span>
		</div>
	</div>

	<RangeSlider type="beats" on:input={changeBeats} bind:value={$beats.length} />
</div>

<div class="grid grid-cols-5">
	<ButtonControls type="bpm" value={$bpm} />
	<PlayButton />
	<ButtonControls type="beats" value={beatsNumber} />
</div>
