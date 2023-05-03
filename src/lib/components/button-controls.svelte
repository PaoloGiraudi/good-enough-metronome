<script lang="ts">
	import { beats, beatsSpecs } from '$stores/beats';
	import { bpm, bpmSpecs } from '$stores/bpm';
	export let type: 'bpm' | 'beats', value: number;

	const controls = {
		bpm: {
			color: 'btn-neutral',
			specs: $bpmSpecs,
			action: bpm
		},
		beats: {
			color: 'btn-neutral',
			specs: $beatsSpecs,
			action: beats
		}
	};
</script>

<button
	class={`btn btn-ghost btn-square btn-md text-4xl ${controls[type].color}`}
	disabled={value <= controls[type].specs.min}
	on:click={controls[type].action.decrement}
>
	-
</button>
<slot />
<button
	class={`btn btn-ghost btn-square btn-md text-4xl ${controls[type].color}`}
	disabled={value >= controls[type].specs.max}
	on:click={controls[type].action.increment}
>
	+
</button>
