<script>
	import { metronomeOn } from '$stores/metronome';
</script>

<div class="grid place-items-center col-span-3">
	<button class="btn btn-lg btn-accent self-center" on:click={() => metronomeOn.set(!$metronomeOn)}>
		{$metronomeOn ? 'Stop' : 'Play'}</button
	>
</div>
