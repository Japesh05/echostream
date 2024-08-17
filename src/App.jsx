import "./App.css";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { createContext } from "react";
import Bookmark from "./Bookmark/Bookmark";
import Lost from "./Error404/Lost";

const ioContext = createContext();

function App() {
  // const isLoggedin = useSelector(state => state.isLoggedin) | (localStorage.getItem("isLoggedin") === 'true');
  const isLoggedin = useSelector((state) => state.authReducer.isLoggedin);
  const id = useSelector((state) => state.authReducer.id);
  const socket = io.connect(
    `https://echostream-api.onrender.com` || "http://localhost:3001"
  );

  return (
    <ioContext.Provider value={{ socket }}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedin ? (
              <Navigate to={`/home/${id}`} />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        ></Route>
        <Route
          exact
          path="/auth/login"
          element={isLoggedin ? <Navigate to={`/home/${id}`} /> : <Login />}
        ></Route>
        <Route
          exact
          path="/auth/signup"
          element={isLoggedin ? <Navigate to={`/home/${id}`} /> : <Signup />}
        ></Route>
        <Route
          exact
          path="/home/:id"
          element={isLoggedin ? <Home /> : <Navigate to="/auth/login" />}
        ></Route>
        <Route
          exact
          path="/bookmark/:id"
          element={isLoggedin ? <Bookmark /> : <Navigate to="/auth/login" />}
        ></Route>
        <Route path="*" element={<Lost />}></Route>
        <Route
          exact
          path="/post"
          element={isLoggedin ? <Post /> : <Navigate to="/auth/login" />}
        ></Route>
      </Routes>
    </ioContext.Provider>
  );
}

export default App;
export { ioContext };
