import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideBarButtons({ icon, text }) {
  const lowercasedText = text.toLowerCase();
  const id = useSelector((state) => state.authReducer.id);

  return (
    <div className="group hover:cursor-pointer mb-2 w-full">
      <NavLink end to={`/${lowercasedText}/${id}`}>
        <div className="group-hover:bg-Xhover group-hover:cursor-pointer w-fit rounded-2xl">
          <div className="flex items-end text-2xl font-serif px-1 pb-3 pt-2 w-fit mr-4 rounded-2xl delay-75 fill-Xicon">
            {icon}
            <p className="text-xl text-white text-center mx-3 block">{text}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default SideBarButtons;
