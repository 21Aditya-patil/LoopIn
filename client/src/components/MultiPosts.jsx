import React, { useEffect } from "react";
import {
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
} from "../reducers/postSlice";
import SinglePost from "./SinglePost";
import { useSelector, useDispatch } from "react-redux";

function MultiPosts({ activeCategory = "All", isAccountPage = false }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?._id) return;

    if (isAccountPage) {
      dispatch(getUserPosts(user._id));
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, isAccountPage, user?._id]);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const handleDelete = (id) => {
    dispatch(deletePost({ postId: id, userId: user._id }));
  };

  const handleEdit = (post) => {
    dispatch(updatePost(post));
  };

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Loading posts...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-400">
          No posts found
        </p>
      ) : (
        filteredPosts.map((post) => (
          <SinglePost
            key={post._id}
            data={post}
            currentUserId={user?._id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default MultiPosts;
