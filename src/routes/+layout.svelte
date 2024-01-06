<script>
	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/colors-hsl';
	import '../app.css';
	import Info from '$components/info.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';
</script>

<main>
	<div class="scroll-container">
		<section class="metronome">
			<slot />
		</section>
		<section class="sidebar" data-mobile>
			<ThemeSwitch />
			<Info />
		</section>
	</div>
</main>
<div data-desktop>
	<ThemeSwitch />
	<Info />
</div>

<style>
	[data-desktop] {
		display: none;
	}
	[data-mobile] {
		display: block;
	}

	main {
		direction: rtl;
		height: 100svh;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
	}

	.scroll-container {
		direction: rtl;
		display: flex;
		height: 100svh;
		width: 180vw;
	}

	.metronome {
		display: flex;
		direction: ltr;
		width: 100vw;
		max-inline-size: var(--size-md);
		background-color: var(--surface-1);
		flex-direction: column;
		padding: var(--size-3);
		scroll-snap-align: start;
	}

	.sidebar {
		padding: var(--size-3);
		direction: ltr;
		width: 80vw;
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	@media (min-width: 50rem) {
		[data-desktop] {
			display: block;
		}
		[data-mobile] {
			display: none;
		}

		main {
			display: grid;
			place-items: center;
		}
		.scroll-container {
			display: contents;
		}

		.metronome {
			max-inline-size: var(--size-15);
			height: 80%;
			box-shadow: var(--shadow-3);
		}
	}
</style>
