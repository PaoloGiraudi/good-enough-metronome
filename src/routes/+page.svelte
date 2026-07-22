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
