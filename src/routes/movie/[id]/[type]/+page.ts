import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const detailsRes = await fetch(
		`https://api.themoviedb.org/3/${params.type}/${params.id}?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US`
	);

	const videoDetailsRes = await fetch(
		`https://api.themoviedb.org/3/${params.type}/${params.id}/videos?api_key=9fcef2da31023302fa7427c5e3acac7d&language=en-US`
	);

	const details = await detailsRes.json();
	const videoDetails = await videoDetailsRes.json();

	return {
		details: details,
		videoId: 0 == videoDetails.results.length ? '' : videoDetails.results.at(-1).key,
		type: params.type
	};

	throw error(404, 'Not found');
};
