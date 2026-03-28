import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import cover from "/cover.jpg";
import dp from "/default-avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  followUserThunk,
  unFollowUserThunk,
} from "../reducers/userSlice";
import { getUserPosts } from "../reducers/postSlice";
import SinglePost from "./SinglePost";
import { useNavigate } from "react-router-dom";
import { setCurrentChat } from "../reducers/chatSlice";
import { createConversation } from "../API/ChatRequest";

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileUser, loading: userLoading } = useSelector(
    (state) => state.user,
  );

  const { posts, loading: postLoading } = useSelector((state) => state.posts);

  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(getUserPosts(id));
  }, [id, dispatch]);

  if (userLoading) return <div>Loading profile...</div>;
  if (!profileUser) return <div>User not found</div>;

  const isOwnProfile = loggedInUser?._id === profileUser?._id;

  const isFollowing = profileUser?.followers?.some(
    (id) => id.toString() === loggedInUser?._id,
  );

  const handleMessage = async () => {
    try {
      const senderId = loggedInUser._id;
      const receiverId = profileUser._id;

      const conversation = await createConversation(senderId, receiverId);

      dispatch(setCurrentChat(conversation));

      navigate("/chats");
    } catch (error) {
      console.error("Failed to start conversation", error);
    }
  };

  const handleFollow = () => {
    if (isFollowing) {
      dispatch(unFollowUserThunk(profileUser._id));
    } else {
      dispatch(followUserThunk(profileUser._id));
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-4">
      {/* Profile Header */}
      <div className="dark:bg-[#0d1b2a] bg-[#ffffffa3] rounded-xl p-4 sm:p-6 mb-6">
        {/* Cover */}
        <img
          src={profileUser.coverPicture || cover}
          alt="cover"
          className="w-full h-32 sm:h-40 object-cover rounded-lg"
        />

        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          {/* Left Side */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={profileUser.profilePicture || dp}
              alt="profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-black object-cover"
            />

            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold">
                {profileUser.name}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                @{profileUser.name}
              </p>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base">
                {profileUser.bio || "No bio available"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          {!isOwnProfile && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleFollow}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition ${
                  isFollowing
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>

              <button
                onClick={handleMessage}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Message
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 text-center mt-6 gap-2">
          <div>
            <h3 className="font-bold text-base sm:text-lg">{posts.length}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Posts</p>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {profileUser.followers?.length || 0}
            </h3>
            <p className="text-gray-500 dar:text-gray-400 text-xs sm:text-sm">Followers</p>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {profileUser.following?.length || 0}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Following</p>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="space-y-4">
        {postLoading && <div>Loading posts...</div>}

        {!postLoading && posts.length === 0 && (
          <div className="text-center text-gray-500">No posts yet</div>
        )}

        {posts.map((post) => (
          <SinglePost key={post._id} data={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
