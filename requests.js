import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export const loginRequest = async (formValues) => {
  return await axiosInstance.post(
    '/auth/login',
    formValues
  );
};

export const signupRequest = async (formValues) => {
  return await axiosInstance.post(
    '/auth/checkEmail',
    formValues
  );
};

export const generateOtp = async(email_id) => {
  return await axiosInstance.post('/auth/generateOtp', { email_id });
}

export const verifyOtp = async(email_id, otp) => {
  return await axiosInstance.post('/auth/verifyOtp', {email_id, otp});
}

export const addUser = async(username, email_id, password) => {
  return await axiosInstance.post('/auth/addUser', {username, email_id, password})
}