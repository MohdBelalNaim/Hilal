import CommentCard from "@/components/CommentCard";
import { useEffect, useState } from "react";

import CompactSidebar from "@/components/CompactSidebar";
import React from "react";
import {
  BsChat,
  BsHeart,
  BsHeartFill,
  BsRepeat,
  BsShare,
} from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import avatar from "../assets/images/avatar.jpeg";
import { RWebShare } from "react-web-share";
import FullScreenLoader from "@/components/FullScreenLoader";
import notify from "../../utils/sendNotification";

const PostDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState({});
  const base = useSelector((state) => state.userSlice.base_url);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const my = useSelector((state) => state.userSlice.user);
  const [loading, setLoading] = useState(false);

  const addComment = () => {
    fetch(`${base}/post/add-comment/${details._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        getdetails();
        notify(details?.user?._id, "comment", details?._id, base);
        setComment("");
      });
  };

  function getdetails() {
    setLoading(true);
    fetch(`${base}/post/post-by-id/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setDetails(data?.data);
        if (data?.data?.likes?.includes(my?._id)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        setLoading(false);
      });
  }

  function addLike() {
    setLiked(true);
    fetch(`${base}/post/add-like/${details?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Liked");
      });
  }

  function removeLike() {
    setLiked(false);
    fetch(`${base}/post/remove-like/${details?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Unliked"));
  }

  function viewupdate(){
    fetch(`${base}/post/update-views/${id}`,{
      method:"GET"
    })
    .then((res) => res.json())
    .then((data) => console.log(data.success));
  }

  useEffect(() => {
    viewupdate();
    getdetails();
  }, []);

  return (
    <div>
      {loading && <FullScreenLoader />}
      <CompactSidebar />
      <div className="h-[100%] w-[min(100%,660px)] mx-auto bg-white">
        <div className="flex items-start gap-4 p-4">
          <img
            src={
              details?.user?.profile_url ? details?.user?.profile_url : avatar
            }
            className="size-10 rounded-full"
            alt=""
          />
          <div className="text-sm max-sm:text-xs">
            <div className="font-medium">{details?.user?.name}</div>
            <div className="text-xs text-gray-600">
              {details?.user?.city}, {details?.user?.state},{" "}
              {details?.user?.country}
            </div>
            <div className="text-xs text-gray-600">
              {details?.user?.category}
            </div>
          </div>
        </div>
        {details?.text && (
          <div className="text-sm pb-3 px-4">
            <Markdown>{details?.text}</Markdown>
          </div>
        )}
        {details?.asset_url && (
          <div className="h-[500px] bg-black ">
            <img
              src={details?.asset_url}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        )}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-8">
            {!liked ? (
              <div
                onClick={addLike}
                className="flex text-[14px] items-center text-gray-600 gap-2"
              >
                <BsHeart className="text-xl" />
                <span>{details?.likes?.length}</span>
              </div>
            ) : (
              <div
                onClick={removeLike}
                className="flex text-[14px] items-center text-gray-600 gap-2"
              >
                <BsHeartFill className="text-xl text-red-500" />
                <span className="text-red-500">
                  {details?.likes?.length + 1}
                </span>
              </div>
            )}
            <div className="flex text-[14px] items-center text-gray-600 gap-2">
              <BsChat className="text-xl" />
              <span>{details?.comments?.length}</span>
            </div>
          </div>

          <RWebShare
            data={{
              text: "Share this post",
              url: "https://on.natgeo.com/2zHaNup",
              title: "Flamingos",
            }}
          >
            <BsShare className="text-xl" />
          </RWebShare>
        </div>
        <div className="font-bold p-3 text-sm border-b">
          Comments ({details?.comments?.length}){" "}
        </div>
        <div className="flex gap-2 p-3 items-center ">
          <img
            src={my?.profile_url ? my?.profile_url : avatar}
            className="size-8 rounded-full"
            alt=""
          />
          <input
            type="text"
            className="w-full border rounded-full px-3 py-2.5 text-sm max-sm:text-xs max-sm:py-2"
            placeholder={`Comment as ${my?.name}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />{" "}
          {comment && (
            <button
              onClick={addComment}
              className="text-white bg-blue-600 p-2 rounded-full"
            >
              <FaPaperPlane />
            </button>
          )}
        </div>
        <div className="border-t py-4">
          {details?.comments?.length > 0 ? (
            details?.comments.map((item, index) => {
              return <CommentCard id={id} data={item} index={index} />;
            })
          ) : (
            <div className="font-bold text-center py-24 text-gray-500">
              {" "}
              No comments yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
