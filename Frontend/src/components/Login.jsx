import React, { useRef, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);

    try {
      if (!isSignInForm) {
        // Register
        const res = await axios.post(
          "https://cinemind-98oc.onrender.com/api/auth/register",
          {
            username: name.current.value,
            email: email.current.value,
            password: password.current.value,
          }
        );
        setSuccessMessage("Signup successful! Please login.");
        setIsSignInForm(true);
      } else {
        // Login
        const res = await axios.post("https://cinemind-98oc.onrender.com/api/auth/login", {
          email: email.current.value,
          password: password.current.value,
        });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        dispatch(addUser(user));
        navigate("/browse");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Authentication failed");
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-red-900 opacity-100">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src={BG_URL}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900 opacity-80"></div>
      </div>
      <div className="flex flex-1 items-center justify-center z-10 relative">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-8 md:p-12 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl mx-4 border border-white/20 transition-all duration-500"
        >
          <h1 className="font-extrabold text-4xl text-center py-4 text-pink-400 drop-shadow-lg transition-all duration-300 tracking-wide">
            {isSignInForm ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-center text-lg text-white/80 mb-4">
            {isSignInForm
              ? "Sign in to continue your movie journey."
              : "Sign up and start exploring movies!"}
          </p>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="py-3 my-3 rounded-lg w-full bg-white/30 text-white placeholder-white/70 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="py-3 my-3 rounded-lg w-full bg-white/30 text-white placeholder-white/70 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="py-3 my-3 rounded-lg w-full bg-white/30 text-white placeholder-white/70 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          {errorMessage && (
            <p className="text-red-400 text-sm mt-2 mb-2 text-center font-semibold animate-pulse">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-400 text-sm mt-2 mb-2 text-center font-semibold animate-pulse">
              {successMessage}
            </p>
          )}
          <button
            className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold p-3 mt-4 rounded-lg w-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Login" : "Sign Up"}
          </button>
          <p
            className="py-4 mt-4 text-center cursor-pointer text-white/80 hover:text-pink-400 transition-all duration-200 font-medium"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New here? Create an account"
              : "Already have an account? Login"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
