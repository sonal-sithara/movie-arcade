<script lang="ts">
	export let movie: any;
</script>

<a href="/movie/{movie.id}" class="overflow-hidden cursor-pointer rounded-xl relative group">
	<div
		class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/100 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end"
	>
		<div>
			<div
				class="transform-gpu p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transition duration-300 ease-in-out"
			>
				<div class="font-bold">
					{movie.media_type == 'tv' ? movie.name : movie.title}
				</div>

				<div class="opacity-60 text-sm ">
					{new Date(
						movie.media_type == 'tv' ? movie.first_air_date : movie.release_date
					).getFullYear()}
				</div>
				<div class="bg-primary font-bold text-sm rounded-xl p-2 w-min">
					{parseFloat(movie.vote_average).toFixed(1)}
				</div>
			</div>
		</div>
	</div>
	<img
		alt=""
		class="object-cover  aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
		src="https://image.tmdb.org/t/p/w500/{movie.poster_path}"
	/>
</a>
