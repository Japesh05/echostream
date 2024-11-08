import { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Loader/Spinner";
import { validateLoginForm } from "./formValidate";
import { useDispatch } from "react-redux";
import {
  setId,
  updateUserName,
  updateEmail,
  updateLogin,
} from "../features/auth/authSlice";
import { loginRequest } from "../../requests";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [userid, setUserid] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateInfo = (resp) => {
    dispatch(updateEmail(formValues.email));
    localStorage.setItem("token", resp.data.token);
    dispatch(setId(resp.data.id));
    console.log("username is " + resp.data.username);
    dispatch(updateUserName(resp.data.username));
    setUserid(resp.data.id);
    setSuccess(true);
  };

  const handleLogin = async () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && !success) {
      formValues.email = formValues.email.trim();
      setisDisabled(true);
      try {
        const resp = await loginRequest(formValues);

        if (resp.status === 200) {
          console.log("Hello bhai");
          updateInfo(resp);
          return;
        }
      } catch (err) {
        if (err.response.status === 401) {
          alert(`${err.response.data.message}`);
          setIsSubmit(false);
          setisDisabled(false);
          return;
        }
        console.log("this is the error ", err);
      }
      return;
    }

    if (success) {
      setTimeout(() => {
        dispatch(updateLogin(true));
        localStorage.setItem("isLoggedin", true);
        navigate(`/home/${userid}`);
      }, 2000);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [isSubmit, formErrors, success]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(updateLogin(true));
        localStorage.setItem("isLoggedin", true);
        navigate(`/home/${userid}`);
      }, 2000);
    }
  }, [success, userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateLoginForm(formValues));
    setIsSubmit(true);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="relative w-full max-w-sm p-8 space-y-4 bg-white shadow-md rounded-lg">
          {success && <Spinner />}

          <div>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="ui form">
                <div className="field mb-4">
                  {" "}
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <p className="text-red-600 mt-1">{formErrors.email}</p>
                </div>
                <div className="field mb-4 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <FaLockOpen className="hover:cursor-pointer text-gray-600" />
                    ) : (
                      <FaLock className="hover:cursor-pointer text-gray-600" />
                    )}
                  </span>
                  <p className="text-red-600 mt-1">{formErrors.password}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    disabled={isDisabled}
                    className={`w-full px-2 py-2 mt-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      isDisabled
                        ? "bg-XSignIn opacity-50 cursor-not-allowed"
                        : "bg-XSignIn hover:bg-XhoverSignIn"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center mt-6">
              New Here?{" "}
              <Link to="/auth/signup" className="text-green-600 font-semibold">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
