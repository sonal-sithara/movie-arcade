import { PUBLIC_API_KEY } from '$env/static/public';
import * as AppConstant from '../../../../util/Constant';

export const getEpisodeDetails = (id: number, seasonNumber: number, type: string) => {
	if (type === AppConstant.TYPE_TV) {
		return fetch(
			`${AppConstant.API_BASE_URL}tv/${id}/season/${seasonNumber}?api_key=${PUBLIC_API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((response) => {
				const episodeCount = response.episodes.length;
				const episodeDetails = response.episodes.filter(
					(episode: { air_date: string | number | Date }) => new Date(episode.air_date) < new Date()
				);
				return { episodeCount: episodeCount, episodeDetails: episodeDetails };
			});
	}
};

export const getSimilar = (type: string, id: number) => {
	return fetch(
		`${AppConstant.API_BASE_URL}${type}/${id}/similar?api_key=${PUBLIC_API_KEY}&language=en-US&page=1`
	)
		.then((response) => response.json())
		.then((response) => {
			return response.results;
		});
};
