import React from "react";
import {
  BookmarkIcon,
  ExploreIcon,
  HomeIcon,
  ListsIcon,
  Logo,
  MessageIcon,
  MoreIcon,
  NotificationIcon,
} from "../images/svg/svgs";
import SideBarButtons from "./Button/SideBarButtons";
import { SmallAvatar } from "../images/avatar";
import Info from "../Info/Info";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const focus = useSelector(state => state.authReducer.focus);
  const userEmail = useSelector(state => state.authReducer.email);
  const userName = useSelector(state => state.authReducer.username);
  return (
    <div className={`min-w-[30%] flex flex-col items-end ${focus ? "bg-slate-900" : ""}`}>
      <div className=" border-solid border-sky-500 min-w-64 flex flex-col items-start">
        <div className="mb-3 py-2">
          <Logo />
        </div>
        <SideBarButtons icon={<HomeIcon />} text="Home" />
        <SideBarButtons icon={<ExploreIcon />} text="Explore" />
        <SideBarButtons icon={<NotificationIcon />} text="Notifications" />
        <SideBarButtons icon={<MessageIcon />} text="Messages" />
        <SideBarButtons icon={<BookmarkIcon />} text="Bookmark" />
        <SideBarButtons icon={<ListsIcon />} text="Lists" />
        <SideBarButtons icon={<MoreIcon />} text="More" />

        <button className=" bg-Xblue py-[1rem] text-md font-bold w-[13rem] mt-4 mb-2 rounded-[2rem] hover:bg-XsecBlue">
          Post
        </button>
      </div>
      <div className="flex w-60 justify-evenly items-center py-1 mr-6 mt-3 hover:cursor-pointer hover:bg-Xhover rounded-2xl">
        <NavLink end to="/profile">
          <Info
            image={
              "https://images.pexels.com/photos/19466694/pexels-photo-19466694/free-photo-of-stream-in-mountain-area.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            name={`${userName}`}
            email= {`${userEmail}`}
            verified={false}
          />
        </NavLink>
        <p className="text-white text-xl pr-1">...</p>
      </div>
    </div>
  );
}

export default Sidebar;
