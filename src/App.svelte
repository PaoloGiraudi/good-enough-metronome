<script lang="ts">
  import {
    TopSection,
    Main,
    BottomSection,
    CenterSection,
    SideColumn,
    BeatToggle,
  } from "./components";
  import ButtonControls from "./components/button-controls.svelte";
  import CenterColumn from "./components/center-column.svelte";
  import {
    bpm,
    metronomeOn,
    beats,
    isPlaying,
    beatsSpecs,
    bpmSpecs,
  } from "./stores";

  let beatCount = 0;
  $: beatsNumber = $beats.length;
  $: step = noteDurationToMs($bpm, 1 / 4, 1) / 1000;
  $: lookAhead = step / 2;

  $: {
    if ($metronomeOn) {
      clearInterval(to);
      to = setInterval(timer, step / 4);
    }
  }

  function noteDurationToMs(bpm, dur, type) {
    return (60000 * 4 * dur * type) / bpm;
  }

  function scheduleNote(ac, time, dur) {
    var oscillator = ac.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1000, ac.currentTime);

    oscillator.connect(ac.destination);

    oscillator.start(time);
    isPlaying.set(true);
    oscillator.stop(time + dur);

    beatCount = (beatCount + 1) % beatsNumber;
  }

  const ac = new AudioContext();
  let to,
    lastNote = 0;

  const timer = () => {
    const diff = ac.currentTime - lastNote;
    if (diff >= lookAhead) {
      const nextNote = lastNote + step;
      scheduleNote(ac, nextNote, 0.025);
      lastNote = nextNote;
    }
  };

  const start = () => {
    beatCount = 0;
    ac.resume();
    metronomeOn.set(true);
  };

  const stop = () => {
    metronomeOn.set(false);
    isPlaying.set(false);
    clearInterval(to);
    beatCount = 0;
  };

  const toggle = () => {
    $metronomeOn ? stop() : start();
  };
</script>

<Main>
  <TopSection>
    {#each $beats as beat, i}
      <BeatToggle
        {beat}
        handleClick={() => beats.toggle(i)}
        highlighted={i === beatCount - 1 ||
          (beatCount === 0 && i === beatsNumber - 1 && $isPlaying)}
      />
    {/each}
  </TopSection>
  <CenterSection>
    <SideColumn>
      <input
        class="range range-primary range-lg -rotate-90 w-80 mt-24"
        type="range"
        min={$bpmSpecs.min}
        max={$bpmSpecs.max}
        on:input={() => bpm.set($bpm)}
        bind:value={$bpm}
      />
    </SideColumn>

    <CenterColumn>
      <svelte:fragment slot="bpm">{$bpm}</svelte:fragment>
      <svelte:fragment slot="beats">{beatsNumber}</svelte:fragment>
    </CenterColumn>

    <SideColumn>
      <input
        class="range range-secondary range-lg -rotate-90 w-80 mt-24"
        type="range"
        min={$beatsSpecs.min}
        max={$beatsSpecs.max}
        bind:value={$beats.length}
      />
    </SideColumn>
  </CenterSection>

  <BottomSection>
    <ButtonControls type={bpm} specs={bpmSpecs} value={$bpm} />
    <div class="grid place-items-center col-span-3">
      <button
        class="btn btn-lg btn-accent self-center"
        on:click={() => toggle()}
      >
        {$metronomeOn ? "Stop" : "Play"}</button
      >
    </div>
    <ButtonControls type={beats} specs={beatsSpecs} value={beatsNumber} />
  </BottomSection>
</Main>
