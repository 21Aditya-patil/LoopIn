const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/post`);
  return await response.json();
};


export const createPost = async(data) => {
    const response = await fetch(`${BASE_URL}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return await response.json()
} 

export const deletePost = async(postId, userId) => {
    const response = await fetch(`${BASE_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
    })
    return await response.json()
}

export const updatePost = async (postId, updatedData, userId) => {
  const response = await fetch(`${BASE_URL}/post/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...updatedData,
      userId,
    }),
  });

  return await response.json();
};

export const getUserPosts = async (userId) => {
  const response = await fetch(
    `${BASE_URL}/post/user/${userId}`
  );
  return await response.json();
};

export const likePost = async (postId, userId) => {
  const response = await fetch(
    `${BASE_URL}/post/${postId}/like`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    }
  );

  return await response.json();
};

export const addComment = async (postId, userId, text) => {
  const response = await fetch(
    `${BASE_URL}/post/${postId}/comment`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, text }),
    }
  );

  return await response.json();
};

export const savePost = async (postId, userId) => {
  const response = await fetch(
    `${BASE_URL}/post/${postId}/save`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );

  return await response.json();
};

