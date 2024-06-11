import { fetchAllUsers, fetchUserById } from "./users-api.js";

const lstUsers = document.getElementById("lstUsers");
const loader = document.getElementById("loader");
const userDetails = document.getElementById("userDetails");


const hiddenPassword=((password)=>{
 return  "*".repeat(password.length);
})

const renderUsers = (users) => {
  let strUsers = "";

  users.forEach((item) => {
    //console.log(item);

	const hiddenPwd = hiddenPassword(item.password);

    strUsers += `<div class="col">
                        <div class="card" style="cursor: pointer">
                           <ul class="list-group list-group-flush">
								<li class="list-group-item">First Name : ${item.firstName}"</li>
								<li class="list-group-item">Last Name : ${item.lastName}</li>
							</ul> 
							<button class="btn btn-success" data-id="${item.id}"> Users Detail</button>
                            </div>
							
                        </div>
                    </div>`;
  });

  return strUsers;
};

const renderUserDetails = (user) => {
  const { firstName, lastName, email, phone, userName, password } = user;

  const hiddenPwd = hiddenPassword(password);

  const strUser = `
                    <div class="col-md-12">
						<h1>Users Detail</h1>
                        <table class="table">
							<tr><td>First Name</td><td>${firstName}</td></tr>
							<tr><td>Last Name</td><td>${lastName}</td></tr>
                            <tr><td>Email</td><td>${email}</td></tr>
                            <tr><td>Phone</td><td>${phone}</td></tr>
                            <tr><td>User Name</td><td>${userName}</td></tr>
                            <tr><td>Password</td><td>${hiddenPwd}</td></tr>
                        </table>
                    </div>`;

  return strUser;
};

const init = () => {
  fetchAllUsers((data) => {
    console.log(data);
    const strUsers = renderUsers(data);
    lstUsers.innerHTML = strUsers;
    loader.classList.add("d-none");
  });
};

init();

lstUsers.addEventListener("click", (e) => {
  const card = e.target.closest(".btn");//closest ile en yakın diyoruz yani event için en yakın tıklanacak card'ı işaret ediyoruz
  if (!card) return; //eğer kart'a tıklamazsa diye return edıyoruz

  const userId = card.dataset.id; //card html içerisinde data-id=${item.id} yazarak dataset içerisinden user id'yi alabiliriz

  loader.classList.remove("d-none");
  fetchUserById(userId, (data) => {
    const strUser = renderUserDetails(data);
    userDetails.innerHTML = strUser;
    loader.classList.add("d-none");
    window.scrollTo(0, 0);
  });
});
