import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updateFocus } from "../features/auth/authSlice";
import Spinner from "../Loader/Spinner";
import { ioContext } from "../App";
import { SmallAvatar } from "../images/avatar";
import SideBarButtons from "../Sidebar/Button/SideBarButtons";
import Upload from "../Loader/Upload";

function Post({ setFocus }) {
  const [tweet, setTweet] = useState("");
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  // const email = useSelector(state => console.log(state)); // will work after login ( making store persistent )
  const email = useSelector((state) => state.authReducer.email);
  const [success, setSuccess] = useState(false);
  const [char, setChar] = useState(0);
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [isImg, setIsImg] = useState(0);
  const [isVid, setIsVid] = useState(0);
  const [isFile, setIsFile] = useState(0);
  const MAX_LIMIT = 5;
  const input = useRef();
  const dispatch = useDispatch();
  const { socket } = useContext(ioContext);

  useEffect(() => {
    const handleTweet = async () => {
      if (error.length === 0 && isSubmit && !success) {
        try {
          const t_tweet = tweet.trim();
          const fd = new FormData();
          // file.forEach((el, ind) => fd.append("avatar", el));
          if (files && [...files].length > 0)
            [...files].forEach((el) => fd.append("file", el));
          fd.append("t_tweet", t_tweet);
          fd.append("email", email);
          // console.log("file: ", files[0]);
          console.log("inside post email: ", email);
          setUpload(true);

          const resp = await axios.post(`https://echostream-api.onrender.com/post`, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // console.log(resp.data);
          if (resp.data.code === 200) {
            setUpload(false);
            setTweet("");
            setFile("");
            setChar(0);
            input.current.value = null;
            if (socket) {
              // console.log("inside posts", socket);
              socket.emit("newPost", { email });
            }
            const post = {
              tweet: t_tweet,
              id: resp.data.id,
              username: resp.data.username,
            };

            // dispatch(addPost(post));
            setSuccess(true);
          }
          setIsSubmit(false);
        } catch (err) {
          console.log(err);
        }
      } else if (success) {
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    };

    handleTweet();
  }, [isSubmit, error]);

  const validate = (tweet) => {
    const temp = tweet.trim().length;
    if (temp > 250) return "Not more than 250 characters";
    if (temp === 0) return "Cannot be empty";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(tweet));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    if (e.target.value.trim().length >= 151) {
      alert("Not more than 150 characters are allowed!");
      return;
    }
    setChar(e.target.value.trim().length);
    setTweet(e.target.value);
  };

  const handleInput = (e) => {
    if (Array.from(e.target.files).length > MAX_LIMIT) {
      alert(`Cannot upload files more than ${MAX_LIMIT}`);
      return;
    }
    console.log("files: ", e.target.files);
    // console.log("type of files: ", typeof files)
    setFiles([...e.target.files]);
    const filesArray = Array.from(e.target.files);
    filesArray.forEach((el) =>
      setFile((prevFiles) => [...prevFiles, URL.createObjectURL(el)])
    );
  };

  useEffect(() => {
    console.log("type of files: ", typeof files);
  }, [files]);

  const removeInput = (ind) => {
    const updatedFiles = [...file];
    updatedFiles.splice(ind, 1);
    setFile(updatedFiles);
  };

  const a = (fname) => {
    return fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2).trim();
  };

  const getMediaType = (fileName) => {
    const extension = a(fileName.name);
    console.log("name of the file: ", fileName.name);
    console.log("extension ", extension);
    if (extension == "jpg" || extension == "png" || extension == "jpeg")
      return "image";
    if (extension == "mp4" || extension == "webm") return "video";
    return "file";
  };

  return (
    <div
      className={`rounded-xl p-2 top-[20%] left-[31%] focus-within:w-[38rem] focus-within:fixed z-50 focus-within:shadow-2xl focus-within:shadow-indigo-500 bg-black my-2 overflow-y-auto ${
        file.length > 0 ? "h-[102%]" : "h-fit"
      }`}
      onFocus={() => dispatch(updateFocus(true))}
      onBlur={() => dispatch(updateFocus(false))}
    >
      {success ? <Spinner /> : upload && <Upload />}
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col">
          <div className="flex gap-2">
            <SmallAvatar
              image={
                "https://images.pexels.com/photos/19466694/pexels-photo-19466694/free-photo-of-stream-in-mountain-area.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
            />
            <textarea
              type="text"
              name="tweet"
              placeholder="What is happening?!"
              value={tweet}
              required
              onChange={handleChange}
              className="w-full h-28 resize-none border-none outline-none bg-black text-white mx-2"
            />
          </div>
          <p className="mx-2 text-Xgrey">No. of characters: {char} / 150</p>
          <div className="flex justify-between px-2 pt-3 items-center border-t-2 border-Xgrey mt-2">
            <input
              type="file"
              className=" rounded-md w-[14rem] h-fit bg-black indent-0"
              onChange={handleInput}
              ref={input}
              name="file"
              multiple
            />
            <button
              className=" bg-Xblue py-[0.5rem] text-sm font-bold w-[5rem] rounded-[1.5rem] hover:bg-XsecBlue hover:cursor-pointer"
              tabIndex="-1"
            >
              Post
            </button>
          </div>
          {file.length > 0 ? (
            <div className="p-1 my-2">
              <div className=" relative">
                {/* {file.map((el, ind) => {
                  return (
                    <div className=" relative" key={ind}>
                      <button
                        className=" bg-Xblue text-Xicon rounded-full px-3 py-1 h-fit w-fit absolute top-0 right-0"
                        onClick={() => removeInput(ind)}
                      >
                        X
                      </button>
                      <img src={el} className=" mb-2" />
                    </div>
                  );
                })} */}
                {files.map((el, ind) => {
                  const mediaType = getMediaType(el);
                  console.log("mediaTYPE: ", mediaType);
                  console.log("el: ", el);
                  return (
                    <div className=" relative" key={ind}>
                      <button
                        className=" bg-Xblue text-Xicon rounded-full px-3 py-1 h-fit w-fit absolute top-0 right-0"
                        onClick={() => removeInput(ind)}
                      >
                        X
                      </button>
                      {mediaType == "image" ? (
                        <img src={URL.createObjectURL(el)} className=" mb-2" />
                      ) : mediaType == "video" ? (
                        <video
                          src={URL.createObjectURL(el)}
                          autoPlay
                          loop
                          controls
                          className="w-full h-full"
                        ></video>
                      ) : (
                        mediaType == "file" && (
                          <div>It is a file// working on that</div>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

export default Post;
