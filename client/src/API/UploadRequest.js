const BASE_URL = "http://localhost:8000";

export const uploadMedia = (data, type = "posts") =>
  fetch(`${BASE_URL}/upload?type=${type}`, {
    method: "POST",
    body: data,
  }).then((res) => res.json());