<script lang="ts">
	import * as Tone from 'tone';
	import ButtonControls from '$components/button-controls.svelte';
	import { beats } from '$stores/beats';
	import { bpm } from '$stores/bpm';
	import { isPlaying, metronomeOn } from '$stores/metronome';
	import BeatsToggle from '$components/beats-toggle.svelte';
	import Slider from '$components/slider.svelte';
	import PlayButton from '$components/play-button.svelte';
	import Section from '$components/section.svelte';

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

<Section>
	<BeatsToggle {beatCount} />
</Section>
<Section>
	<ButtonControls type="beats" value={beatsNumber}>
		{beatsNumber}
	</ButtonControls>
</Section>
<Section>
	<ButtonControls type="bpm" value={$bpm}>
		{$bpm}
	</ButtonControls>
</Section>
<Section>
	<Slider on:input={() => bpm.set($bpm)} />
</Section>
<Section>
	<PlayButton />
</Section>
