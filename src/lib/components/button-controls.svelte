<script lang="ts">
	import { beats, beatsSpecs } from '$stores/beats';
	import { bpm, bpmSpecs } from '$stores/bpm';
	import Minus from './svg/minus.svelte';
	import Plus from './svg/plus.svelte';
	export let type: 'bpm' | 'beats', value: number;

	const controls = {
		bpm: {
			specs: $bpmSpecs,
			action: bpm
		},
		beats: {
			specs: $beatsSpecs,
			action: beats
		}
	};
</script>

<div data-type={type}>
	<button
		aria-label={`Decrease ${type}`}
		disabled={value <= controls[type].specs.min}
		on:click={controls[type].action.decrement}
	>
		<Minus />
	</button>
	<slot />
	<button
		class="ghost-button"
		aria-label={`Increase ${type}`}
		disabled={value >= controls[type].specs.max}
		on:click={controls[type].action.increment}
	>
		<Plus />
	</button>
</div>

<style>
	div {
		font-weight: var(--font-weight-6);
		font-size: var(--font-size-8);
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}

	div[data-type='bpm'] {
		font-size: 5rem;
	}
	button {
		height: var(--size-8);
	}
</style>
