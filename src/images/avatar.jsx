import React from "react";

export const SmallAvatar = ({ image }) => {
  return <img src={image} alt="avatar" className={`rounded-full h-avatar w-avatar border-2 border-slate-500`} />;
};
