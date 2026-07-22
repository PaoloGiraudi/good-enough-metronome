<script lang="ts">
	import { beats } from '$stores/beats.svelte';
	import { metronome } from '$stores/metronome.svelte';
</script>

<div data-role="beats">
	{#each beats.values as beat, i (i)}
		<button
			type="button"
			aria-label={`Beat ${i + 1}, toggle accent`}
			aria-pressed={beat}
			class:checked={beat}
			class:highlight={metronome.playing && i === metronome.currentBeat}
			onclick={() => beats.toggle(i)}
		></button>
	{/each}
</div>

<style>
	div[data-role='beats'] {
		display: grid;
		width: 100%;
		grid-auto-flow: column;
		grid-auto-columns: auto;
		gap: var(--size-2);
		height: var(--size-10);
	}

	button {
		width: 100%;
		height: 100%;
		aspect-ratio: auto;
		border: var(--border-size-2) solid;
		border-color: var(--brand);
		background-color: var(--surface-1);
	}

	button.checked {
		background-color: var(--brand);
	}
	button.highlight {
		background-color: var(--orange-4);
	}
</style>
