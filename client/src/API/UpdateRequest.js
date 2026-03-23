const BASE_URL = "http://localhost:8000";

export const updateUser = async (userId, data) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

