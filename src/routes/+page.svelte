<script lang="ts">
	import Pagination from '../components/Pagination.svelte';
	import GridWrapper from '../components/GridWrapper.svelte';
	import type { PageData } from './$types';
	import Hero from '../components/Hero.svelte';
	import ContentWrapper from '../components/ContentWrapper.svelte';
	import * as AppConstant from '../util/Constant';
	export let data: PageData;
</script>

<div>
	<Hero trendingMovie={data.trendingMovies} />
	<ContentWrapper>
		<GridWrapper
			movies={data.trendingMovies}
			type={AppConstant.TYPE_MOVIE}
			title={'Trending Movies'}
		/>
		<GridWrapper
			movies={data.trendingTvShows}
			type={AppConstant.TYPE_TV}
			title={'Trending TV Shows'}
		/>
		<GridWrapper
			movies={data.popularMovies}
			type={AppConstant.TYPE_MOVIE}
			title={'Popular Movies'}
		/>
		<Pagination />
	</ContentWrapper>
</div>
