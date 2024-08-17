import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Fetch from "../Loader/Fetch";
import Nothing from "../Loader/Nothing";
import TweetCard from "../Tweet/TweetCard";

function Bookmark() {
  const { id } = useParams();

  const [data, setData] = useState();
  const [empty, setEmpty] = useState(false);
  const [load, setLoad] = useState(true);

  const fetchBookmarks = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/getBookmark`,
      {
        params: { userid: id },
      }
    );
    setLoad(false);
    if (response.data.code === 200) {
      setData(response.data.message);
    }
    if (response.data.code === 401) setEmpty(true);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div
      className={`lg:h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll lg:bg-slate-900 p-4 ${
        data == undefined && "lg:flex lg: justify-center lg: items-center"
      }`}
    >
      {load ? (
        <Fetch />
      ) : data !== undefined ? (
        data.map((el, ind) => (
          <div
            key={ind}
            className="border-x-2 border-b-2 border-gray-700 rounded-lg shadow-lg shadow-indigo-500/40 h-fit text-white"
          >
            <TweetCard data={el} />
          </div>
        ))
      ) : (
        <Nothing />
      )}
    </div>
  );
}

export default Bookmark;
