<script>
	import { version } from '$app/environment';
</script>

<div>
	<p>
		Download GEM from the
		<a
			href="https://play.google.com/store/apps/details?id=com.goodmetronome.www.twa"
			target="__blank"
		>
			Play Store
		</a>
	</p>
	<hr />
	<p>
		Found a bug? Send me an
		<a href="mailto:me@paologiraudi.com">email</a>
	</p>
	<hr />
	<p>
		Source code on
		<a href="http://www.github.com/PaoloGiraudi/good-enough-metronome" target="__blank">Github</a>
	</p>
	<hr />
	<p>Built by <a href="http://www.paologiraudi.com" target="__blank">Paolo Giraudi</a></p>
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
