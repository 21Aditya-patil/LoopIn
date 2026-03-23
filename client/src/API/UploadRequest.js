const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const uploadMedia = (data, type = "posts") =>
  fetch(`${BASE_URL}/upload?type=${type}`, {
    method: "POST",
    body: data,
  }).then((res) => res.json());