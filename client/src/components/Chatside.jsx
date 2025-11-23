import React from "react";
import page from '/pageconstruct.jpg'

function Chatside() {
  return (
    <div className="flex w-full justify-center items-center pt-80 md:pt-0">
      <div className="bg-white justify-center items-center rounded-xl">
        <img src={page} alt="page" className='rounded-2xl'/>
      </div>
    </div>
  );
}

export default Chatside;
