<script lang="ts">
	import ButtonControls from '$components/button-controls.svelte';
	import { beats, beatsSpecs } from '$stores/beats.svelte';
	import { bpm, bpmSpecs } from '$stores/bpm.svelte';
	import BeatsToggle from '$components/beats-toggle.svelte';
	import Slider from '$components/slider.svelte';
	import PlayButton from '$components/play-button.svelte';
	import Section from '$components/section.svelte';

	let beatsNumber = $derived(beats.values.length);
</script>

<h1 class="visually-hidden">Good Enough Metronome - a free online metronome</h1>

<Section>
	<BeatsToggle />
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
	<Slider />
</Section>
<Section>
	<PlayButton />
</Section>

<style>
	.visually-hidden {
		position: absolute;
		clip-path: inset(50%);
		overflow: hidden;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
		white-space: nowrap;
	}
</style>
