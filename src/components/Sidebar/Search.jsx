import { setMenu } from "@/redux/searchSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();

  return (
    <div className="border-r">
      <div className="p-4 w-[320px] grid gap-y-4">
        <div
          onClick={() => dispatch(setMenu("All"))}
          className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
        >
          All
        </div>
        <div
          onClick={() => dispatch(setMenu("People"))}
          className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
        >
          People
        </div>

        <div
          onClick={() => dispatch(setMenu("Posts"))}
          className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
        >
          Posts
        </div>
        <div
          onClick={() => dispatch(setMenu("Videos"))}
          className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
        >
          Videos
        </div>
      </div>
    </div>
  );
};

export default Search;