import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const trendingMovieRes = await fetch(
		'https://api.themoviedb.org/3/trending/movie/week?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US&page=1'
	);
	const trendingTvShowRes = await fetch(
		'https://api.themoviedb.org/3/trending/tv/week?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US&page=1'
	);
	const popularMovieRes = await fetch(
		'https://api.themoviedb.org/3/movie/popular?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US&page=1'
	);

	const trendingMovies = await trendingMovieRes.json();
	const trendingTvShows = await trendingTvShowRes.json();
	const popularMovies = await popularMovieRes.json();

	return {
		trendingMovies: trendingMovies.results,
		trendingTvShows: trendingTvShows.results,
		popularMovies: popularMovies.results
	};

	throw error(404, 'Not found');
};
