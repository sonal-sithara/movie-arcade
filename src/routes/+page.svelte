<script lang="ts">
	import Pagination from '../components/Pagination.svelte';
	import MovieGrid from '../components/MovieGrid.svelte';
	import type { PageData } from './$types';
	import Hero from '../components/Hero.svelte';
	export let data: PageData;
</script>

<div class="">
	<Hero trendingMovie={data.trendingMovies} />
	<div class="container mx-auto mt-6">
		<MovieGrid
			movies={data.trendingMovies}
			type={data.trendingMovies.at(-1).media_type}
			title={'Trending Movies'}
		/>
		<MovieGrid
			movies={data.trendingTvShows}
			type={data.trendingTvShows.at(-1).media_type}
			title={'Trending TV Shows'}
		/>
		<MovieGrid
			movies={data.popularMovies}
			type={data.popularMovies.at(-1).media_type}
			title={'Popular Movies'}
		/>
		<Pagination />
	</div>
</div>
