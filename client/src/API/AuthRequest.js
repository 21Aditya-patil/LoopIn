const BASE_URL = "http://localhost:5000";

export const logIn = (formData) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());

export const signUp = (formData) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
