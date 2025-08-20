import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const UrlTable = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user-urls", {
          withCredentials: true,
        });        
        setUrls(res.data.urls); // expect [{id, originalUrl, shortUrl, clicks}, ...]
      } catch (err) {
        console.error("Error fetching URLs:", err);
      }
    };
    fetchUrls();
  }, []);

  return (
    <>
    <NavBar/>
    <div className="w-[95%] mx-auto mt-8  rounded-2xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Shortened Links</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Original URL</th>
              <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Short URL</th>
              <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Clicks</th>
              <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.length > 0 ? (
              urls.map((url) => (
                <tr key={url._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-sm text-gray-700 truncate max-w-xs">
                    <a href={url.redirect_URL} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {url.redirect_URL}
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-blue-600">
                    <a href={url.short_URL} target="_blank" rel="noreferrer" className="hover:underline">
                      http://localhost:3000/{url.short_URL}
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-center text-gray-800">{url.visits}</td>
                  <td className="py-3 px-4 border-b text-sm flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText("http://localhost:3000/"+url.shortUrl)}
                      className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => console.log("Delete", url.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No links created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default UrlTable;
