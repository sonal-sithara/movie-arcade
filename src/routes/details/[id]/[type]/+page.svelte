<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { fly, fade } from 'svelte/transition';
	// import jq from 'jquery';
	import { onMount } from 'svelte';
	import Header from '../../../../components/Header.svelte';
	import { Star, PlayCircle } from 'svelte-ionicons';
	import GridWrapper from '../../../../components/GridWrapper.svelte';
	import GridTransition from '../../../../components/Transitions/GridTransition.svelte';
	import SeasonBtnPanel from '../../../../components/Episode/SeasonBtnPanel.svelte';
	import ContentWrapper from '../../../../components/ContentWrapper.svelte';
	import * as AppConstant from '../../../../util/Constant';
	import { getEpisodeDetails, getSimilar } from './request';

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

	$: if (seasonOption) {
		seasonEpisodes = [];
		getEpisodeDetails(details.id, seasonOption, data.type)?.then((response) => {
			episodeCount = response.episodeCount;
			seasonEpisodes = response.episodeDetails;
		});
	}

	onMount(() => {
		getSimilar(data.type, details.id).then((response) => {
			similarMovies = response;
		});
	});
</script>

<div>
	<div
		class="image_container"
		style="background-image: url({AppConstant.API_IMAGE_BASE_URL}original/{details.backdrop_path});"
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
							src="{AppConstant.API_IMAGE_BASE_URL}w500/{details.poster_path}"
							class="max-w-sm rounded-lg shadow-2xl poster"
							alt={details.title}
						/>
					</div>
					<div class="ml-8">
						<h1 class="text-5xl font-bold text-white flex items-center">
							{data.type == AppConstant.TYPE_TV ? details.name : details.title}
						</h1>

						<div class="opacity-60 mt-1 text-md">
							{new Date(
								data.type == AppConstant.TYPE_TV ? details.first_air_date : details.release_date
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
	<ContentWrapper>
		{#if data.type == AppConstant.TYPE_TV}
			<SeasonBtnPanel {details} bind:seasonOption />
			<GridTransition {seasonOption}>
				<GridWrapper
					isEpisode={true}
					episodes={seasonEpisodes}
					title={seasonEpisodes.length + '/' + episodeCount + ' Episodes'}
				/>
			</GridTransition>
		{/if}

		<GridWrapper
			movies={similarMovies}
			type={data.type}
			title={data.type === AppConstant.TYPE_TV ? 'Similar TV Shows' : 'Similar Movies'}
		/>
	</ContentWrapper>

	<!-- //iframe -->
	<input type="checkbox" bind:checked={isVideoPlay} id="movie_video" class="modal-toggle" />
	<label for="movie_video" class="modal cursor-pointer">
		<label class="modal-box max-w-4xl relative" for="">
			{#if AppConstant.EMPTY_STRING == data.videoId}
				<h1>Video Unavailable</h1>
			{:else}
				<iframe
					class="w-full aspect-video videoframe"
					src="{AppConstant.YOUTUBE_URL}{data.videoId}"
					title={data.type == AppConstant.TYPE_TV ? details.name : details.title}
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
