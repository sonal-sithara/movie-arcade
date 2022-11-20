import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_API_KEY } from '$env/static/public';
import * as AppConstant from '../util/Constant';

export const load: PageLoad = async ({ fetch }) => {
	const trendingMovieRes = await fetch(
		`${AppConstant.API_BASE_URL}trending/movie/week?api_key=${PUBLIC_API_KEY}&language=en-US&page=1`
	);
	const trendingTvShowRes = await fetch(
		`${AppConstant.API_BASE_URL}trending/tv/week?api_key=${PUBLIC_API_KEY}&language=en-US&page=1`
	);
	const popularMovieRes = await fetch(
		`${AppConstant.API_BASE_URL}movie/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=1`
	);

	const trendingMovies: any = await trendingMovieRes.json();
	const trendingTvShows: any = await trendingTvShowRes.json();
	const popularMovies: any = await popularMovieRes.json();

	return {
		trendingMovies: trendingMovies.results,
		trendingTvShows: trendingTvShows.results,
		popularMovies: popularMovies.results
	};

	throw error(404, 'Not found');
};
