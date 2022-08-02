<script lang="ts">
  import { bpm, type bpmSpecs, type beats, type beatsSpecs } from "../stores";
  export let type: typeof bpm | typeof beats;
  export let specs: typeof bpmSpecs | typeof beatsSpecs;
  export let value: number;
</script>

<div class="flex flex-col gap-2">
  <button
    class={`btn ${type === bpm ? "btn-primary" : "btn-secondary"} `}
    disabled={value >= $specs.max}
    on:click={type.increment}
  >
    ▲
  </button>
  <button
    class={`btn ${type === bpm ? "btn-primary" : "btn-secondary"} `}
    disabled={value <= $specs.min}
    on:click={type.decrement}
  >
    ▼
  </button>
</div>
