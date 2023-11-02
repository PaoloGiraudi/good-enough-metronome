<script>
	import { metronomeOn } from '$stores/metronome';
	import Pause from './svg/pause.svelte';
	import Play from './svg/play.svelte';
</script>

<button
	class="ghost-button"
	aria-label={$metronomeOn ? 'Stop metronome' : 'Start metronome'}
	on:click={() => metronomeOn.set(!$metronomeOn)}
>
	{#if $metronomeOn}
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
