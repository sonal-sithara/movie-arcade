<script lang="ts">
	import Header from './Header.svelte';
	export let trendingMovie: any;
	import { fade, fly } from 'svelte/transition';
	import { StarOutline } from 'svelte-ionicons';
	let count = 0;

	const changeHero = () => {
		if (count < 10) {
			count += 1;
		} else {
			count = 0;
		}
	};

	$: backdrop_path = trendingMovie[count].backdrop_path;
	$: poster_path = trendingMovie[count].poster_path;
	$: title = trendingMovie[count].title;
	$: original_title = trendingMovie[count].original_title;
	$: overview = trendingMovie[count].overview;
	$: vote_average = trendingMovie[count].vote_average;

	setInterval(changeHero, 10000);
</script>

<div>
	<div
		class="image_container"
		style="background-image: url(https://image.tmdb.org/t/p/original/{backdrop_path});"
	>
		<div class="imagemix" style="backdrop-filter: blur(4px);">
			<Header />
			<div class="hero">
				{#key count}
					<div class="hero-content justify-between w-full flex-col lg:flex-row-reverse">
						<img
							in:fly={{ x: 10, duration: 500, delay: 500 }}
							out:fly={{ x: 5, duration: 500 }}
							src="https://image.tmdb.org/t/p/w500/{poster_path}"
							class="max-w-sm rounded-lg shadow-2xl poster"
							alt={title}
						/>
						<div>
							<h1
								in:fly={{ x: -20, duration: 500, delay: 500 }}
								out:fly={{ x: 5, duration: 500 }}
								class="text-5xl font-bold text-white flex items-center"
							>
								{original_title}
								<div class="flex bg-primary font-bold text-sm rounded-lg p-2 h-min w-min ml-6">
									{parseFloat(vote_average).toFixed(1)}
									<span class="ml-2"><StarOutline size="20" color="#333" /></span>
								</div>
							</h1>

							<p
								in:fly={{ x: -10, duration: 500, delay: 500 }}
								out:fly={{ x: 5, duration: 500 }}
								class="py-6 text-white"
							>
								{overview}
							</p>
							<!-- <button class="btn btn-primary">Get Started</button> -->
						</div>
					</div>
				{/key}
			</div>
		</div>
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
	}
</style>
