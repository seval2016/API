const API_URL = "https://carrental-v3-backend.herokuapp.com";

const fetchAllCars = (cb) => {
	fetch(`${API_URL}/car/visitors/all`) // API bu asamada backend deki ilgili endpoint e requst gonderir.
		.then((res) => res.json()) // API dan donen cevap res icine gelir. res.json() ile donen cevap JSON formatina cevrilir ve sonraki then e aktariilr.
		.then((data) => cb(data));//json formatındaki data yı elde edebildiğimiz yer
};

const fetchCarById = (id, cb) => {
	fetch(`${API_URL}/car/visitors/${id}`)
		.then((res) => res.json())
		.then((data) => cb(data));
};

export { fetchAllCars, fetchCarById };