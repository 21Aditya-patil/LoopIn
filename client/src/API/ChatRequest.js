const BASE_URL = "http://localhost:8000";

export const sendMessage = async (data) => {
  const res = await fetch(`${BASE_URL}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getMessages = async (conversationId) => {
  const res = await fetch(`${BASE_URL}/message/${conversationId}`);
  return await res.json();
};

export const createConversation = async (senderId, receiverId) => {
  const response = await fetch(`${BASE_URL}/conversation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId, receiverId }),
  });

  return await response.json();
};