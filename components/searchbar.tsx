"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

export const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.in") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert("Please provide a valid amazon link");
    }

    try {
      setLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};
