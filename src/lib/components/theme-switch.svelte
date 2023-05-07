<script>
	import { setTheme, theme } from '$stores/theme';
	import { onMount } from 'svelte';
	import Moon from './moon.svelte';
	import Sun from './sun.svelte';
	onMount(() => document.documentElement.setAttribute('color-scheme', $theme));
</script>

<p>Select theme</p>
<button on:click={() => setTheme($theme === 'light' ? 'dark' : 'light')}>
	{#if $theme === 'dark'}
		<Sun />
	{/if}
	{#if $theme === 'light'}
		<Moon />
	{/if}
</button>

<style>
	p {
		padding-block-start: var(--size-2);
	}
	button {
		position: absolute;
		top: var(--size-3);
		right: var(--size-3);
		background-color: var(--surface-2);
		display: grid;
		place-items: center;
		height: var(--size-8);
		aspect-ratio: var(--ratio-square);
	}

	@media (min-width: 640px) {
		p {
			display: none;
		}
	}
</style>
