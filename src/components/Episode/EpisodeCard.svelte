<script lang="ts">
	import { Star } from 'svelte-ionicons';
	export let details: any;
</script>

<div class="overflow-hidden cursor-pointer rounded-xl relative group bg-neutral">
	<div
		class=" rounded-xl z-50 transition duration-300 ease-in-out cursor-pointer absolute from-black/100 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end"
	>
		<div>
			<div
				class="transform-gpu p-4 space-y-3 text-xl translate-y-4 pb-10 transition duration-300 ease-in-out"
			>
				<div class="font-bold">
					{details.name}
				</div>

				<div class="opacity-60 text-sm">
					{new Date(details.air_date).getFullYear()}
				</div>
				<div class="flex font-bold text-sm rounded-lg h-min w-min">
					{parseFloat(details.vote_average).toFixed(1)}
					<span class="ml-2"><Star size="20" color="#6ac045" /></span>
				</div>
			</div>
		</div>
	</div>
	<img
		alt=""
		class="object-cover aspect-square group-hover:scale-110 transition duration-300 ease-in-out h-full w-full opacity-80"
		src="https://image.tmdb.org/t/p/w500/{details.still_path}"
	/>
</div>
