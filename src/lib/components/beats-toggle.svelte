<script lang="ts">
	import { beats } from '$stores/beats';
	import { isPlaying } from '$stores/metronome';
	export let beatCount: number;
</script>

<div class="grid grid-flow-col auto-cols-auto gap-2 h-28 p-4">
	{#each $beats as beat, i}
		<div
			class={`border-2 border-accent ${beat ? 'bg-accent' : ''} ${
				(i === beatCount - 1 && $isPlaying) ||
				(beatCount === 0 && i === $beats.length - 1 && $isPlaying)
					? 'bg-green-500'
					: ''
			}`}
			on:click={() => beats.toggle(i)}
			on:keydown={() => beats.toggle(i)}
		/>
	{/each}
</div>
