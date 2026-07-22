<script>
	import { version } from '$app/environment';
</script>

<div>
	<p>
		Source code on
		<a
			href="https://www.github.com/PaoloGiraudi/good-enough-metronome"
			target="_blank"
			rel="noopener noreferrer">Github</a
		>
	</p>
	<hr />
	<p>
		Built by <a href="https://www.paologiraudi.com" target="_blank" rel="noopener noreferrer"
			>Paolo Giraudi</a
		>
	</p>
	<hr />
	<p>Current version: {version}</p>
</div>

<style>
	hr {
		margin-block: var(--size-2);
		background-color: var(--surface-2);
		filter: invert(0.05);
		height: 1px;
	}
	p {
		font-size: var(--font-size-0);
	}
	a {
		color: var(--link);
	}

	@media (min-width: 50rem) {
		hr {
			display: none;
		}
		div {
			position: fixed;
			bottom: var(--size-3);
			left: var(--size-3);
		}
	}
</style>
