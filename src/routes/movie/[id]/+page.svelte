<script lang="ts">
	export let data: PageData;
	import { onMount } from 'svelte';
	import Header from '../../../components/Header.svelte';
	import type { PageData } from './$types';
	import { Star } from 'svelte-ionicons';
	import MovieGrid from '../../../components/MovieGrid.svelte';

	const movie = data.movie;
	let similarMovies: any = [];

	onMount(async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US&page=1`
		);
		let similarMoviesRes = await res.json();
		similarMovies = similarMoviesRes.results;
	});
</script>

<div>
	<div
		class="image_container"
		style="background-image: url(https://image.tmdb.org/t/p/original/{movie.backdrop_path});"
	>
		<div class="imagemix">
			<Header />
			<div class="hero">
				<div class="hero-content justify-start w-full flex-col lg:flex-row">
					<img
						src="https://image.tmdb.org/t/p/w500/{movie.poster_path}"
						class="max-w-sm rounded-lg shadow-2xl poster"
						alt={movie.title}
					/>
					<div class="ml-8">
						<h1 class="text-5xl font-bold text-white flex items-center">
							{movie.original_title}
						</h1>

						<div class="opacity-60 mt-1 text-md">
							{new Date(
								movie.media_type == 'tv' ? movie.first_air_date : movie.release_date
							).getFullYear()}
						</div>

						<p class="py-6 text-white">
							{movie.overview}
						</p>
						<div class="flex font-bold text-sm rounded-lg p-1 h-min w-min">
							{parseFloat(movie.vote_average).toFixed(1)}
							<span class="ml-2"><Star size="20" color="#6ac045" /></span>
						</div>
						<div class="mt-6">
							{#each movie.genres as genre}
								<span
									class="badge badge-outline badge-primary mr-4 p-3"
									style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
									>{genre.name}</span
								>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container mx-auto mt-6">
		{#if similarMovies.lenght != 0}
			<MovieGrid movies={similarMovies} title={'Similar Movies'} />
		{/if}
	</div>
</div>

<style>
	.poster {
		height: 500px;
	}

	.image_container {
		background-repeat: no-repeat;
		background-position: top;
		background-size: cover;
	}

	.imagemix {
		background: rgb(33, 33, 33);
		background: linear-gradient(0deg, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 36%);
		backdrop-filter: brightness(14%);
	}
</style>
