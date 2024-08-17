import React from "react";
import { SmallAvatar } from "../images/avatar";
import { BlueTick } from "../images/svg/svgs";

function Info({ image, name, email, verified }) {
  return (
    <div className="mx-3 flex hover:cursor-pointer">
        <SmallAvatar
          image={image}
        />
        <div className="ml-2 flex flex-col items-start gap-0">
          <div className=" text-Xwhite text-md font-bold flex justify-center items-center gap-1 hover:underline hover:underline-offset-1">
            {name}
            {verified && <div><BlueTick /></div>}
          </div>
          <p className="text-Xgrey text-sm">@{email}</p>
        </div>
      </div>
  );
}

export default Info;
