<script lang="ts">
	import { onMount } from 'svelte';
	import BeatsToggle from '$components/beats-toggle.svelte';
	import ButtonControls from '$components/button-controls.svelte';
	import ModeSwitch from '$components/mode-switch.svelte';
	import Pendulum from '$components/pendulum.svelte';
	import PlayButton from '$components/play-button.svelte';
	import Section from '$components/section.svelte';
	import Slider from '$components/slider.svelte';
	import { beats } from '$stores/beats.svelte';
	import { bpm, bpmSpecs } from '$stores/bpm.svelte';
	import { metronome } from '$stores/metronome.svelte';
	import { mode } from '$stores/mode.svelte';
	import { pendulum } from '$stores/pendulum.svelte';
	import { sound } from '$stores/sound.svelte';

	let ready = $state(false);

	onMount(() => {
		bpm.hydrate();
		beats.hydrate();
		mode.hydrate();
		pendulum.hydrate();
		sound.hydrate();
		ready = true;
	});

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		const tag = target?.tagName;

		if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) {
			return;
		}

		if (event.key === ' ') {
			if (tag === 'BUTTON') return;

			event.preventDefault();
			metronome.toggle();
			return;
		}

		const amount = event.shiftKey ? 10 : 1;

		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault();
				bpm.increment(amount);
				break;
			case 'ArrowDown':
				event.preventDefault();
				bpm.decrement(amount);
				break;
			case 't':
			case 'T':
				bpm.tap();
				break;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<h1 class="visually-hidden">Good Enough Metronome - a free online metronome</h1>

<Section>
	<div class="beats-area">
		<BeatsToggle />
		{#if ready && pendulum.visible}
			<Pendulum />
		{/if}
	</div>
</Section>

<Section flex="1 1 auto">
	<div class="tempo">
		<ButtonControls
			type="bpm"
			value={bpm.speed}
			min={bpmSpecs.min}
			max={bpmSpecs.max}
			decrement={bpm.decrement}
			increment={bpm.increment}
		>
			<span class={['bpm-value', { ready }]}>{bpm.speed}</span>
		</ButtonControls>
		<div class={['slider', { ready }]}>
			<Slider />
		</div>
		<button type="button" class="tap" aria-label="Tap tempo" onclick={bpm.tap}>Tap</button>
	</div>
</Section>

<Section>
	<div class="transport">
		<PlayButton />
		<ModeSwitch />
	</div>
</Section>

<style>
	.visually-hidden {
		position: absolute;
		clip-path: inset(50%);
		overflow: hidden;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
		white-space: nowrap;
	}

	.tempo {
		--tap-width: 5.5rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--size-5);
		width: 100%;
	}

	.beats-area {
		display: flex;
		flex-direction: column;
		gap: var(--size-8);
		width: 100%;
	}

	.bpm-value,
	.slider {
		visibility: hidden;
	}

	.bpm-value.ready,
	.slider.ready {
		visibility: visible;
	}

	.slider {
		width: 100%;
	}

	.tap {
		aspect-ratio: auto;
		height: auto;
		min-inline-size: var(--tap-width);
		min-block-size: var(--size-8);
		padding: var(--size-1) var(--size-4);
		border: var(--border-size-1) solid var(--surface-2);
		border-radius: var(--radius-round);
		background-color: transparent;
		font-size: var(--font-size-1);
	}

	.tap:active {
		background-color: var(--brand);
		color: var(--surface-1);
	}

	.transport {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	@media (hover: hover) {
		.tap:hover {
			border-color: var(--brand);
		}
	}
</style>
