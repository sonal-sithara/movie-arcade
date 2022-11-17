import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const movieDetailsRes = await fetch(
		`https://api.themoviedb.org/3/movie/${params.id}?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US`
	);

	const movieDetails = await movieDetailsRes.json();

	return {
		movie: movieDetails
	};

	throw error(404, 'Not found');
};
