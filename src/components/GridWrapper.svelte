<script lang="ts">
	import EpisodeCard from './Episode/EpisodeCard.svelte';
	import MovieTvCard from './MovieTvCard.svelte';

	export let movies: any[] = [];
	export let title: string = '';
	export let type: string = '';
	export let episodes: Array<object> = [];
	export let isEpisode: boolean = false;
</script>

<h1 class="text-2xl">{title}</h1>
<div class="mt-6 mb-16 grid grid-cols-7 gap-4">
	{#each isEpisode ? episodes : movies as details, i}
		{#if isEpisode}
			<EpisodeCard {details} />
		{:else}
			<MovieTvCard movie={details} {type} />
		{/if}
	{:else}
		<p readonly class="btn loading">loading</p>
	{/each}
</div>
