import { getAllUsers, getUserById, deleteUserById } from "./users-api.js";

const lstUsers = document.getElementById("lstUsers");
const userDetails = document.getElementById("userDetails");

const hiddenPassword = (password) => {
  return "*".repeat(password.length);
};

const renderUsers = (users) => {
  let strUsers = "";

  users.forEach((item) => {
    const hiddenPwd = hiddenPassword(item.password);
    strUsers += `<div class="col-md-3">
                    <div class="card">
                      <img src="${item.avatar}" class="card-img-top" alt="${item.firstName}">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">First Name: ${item.firstName}</li>
                          <li class="list-group-item">Last Name: ${item.lastName}</li>
                        </ul> 						            
                        <button class="btn btn-danger btn-del" style="cursor: pointer;" data-id="${item.id}"> 🗑️ Delete</button>
                      </div>
                    </div>
                  </div>`;
  });

  return strUsers;
};

const renderUserDetails = (user) => {
  const { firstName, lastName, email, phone, userName, password, avatar } = user;
  const hiddenPwd = hiddenPassword(password);

  const strUser = `<div class="col-md-5">
                    <img src="${avatar}" class="card-img-top" alt="${firstName}">
                   </div>
                   <div class="col-md-7">
                      <h1>User Details</h1>
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

const init = async () => {
  try {
    const users = await getAllUsers();
    const strUsers = renderUsers(users);
    lstUsers.innerHTML = strUsers;
  } catch (error) {
    console.error("Failed to fetch users", error);
  }
};

init();

lstUsers.addEventListener("click", async (e) => {
  if (e.target.closest(".card") && !e.target.classList.contains("btn-del")) {
    const card = e.target.closest(".card");
    const userId = card.querySelector('.btn-del').dataset.id;
    console.log(`Fetching details for user ID: ${userId}`);

    try {
      const user = await getUserById(userId);
      const strUser = renderUserDetails(user);
      userDetails.innerHTML = strUser;
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  }
});

lstUsers.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-del")) {
    const userId = e.target.dataset.id;
    console.log(`Deleting user with ID: ${userId}`);

    try {
      await deleteUserById(userId);
      console.log(`User with ID: ${userId} deleted successfully`);
      init();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  }
});
