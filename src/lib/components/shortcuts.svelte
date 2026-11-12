<div>
	<p class="shortcuts">
		<span class="pair"><kbd>Space</kbd> start/stop</span>
		<span class="pair"><kbd>↑</kbd><kbd>↓</kbd> tempo</span>
		<span class="pair"><kbd>Shift</kbd> ±10</span>
		<span class="pair"><kbd>T</kbd> tap</span>
	</p>
</div>

<style>
	.shortcuts {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-1) var(--size-3);
		font-size: var(--font-size-0);
	}

	.pair {
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
		white-space: nowrap;
	}

	kbd {
		display: inline-block;
		min-inline-size: 1.5em;
		padding: 0.1em 0.35em;
		border: var(--border-size-1) solid color-mix(in srgb, var(--text-1) 28%, transparent);
		border-radius: var(--radius-1);
		font-family: inherit;
		font-size: 0.92em;
		font-weight: var(--font-weight-6);
		line-height: 1.35;
		text-align: center;
	}

	@media (min-width: 50rem) {
		div {
			position: fixed;
			bottom: var(--size-3);
			left: var(--size-3);
		}
	}
</style>
