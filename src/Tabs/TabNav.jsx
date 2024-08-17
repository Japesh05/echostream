import React from "react";

function TabNav({ id, activeTab, setActiveTab, text }) {
    const handleTab = (val) => {
        setActiveTab(val);
      };
  return (
    <div
      className={`${
        activeTab === id ? "text-bold" : "text-Xgrey"
      } border-gray-300 px-2 py-2 text-center hover:cursor-pointer grow relative hover:bg-Xhover`}
      onClick={() => handleTab(id)}
    >
      {text}
      <div className={` absolute ${activeTab === id ? "w-14 h-1 rounded-xl bg-Xblue" : ""} top-[85%] left-[40%]`}></div>
    </div>
  );
}

export default TabNav;
