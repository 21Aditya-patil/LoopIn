import React from "react";
import Navside from '../components/Navside'
import MobileNav from '../components/MobileNav'
import Accountside from "../components/Accountside";
import AccountLeft from "../components/AccountLeft";

function Account() {
  return (
    <>
      <div className="relative lg:grid lg:grid-cols-[18rem_auto_20rem] gap-4 min-h-screen items-stretch">
        <AccountLeft />
        <MobileNav />
        <Accountside />
        <Navside />
      </div>
    </>
  );
}

export default Account;
