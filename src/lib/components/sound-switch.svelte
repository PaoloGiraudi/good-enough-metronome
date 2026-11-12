<script lang="ts">
	import { sound, soundLabels } from '#stores/sound.svelte.ts';
	import Beep from './svg/sound-beep.svelte';
	import Click from './svg/sound-click.svelte';
	import Wood from './svg/sound-wood.svelte';

	const icons = { click: Click, wood: Wood, beep: Beep };
	let Icon = $derived(icons[sound.value]);
</script>

<div>
	<p>Sound</p>
	<button
		type="button"
		aria-label={`Sound: ${soundLabels[sound.value]}. Change sound`}
		title={`Sound: ${soundLabels[sound.value]}`}
		onclick={sound.cycle}
	>
		<span class="icon"><Icon /></span>
		<span class="label">{soundLabels[sound.value]}</span>
	</button>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--size-1);
		aspect-ratio: auto;
		height: var(--size-8);
		padding: 0 var(--size-2);
		background-color: transparent;
		font-size: var(--font-size-0);
	}

	.icon {
		display: flex;
	}

	@media (min-width: 50rem) {
		button {
			position: absolute;
			top: var(--size-3);
			right: calc(var(--size-3) + var(--tap-size) + var(--size-2));
			width: var(--tap-size);
			padding: 0;
		}
		p,
		.label {
			display: none;
		}
		div {
			display: contents;
		}
	}
</style>
