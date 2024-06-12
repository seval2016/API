const API_URL = "https://66675076a2f8516ff7a71bac.mockapi.io/api/v1";

const fetchAllUsers = (cb) => {
	fetch(`${API_URL}/users`) // API bu asamada backend deki ilgili endpoint e requst gonderir.
		.then((res) => res.json()) // API dan donen cevap res icine gelir. res.json() ile donen cevap JSON formatina cevrilir ve sonraki then e aktariilr.
		.then((data) => cb(data));//json formatındaki data yı elde edebildiğimiz yer
};

const fetchUserById = (id, cb) => {
	fetch(`${API_URL}/users/${id}`)
		.then((res) => res.json())
		.then((data) => cb(data));
};

export { fetchAllUsers, fetchUserById };