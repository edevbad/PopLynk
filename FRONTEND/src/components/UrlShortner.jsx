import { useState } from "react";
import axios from "axios";

const UrlShortner = () => {
  const [value, setValue] = useState("");
  const [shortURL, setShortURL] = useState();

  const handleForm = (e) => {
    setValue(e.target.value);
  };

  const handleGenerateURL = async () => {
    try {
      const response = await axios.post(`https://poplynk-backend.onrender.com/create/`, {
        url: value,
      });
      console.log(response);
      setShortURL(response.data.id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCopy = () => {
    if (!shortURL) return;
    navigator.clipboard.writeText(shortURL);
    alert("Copied the text: " + shortURL);
  };

  return (
    <div className="flex flex-col justify-between text-[#213448] h-[300px] w-[90%] mx-auto bg-white rounded-3xl p-6 border border-black shadow-lg">
      <h4 className="text-3xl  font-bold text-gray-800 mb-8">
        Shrink your links, not your reach
      </h4>
      <h5 className="text-lg text-gray-600">
        Paste your long link here
      </h5>

      <input
        className="text-[18px] w-full px-4 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="https://www.example.com"
        name="url"
        value={value}
        onChange={handleForm}
      />

      <div className="flex items-center gap-3 mt-4">
        <button
          className="bg-[#213448] text-white rounded-lg py-2 px-5 transition hover:bg-[#2b4560] focus:ring-2 focus:ring-blue-300"
          onClick={handleGenerateURL}
        >
          Generate URL
        </button>

        {shortURL && (
          <div
            onClick={handleCopy}
            className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 text-blue-600"
          >
            {shortURL}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortner;
