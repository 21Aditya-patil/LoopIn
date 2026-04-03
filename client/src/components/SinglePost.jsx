import React, { useState, useRef, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaShare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { likePost, addComment } from "../reducers/postSlice";
import { useDispatch, useSelector } from "react-redux";
import dp from "/default-avatar.jpg";
import { savePost } from "../reducers/postSlice";
import toast from "react-hot-toast";

function SinglePost({ data, onEdit, onDelete, currentUserId }) {
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(data.desc);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const menuRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const userId = user?._id;


  const isLiked = data?.likes?.some((id) => id?.toString() === userId);

  const handleLike = () => {
    dispatch(likePost(data._id));
  };

  const formatTime = (dateString) => {
    const now = new Date();
    const commentTime = new Date(dateString);
    const diff = Math.floor((now - commentTime) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  const isSaved = data?.saved?.some((id) => id?.toString() === userId);

  const handleSave = () => {
    dispatch(savePost(data._id));
  };

  const handleComment = () => {
    if (!commentText.trim()) return;

    dispatch(
      addComment({
        postId: data._id,
        text: commentText,
      }),
    );

    setCommentText("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setEditedText(data.desc);
  }, [data.desc]);

  const isOwner = currentUserId?.toString() === data.userId?._id?.toString();

  const loggedInUserId = user?._id;

  const postOwnerId =
    typeof data.userId === "object" ? data.userId?._id : data.userId;

  return (
    <div className="relative flex flex-col p-4 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] rounded-2xl gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to={
              postOwnerId === loggedInUserId
                ? "/account"
                : `/profile/${postOwnerId}`
            }
          >
            <img
              src={data.userId?.profilePicture || dp}
              alt="dp"
              className="w-8 h-8 rounded-full aspect-square object-cover"
            />
          </Link>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Link
                to={
                  postOwnerId === loggedInUserId
                    ? "/account"
                    : `/profile/${postOwnerId}`
                }
                className="font-semibold hover:underline cursor-pointer"
              >
                {data.userId?.name}
              </Link>

              {/* ROLE LABEL */}  
              {data.userId?.role && (
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                  {data.userId?.role}
                </span>
              )}
            </div>
            {/* POST TIME */}
            <span className="text-xs text-gray-400">
              {formatTime(data.createdAt)} ago
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="relative" ref={menuRef}>
            <BsThreeDotsVertical
              className="cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setEditMode(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    onDelete && onDelete(data._id);
                    toast.success("Post is deleted");
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 dark:hover:bg-slate-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {editMode ? (
        <div className="flex gap-2">
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border p-2 rounded w-full dark:bg-slate-700 dark:text-white"
          />
          <button
            onClick={() => {
              onEdit &&
                onEdit({
                  postId: data._id,
                  updatedData: { desc: editedText },
                  userId: currentUserId,
                });
              toast.success("Post is updated");
              setEditMode(false);
            }}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <p>{data.desc}</p>
      )}

      {/* Media */}
      {data.media?.length > 0 && (
        <div className="grid gap-3">
          {data.media.map((item, index) => {
            const isVideo = item.includes(".mp4") || item.includes(".webm") || item.includes(".mov") || item.includes("video");
            
            return isVideo ? (
              <video
                key={index}
                src={item}
                controls
                className="w-full rounded-xl aspect-video object-cover cursor-pointer"
              />
            ) : (
              <img
                key={index}
                src={item}
                alt="post"
                className="w-full rounded-xl aspect-video object-cover cursor-pointer"
                onClick={() => setSelectedImage(item)}
              />
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 items-center">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleLike}
        >
          {isLiked ? (
            <FaHeart className="text-red-500 text-lg scale-110" />
          ) : (
            <FaRegHeart className="text-gray-400 text-lg" />
          )}
          <span>{data.likes?.length || 0}</span>
        </div>

        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <FaRegComment />
          <span>{data.comments?.length || 0}</span>
        </div>

        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleSave}
        >
          {isSaved ? (
            <FaBookmark className="text-white text-lg" />
          ) : (
            <FaRegBookmark className="text-gray-400 text-lg" />
          )}
          <span>{data.saved?.length || 0}</span>
        </div>

        <div className="flex gap-1 items-center">
          <FaShare />0
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-3 flex flex-col gap-3 bg-[#ffffffa3] dark:bg-slate-800 rounded-xl p-3">
          {data.comments?.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-2">
              No comments yet
            </div>
          )}

          {data.comments?.length > 0 &&
            data.comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-2">
                <Link
                  to={
                    comment.userId?._id === loggedInUserId
                      ? "/account"
                      : `/profile/${comment.userId?._id}`
                  }
                >
                  <img
                    src={comment.userId?.profilePicture || dp}
                    alt="dp"
                    className="w-8 h-8 rounded-full aspect-square object-cover cursor-pointer"
                  />
                </Link>

                <div className="flex flex-col bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-xl w-full">
                  <div className="flex items-center justify-between">
                    <Link
                      to={
                        comment.userId?._id === loggedInUserId
                          ? "/account"
                          : `/profile/${comment.userId?._id}`
                      }
                      className="font-semibold text-gray-900 dark:text-white text-sm hover:underline cursor-pointer"
                    >
                      {comment.userId?.name || "User"}
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(comment.createdAt)} ago
                    </span>
                  </div>

                  <span className="text-gray-800 dark:text-gray-300 text-sm">{comment.text}</span>
                </div>
              </div>
            ))}

          <div className="flex gap-2 mt-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 rounded bg-slate-200 text-black dark:bg-slate-700 dark:text-white text-sm outline-none"
            />
            <button
              onClick={handleComment}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded text-sm"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="full"
            className="max-h-[90%] max-w-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default SinglePost;
