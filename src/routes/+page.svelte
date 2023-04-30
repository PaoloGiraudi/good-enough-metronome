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
<hr />
<div class="flex justify-between items-center p-4">
	<ButtonControls type="beats" value={beatsNumber}>
		<div class="flex justify-center items-baseline">
			<span class="text-6xl font-bold">
				{beatsNumber}
			</span>
		</div>
	</ButtonControls>
</div>
<hr />
<div class="flex justify-between items-center p-4">
	<ButtonControls type="bpm" value={$bpm}>
		<div class="flex justify-center items-baseline">
			<span class="text-8xl font-bold">
				{$bpm}
			</span>
		</div>
	</ButtonControls>
</div>
<hr />
<RangeSlider on:input={() => bpm.set($bpm)} />
<hr />
<div class="grid place-items-center pb-4">
	<PlayButton />
</div>
