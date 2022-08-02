<script lang="ts">
  export let handleClick: () => void;
  export let beat: boolean;
  export let highlighted: Boolean;
</script>

<div
  class={`border-2 border-accent ${beat ? "bg-accent" : "bg-transparent"} ${
    highlighted ? "bg-green-500" : ""
  }`}
  on:click={handleClick}
/>
