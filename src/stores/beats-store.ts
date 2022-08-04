import { readable, writable } from "svelte/store";

type Beats = boolean[];

const startingBeats: Beats = [true, false, false, false];

const flipIndex = (beats: Beats, i: number) =>
  beats.map((beat, idx) => (i === idx ? !beat : beat));

function createBeats() {
  const { subscribe, set, update } = writable(startingBeats);

  return {
    subscribe,
    set,
    increment: () => update((beats) => [...beats, false]),
    decrement: () => update((beats) => [...beats].slice(0, -1)),
    toggle: (i: number) => update((beats) => flipIndex(beats, i)),
    reset: () => set(startingBeats),
  };
}

export const beats = createBeats();

export const beatsSpecs = readable({ min: 2, max: 9 });
