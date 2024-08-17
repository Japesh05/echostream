import { useState, useEffect } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Loader/Spinner";

function Signup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    const handleSignUp = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        formValues.email = formValues.email.trim();
        try {
          const resp = await axios.post(
            `https://echostream-api.onrender.com/auth/signup`,
            formValues
          );
          if (resp.data.code === 200) {
            setTimeout(() => {
              navigate("/auth/login");
            }, 2000);
          } else {
            alert(`${resp.data.message} . Refresh the page`);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    handleSignUp();
  }, [isSubmit, formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "*Required";
    }
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
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords didn't match. Try again.";
    }
    return errors;
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h2>
          {Object.keys(formErrors).length === 0 && isSubmit && <Spinner />}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formValues.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formErrors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {formErrors.username}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaLockOpen className="text-gray-500" />
                ) : (
                  <FaLock className="text-gray-500" />
                )}
              </div>
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-XSignIn rounded-md hover:bg-XhoverSignIn focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </form>
          <div className="text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
