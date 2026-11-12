<script lang="ts">
	import { pendulum } from '$stores/pendulum.svelte';
	import PendulumIcon from './svg/pendulum.svelte';
	import PendulumOff from './svg/pendulum-off.svelte';

	let Icon = $derived(pendulum.visible ? PendulumIcon : PendulumOff);
</script>

<div>
	<p>Pendulum</p>
	<button
		type="button"
		aria-pressed={pendulum.visible}
		aria-label={pendulum.visible ? 'Hide pendulum' : 'Show pendulum'}
		title={pendulum.visible ? 'Hide pendulum' : 'Show pendulum'}
		onclick={pendulum.toggle}
	>
		<span class="icon"><Icon /></span>
		<span class="label">{pendulum.visible ? 'On' : 'Off'}</span>
	</button>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--size-1);
		aspect-ratio: auto;
		height: var(--size-8);
		padding: 0 var(--size-2);
		background-color: transparent;
		font-size: var(--font-size-0);
	}

	.icon {
		display: flex;
	}

	@media (min-width: 50rem) {
		button {
			position: absolute;
			top: var(--size-3);
			right: calc(var(--size-3) + 2 * var(--tap-size) + 2 * var(--size-2));
			width: var(--tap-size);
			padding: 0;
		}
		p,
		.label {
			display: none;
		}
		div {
			display: contents;
		}
	}
</style>
