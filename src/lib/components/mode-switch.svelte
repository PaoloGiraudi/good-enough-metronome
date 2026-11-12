<script lang="ts">
	import { mode, modeLabels } from '$stores/mode.svelte';
	import Bolt from './svg/bolt.svelte';
	import Speaker from './svg/speaker.svelte';
	import SpeakerOff from './svg/speaker-off.svelte';

	const icons = { sound: Speaker, mute: SpeakerOff, flash: Bolt };
	let Icon = $derived(icons[mode.value]);
</script>

<button
	type="button"
	class="mode"
	aria-label={`Audio mode: ${modeLabels[mode.value]}. Change mode`}
	title={modeLabels[mode.value]}
	onclick={mode.cycle}
>
	<Icon />
</button>

<style>
	.mode {
		position: absolute;
		inset-inline-end: 0;
		top: 50%;
		transform: translateY(-50%);
		width: var(--tap-size);
		height: var(--tap-size);
		aspect-ratio: 1;
		border: var(--border-size-1) solid var(--surface-2);
		border-radius: var(--radius-round);
	}

	@media (hover: hover) {
		.mode:hover {
			border-color: var(--brand);
		}
	}
</style>
