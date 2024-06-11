import { fetchAllCars, fetchCarById } from "./car-api.js";

const lstCars = document.getElementById("lstCars");
const loader = document.getElementById("loader");
const carDetails = document.getElementById("carDetails");

const renderCars = (cars) => {
	let strCars = "";

	cars.forEach((item) => {
		console.log(item);
		strCars += `<div class="col">
                        <div class="card" style="cursor: pointer" data-id="${item.id}">
                            <img src="https://carrental-v3-backend.herokuapp.com/files/display/${item.image[0]}" alt="" class="card-img-top">
                            <div class="card-body">
                                ${item.model}
                            </div>
                        </div>
                    </div>`;
	});

	return strCars;
};

const renderCarDetails = (car) => {
	const {
		image,
		model,
		doors,
		seats,
		luggage,
		transmission,
		airConditioning,
		age,
		fuelType,
		pricePerHour,
	} = car;

	const strCar = `<div class="col-md-5">
                        <img src="https://carrental-v3-backend.herokuapp.com/files/display/${
							image[0]
						}" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-7">
                        <h1>${model}</h1>
                        <table class="table">
                            <tr><td>Doors</td><td>${doors}</td></tr>
                            <tr><td>Seats</td><td>${seats}</td></tr>
                            <tr><td>Luggage</td><td>${luggage}</td></tr>
                            <tr><td>Transmission</td><td>${transmission}</td></tr>
                            <tr><td>Air condition</td><td>${
								airConditioning ? "✅" : "❎"
							}</td></tr>
                            <tr><td>Age</td><td>${age}</td></tr>
                            <tr><td>Fuel Type</td><td>${fuelType}</td></tr>
                            <tr><td>Price/hour</td><td>$${pricePerHour}</td></tr>
                        </table>
                    </div>`;

	return strCar;
};

const init = () => {
	fetchAllCars((data) => {
		const strCars = renderCars(data);
		lstCars.innerHTML = strCars;
		loader.classList.add("d-none");
	});
};

init();

lstCars.addEventListener("click", (e) => {
	const card = e.target.closest(".card");
	if (!card) return;

	const carId = card.dataset.id;

	loader.classList.remove("d-none");
	fetchCarById(carId, (data) => {
		const strCar = renderCarDetails(data);
		carDetails.innerHTML = strCar;
		loader.classList.add("d-none");
		window.scrollTo(0, 0);
	});
});