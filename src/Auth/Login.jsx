import { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Loader/Spinner";
import { useDispatch } from "react-redux";
import {
  setId,
  updateUserName,
  updateEmail,
  updateLogin,
} from "../features/auth/authSlice";

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
  const [userid, setUserid] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(`The env variable is : ${process.env.REACT_APP_API_URL}`)

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
  //           dispatch(updateEmail(formValues.email));
  //           localStorage.setItem("token", resp.data.token);
  //           dispatch(setId(resp.data.id));
  //           console.log("username is " + resp.data.username)
  //           dispatch(setUserName(resp.data.username));
  //           setUserid(resp.data.id);
  //           setSuccess(true);
  //         } else {
  //           alert(`${resp.data.message}`);
  //           setIsSubmit(false);
  //           return;
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else if (success) {
  //       setTimeout(() => {
  //         dispatch(updateLogin(true));
  //         localStorage.setItem("isLoggedin", true);
  //         navigate(`/home/${userid}`);
  //       }, 2000);
  //     }
  //   };

  //   handleLogin();
  // }, [isSubmit, formErrors, success]);

  useEffect(() => {
    const handleLogin = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit && !success) {
        formValues.email = formValues.email.trim();
        try {
          const resp = await axios.post(
            `https://echostream-api.onrender.com/auth/login`,
            formValues
          );
          if (resp.data.code === 200) {
            dispatch(updateEmail(formValues.email));
            localStorage.setItem("token", resp.data.token);
            dispatch(setId(resp.data.id));
            dispatch(updateUserName(resp.data.username)); 
            setUserid(resp.data.id);
            setSuccess(true);
          } else {
            alert(`${resp.data.message}`);
            setIsSubmit(false);
            return;
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleLogin();
  }, [isSubmit, formErrors]); 

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
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "*Required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "*Required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
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
                  <button className="w-full px-2 py-2 mt-2 text-white bg-XSignIn rounded-md hover:bg-XhoverSignIn focus:outline-none focus:ring-2 focus:ring-green-500">
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
