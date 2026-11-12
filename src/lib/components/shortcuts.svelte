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
		--key-gap: 0.25em;
		--key-min-inline: 1.5em;
		--key-padding: 0.1em 0.35em;
		--key-border-strength: 28%;
		--key-font-size: 0.92em;
		--key-line-height: 1.35;

		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-1) var(--size-3);
		font-size: var(--font-size-0);
	}

	.pair {
		display: inline-flex;
		align-items: center;
		gap: var(--key-gap);
		white-space: nowrap;
	}

	kbd {
		display: inline-block;
		min-inline-size: var(--key-min-inline);
		padding: var(--key-padding);
		border: var(--border-size-1) solid
			color-mix(in srgb, var(--text-1) var(--key-border-strength), transparent);
		border-radius: var(--radius-1);
		font-family: inherit;
		font-size: var(--key-font-size);
		font-weight: var(--font-weight-6);
		line-height: var(--key-line-height);
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
