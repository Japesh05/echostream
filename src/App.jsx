// App.js
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
import ProtectedRoute from "./ProtectedRoute";

const ioContext = createContext();

function App() {
  const isLoggedin = useSelector((state) => state.authReducer.isLoggedin);
  const id = useSelector((state) => state.authReducer.id);
  const socket = io.connect("http://localhost:3001");

  return (
    <ioContext.Provider value={{ socket }}>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedin ? (
              <Navigate to={`/home/${id}`} />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />

        <Route
          path="/auth/login"
          element={isLoggedin ? <Navigate to={`/home/${id}`} /> : <Login />}
        />

        <Route
          path="/auth/signup"
          element={isLoggedin ? <Navigate to={`/home/${id}`} /> : <Signup />}
        />

        <Route
          path="/home/:id"
          element={
            <ProtectedRoute isLoggedin={isLoggedin}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmark/:id"
          element={
            <ProtectedRoute isLoggedin={isLoggedin}>
              <Bookmark />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute isLoggedin={isLoggedin}>
              <Post />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Lost />} />
      </Routes>
    </ioContext.Provider>
  );
}

export default App;
export { ioContext };
