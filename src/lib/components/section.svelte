<script>
	let { children } = $props();
</script>

<section>
	{@render children()}
</section>

<style>
	section {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		justify-content: center;
		padding: var(--size-3);
	}
</style>
