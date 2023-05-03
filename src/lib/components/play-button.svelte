<script>
	import { metronomeOn } from '$stores/metronome';
	import { svg_element } from 'svelte/internal';
</script>

<button class="h-20 w-20 grid place-items-center" on:click={() => metronomeOn.set(!$metronomeOn)}>
	{#if $metronomeOn}
		<svg width="60" height="60" viewBox="-1 0 8 8">
			<path fill="currentColor" fill-rule="evenodd" d="M0 8h2V0H0v8Zm4 0h2V0H4v8Z" />
		</svg>
	{:else}
		<svg width="60" height="60" viewBox="-0.5 0 8 8">
			<path fill="currentColor" fill-rule="evenodd" d="M0 0v8l7-4z" />
		</svg>
	{/if}
</button>
