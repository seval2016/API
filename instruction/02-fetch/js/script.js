import {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
} from "./users-api.js";

const lstUsers = document.getElementById("lstUsers");
const userDetails = document.getElementById("userDetails");
const frmUser = document.getElementById("frmUser");
const txtFirstName = document.getElementById("firstName");
const txtLastName = document.getElementById("lastName");
const txtEmail = document.getElementById("email");
const btnSubmit=document.getElementById("btnSubmit");

const addUser = async () => {
  const firstName = txtFirstName.value;
  const lastName = txtLastName.value;
  const email = txtEmail.value;

  const user = {
    firstName,
    lastName,
    email,
  };
  await createUser(user);
  init();
  frmUser.reset();
};

const editUser = async (id) => {
  const user=await getUserById(id);
  const{firstName,lastName,email}=user;
  txtFirstName.value=firstName;
  txtLastName.value=lastName;
  txtEmail.value=email;

};

const saveUser=async (id) => {
  const firstName = txtFirstName.value;
  const lastName = txtLastName.value;
  const email = txtEmail.value;

  const user = {
    firstName,
    lastName,
    email,
  };
  await updateUser(id,user);
  init();
  frmUser.reset();
  frmUser.dataset.method="create";
  btnSubmit.innerHTML="➕ Add";

};

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
                      <button class="btn btn-info my-3 btn-edit" type="submit" data-id="${item.id}">✍️ Edit</button>
                        </div>
                    </div>
                  </div>`;
  });

  return strUsers;
};

const renderUserDetails = (user) => {
  const { firstName, lastName, email, phone, userName, password, avatar } =
    user;
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
    const userId = card.querySelector(".btn-del").dataset.id;
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
  const userId = e.target.dataset.id;
  if (!userId) return;

  if (e.target.classList.contains("btn-del")) {
    const res = confirm("Are you sure to delete");
    if (!res) return;
    try {
      await deleteUserById(userId);
      console.log(`User with ID: ${userId} deleted successfully`);
      init();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  } else if (e.target.classList.contains("btn-edit")) {
  
    editUser(userId);
    window.scrollTo(0,0);
    btnSubmit.innerHTML="🖫 Update";
    frmUser.dataset.method="update";
    frmUser.dataset.id=userId;
    init();

  }
});

frmUser.addEventListener("submit", async (e) => {
  e.preventDefault();
  const method=e.target.dataset.method;
  const id=e.target.dataset.id;

  if(method ==="create"){
    addUser();
  }else{
    saveUser(id);
  }
  
});
