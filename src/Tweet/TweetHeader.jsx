import React, { useState } from "react";
import { SmallAvatar } from "../images/avatar";
import { NavLink } from "react-router-dom";
import { BlueTick } from "../images/svg/svgs";
import Info from "../Info/Info";
import { useSelector } from "react-redux";

function TweetHeader({data}) {
  // const name = useSelector(state => state.username);
  const username = data?.username || "Anonymous";
  const email = data?.email || "anonymous@gmail.com";
  const verified = data?.verified || false;
  const [click, setClick] = useState(false);

  return (
    <div className="flex w-full h-auto justify-between items-center pl-1 pr-2 py-1 border-t-2 border-Xgrey ">
      <NavLink end to='/profile'>
        <Info
          image={
            "https://images.pexels.com/photos/19466694/pexels-photo-19466694/free-photo-of-stream-in-mountain-area.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          name={username}
          email={email}
          verified={verified}
        />
      </NavLink>
      <div className="flex gap-3 items-centerjustify-evenly">
        <NavLink className=" flex justify-center items-center rounded-2xl px-6 h-fit py-[0.4rem] font-semibold text-sm text-black bg-Xwhite hover:bg-white">
          Subscribe
        </NavLink>
        
        <p className="text-Xgrey text-xl hover:cursor-pointer">...</p>
      </div>
    </div>
  );
}

export default TweetHeader;
