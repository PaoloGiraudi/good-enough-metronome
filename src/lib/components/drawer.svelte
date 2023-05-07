<script lang="ts">
	import { drawer } from '$stores/drawer';
	import { fade, fly } from 'svelte/transition';
	import Close from './svg/close.svelte';
	import Settings from './svg/settings.svelte';
</script>

<svelte:window on:keydown={(e) => e.code === 'Escape' && $drawer && drawer.set(false)} />

<button on:click={() => drawer.set(!$drawer)}>
	{#if $drawer}
		<Close />
	{:else}
		<Settings />
	{/if}
</button>
{#if $drawer}
	<div
		data-role="backdrop"
		on:keypress
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 250 }}
		on:click={() => drawer.set(false)}
	>
		<div
			data-role="dialog"
			in:fly={{ y: 500, duration: 150 }}
			out:fly={{ y: 500, duration: 250 }}
			on:click|stopPropagation
			on:keypress|stopPropagation
		>
			<slot />
		</div>
	</div>
{/if}

<style>
	button {
		display: grid;
		place-items: center;
		height: var(--size-8);
		aspect-ratio: var(--ratio-square);
		position: absolute;
		background: var(--surface-2);
		bottom: var(--size-3);
		right: var(--size-3);
		z-index: var(--layer-5);
	}
	div[data-role='backdrop'] {
		position: fixed;
		display: flex;
		align-items: flex-end;
		top: 0;
		left: 0;
		min-height: 100%;
		width: 100%;
		background-color: hsl(var(--gray-11-hsl) / 10%);
		backdrop-filter: blur(var(--size-1));
	}
	div[data-role='dialog'] {
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: flex-start;
		padding: var(--size-3);
		height: var(--size-xs);
		width: 100%;
		background-color: var(--surface-2);
		max-inline-size: var(--size-md);
		margin-inline: auto;
		border-top-left-radius: var(--radius-2);
		border-top-right-radius: var(--radius-2);
	}

	@media (min-width: 640px) {
		button {
			display: none;
		}
	}
</style>
