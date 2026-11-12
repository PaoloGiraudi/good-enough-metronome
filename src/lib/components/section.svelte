<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		flex?: string;
	}

	let { children, flex = '0 0 auto' }: Props = $props();
</script>

<section style:flex>
	{@render children()}
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--size-4) 0;
		min-block-size: 0;
	}

	@media (min-width: 50rem) {
		section {
			padding: var(--size-5) 0;
		}
	}

	@media (max-height: 44rem) {
		section {
			padding: var(--size-3) 0;
		}
	}
</style>
