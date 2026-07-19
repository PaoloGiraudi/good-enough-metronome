<script lang="ts">
	import * as Tone from 'tone';
	import ButtonControls from '$components/button-controls.svelte';
	import { beats, beatsSpecs } from '$stores/beats.svelte';
	import { bpm, bpmSpecs } from '$stores/bpm.svelte';
	import { metronome } from '$stores/metronome.svelte';
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

	let beatCount = $state(0);
	let beatsNumber = $derived(beats.values.length);

	$effect(() => {
		Tone.getTransport().bpm.value = bpm.speed;
	});

	const loop = new Tone.Loop((now) => {
		if (beats.values[beatCount]) {
			click.triggerAttackRelease('F6', '16n', now);
		} else {
			click.triggerAttackRelease('C6', '16n', now);
		}
		metronome.playing = true;
		beatCount = (beatCount + 1) % beatsNumber;
	}, '4n');

	$effect(() => {
		if (metronome.on) {
			Tone.start();
			Tone.getTransport().start();
			loop.start();
		} else {
			Tone.getTransport().stop();
			loop.stop();
			metronome.playing = false;
			beatCount = 0;
		}
	});
</script>

<Section>
	<BeatsToggle {beatCount} />
</Section>
<Section>
	<ButtonControls
		type="beats"
		value={beatsNumber}
		min={beatsSpecs.min}
		max={beatsSpecs.max}
		decrement={beats.decrement}
		increment={beats.increment}
	>
		{beatsNumber}
	</ButtonControls>
</Section>
<Section>
	<ButtonControls
		type="bpm"
		value={bpm.speed}
		min={bpmSpecs.min}
		max={bpmSpecs.max}
		decrement={bpm.decrement}
		increment={bpm.increment}
	>
		{bpm.speed}
	</ButtonControls>
</Section>
<Section>
	<Slider oninput={() => bpm.set(bpm.speed)} />
</Section>
<Section>
	<PlayButton />
</Section>
