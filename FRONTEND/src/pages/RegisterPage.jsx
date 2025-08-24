import { useState } from "react";
import { Link,redirect,useNavigate } from "@tanstack/react-router";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useDispatch } from "react-redux"; 
import { authenticate } from "../store/auth/auth.slice.js";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password doesnot Match!");
        setLoading(false)
        return
      }
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/auth/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      },{withCredentials:true});
      if(response.status === 201){
        const user = response.data.user;
        dispatch(authenticate(user));
        toast.success("Account created successfully 🎉");
        setLoading(false);
        navigate({ to: "/" });
      }
    } catch (error) {
      setLoading(false);
toast.error(error.response.data.msg)   
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Join <Link to="/" className="text-blue-600 font-semibold">PopLynk</Link> and start shrinking links today.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            required
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? 
      <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
            :
            "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
