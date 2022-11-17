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
		<MovieGrid movies={data.trendingMovies} title={'Trending Movies'} />
		<MovieGrid movies={data.trendingTvShows} title={'Trending TV Shows'} />
		<MovieGrid movies={data.popularMovies} title={'Popular Movies'} />
		<Pagination />
	</div>
</div>
