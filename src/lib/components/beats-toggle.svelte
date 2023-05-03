<script lang="ts">
	import { beats } from '$stores/beats';
	import { isPlaying } from '$stores/metronome';
	export let beatCount: number;
</script>

<div class="grid grid-flow-col w-full auto-cols-auto gap-2 h-28 p-4">
	{#each $beats as beat, i}
		<div
			role="spinbutton"
			tabindex="0"
			class={`border-2 border-primary ${beat ? 'bg-primary' : ''} ${
				(i === beatCount - 1 && $isPlaying) ||
				(beatCount === 0 && i === $beats.length - 1 && $isPlaying)
					? 'bg-secondary'
					: ''
			}`}
			on:click={() => beats.toggle(i)}
			on:keydown={(e) => (e.code === 'Space' ? beats.toggle(i) : null)}
		/>
	{/each}
</div>
