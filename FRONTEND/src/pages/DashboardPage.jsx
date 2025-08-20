import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import ConfirmDialog from "../components/ConfirmDialog";
import Loader from '../components/Loader'
import {toast} from 'react-hot-toast'

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUrlId, setSelectedUrlId] = useState(false);

  const fetchUrls = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/urls", {
        withCredentials: true,
      });
      setUrls(res.data.urls);
    } catch (error) {
      toast.error("Failed to fetch links ❌");
      console.error("Error fetching URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (short) => {
    const fullLink = import.meta.env.VITE_BACKEND_URL + "/" + short;
    navigator.clipboard.writeText(fullLink);
    toast.success("Copied to clipboard 📋");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/urls/${id}`, {
        withCredentials: true,
      });
      setUrls((prev) => prev.filter((url) => url._id !== id));
      toast.success("Link deleted ✅");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);



  return (
    <>
    <NavBar />

      <div className="w-[95%] max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
           My Links
        </h2>
    {loading ? (<Loader/>):
        (urls.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No links created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase">
                  <th className="px-4 py-3 border-b">Original URL</th>
                  <th className="px-4 py-3 border-b">Short Link</th>
                  <th className="px-4 py-3 border-b text-center">Clicks</th>
                  <th className="px-4 py-3 border-b text-center">Created</th>
                  <th className="px-4 py-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {urls
                  .slice()
                  .reverse()
                  .map((url) => (
                    <tr
                      key={url._id}
                      className="hover:bg-gray-50 transition text-sm"
                    >
                      <td className="px-4 py-3 border-b max-w-xs truncate">
                        <a
                          href={url.redirect_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          {url.redirect_URL}
                        </a>
                      </td>
                      <td className="px-4 py-3 border-b">
                        <span
                          onClick={() => handleCopy(url.short_URL)}
                          className="cursor-pointer text-indigo-600 hover:underline"
                        >
                          {import.meta.env.VITE_BACKEND_URL +
                            "/" +
                            url.short_URL}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b text-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                          {url.visits}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b text-center text-gray-500">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 border-b text-center">
                        <button
                          onClick={() => {
                            setSelectedUrlId(url._id);
                            setDialogOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Global confirm dialog */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this link? This action cannot be undone."
        onConfirm={() => {
          if (selectedUrlId) {
            handleDelete(selectedUrlId);
          }
          setDialogOpen(false);
        }}
        onCancel={() => setDialogOpen(false)}
      />
    </>
  );
};

export default DashboardPage;
