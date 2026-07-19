<script lang="ts">
	import { beats } from '$stores/beats.svelte';
	import { metronome } from '$stores/metronome.svelte';

	interface Props {
		beatCount: number;
	}

	let { beatCount }: Props = $props();
</script>

<div data-role="beats">
	{#each beats.values as beat, i (i)}
		<div
			aria-label={`Beat ${i + 1}, toggle accent`}
			role="checkbox"
			tabindex="0"
			aria-checked={beat}
			class:checked={beat}
			class:highlight={metronome.playing &&
				(i === beatCount - 1 || (beatCount === 0 && i === beats.values.length - 1))}
			onclick={() => beats.toggle(i)}
			onkeydown={(e) => (e.code === 'Space' ? beats.toggle(i) : null)}
		></div>
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

	div[role='checkbox'] {
		border: var(--border-size-2) solid;
		border-color: var(--brand);
	}

	.checked {
		background-color: var(--brand);
	}
	.highlight {
		background-color: var(--orange-4);
	}
</style>
