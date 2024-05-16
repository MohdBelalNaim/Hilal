import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";
import { TailSpin } from "react-loader-spinner";

const Posts = () => {
   const [searchResults, setSearchResults] = useState({ results: [], posts: [] });
  const base = useSelector((state) => state.userSlice.base_url);
  const [load,setLoad] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlKeyword = params.get("query");
    if (urlKeyword) {
      handleSearch(urlKeyword);
    }
  }, [location.search]);

  const handleSearch = async (keyword) => {
    try {
      const response = await fetch(`${base}/user/search/${keyword}`, {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error("Failed to search");
      }
      const data = await response.json();
      setSearchResults(data);
      setLoad(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <div className="font-bold text-xl mt-3 pb-5">Posts</div>
      {load ? (
        <>
          {searchResults.results.map((result, index) => (
            <div key={index}>
              <div className="mt-4">
                {result.posts.map((post, postIndex) => (
                  <PostCard key={postIndex} data={post} />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-4">
            {searchResults.posts.map((post, index) => (
              <PostCard key={index} data={post} />
            ))}
          </div>
          {searchResults.results.length === 0 && searchResults.posts.length === 0 && (
            <div className="h-[500px] grid font-bold place-items-center text-gray-500 text-center">
              No People found
            </div>
          )}
        </>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
    </div>
  );
};

export default Posts;
