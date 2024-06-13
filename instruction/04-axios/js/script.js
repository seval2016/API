import { getShows } from "./api.js";

const txtSearch = document.getElementById("txtSearch");
const lstShows = document.getElementById("lstShows");
let timer = null;

const loadShows = async (q) => {
    console.log("Hello")
	const shows = await getShows(q);
	let strShows = "";

	shows.forEach((item) => {
		const { name, image } = item.show;

		strShows += `
            <div class="col">
                <div class="card h-100">
                    <img src="${image?.medium}" alt="${name}" class="card-img-top">
                    <div class="card-body">
                        <h3 class="card-title">${name}</h3>
                    </div>
                </div>
            </div>`;
	});
	lstShows.innerHTML = strShows;
};

txtSearch.addEventListener("input", (e) => {
	const { value } = e.target;
	if (value.length < 3) {
		lstShows.innerHTML = "";
		return;
	}

	if (timer) {
		clearTimeout(timer);
	}

	timer = setTimeout(() => {
		loadShows(value);
	}, 500);
});