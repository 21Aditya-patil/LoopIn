const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const deleteUser = async (userId, data) => {
  const response = await fetch(
    `${BASE_URL}/user/${userId}`,
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
