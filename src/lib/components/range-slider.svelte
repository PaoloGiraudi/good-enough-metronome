<script lang="ts">
	import { bpmSpecs, bpm } from '$stores/bpm';
</script>

<div class="flex flex-col justify-around items-center p-4">
	<input
		class="range range-lg range-primary"
		type="range"
		min={$bpmSpecs.min}
		max={$bpmSpecs.max}
		on:input
		bind:value={$bpm}
	/>
</div>
