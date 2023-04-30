<script lang="ts">
	import { beatsSpecs } from '$stores/beats';
	import { bpmSpecs } from '$stores/bpm';
	export let type: 'bpm' | 'beats', value: number;
	const range = {
		bpm: {
			color: 'range-primary',
			specs: $bpmSpecs
		},
		beats: {
			color: 'range-secondary',
			specs: $beatsSpecs
		}
	};
</script>

<div class="flex flex-col justify-around items-center">
	<input
		class={`range range-lg -rotate-90 w-80 mt-24 ${range[type].color}`}
		type="range"
		min={range[type].specs.min}
		max={range[type].specs.max}
		on:input
		bind:value
	/>
</div>
