<script lang="ts">
	import { beats, beatsSpecs } from '#stores/beats.svelte.ts';
	import { metronome } from '#stores/metronome.svelte.ts';
	import Minus from './svg/minus.svelte';
	import Plus from './svg/plus.svelte';
</script>

<div class="beats">
	<button
		type="button"
		aria-label="Fewer beats"
		title="Fewer beats"
		disabled={beats.values.length <= beatsSpecs.min}
		onclick={() => beats.decrement()}
	>
		<Minus />
	</button>

	<div class="pads" role="group" aria-label="Beat accents">
		{#each beats.values as beat, i (i)}
			<button
				type="button"
				aria-label={`Beat ${i + 1}, toggle accent`}
				aria-pressed={beat}
				class={{ checked: beat, highlight: metronome.playing && i === metronome.currentBeat }}
				onclick={() => beats.toggle(i)}
			></button>
		{/each}
	</div>

	<button
		type="button"
		aria-label="More beats"
		title="More beats"
		disabled={beats.values.length >= beatsSpecs.max}
		onclick={() => beats.increment()}
	>
		<Plus />
	</button>
</div>

<style>
	.beats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--size-2);
		width: 100%;
	}

	.pads {
		display: flex;
		flex: 1 1 auto;
		justify-content: center;
		gap: var(--size-2);
		min-inline-size: 0;
	}

	.pads button {
		flex: 1 1 0;
		min-inline-size: 0;
		height: 3.5rem;
		aspect-ratio: auto;
		border: var(--border-size-2) solid var(--brand);
		background-color: transparent;
	}

	@media (min-width: 50rem) {
		.pads button {
			height: var(--size-9);
		}
	}

	.pads button.checked {
		background-color: var(--brand);
	}

	.pads button.highlight {
		box-shadow: inset 0 0 0 var(--size-1) var(--text-1);
	}

	.pads button.highlight.checked {
		box-shadow: inset 0 0 0 var(--size-1) var(--surface-1);
	}

	@media (hover: hover) {
		.pads button:hover {
			background-color: var(--surface-2);
		}
		.pads button.checked:hover {
			background-color: var(--brand);
			filter: brightness(1.1);
		}
	}
</style>
