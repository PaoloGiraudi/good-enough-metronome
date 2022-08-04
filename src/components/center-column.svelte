<div class="col-span-3 flex flex-col items-center gap-12 mt-12">
  <div class="flex flex-col items-center">
    <h1 class="text-8xl font-bold">
      <slot name="bpm" />
    </h1>
    <span class="text-lg font-normal">bpm</span>
  </div>
  <div class="flex flex-col items-center">
    <h2 class="text-4xl font-bold">
      <slot name="beats" />
    </h2>
    <span class="text-lg font-normal">beats</span>
  </div>
</div>
