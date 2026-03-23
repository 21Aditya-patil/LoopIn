const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const searchUsersPosts = async (query) => {
  const response = await fetch(`${BASE_URL}/search?query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Search failed");
  }
  return data;
};