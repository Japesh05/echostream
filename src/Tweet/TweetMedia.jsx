import React, { useEffect, useState } from "react";

function TweetMedia({ data }) {
  const [clock, setClock] = useState({ hour: 0, minute: 0 });
  const [mediaTYPE, setMediaTYPE] = useState("");

  // function formatDate(val) {
  //   const options = {
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //   };
  //   const dateObject = new Date(val);
  //   const hour = dateObject.getHours();
  //   const minute = dateObject.getMinutes();

  //   return {
  //     date: new Date(val).toLocaleDateString("en-US", options),
  //     hour,
  //     minute,
  //   };
  // }

  function formatDate(val) {
    const dateObject = val ? new Date(val) : new Date();

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();

    return {
      date: dateObject.toLocaleDateString("en-US", options),
      hour,
      minute,
    };
  }

  const a = (fname) => {
    return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2).trim();
  };

  const getMediaType = (fileName) => {
    const extension = a(fileName);
    if (extension == "jpg" || extension == "png" || extension == "jpeg")
      return "image";
    if (extension == "mp4" || extension == "webm") return "video";
    return "file";
  };

  useEffect(() => {
    setClock(formatDate(data?.date_time));
    // console.log("data-file: ", data.file);
    if (data.file) setMediaTYPE(getMediaType(data.file));
  }, [data]);

  return (
    <div>
      <div className=" text-Xgrey flex flex-col px-2 items-center gap-1">
        {data.file && (
          <div>
            {mediaTYPE == "image" ? (
              <img src={data.file} className=" mb-2" />
            ) : mediaTYPE == "video" ? (
              <video
                src={data.file}
                autoPlay
                loop
                controls
                className="w-full h-full"
                muted
              ></video>
            ) : (
              mediaTYPE == "file" && <div>It is a file// working on that</div>
            )}
          </div>
        )}
        <div className=" text-Xgrey flex px-2 items-center gap-1 w-full mt-1">
          {/* <div className=" text-Xgrey">
            {clock.hour}:{clock.minute}
          </div> */}
          <div className=" w-1 h-1 rounded-full bg-Xgrey ml-1"></div>
          <div>{clock.date}</div>
          <div className=" w-1 h-1 rounded-full bg-Xgrey"></div>
          <div>View</div>
        </div>
      </div>
    </div>
  );
}

export default TweetMedia;
