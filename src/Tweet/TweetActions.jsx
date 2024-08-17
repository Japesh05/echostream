import React, { useEffect, useState } from "react";
import {
  TweetCommentIcon,
  TweetLikeIcon,
  TweetRetweetIcon,
  TweetSendIcon,
} from "../images/svg/svgs";

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import axios from "axios";

function TweetActions({ data }) {
  const [click, setClick] = useState(data?.isbookmarked);
  const [likeClick, setLikeClick] = useState(0);

  console.log("in the twwet " + JSON.stringify(data));

  const bookmark = async (click) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/updateBookmark`,
      {
        postid: data.postid,
        click: click,
      }
    );
  };

  const updateLike = async (likeClick) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/updateLikes`,
      {
        postid: data?.postid,
        likeClick: likeClick,
      }
    );
  };

  useEffect(() => {
    bookmark(click);
  }, [click]);

  const handleBookmark = () => {
    setClick(!click);
  };

  const handleLikes = () => {
    setLikeClick(!likeClick);
    updateLike(!likeClick);
  };

  return (
    <div className="flex gap-2 justify-evenly items-center p-2  border-Xgrey w-[92%] mx-4 my-2">
      <div className="flex gap-2 justify-center items-center fill-Xwhite hover:cursor-pointer hover:fill-Xblue hover:text-Xblue delay-100 ease-in-out transition-all">
        <TweetCommentIcon /> 0
      </div>
      <div className="flex gap-2 justify-center items-center fill-Xwhite hover:cursor-pointer hover:fill-Xblue hover:text-Xblue delay-100 ease-in-out transition-all">
        <TweetRetweetIcon />0
      </div>
      <div
        className="flex gap-2 justify-center items-center fill-Xwhite hover:cursor-pointer hover:fill-Xblue hover:text-Xblue delay-100 ease-in-out transition-all"
        onClick={handleLikes}
      >
        {likeClick ? <FaHeart /> : <TweetLikeIcon />}
        {data?.likes === null || data?.likes === undefined ? 0 : data?.likes}
      </div>
      <div
        className="flex gap-2 justify-center items-center fill-Xwhite hover:cursor-pointer hover:fill-Xblue hover:text-Xblue delay-75 ease-in-out transition-all px-2"
        onClick={handleBookmark}
      >
        {click ? <FaBookmark /> : <FaRegBookmark />}
      </div>
    </div>
  );
}

export default TweetActions;
