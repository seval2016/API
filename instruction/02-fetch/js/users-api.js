const API_URL = "https://66675076a2f8516ff7a71bac.mockapi.io/api/v1";

//promise yapıları await ile bekletirsek then kullanılmasına gerek yok fakat async kullanılmalı
//ve fonksiyon asenkron yapılmalı
const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`); //fech'in response'u artık res değişkeninde
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json(); //bu şekilde data'ya ulaşırız. JSON'da promise döndüğü için await kullanmamız gerekli

  return data;
};

const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};

const deleteUserById = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};

const createUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};

const updateUser = async (id,user) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};

export { getAllUsers, getUserById, deleteUserById, createUser, updateUser };
