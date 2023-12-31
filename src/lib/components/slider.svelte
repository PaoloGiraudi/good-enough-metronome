<script lang="ts">
	import { bpmSpecs, bpm } from '$stores/bpm';
</script>

<input
	type="range"
	aria-label="Modify metronome speed"
	min={$bpmSpecs.min}
	max={$bpmSpecs.max}
	on:input
	bind:value={$bpm}
/>

<style>
	input[type='range'] {
		touch-action: none;
		background: var(--surface-1);
		width: 100%;
		height: var(--size-7);
		border-radius: 0;
		-webkit-appearance: none;
		appearance: none;
		overflow: hidden;
	}

	/*webkit*/
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: var(--size-7);
		height: var(--size-7);
		border-radius: 0;
		background: var(--surface-1);
		cursor: pointer;
		border: 4px solid var(--brand);
		box-shadow: -400px 0 0 400px var(--brand);
	}

	input[type='range']::-webkit-slider-runnable-track {
		border-radius: 0;
		height: var(--size-7);
		background: var(--surface-2);
		box-shadow:
			inset 0 10px var(--surface-1),
			inset 0 -10px var(--surface-1);
	}

	/*mozilla*/
	input[type='range']::-moz-range-thumb {
		width: max(calc(var(--size-7) - 4px - 4px), 0px);
		height: max(calc(var(--size-7) - 4px - 4px), 0px);
		border-radius: 0;
		border: 4px solid var(--brand);
		box-shadow: -400px 0 0 400px var(--brand);
	}

	input[type='range']::-moz-range-track {
		height: max(calc(var(--size-7) - 10px - 10px), 0px);
		background: var(--surface-2);
	}
</style>
