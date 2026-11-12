<script lang="ts">
	import { bpm } from '$stores/bpm.svelte';
	import { metronome } from '$stores/metronome.svelte';

	let duration = $derived(`${60000 / bpm.speed}ms`);
	let reverse = $derived(metronome.beatCount % 2 === 0);
</script>

<div class="pendulum" aria-hidden="true">
	{#if metronome.playing && metronome.beatCount > 0}
		{#key metronome.beatCount}
			<span class={['ball', { reverse }]} style:--duration={duration}></span>
		{/key}
	{:else}
		<span class="ball resting"></span>
	{/if}
</div>

<style>
	.pendulum {
		--ball-size: 1rem;

		position: relative;
		isolation: isolate;
		width: 100%;
		height: var(--size-6);
	}

	.pendulum::before {
		content: '';
		position: absolute;
		inset-inline: 0;
		top: 50%;
		height: var(--border-size-1);
		background-color: var(--surface-2);
	}

	.pendulum::after {
		content: '';
		position: absolute;
		left: 50%;
		top: calc(50% - var(--size-2));
		width: var(--border-size-1);
		height: var(--size-4);
		background-color: var(--surface-2);
		translate: -50% 0;
	}

	.ball {
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 0;
		width: var(--ball-size);
		height: var(--ball-size);
		border-radius: 50%;
		background-color: var(--brand);
		transform: translateY(-50%);
		animation: swing var(--duration) ease-in-out both;
	}

	.ball.reverse {
		animation-name: swing-back;
	}

	.ball.resting {
		left: 50%;
		transform: translate(-50%, -50%);
		animation: none;
	}

	@keyframes swing {
		from {
			left: 0;
		}
		to {
			left: calc(100% - var(--ball-size));
		}
	}

	@keyframes swing-back {
		from {
			left: calc(100% - var(--ball-size));
		}
		to {
			left: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ball {
			left: 50%;
			transform: translate(-50%, -50%);
			animation: none;
		}
	}
</style>
