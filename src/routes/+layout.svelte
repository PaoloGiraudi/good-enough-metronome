<script>
	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/colors-hsl';
	import '../app.css';
	import Drawer from '$components/drawer.svelte';
	import Info from '$components/info.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';
</script>

<svelte:head>
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#fffcfa" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0A0908" />
	<title>GEM: Good enough metronome</title>
</svelte:head>

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
