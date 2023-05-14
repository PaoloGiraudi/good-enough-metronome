<script lang="ts">
	import { beats } from '$stores/beats';
	import { isPlaying } from '$stores/metronome';
	export let beatCount: number;
</script>

<div data-role="beats">
	{#each $beats as beat, i}
		<div
			aria-label={`Beat ${i + 1}, toggle accent`}
			role="checkbox"
			tabindex="0"
			aria-checked={beat}
			class:checked={beat}
			class:highlight={$isPlaying &&
				(i === beatCount - 1 || (beatCount === 0 && i === $beats.length - 1))}
			on:click={() => beats.toggle(i)}
			on:keydown={(e) => (e.code === 'Space' ? beats.toggle(i) : null)}
		/>
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
