import React, { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([
    {
      originalUrl: "https://www.google.com",
      shortenedUrl: "https://short.url/abc123",
    },
    {
      originalUrl: "https://www.facebook.com",
      shortenedUrl: "https://short.url/def456",
    },
    {
      originalUrl: "https://www.twitter.com",
      shortenedUrl: "https://short.url/ghi789",
    },
  ]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement URL shortening logic here and update the history state
    // For demonstration purposes, let's assume the shortened URL is generated
    // and added to the history array.
    const url = "https://short-url-u3cm.onrender.com/url";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          url: url,
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.log("Error while shortening url ", error);
      return;
    }

    const data = await response.json();
    console.log(data);
    setHistory([{ originalUrl: url, shortenedUrl: data.shortId }, ...history]);
    setUrl("");
    setIsLoading(false);

    // Set this History in local storage
    localStorage.setItem("history", JSON.stringify(history));
  };

  const handleCopy = (text) => {
    // Implement copy to clipboard logic here
    // For demonstration purposes, let's log the copied text.
    console.log(`Copied: ${text}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">URL Shortener</h1>
      <form className="mb-4 flex">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded w-full"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className={`px-4  w-28 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2 ${
            isLoading && "cursor-not-allowed"
          } `}
          onClick={handleShorten}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin  h-5 w-5 text-white inline-block"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Shorten"
          )}
        </button>
      </form>
      <div className="mt-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-300"
          >
            <div>
              <p className="text-blue-500 font-bold">{item.originalUrl}</p>
              <p className="text-gray-600">{item.shortenedUrl}</p>
            </div>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
              onClick={() => handleCopy(item.shortenedUrl)}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
