import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store/auth/auth.slice.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      
      setLoading(false);
      if (response.status === 200) {
        const user = response.data.user;
        dispatch(authenticate(user));
        navigate({ to: "/" });
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.msg || "Login failed");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Thanks For Joining <Link to="/" className="text-blue-600 font-semibold">PopLynk</Link>
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
            disabled={loading}
            className="flex justify-center items-center w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
          >

            {loading ? (
      <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Links */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
