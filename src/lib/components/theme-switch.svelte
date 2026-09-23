<script>
	import { onMount } from 'svelte';
	import { theme } from '$stores/theme.svelte';
	import Sun from './svg/sun.svelte';
	import Moon from './svg/moon.svelte';

	onMount(() => theme.sync());
</script>

<div>
	<p>Select theme</p>
	<button
		aria-label="Switch theme"
		onclick={() => theme.set(theme.value === 'light' ? 'dark' : 'light')}
	>
		<span class="icon sun"><Sun /></span>
		<span class="icon moon"><Moon /></span>
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

	.icon {
		display: flex;
	}
	:global(html[color-scheme='dark']) .moon,
	:global(html[color-scheme='light']) .sun {
		display: none;
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
		div {
			display: contents;
		}
	}
</style>
