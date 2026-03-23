import { useSelector } from "react-redux";
import Userside from "../components/Userside";
import Navside from "../components/Navside";
import MobileNav from "../components/MobileNav";
import Chatside from "../components/Chatside";
import ChatWindow from "../components/ChatWindow";

function Chats() {
  const currentChat = useSelector((state) => state.chat.currentChat);

  return (
    <div className="relative h-[calc(100vh-2rem)] overflow-hidden lg:grid lg:grid-cols-[18rem_auto_20rem]">

      {/* LEFT SIDEBAR */}
      <Userside />

      {/* MOBILE NAV */}
      <MobileNav />

      {/* CENTER CHAT AREA */}
      <div className="flex flex-col flex-1 lg:grid lg:grid-cols-2 h-full overflow-hidden rounded-xl mx-2 min-h-0">

        {/* CHAT LIST */}
        <div className={`${currentChat ? "hidden lg:block" : "block"} h-full`}>
          <Chatside />
        </div>

        {/* CHAT WINDOW */}
        <div className={`${currentChat ? "block" : "hidden lg:block"} h-full`}>
          {currentChat ? (
            <ChatWindow />
          ) : (
            <div className="hidden lg:flex items-center justify-center h-full">
              Select a user to start chatting
            </div>
          )}
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <Navside />

    </div>
  );
}

export default Chats;
