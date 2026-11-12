<script lang="ts">
	import type { Snippet } from 'svelte';
	import Minus from './svg/minus.svelte';
	import Plus from './svg/plus.svelte';

	interface Props {
		type: 'bpm' | 'beats';
		value: number;
		min: number;
		max: number;
		decrement: (amount: number) => void;
		increment: (amount: number) => void;
		children: Snippet;
	}

	let { type, value, min, max, decrement, increment, children }: Props = $props();

	const HOLD_DELAY = 400;
	const HOLD_INTERVAL = 80;

	let holdDelay: ReturnType<typeof setTimeout> | null = null;
	let holdRepeat: ReturnType<typeof setInterval> | null = null;

	const step = (direction: 'decrement' | 'increment') =>
		direction === 'decrement' ? decrement : increment;

	const amount = (event: MouseEvent) => (event.shiftKey ? 10 : 1);

	function stopRepeat() {
		if (holdDelay !== null) clearTimeout(holdDelay);
		if (holdRepeat !== null) clearInterval(holdRepeat);
		holdDelay = null;
		holdRepeat = null;
	}

	function handlePointerDown(event: PointerEvent, direction: 'decrement' | 'increment') {
		if (event.button !== 0) return;

		stopRepeat();
		step(direction)(amount(event));
		holdDelay = setTimeout(() => {
			holdRepeat = setInterval(() => step(direction)(1), HOLD_INTERVAL);
		}, HOLD_DELAY);
	}

	function handleClick(event: MouseEvent, direction: 'decrement' | 'increment') {
		if (event.detail !== 0) return;

		step(direction)(amount(event));
	}
</script>

<div data-type={type}>
	<button
		aria-label={`Decrease ${type}`}
		title="Decrease by 1 (shift-click for 10, hold to repeat)"
		disabled={value <= min}
		onpointerdown={(event) => handlePointerDown(event, 'decrement')}
		onpointerup={stopRepeat}
		onpointercancel={stopRepeat}
		onpointerleave={stopRepeat}
		onlostpointercapture={stopRepeat}
		oncontextmenu={(event) => event.preventDefault()}
		onclick={(event) => handleClick(event, 'decrement')}
	>
		<Minus />
	</button>
	<span class="value">{@render children()}</span>
	<button
		aria-label={`Increase ${type}`}
		title="Increase by 1 (shift-click for 10, hold to repeat)"
		disabled={value >= max}
		onpointerdown={(event) => handlePointerDown(event, 'increment')}
		onpointerup={stopRepeat}
		onpointercancel={stopRepeat}
		onpointerleave={stopRepeat}
		onlostpointercapture={stopRepeat}
		oncontextmenu={(event) => event.preventDefault()}
		onclick={(event) => handleClick(event, 'increment')}
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
		align-items: center;
		width: 100%;
	}

	.value {
		min-inline-size: 3ch;
		text-align: center;
	}

	div[data-type='bpm'] {
		--bpm-size: 6rem;

		font-size: var(--bpm-size);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	button {
		height: var(--tap-size);
	}

	@media (max-height: 44rem) {
		div[data-type='bpm'] {
			--bpm-size: var(--size-10);
		}
	}
</style>
