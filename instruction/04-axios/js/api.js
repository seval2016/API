const API_URL = "https://api.tvmaze.com";

export const getShows = async (q) => {
	const res = await axios(`${API_URL}/search/shows?q=${q}`);
	const data = res.data;
	return data;
};

