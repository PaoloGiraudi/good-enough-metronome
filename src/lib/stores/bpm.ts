import { readable, writable } from "svelte/store";

const startingSpeed = 120;

function createBpm() {
  const { subscribe, set, update } = writable(startingSpeed);

  return {
    subscribe,
    set,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(startingSpeed),
  };
}

export const bpm = createBpm();

export const bpmSpecs = readable({ min: 35, max: 300 });
