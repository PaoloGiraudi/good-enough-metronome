<script>
	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/colors-hsl';
	import '../app.css';
	import Drawer from '$components/drawer.svelte';
	import Info from '$components/info.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<main>
	<slot />
	<Drawer>
		<ThemeSwitch />
		<Info />
	</Drawer>
</main>
<div data-display="desktop">
	<ThemeSwitch />
	<Info />
</div>

<style>
	main {
		width: 100%;
		height: 100%;
		max-inline-size: var(--size-md);
		background-color: var(--surface-1);
		display: flex;
		flex-direction: column;
		padding: var(--size-3);
		position: relative;
	}
	:global(main > :not(:last-of-type)) {
		border-bottom: var(--border-size-2) solid;
		border-color: var(--surface-2);
	}

	div[data-display='desktop'] {
		display: none;
	}

	:global(button) {
		padding: 0;
		display: grid;
		place-items: center;
		background-color: var(--surface-1);
		color: var(--text-1);
		aspect-ratio: var(--ratio-square);
	}

	:global(button:disabled) {
		opacity: 0.3;
	}

	@media (min-width: 640px) {
		main {
			max-inline-size: var(--size-15);
			height: 80%;
			box-shadow: var(--shadow-3);
		}
		div[data-display='desktop'] {
			display: contents;
		}
	}
</style>
