import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FiCopy, FiLink } from "react-icons/fi";
import Loader from "./Loader";
import {toast} from "react-hot-toast"

const UrlShortner = () => {
  const [shortURL, setShortURL] = useState(null);
  const [Error, setError] = useState(null);
  const authSlice = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleGenerateURL = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/create",
        {
          url: data.url,
          slug: data.slug,
        },
        { withCredentials: true }
      );
      
      setShortURL(response.data.id);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  const onSubmit = async (data) => {
    await handleGenerateURL(data);
  };

  const handleCopy = () => {
    if (!shortURL) return;
    navigator.clipboard.writeText(shortURL);
    toast.success("Copied to Clipboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[100%] max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col gap-6"
    >
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
          <FiLink className="w-5 h-5 text-indigo-600" />
          Shorten your link
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Paste a long URL and get a short one instantly 🚀
        </p>
      </div>

      {/* URL input */}
      <div className="flex flex-col gap-1">
        <input
          type="url"
          placeholder="https://www.example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm"
          {...register("url", { required: true })}
        />
        {errors.url && (
          <span className="text-xs text-red-600">URL is required</span>
        )}
      </div>

      {/* Custom Slug Input (if logged in) */}
      {authSlice.isAuthenticated && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Custom short link (optional)
          </label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
            <span className="bg-gray-100 text-gray-600 px-3 py-2 text-sm whitespace-nowrap">
              {'/'}
            </span>
            <input
              type="text"
              placeholder="your-alias"
              className="flex-1 px-3 py-2 outline-none text-sm"
              {...register("slug")}
            />
          </div>
          <p className="text-xs text-gray-500">
            Leave blank to generate a random short link.
          </p>
        </div>
      )}

      {/* Error */}
      {Error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {Error}
        </div>
      )}

      {/* Submit + Output */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white font-medium rounded-lg py-2 px-6 transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 w-full sm:w-auto"
        >
          {isSubmitting ? 
      <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          : "Generate"}
        </button>

        {shortURL && (
          <div
            onClick={handleCopy}
            className="flex items-center gap-2 cursor-pointer bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-medium truncate w-full sm:w-auto transition"
          >
            <span className="truncate">{shortURL}</span>
            <FiCopy className="w-4 h-4" />
          </div>
        )}
      </div>
    </form>
  );
};

export default UrlShortner;
