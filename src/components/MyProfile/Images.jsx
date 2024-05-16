import { useParams } from "react-router-dom";
import { hideImageDetails, showImageDetails } from "@/redux/toggleSlice";
import React, { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard";

const Images = () => {
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const enlarge = useSelector((state) => state.toggleSlice.imageDetails);
  const Photo = useSelector((state) => state.toggleSlice.currentPhoto);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    fetch(`${base}/post/my-post`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setPosts(data?.found.filter((item) => item.post_type === "Media"))
      );
  }, [id]); 

  return (
    <>
      {enlarge && (
        <div className="glass inset-0 fixed grid place-items-center">
          <BsX
            onClick={() => dispatch(hideImageDetails())}
            className="absolute z-[99999] cursor-pointer text-white right-5 top-5"
            size={40}
          />
          {Photo && (
            <div className="w-[45%] bg-white" style={{ borderRadius: 8 + "px" }}>
              <PostCard key={Photo._id} data={Photo} />
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-4 gap-1 bg-white p-2">
        {posts.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => dispatch(showImageDetails(item))}
              className="grid place-items-center bg-black cursor-pointer h-[200px]"
            >
              <img src={item.asset_url} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Images;