import React, { useState } from "react";

function PostCategories() {
  const [active, setActive] = useState("All");

  const categories = ["All", "Sports", "Cultural", "Study", "Fun"];

  return (
    <div className="w-full overflow-x-auto shrink-0">
      <div className="flex gap-3 whitespace-nowrap">
        {categories.map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`lg:w-44 h-10 px-6 rounded-3xl font-bold flex items-center justify-center
              ${active === i
                ? "bg-gradient-to-br from-[#f9a225] to-[#f95f35] text-white"
                : "border border-[#f95f35] text-[#f95f35]"
              }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PostCategories;
