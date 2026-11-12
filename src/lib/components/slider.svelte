<script lang="ts">
	import { bpm, bpmSpecs } from '$stores/bpm.svelte';
</script>

<input
	type="range"
	aria-label="Modify metronome speed"
	min={bpmSpecs.min}
	max={bpmSpecs.max}
	value={bpm.speed}
	oninput={(event) => bpm.set(Number(event.currentTarget.value))}
/>

<style>
	input[type='range'] {
		--thumb-border: 4px;
		--fill-spread: 400px;

		touch-action: none;
		background: transparent;
		width: 100%;
		height: var(--size-7);
		border-radius: 0;
		-webkit-appearance: none;
		appearance: none;
		overflow: hidden;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: var(--size-7);
		height: var(--size-7);
		border-radius: 0;
		background: var(--surface-1);
		cursor: pointer;
		border: var(--thumb-border) solid var(--brand);
		box-shadow: calc(-1 * var(--fill-spread)) 0 0 var(--fill-spread) var(--brand);
	}

	input[type='range']::-webkit-slider-runnable-track {
		border-radius: 0;
		height: var(--size-7);
		background: linear-gradient(var(--surface-2), var(--surface-2)) center / 100% 12px no-repeat;
	}

	input[type='range']::-moz-range-thumb {
		width: calc(var(--size-7) - var(--thumb-border) * 2);
		height: calc(var(--size-7) - var(--thumb-border) * 2);
		border-radius: 0;
		border: var(--thumb-border) solid var(--brand);
		box-shadow: calc(-1 * var(--fill-spread)) 0 0 var(--fill-spread) var(--brand);
	}

	input[type='range']::-moz-range-track {
		height: 12px;
		background: var(--surface-2);
	}
</style>
