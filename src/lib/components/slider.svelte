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
		--slide-size: var(--size-7);
		--slide-line: 12px;
		--thumb-border: 4px;
		--thumb-inner: calc(var(--slide-size) - var(--thumb-border) * 2);
		--fill-spread: 400px;
		--line-start: calc((var(--slide-size) - var(--slide-line)) / 2);
		--line-end: calc((var(--slide-size) + var(--slide-line)) / 2);

		touch-action: none;
		background: transparent;
		width: 100%;
		height: var(--slide-size);
		border-radius: 0;
		-webkit-appearance: none;
		appearance: none;
		overflow: hidden;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: var(--slide-size);
		height: var(--slide-size);
		border-radius: 0;
		background: var(--surface-1);
		cursor: pointer;
		border: var(--thumb-border) solid var(--brand);
		box-shadow: calc(-1 * var(--fill-spread)) 0 0 var(--fill-spread) var(--brand);
	}

	input[type='range']::-webkit-slider-runnable-track {
		border-radius: 0;
		height: var(--slide-size);
		background: linear-gradient(
			to bottom,
			transparent 0 var(--line-start),
			var(--surface-2) var(--line-start) var(--line-end),
			transparent var(--line-end)
		);
	}

	input[type='range']::-moz-range-thumb {
		width: var(--thumb-inner);
		height: var(--thumb-inner);
		border-radius: 0;
		border: var(--thumb-border) solid var(--brand);
		box-shadow: calc(-1 * var(--fill-spread)) 0 0 var(--fill-spread) var(--brand);
	}

	input[type='range']::-moz-range-track {
		height: var(--slide-line);
		background: var(--surface-2);
	}
</style>
