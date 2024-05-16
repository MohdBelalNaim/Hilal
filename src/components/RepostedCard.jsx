import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsChat,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsHeartFill,
  BsLink,
  BsPerson,
  BsShare,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import moment from "moment";

const RepostCard = ({ index, data }) => {
  console.log(data?.original_user);
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [liked, setLiked] = useState(false);
  const [options, setOptions] = useState(false);
  const [likeVal, setLikeVal] = useState(data?.likes?.length);
  const [hide, setHide] = useState(false);
  const [date, setDate] = useState([]);


  function addLike() {
    setLiked(true);
    fetch(`${base}/post/add-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(true);
      });
  }

  function removeLike() {
    setLiked(false);
    fetch(`${base}/post/remove-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(false);
      });
  }

  function savePost() {
    fetch(`${base}/post-save/save/${data?._id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(JSON.stringify(data));
        setOptions(false);
      })
      .catch((err) => {
        res.json({ error: "Something went wrong!" });
        console.log(err);
      });
  }

  async function copyToClipboard() {
    const textToCopy = `${base}/post-details/${data?._id}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }


  useEffect(() => {
    if (data?.likes?.includes(my?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, []);

  useEffect(() => {
    setDate(moment(data?.date).fromNow());
  }, []);

  return (
    <>
      <div
        className=" mb-5 relative max-sm:mb-2"
        style={{ borderRadius: 10 + "px" }}
      >
        <div className={`${hide && "hidden"} relative`}>
          <div
            className="rounded-md overflow-hidden mb-5 relative"
            style={{ borderRadius: 10 + "px" }}
          >
            <div className="bg-white px-4 py-3 border-b text-[12px] text-gray-500">
              {data?.user?.name} reposted this post
            </div>
            {options && (
              <div className="bg-white absolute text-sm border shadow rounded-md right-2 top-14">
                <div
                    onClick={savePost}
                    className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                  >
                    <BsBookmark /> Save post
                  </div>
                <div
                    onClick={copyToClipboard}
                    className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                  >
                    <BsLink /> Copy link
                  </div>
                <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <BsExclamationCircle /> Report
                </div>
                <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <BsPerson /> Follow user
                </div>
                <div
                  onClick={() => setOptions(!options)}
                  className="py-1.5 px-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                >
                  <BsX /> Close
                </div>
              </div>
            )}

            <div className="flex justify-between bg-white p-3">
              <Link to={`/profile/${data?.original_user?._id}`}>
              <div className="flex gap-3">
                <img
                  src={
                    data?.original_user?.profile_url
                      ? data?.original_user?.profile_url
                      : avatar
                  }
                  className="size-12 max-sm:size-10 rounded-full"
                  alt=""
                />
                <div>
                  <div className="text-sm max-sm:text-xs font-bold">
                    {data?.original_user?.name}
                  </div>
                  <div className="text-xs max-sm:text-[11px] text-gray-500">
                    {data.user.city}, {data.user.state}, {data.user.country}
                  </div>
                  <div className="text-xs max-sm:text-[11px] text-gray-500">
                    {data.user.category}
                  </div>
                </div>
              </div>
              </Link>

              <div className="flex text-xs items-center gap-3 text-gray-500">
                <span className="font-normal text-gray-600 text-xs">2d </span>
                <BsThreeDots
                  onClick={() => setOptions(!options)}
                  className="cursor-pointer max-sm:text-xs"
                />
              </div>
            </div>

            {data?.text && (
            <Link to={`/post-details/${data?._id}`}>
              <div className="bg-white text-sm pb-2 px-4">
                <Markdown remarkPlugins={[remarkGfm]}>{data?.text}</Markdown>
              </div>
            </Link>
          )}

          {data?.asset_url && (
            <Link to={`/post-details/${data?._id}`}>
              <img
                src={data?.asset_url}
                className="w-full max-sm:h-[300px] h-[360px] object-cover cursor-pointer"
                alt=""
              />
            </Link>
          )}

            <div className="bg-white flex p-3 justify-between">
              <div className="flex gap-8 max-sm:gap-4">
                {liked ? (
                <div
                  onClick={removeLike}
                  className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
                >
                  <BsHeartFill size={18} className="text-red-500" />

                  <div className="text-xs max-sm:text-[11px]">
                    {likeVal + 1}
                  </div>
                </div>
              ) : (
                <div
                  onClick={addLike}
                  className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
                >
                  <BsHeart size={18} />
                  <div className="text-xs max-sm:text-[11px]">
                    {data?.likes?.length}
                  </div>
                </div>
              )}

                <Link to={`/post-details/${data?._id}`}>
                <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                  <BsChat size={18} />
                  <div className="text-xs max-sm:text-[10px]">
                    {data?.comments?.length}
                  </div>
                </div>
              </Link>

                <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                  <BsEye size={18} />
                  <div className="text-xs max-sm:text-[11px]">
                    {data?.views}
                  </div>
                </div>
              </div>
              <BsShare className="max-sm:text-xs" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepostCard;
