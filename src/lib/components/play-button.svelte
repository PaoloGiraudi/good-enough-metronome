<script>
	import { metronomeOn } from '$stores/metronome';
</script>

<button class="h-20 w-20 grid place-items-center" on:click={() => metronomeOn.set(!$metronomeOn)}>
	{#if $metronomeOn}
		<img class="h-10" src={'/svg/pause.svg'} alt="Stop metronome" />
	{:else}
		<img class="h-10" src={'/svg/play.svg'} alt="Start metronome" />
	{/if}
</button>
