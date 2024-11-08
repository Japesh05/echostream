import { useState, useEffect } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { validateSignupForm } from "./formValidate";
import VerifyOtp from "./VerifyOtp";
import { signupRequest, generateOtp } from "../../requests";
import toast, { Toaster } from "react-hot-toast";
import Fetch from "../Loader/Fetch";

const Signup = () =>  {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email_id, setEmail_Id] = useState(
    localStorage.getItem("email_id") || ""
  );

  const successToast = (message) => toast.success(`${message}`);
  const errorToast = (message) => toast.error(`${message}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getOtp = async (email_id) => {
    try {
      const response = await generateOtp(email_id);
      if (response.status === 200) {
        return response.data.message;
      }
    } catch (err) {
      errorToast("Failed to send OTP");
      console.log(err);
    }
  };

  const handleSignup = async () => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      formValues.email = formValues.email.trim();
      setIsDisabled(true);
      try {
        const resp = await signupRequest(formValues);
        if (resp.status === 200) {
          console.log("resp: ", resp);
          const message = await getOtp(formValues.email);
          localStorage.setItem("email_id", formValues.email);
          setEmail_Id(formValues.email);
          setIsSuccess(true);
          setIsSubmit(false);
        }
      } catch (err) {
        console.log("err: ", err);
        if (err.response.status === 401) {
          errorToast("Email already exists");
          setIsSubmit(false);
        }
      }
      setIsDisabled(false);
      return;
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    handleSignup();
  }, [isSubmit]);

  useEffect(() => {
    const isOtpScreenShown = localStorage.getItem("shownOtpScreen") === "true";
    setIsSuccess(isOtpScreenShown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateSignupForm(formValues));
    setIsSubmit(true);
  };

  return isSuccess ? (
    <VerifyOtp
      email_id={email_id}
      password = {formValues.password}
      username = {formValues.username}
      successToast={successToast}
      errorToast={errorToast}
      setSuccess={setIsSuccess}
      setDisabled={setIsDisabled}
      resend={getOtp}
    />
  ) : (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md relative">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h2>
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
              disabled={isDisabled}
              className={`w-full px-2 py-2 mt-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                isDisabled
                  ? "bg-XSignIn opacity-50 cursor-not-allowed"
                  : "bg-XSignIn hover:bg-XhoverSignIn"
              }`}
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
        {isDisabled && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Fetch />
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default Signup;
