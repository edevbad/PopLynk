import { useEffect, useState } from "react";
import axios from "axios";
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

      <div className="w-[95%] min-h-screen max-w-2xl mx-auto my-10 bg-primary/20 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-secondary/20">
        <h2 className="text-2xl font-semibold mb-6 text-secondary/70 flex items-center gap-2">
           Analytics
        </h2>
    {loading ? (<Loader/>):
        (urls.length === 0 ? (
          <p className="text-secondary/50 text-center py-10">No links created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-primary border-b border-secondary/10 text-secondary/60 text-sm uppercase">
                  <th className="px-4 py-3">Original URL</th>
                  <th className="px-4 py-3">Short Link</th>
                  <th className="px-4 py-3 text-center">Clicks</th>
                  <th className="px-4 py-3 text-center">Created</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {urls
                  .slice()
                  .reverse()
                  .map((url) => (
                    <tr
                      key={url._id}
                      className="border-b border-secondary/10 transition text-sm"
                    >
                      <td className="px-4 py-3 max-w-xs truncate">
                        <a
                          href={url.redirect_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary/80 hover:underline"
                        >
                          {url.redirect_URL}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          onClick={() => handleCopy(url.short_URL)}
                          className="cursor-pointer text-secondary/80 hover:underline"
                        >
                          {import.meta.env.VITE_BACKEND_URL +
                            "/" +
                            url.short_URL}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                          {url.visits}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-secondary/50">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
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
