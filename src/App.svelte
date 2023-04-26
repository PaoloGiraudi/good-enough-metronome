<script lang="ts">
  import * as Tone from "tone";
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
  import FooterLinks from "./components/footer-links.svelte";
  import {
    bpm,
    metronomeOn,
    beats,
    isPlaying,
    beatsSpecs,
    bpmSpecs,
  } from "./stores";

  const synth = new Tone.MembraneSynth().toDestination();

  let beatCount = 0;
  $: beatsNumber = $beats.length;
  $: Tone.Transport.bpm.value = $bpm;

  const handleBeatsInput = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    if (parseInt(value) > $beats.length) {
      beats.set([...$beats, false]);
    }
  };

  async function startMetronome() {
    await Tone.start();
  }

  const loop = new Tone.Loop((now) => playClick(now), "4n");

  const playClick = (now: number) => {
    $isPlaying = true;
    if ($beats[beatCount]) {
      synth.triggerAttackRelease("F1", "16n", now);
    } else {
      synth.triggerAttackRelease("C1", "16n", now);
    }
    beatCount = (beatCount + 1) % beatsNumber;
  };

  $: if ($metronomeOn) {
    startMetronome();
    loop.start();
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
    loop.stop();
    $isPlaying = false;
    beatCount = 0;
  }
</script>

<Main>
  <TopSection>
    {#each $beats as beat, i}
      <BeatToggle
        {beat}
        handleClick={() => beats.toggle(i)}
        highlighted={(i === beatCount - 1 && $isPlaying) ||
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
        on:input={handleBeatsInput}
        bind:value={$beats.length}
      />
    </SideColumn>
  </CenterSection>

  <BottomSection>
    <ButtonControls type={bpm} specs={bpmSpecs} value={$bpm} />
    <div class="grid place-items-center col-span-3">
      <button
        class="btn btn-lg btn-accent self-center"
        on:click={() => metronomeOn.set(!$metronomeOn)}
      >
        {$metronomeOn ? "Stop" : "Play"}</button
      >
    </div>
    <ButtonControls type={beats} specs={beatsSpecs} value={beatsNumber} />
  </BottomSection>
  <FooterLinks />
</Main>
