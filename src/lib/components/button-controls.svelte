<script lang="ts">
	import { beats, beatsSpecs } from '$stores/beats';
	import { bpm, bpmSpecs } from '$stores/bpm';
	export let type: 'bpm' | 'beats', value: number;

	const controls = {
		bpm: {
			color: 'btn-primary',
			specs: $bpmSpecs,
			action: bpm
		},
		beats: {
			color: 'btn-secondary',
			specs: $beatsSpecs,
			action: beats
		}
	};
</script>

<div class="flex flex-col gap-2">
	<button
		class={`btn ${controls[type].color}`}
		disabled={value >= controls[type].specs.max}
		on:click={controls[type].action.increment}
	>
		▲
	</button>
	<button
		class={`btn ${controls[type].color}`}
		disabled={value <= controls[type].specs.min}
		on:click={controls[type].action.decrement}
	>
		▼
	</button>
</div>
