import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ioContext } from "../App";
import { addPost } from "../features/auth/authSlice";
import Sidebar from "../Sidebar/Sidebar";
import Tab from "../Tabs/TabComp";
import CustomTab from "../Tabs/CustomTab";
import Spinner from "../Loader/Spinner";
import Fetch from "../Loader/Fetch";

function Home() {
  // const initialValues = {
  //   email: "",
  //   password: "",
  // };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const unsortedFeed = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [feed, setFeed] = useState([]);
  // const [media, setMedia] = useState([]);
  const [focus, setFocus] = useState(false);
  const [fetch, setFetch] = useState(false);
  const navigate = useNavigate();
  const tempEmail = useSelector((state) => state.authReducer.email);
  const { socket } = useContext(ioContext);
  const focus_t = useSelector((state) => state.authReducer.focus);

  const updatePost = async () => {
    try {
      const email = tempEmail;

      setFetch(true);

      // console.log("inside updatepost: ", email);

      const resp = await axios.post(`${process.env.REACT_APP_API_URL}/post/feeds`, {
        email,
      });

      if (resp.data.code === 200 || resp.data.code === 404) {
        // console.log("all ok", resp.data.message);

        setFeed([...feed, ...resp.data.message]);
        setFetch(false);
        // dispatch(setUserName(resp.data.username));
        // resp.data.message.forEach((el) => dispatch(addPost(el)));

        // const response = await axios.get("http://localhost:3000/post/media");
        // if(response.code === 200){
        //   setMedia([...media, response.data.message]);
        // }
      }
    } catch (error) {
      if (error) console.log(error);
    }
  };

  useEffect(() => {
    updatePost();
  }, []);

  // useEffect(() => {
  //   // console.log("feed: ", feed);
  // }, [feed]);

  useEffect(() => {
    if (socket) {
      socket.on("updatePost", updatePost);
      // do not know how does this work ?
      // hours Wasted : 1.2
      return () => socket.off("updatePost", updatePost);
    }
  }, []);

  // useEffect(() => {
  //   const handleLogin = async () => {
  //     if (Object.keys(formErrors).length === 0 && isSubmit && !success) {
  //       formValues.email = formValues.email.trim();
  //       try {
  //         const resp = await axios.post(
  //           "http://localhost:3000/auth/login",
  //           formValues
  //         );
  //         if (resp.data.code === 200) {
  //           setSuccess(true);
  //         } else {
  //           alert(`${resp.data.message}`);
  //           setIsSubmit(false);
  //           return;
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }

  //   };

  //   handleLogin();
  // }, [isSubmit, formErrors, success]);

  return (
    <>
      <div
        className={`text-white overflow-auto h-screen bg-black flex min-w-full ${
          focus_t ? " bg-slate-900" : ""
        }`}
      >
        <Sidebar />
        {feed.length > 0 ? (
          <CustomTab focus={focus} setFocus={setFocus} feed={feed} />
        ) : (
          fetch && <Fetch />
        )}
      </div>
    </>
  );
}

export default Home;
