import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_API_KEY } from '$env/static/public';
import * as AppConstant from '../../../../util/Constant';

export const load: PageLoad = async ({ fetch, params }) => {
	const detailsRes = await fetch(
		`${AppConstant.API_BASE_URL}${params.type}/${params.id}?api_key=${PUBLIC_API_KEY}&language=en-US`
	);

	const videoDetailsRes = await fetch(
		`${AppConstant.API_BASE_URL}${params.type}/${params.id}/videos?api_key=${PUBLIC_API_KEY}&language=en-US`
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
