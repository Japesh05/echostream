import React, { useRef, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Fetch from "../Loader/Fetch";
import { addUser, verifyOtp } from "../../requests";
import { useNavigate } from "react-router-dom";

const OTPInput = ({
  email_id,
  password,
  username,
  successToast,
  errorToast,
  setSuccess,
  setDisabled,
  resend,
  length = 6,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const inputRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOtp = JSON.parse(localStorage.getItem("otp")) || otp;
    const focusIndex = savedOtp.findIndex((el) => el === "");
    setOtp(savedOtp);
    inputRef.current[focusIndex === -1 ? length - 1 : focusIndex].focus();
    localStorage.setItem("shownOtpScreen", true);
  }, []);

  useEffect(() => {
    const savedTime = parseInt(localStorage.getItem("otpExpirationTime"), 10);
    const currentTime = Math.floor(Date.now() / 1000);
    const initialTimeLeft =
      savedTime && savedTime > currentTime ? savedTime - currentTime : 300;

    setTimeLeft(initialTimeLeft);
    localStorage.setItem("otpExpirationTime", currentTime + initialTimeLeft);

    const interval = setInterval(() => {
      const remainingTime =
        parseInt(localStorage.getItem("otpExpirationTime"), 10) -
        Math.floor(Date.now() / 1000);
      if (remainingTime <= 0) {
        clearInterval(interval);
        alert("OTP expired. Redirecting to Signup.");
        localStorage.removeItem("otp");
        handleBack();
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    successToast("OTP Sent Successfully");
  }, [successToast]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value ? value[value.length - 1] : "";
      setOtp(newOtp);

      setIsOtpFilled(newOtp.join("").length === length);

      if (value !== "") {
        const nextIndex = newOtp.findIndex((el) => el === "");
        inputRef.current[nextIndex === -1 ? length - 1 : nextIndex].focus();
        handleClick(e, index);
      }

      localStorage.setItem("otp", JSON.stringify(newOtp));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      e.preventDefault();
      inputRef.current[index - 1].focus();
    }
  };

  const handleClick = (e, index) => {
    inputRef.current[index].setSelectionRange(1, 1);
  };

  const handleBack = () => {
    localStorage.removeItem("shownOtpScreen");
    localStorage.removeItem("otpExpirationTime");
    setSuccess(false);
    setDisabled(false);
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const message = await resend(email_id);
      successToast(message);
      setTimeLeft(300);
      localStorage.setItem(
        "otpExpirationTime",
        Math.floor(Date.now() / 1000) + 300,
      );
      localStorage.removeItem("otp");
      setOtp(new Array(length).fill(""));
    } catch (error) {
      errorToast(error.response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearOtp = () => {
    const clearedOtp = new Array(length).fill("");
    setOtp(clearedOtp);
    setIsOtpFilled(clearedOtp.join("").length === length);
    localStorage.setItem("otp", JSON.stringify(clearedOtp));
    inputRef.current[0].focus();
  };

  const signUser = async () => {
    try {
      const response = await addUser(username, email_id, password);

      if (response.status === 200) {
        localStorage.removeItem("otpExpirationTime");
        localStorage.removeItem("shownOtpScreen");
        navigate("/auth/login");
      }
    } catch (error) {
      // errorToast(err.response.data.message);
      console.log("err: ", error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await verifyOtp(email_id, otp.join(""));

      if (response.status === 200) {
        successToast(response.data.message);
        localStorage.removeItem("otp");

        await signUser();
      }
    } catch (err) {
      errorToast(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0",
    )}`;
  };

  const getColor = () => {
    if (timeLeft > 150) return "#4caf50";
    if (timeLeft > 60) return "#ffc107";
    return "#f44336";
  };

  const progressPercentage = (timeLeft / 300) * 100;

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-900 pt-10">
        <div
          className="relative flex items-center justify-center mb-6 w-24 h-24 rounded-full"
          style={{
            background: `conic-gradient(#e5e7eb ${progressPercentage}%, ${getColor()} ${progressPercentage}%)`,
          }}
        >
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <p className="text-lg font-semibold" style={{ color: getColor() }}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Verify Your OTP
          </h2>
          <p className="text-center text-gray-600">
            Enter the {length}-digit OTP sent to{" "}
            <span className="font-semibold text-green-600">{email_id}</span>
          </p>

          <div className="flex justify-center space-x-4 mt-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={(e) => handleClick(e, index)}
                className="w-14 h-14 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-XSignIn transition-colors duration-200"
              />
            ))}
          </div>

          <div className="relative mt-6 flex items-center">
            <div className="flex justify-between w-full">
              <button
                className={`w-full py-3 text-white bg-XSignIn rounded-md 
                ${
                  isOtpFilled
                    ? "hover:bg-XhoverSignIn"
                    : "opacity-50 cursor-not-allowed"
                } 
                focus:outline-none focus:ring-2 focus:ring-XSignIn focus:ring-opacity-50 transition-colors duration-200`}
                onClick={handleSubmit}
                disabled={!isOtpFilled}
              >
                Verify OTP
              </button>

              <button
                className="flex items-center justify-center p-2 w-12 h-12 bg-gray-400 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200 ml-4"
                onClick={handleClearOtp}
                title="Clear OTP"
              >
                <FaTrashAlt className="text-white" />
              </button>
            </div>
          </div>

          <div className="text-center text-gray-600 mt-4">
            Didn't receive an OTP?{" "}
            <span
              className="font-semibold text-green-600 cursor-pointer hover:underline"
              onClick={handleResend}
            >
              Resend
            </span>
          </div>

          <div className="text-center mt-6">
            <button
              className="text-sm font-semibold text-blue-600 cursor-pointer underline hover:text-XSignIn transition-colors duration-200"
              onClick={handleBack}
            >
              Back to Signup
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Fetch />
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default OTPInput;
