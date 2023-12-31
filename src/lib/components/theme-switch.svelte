<script>
	import { setTheme, theme } from '$stores/theme';
	import { onMount } from 'svelte';
	import Sun from './svg/sun.svelte';
	import Moon from './svg/moon.svelte';
	onMount(() => document.documentElement.setAttribute('color-scheme', $theme));
</script>

<div>
	<p>Select theme</p>
	<button
		aria-label="Switch theme"
		on:click={() => setTheme($theme === 'light' ? 'dark' : 'light')}
	>
		{#if $theme === 'dark'}
			<Sun />
		{/if}
		{#if $theme === 'light'}
			<Moon />
		{/if}
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
		background-color: var(--surface-2);
		height: var(--size-8);
	}

	@media (min-width: 50rem) {
		button {
			position: absolute;
			top: var(--size-3);
			right: var(--size-3);
		}
		p {
			display: none;
		}
	}
</style>
