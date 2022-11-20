<script lang="ts">
	export let details: any;
	export let seasonOption: number;
</script>

<div class="mb-4">
	<div class="btn-group">
		{#each details.seasons as season, i}
			{#if parseInt(season.season_number) > 0}
				<input
					type="radio"
					bind:group={seasonOption}
					name="seasonOption"
					data-title="Season {season.season_number}"
					value={season.season_number}
					class="btn btn-sm"
				/>
			{/if}
		{/each}
	</div>
</div>
