import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../reducers/chatSlice";
import defaultAvatar from "/default-avatar.jpg"; // make sure this exists

function ChatOne({ data, conversation }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentChat(conversation));
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-300  dark:hover:bg-slate-800 rounded-lg transition border-b border-slate-400"
    >
      <img
        src={data?.profilePicture || defaultAvatar}
        alt="profile"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-semibold dark:text-white text-black">{data?.name}</span>
    </div>
  );
}

export default ChatOne;
