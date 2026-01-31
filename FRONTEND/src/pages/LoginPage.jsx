import {  useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import {  loginUser } from "../store/auth/auth.slice.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

useEffect(() => {
  if(auth.isAuthenticated)
    navigate('/')
}, [auth.isAuthenticated])
  
   
  const handleLogin = async (e) => {
    e.preventDefault(); 
    const formData = {email,password}   
    dispatch(loginUser(formData))

  };


  return (
    <div className="min-h-screen max-w-2xl mx-auto flex items-center justify-center bg-gradient-to-b">
      <div className="bg-primary/10 backdrop-blur-sm border border-secondary/20 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-secondary/70">
          Welcome Back
        </h2>
        <p className="text-center text-secondary/60 mb-8 text-sm">
          Thanks For Joining <Link to="/" className="text-blue-600 font-semibold">PopLynk</Link>
        </p>

        <form onSubmit={(e)=>handleLogin(e)} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-secondary/70 placeholder-gray-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-secondary/70 placeholder-gray-400"
            required
          />

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Success */}
          {auth.isAuthenticated && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg">
              Login successful
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={auth.isLoading}
            className="flex justify-center items-center w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-secondary rounded-lg transition duration-200"
          >

            {auth.isLoading ? (
      <div className="w-6 h-6 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Links */}
        <p className="text-sm text-secondary/60 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
