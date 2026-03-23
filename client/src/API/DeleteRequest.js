export const deleteUser = async (userId, data) => {
  const response = await fetch(
    `http://localhost:8000/user/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};
