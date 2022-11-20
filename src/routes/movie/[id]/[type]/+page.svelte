<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { fly, fade } from 'svelte/transition';
	// import jq from 'jquery';
	import { onMount } from 'svelte';
	import Header from '../../../../components/Header.svelte';
	import { Star, PlayCircle } from 'svelte-ionicons';
	import MovieGrid from '../../../../components/MovieGrid.svelte';
	import GridTransition from '../../../../components/Transitions/GridTransition.svelte';
	import SeasonBtnPanel from '../../../../components/Episode/SeasonBtnPanel.svelte';

	const details = data.details;
	let similarMovies: any = [];
	$: seasonEpisodes = [];
	let isVideoPlay: boolean = false;
	let seasonOption: number = 1;
	let episodeCount: number = 0;

	$: if (!isVideoPlay) {
		// let frame: any = jq('iframe').attr('src');
		// jq('iframe').attr('src', frame);
	}

	$: if (seasonOption > 0 && data.type == 'tv') {
		seasonEpisodes = [];
		getSeasonDetails(seasonOption);
	}

	const getSeasonDetails = async (seasonOption: number) => {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${details.id}/season/${seasonOption}?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US`
		);
		let seasonEpisodesRes = await res.json();
		episodeCount = seasonEpisodesRes.episodes.length;
		seasonEpisodes = seasonEpisodesRes.episodes.filter(
			(episode: any) => new Date(episode.air_date) < new Date()
		);
	};

	onMount(async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/${data.type}/${details.id}/similar?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US&page=1`
		);
		let similarMoviesRes = await res.json();
		similarMovies = similarMoviesRes.results;
	});
</script>

<div>
	<div
		class="image_container"
		style="background-image: url(https://image.tmdb.org/t/p/original/{details.backdrop_path});"
	>
		<div class="imagemix">
			<Header />
			<div class="hero">
				<div class="hero-content justify-start w-full flex-col lg:flex-row">
					<div class="flex justify-center items-center">
						<div
							class="absolute opacity-60 text-white hover:text-gray-300 transition-all ease-in-out duration-200"
						>
							<label for="movie_video"><PlayCircle size="100" /></label>
						</div>
						<img
							src="https://image.tmdb.org/t/p/w500/{details.poster_path}"
							class="max-w-sm rounded-lg shadow-2xl poster"
							alt={details.title}
						/>
					</div>
					<div class="ml-8">
						<h1 class="text-5xl font-bold text-white flex items-center ss">
							{data.type == 'tv' ? details.name : details.title}
						</h1>

						<div class="opacity-60 mt-1 text-md">
							{new Date(
								data.type == 'tv' ? details.first_air_date : details.release_date
							).getFullYear()}
						</div>

						<p class="py-6 text-white">
							{details.overview}
						</p>
						<div class="flex font-bold text-sm rounded-lg p-1 h-min w-min">
							{parseFloat(details.vote_average).toFixed(1)}
							<span class="ml-2"><Star size="20" color="#6ac045" /></span>
						</div>
						<div class="mt-6">
							{#each details.genres as genre}
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
		{#if data.type == 'tv'}
			<SeasonBtnPanel {details} bind:seasonOption />
			<GridTransition {seasonOption}>
				<MovieGrid
					isEpisode={true}
					episodes={seasonEpisodes}
					title={seasonEpisodes.length + '/' + episodeCount + ' Episodes'}
				/>
			</GridTransition>
		{/if}
		<MovieGrid
			movies={similarMovies}
			type={data.type}
			title={data.type === 'tv' ? 'Similar TV Shows' : 'Similar Movies'}
		/>
	</div>

	<!-- //iframe -->
	<input type="checkbox" bind:checked={isVideoPlay} id="movie_video" class="modal-toggle" />
	<label for="movie_video" class="modal cursor-pointer">
		<label class="modal-box max-w-4xl relative" for="">
			{#if '' == data.videoId}
				<h1>Video Unavailable</h1>
			{:else}
				<iframe
					class="w-full aspect-video videoframe"
					src="https://www.youtube.com/embed/{data.videoId}"
					title={data.type == 'tv' ? details.name : details.title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			{/if}
		</label>
	</label>
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
