import React from "react";
import Userside from '../components/Userside'
import Navside from '../components/Navside'
import MobileNav from '../components/MobileNav'
import Chatside from "../components/Chatside";

function Chats() {
  return (
    <>
      <div className="relative lg:grid lg:grid-cols-[18rem_auto_20rem] gap-4 min-h-screen items-stretch">
        <Userside />
        <MobileNav />
        <Chatside />
        <Navside />
      </div>
    </>
  );
}

export default Chats;
