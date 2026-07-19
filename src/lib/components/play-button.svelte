<script>
	import { metronome } from '$stores/metronome.svelte';
	import Pause from './svg/pause.svelte';
	import Play from './svg/play.svelte';
</script>

<button
	class="ghost-button"
	aria-label={metronome.on ? 'Stop metronome' : 'Start metronome'}
	onclick={() => (metronome.on = !metronome.on)}
>
	{#if metronome.on}
		<Pause />
	{:else}
		<Play />
	{/if}
</button>

<style>
	button {
		height: var(--size-10);
	}
</style>
