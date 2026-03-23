import React, { useEffect } from "react";
import ChatOne from "./ChatOne";
import { useSelector, useDispatch } from "react-redux";
import { fetchConversations } from "../reducers/chatSlice";

function Chatside() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const conversations = useSelector((state) => state.chat.conversations);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchConversations(user._id));
    }
  }, [user, dispatch]);

  return (
    <div className="flex flex-col h-full overflow-hidden sm:pt-20 sm:pb-28 lg:py-2 dark:bg-slate-900 bg-[#ffffffa3] opacity-80">
      <h2 className="text-2xl font-bold p-3 shrink-0 lg:mt-0 mt-20">Messages</h2>

      <div className="flex-1 overflow-y-auto px-3">
        {conversations.map((conversation) => {
          const friend = conversation.members.find(
            (m) => m._id !== user._id
          );

          return (
            <ChatOne
              key={conversation._id}
              data={friend}
              conversation={conversation}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Chatside;