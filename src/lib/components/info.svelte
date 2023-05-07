<script>
	import { version } from '$app/environment';
</script>

<div>
	<p>Built by <a href="http://www.paologiraudi.com" target="__blank">Paolo Giraudi</a></p>
	<p>Source code on <a href="http://www.github.com/PaoloGiraudi" target="__blank">Github</a></p>
	<p>Current version: {version}</p>
</div>

<style>
	div {
		position: fixed;
		bottom: var(--size-3);
		left: var(--size-3);
	}
	p {
		font-size: var(--font-size-0);
	}
	a {
		color: var(--link);
	}
</style>
