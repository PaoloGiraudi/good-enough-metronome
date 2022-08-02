<script lang="ts">
  import sound from "./assets/sound1.wav";
  import sound2 from "./assets/sound2.wav";
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
  const click = new Audio(sound);
  const click2 = new Audio(sound2);

  let timer: NodeJS.Timer;
  let beatCount = 0;
  $: beatsNumber = $beats.length;

  const playClick = () => {
    $isPlaying = true;
    if ($beats[beatCount]) {
      click2.play();
    } else {
      click.play();
    }
    beatCount = (beatCount + 1) % beatsNumber;
  };

  const togglePlay = () => metronomeOn.set(!$metronomeOn);

  const handleBeatsInput = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    if (parseInt(value) > $beats.length) {
      beats.set([...$beats, false]);
    }
  };

  $: interval = (60 * 1000) / $bpm;

  $: {
    if ($metronomeOn) {
      clearInterval(timer);
      timer = setInterval(playClick, interval);
    } else {
      clearInterval(timer);
      beatCount = 0;
      $isPlaying = false;
    }
  }
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
        on:input={handleBeatsInput}
        bind:value={$beats.length}
      />
    </SideColumn>
  </CenterSection>

  <BottomSection>
    <ButtonControls type={bpm} specs={bpmSpecs} value={$bpm} />
    <div class="grid place-items-center col-span-3">
      <button class="btn btn-lg btn-accent self-center" on:click={togglePlay}>
        {$metronomeOn ? "Stop" : "Play"}</button
      >
    </div>
    <ButtonControls type={beats} specs={beatsSpecs} value={beatsNumber} />
  </BottomSection>
</Main>
