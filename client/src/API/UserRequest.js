const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const followUser = async (targetUserId, currentUserId) => {
  const response = await fetch(
    `${BASE_URL}/user/${targetUserId}/follow`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUserId }),
    }
  );

  return await response.json();
};

export const unFollowUser = async (targetUserId, currentUserId) => {
  const response = await fetch(
    `${BASE_URL}/user/${targetUserId}/unfollow`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentUserId }),
    }
  );

  return await response.json();
};

export const getUserById = async (userId) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
};
