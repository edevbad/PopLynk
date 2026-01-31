import { useEffect } from "react";
import { isServerStillWarm, markServerReady } from "../utils/serverReady";
import axios from "axios";

const LoadingPage = ({ setLoading }) => {
  useEffect(() => {
    let isMounted = true;

    // ✅ If server was awake recently, skip waking screen
    if (isServerStillWarm()) {
      setLoading(false);
      return;
    }

    const wakeServer = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/health"
        );
        if (res.status === 200) {
          // mark backend as ready with timestamp
          markServerReady();
          if (isMounted) setLoading(false);
        }
      } catch (err) {
        console.error("Error waking server:", err);
        // optional: retry after delay
        if (isMounted) {
          setTimeout(wakeServer, 3000);
        }
      }
    };

    wakeServer();

    return () => {
      isMounted = false; // cleanup to prevent memory leaks
    };
  }, [setLoading]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-indigo ">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          {/* Simple spinner */}
          <svg
            className="animate-spin h-10 w-10 text-secondary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
        <h1 className="text-lg font-medium text-secondary/60">
          Waking up server...
        </h1>
        <p className="text-sm text-secondary/50">
          Please wait, this may take a few seconds.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
