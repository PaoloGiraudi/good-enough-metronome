<script>
	import '../app.css';
</script>

<svelte:head>
	<title>GEM: Good enough metronome</title>
</svelte:head>

<main
	class="container mx-auto flex flex-col p-4 justify-between h-full sm:w-1/2 sm:max-w-lg sm:h-2/3 sm:shadow-xl"
>
	<slot />
</main>
