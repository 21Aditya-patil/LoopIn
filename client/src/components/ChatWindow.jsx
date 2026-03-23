import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteConversation } from "../reducers/chatSlice";
import {
  fetchMessages,
  sendMessage,
  clearChat,
  addMessageRealtime,
  moveConversationToTop,
} from "../reducers/chatSlice";
import { useEffect, useState, useRef } from "react";
import dp from "/default-avatar.jpg";
import { socket } from "../socket";
import { IoMdArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function ChatWindow() {
  const dispatch = useDispatch();
  const { currentChat, messages } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.user);

  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const handleDelete = () => {
    if (!currentChat?._id) return;
    dispatch(deleteConversation(currentChat._id));
  };

  // Connect socket once
  useEffect(() => {
    if (!currentUser?._id) return;

    socket.connect();
    socket.emit("addUser", currentUser._id);

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  // Fetch messages when chat changes
  useEffect(() => {
    if (currentChat?._id) {
      dispatch(fetchMessages(currentChat._id));
    }
  }, [currentChat, dispatch]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("getMessage", (data) => {
      dispatch(addMessageRealtime(data));
      dispatch(moveConversationToTop(data.conversationId)); // move instantly
    });

    return () => {
      socket.off("getMessage");
    };
  }, [dispatch]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) return null;

  const receiver = currentChat?.members?.find(
    (m) => m._id !== currentUser?._id,
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId: currentChat._id,
      sender: currentUser._id,
      text: newMessage,
    };

    // Save to DB
    dispatch(sendMessage(messageData));

    // Move conversation instantly
    dispatch(moveConversationToTop(currentChat._id));

    // Emit real-time message
    socket.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiver._id,
      text: newMessage,
      conversationId: currentChat._id,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full pt-20 pb-28 lg:py-2">
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="p-3 border-b flex items-center gap-3 shrink-0">
          <button
            onClick={() => dispatch(clearChat())}
            className="text-orange-500 text-2xl"
          >
            <IoMdArrowBack />
          </button>

          <Link to={`/profile/${receiver._id}`}><img
            src={receiver?.profilePicture || dp}
            alt="dp"
            className="w-8 h-8 rounded-full"
          /></Link>

          <Link to={`/profile/${receiver._id}`}><span className="font-semibold">{receiver?.name || "Chat"}</span></Link>
        </div>
        <button onClick={handleDelete} className="text-orange-500 text-2xl">
          <MdDelete />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const isSender =
            msg.sender?._id === currentUser?._id ||
            msg.sender === currentUser?._id;

          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[70%] px-4 py-2 rounded-2xl text-sm
                  ${isSender
                    ? "bg-orange-500 text-white rounded-br-none"
                    : "bg-gray-400 dark:bg-gray-800 text-black dark:text-white rounded-bl-none"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t flex gap-2 shrink-0">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-2xl text-black"
          placeholder="Type message..."
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white px-4 rounded-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
