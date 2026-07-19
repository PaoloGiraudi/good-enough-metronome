<script lang="ts">
	import Minus from './svg/minus.svelte';
	import Plus from './svg/plus.svelte';

	interface Props {
		type: 'bpm' | 'beats';
		value: number;
		min: number;
		max: number;
		decrement: () => void;
		increment: () => void;
		children: import('svelte').Snippet;
	}

	let { type, value, min, max, decrement, increment, children }: Props = $props();
</script>

<div data-type={type}>
	<button aria-label={`Decrease ${type}`} disabled={value <= min} onclick={decrement}>
		<Minus />
	</button>
	{@render children()}
	<button
		class="ghost-button"
		aria-label={`Increase ${type}`}
		disabled={value >= max}
		onclick={increment}
	>
		<Plus />
	</button>
</div>

<style>
	div {
		font-weight: var(--font-weight-6);
		font-size: var(--font-size-8);
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}

	div[data-type='bpm'] {
		font-size: 5rem;
	}
	button {
		height: var(--size-8);
	}
</style>
