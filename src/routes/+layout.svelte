<script>
	import Moon from '$components/moon.svelte';
	import Sun from '$components/sun.svelte';
	import { theme } from '$stores/theme';
	import '../app.css';

	const html = document.querySelector('html');

	$: if (html) {
		html.setAttribute('data-theme', $theme);
	}
</script>

<svelte:head>
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#fffcfa" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0A0908" />
	<title>GEM: Good enough metronome</title>
</svelte:head>

<main
	class="container mx-auto flex flex-col p-4 justify-between h-full sm:w-1/2 sm:max-w-lg sm:h-2/3 sm:shadow-2xl sm:shadow-neutral"
>
	<slot />
	<button
		class="btn btn-circle btn-neutral absolute bottom-4 right-4 sm:top-8 sm:right-8"
		on:click={() => theme.set($theme === 'light' ? 'dark' : 'light')}
	>
		{#if $theme === 'dark'}
			<Sun />
		{/if}
		{#if $theme === 'light'}
			<Moon />
		{/if}
	</button>
</main>
