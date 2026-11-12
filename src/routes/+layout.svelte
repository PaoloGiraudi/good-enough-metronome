<script lang="ts">
	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/colors-hsl';
	import '../app.css';
	import PendulumSwitch from '$components/pendulum-switch.svelte';
	import Shortcuts from '$components/shortcuts.svelte';
	import SoundSwitch from '$components/sound-switch.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';
	import { beats } from '$stores/beats.svelte';
	import { bpm } from '$stores/bpm.svelte';
	import { metronome } from '$stores/metronome.svelte';
	import { mode } from '$stores/mode.svelte';
	import { pendulum } from '$stores/pendulum.svelte';
	import { sound } from '$stores/sound.svelte';
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	untrack(() => {
		bpm.hydrate(data.settings.bpm);
		beats.hydrate(data.settings.beats);
		mode.hydrate(data.settings.mode);
		pendulum.hydrate(data.settings.pendulum);
		sound.hydrate(data.settings.sound);
	});
</script>

<main>
	<div class="scroll-container">
		<section class="metronome" data-flash={metronome.flashLevel}>
			{@render children()}
		</section>
		<section class="sidebar">
			<div class="settings">
				<ThemeSwitch />
				<SoundSwitch />
				<PendulumSwitch />
			</div>
			<Shortcuts />
		</section>
	</div>
</main>

<style>
	main {
		--sidebar-width: 80vw;

		direction: rtl;
		height: 100svh;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
	}

	.scroll-container {
		direction: rtl;
		display: flex;
		height: 100svh;
		width: calc(100vw + var(--sidebar-width));
	}

	.metronome {
		display: flex;
		direction: ltr;
		width: 100vw;
		max-inline-size: var(--size-md);
		background-color: var(--surface-1);
		flex-direction: column;
		padding: var(--size-4);
		padding-bottom: 0;
		scroll-snap-align: start;
		transition: background-color 70ms ease-out;
	}

	.metronome[data-flash='1'] {
		background-color: color-mix(in srgb, var(--brand) 14%, var(--surface-1));
	}

	.metronome[data-flash='2'] {
		background-color: color-mix(in srgb, var(--brand) 30%, var(--surface-1));
	}

	@media (prefers-reduced-motion: reduce) {
		.metronome {
			transition: none;
		}

		.metronome[data-flash='1'],
		.metronome[data-flash='2'] {
			background-color: var(--surface-1);
		}
	}

	.sidebar {
		padding: var(--size-3);
		direction: ltr;
		width: var(--sidebar-width);
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		width: 100%;
	}

	@media (min-width: 50rem) {
		main {
			display: grid;
			place-items: center;
		}
		.scroll-container {
			display: contents;
		}

		.metronome {
			height: min(95vh, calc(var(--size-15) * 16 / 9));
			width: auto;
			aspect-ratio: 9 / 16;
			max-inline-size: 95vw;
			overflow-y: auto;
			padding: var(--size-5);
			padding-bottom: 0;
			box-shadow: var(--shadow-3);
		}

		.sidebar {
			display: contents;
		}

		.settings {
			display: contents;
		}
	}
</style>
