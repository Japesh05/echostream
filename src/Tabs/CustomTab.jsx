import React, { useEffect, useState } from "react";
import { LogoutIcon } from "../images/svg/svgs";
import TabNav from "./TabNav";
import TabContent from "./TabContent";
import TweetHeader from "../Tweet/TweetHeader";
import TweetCard from "../Tweet/TweetCard";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { updateLogin } from "../features/auth/authSlice";

function CustomTab({ focus, setFocus, feed }) {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.authReducer.isLoggedin);
  console.log("login: ", login);

  const handleClick = () => {
    dispatch(updateLogin(false));
  };

  return (
    <div className="w-[40%] ml-3 py-2 border-x-2 border-Xgrey">
      <div className="flex h-fit justify-evenly mx-2 mb-2 border-b-2 border-Xgrey">
        <TabNav
          id={0}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          text={"For you"}
        />
        <TabNav
          id={1}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          text={"Following"}
        />
        <div
          className="px-6 py-2 hover:cursor-pointer grow flex justify-center"
          onClick={handleClick}
        >
          {/* <SettingsIcon /> */}
          <LogoutIcon />
        </div>
      </div>

      <div className="w-full mt-2 border-b-gray-300 relative overflow-y-auto h-[95%]">
        {/* <TabContent activeTab={activeTab} id={0} text={"Tab1 Component"} /> */}
        <Post setFocus={setFocus} />
        {feed.map((el, index) => {
          return <TweetCard data={el} key={index} />;
        })}
        <TabContent activeTab={activeTab} id={1} text={"Tab2 Component"} />
      </div>
    </div>
  );
}

export default CustomTab;
