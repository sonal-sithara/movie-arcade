<script lang="ts">
	import MovieCard from './MovieCard.svelte';

	export let movies: any;
	export let title: string;
</script>

<h1 class="text-2xl">{title}</h1>
<div class="mt-6 mb-16 grid grid-cols-7 gap-4">
	{#each movies as movie, i}
		<MovieCard {movie} />
	{:else}
		<p readonly class="btn loading">loading</p>
	{/each}
</div>
