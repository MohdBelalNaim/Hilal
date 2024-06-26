import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsChat,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsHeartFill,
  BsLink,
  BsPen,
  BsPerson,
  BsRepeat,
  BsShare,
  BsThreeDots,
  BsTrash,
  BsX,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import avatar from "../assets/images/avatar.jpeg";
import { RWebShare } from "react-web-share";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
import { toast } from "sonner";
import notify from "../../utils/sendNotification";
const PostCard = ({ data }) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const createPost = useSelector((state) => state.toggleSlice.createPost);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [options, setOptions] = useState(false);
  const [likeVal, setLikeVal] = useState(data?.likes?.length);
  const [hide, setHide] = useState(false);


  function addLike() {
    setLiked(true);
    fetch(`${base}/post/add-like/${data?._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((mydata) => {
        setLiked(true);
        notify(data?.user?._id, "Like", data?._id, base);
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


  function deletePost(id) {
  let confirmation = confirm("Are you sure you want to delete this Post?");
  if (confirmation) {
    fetch(`${base}/post/delete/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>{ 
        toast.success("Post deleted successfully"),
        setHide(true)
      });

  async function copyToClipboard() {
    const textToCopy = `${base}/post-details/${data?._id}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }

  }

  function deletePost(id) {
    setHide(true);
    let confirmation = confirm("Are you sure you want to delete this Post?");
    if (confirmation) {
      fetch(`${base}/post/delete/${id}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    }
  }

  const repost = (id) => {
    fetch(`${base}/repost/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Post reposted successfully");
      })
      .catch((error) => {
        toast.error(error)
      });
  };

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
          {options && (
            <div
              className="bg-white overflow-hidden z-[99] absolute text-sm border shadow rounded-md right-2 top-14"
              style={{ borderRadius: 10 + "px" }}
            >
              {data?.user?._id == my?._id ? (
                <>
                  <Link to={`/edit/${data?._id}`}>
                    <div
                      className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                      // onClick={() => editPost(data?._id)}
                    >
                      <BsPen /> Edit post
                    </div>
                  </Link>

                  <div
                    className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                    onClick={() => deletePost(data?._id)}
                  >
                    <BsTrash /> Delete post
                  </div>
                  <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                    <BsShare /> Share post
                  </div>
                </>
              ) : (
                <>
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
                  <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                    <BsExclamationCircle /> Report
                  </div>
                  <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                    <MdBlock /> Block user
                  </div>
                  <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                    <BsPerson /> Follow user
                  </div>
                </>
              )}

              <div
                onClick={() => setOptions(!options)}
                className="py-1.5 max-sm:text-xs px-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
              >
                <BsX /> Close
              </div>
            </div>
          )}

          <div
            className="flex justify-between bg-white p-3"
            style={{ borderRadius: 8 + "px" }}
          >

            {data?.user?._id == my?._id ? (
              <>
                <Link to={`/edit/${data?._id}`}>
                <div 
                  className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                >
                  <BsPen /> Edit post
                </div>
                </Link>
                
                <div 
                  className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 "
                  onClick={() => deletePost(data?._id)}
                >
                  <BsTrash /> Delete post
                </div>
                <div className="py-1.5 max-sm:text-xs px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
                  <BsShare /> Share post

                </div>
              </div>
            </Link>
            <div className="flex text-xs items-center gap-3 text-gray-500">
              {/* 6 Jan 2022{" "} */}
              <span className="font-normal text-gray-600 text-xs">{date} </span>
              <BsThreeDots
                onClick={() => setOptions(!options)}
                className="cursor-pointer max-sm:text-xs"
              />
            </div>
          </div>

        
            <div className="flex justify-between bg-white p-3 "  style={{ borderRadius: 10 + "px" }}>
            <div className="flex gap-3">

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
              <div>
                <div className="text-sm max-sm:text-xs font-bold">
                  {data?.user?.name} 
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data.user.city}, {data.user.state}, {data.user.country}
                </div>
                <div className="text-xs max-sm:text-[11px] text-gray-500">
                  {data.user.category}
                </div>
              </div>
            </div>
          <div className="flex text-xs items-center gap-3 text-gray-500">
            <span className="font-normal text-gray-600 text-xs">2d </span>
            <BsThreeDots
              onClick={() => setOptions(!options)}
              className="cursor-pointer max-sm:text-xs"
            />
          </div>
        </div>
        
      

        {data.text && (<div className="bg-white text-sm pb-2 px-4">
          <Markdown remarkPlugins={[remarkGfm]}>{data?.text}</Markdown>
        </div>)}

        {data.asset_url && ( <img
          src={data.asset_url}
          className="w-full h-[360px] object-cover cursor-pointer"
          alt=""
        />)}

            </Link>
          )}

          <div className="bg-white flex p-3 justify-between card-bottom">
            <div className="flex gap-8 max-sm:gap-6">
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

              {/* <Link to={`/repost/${data?._id}`}> */}
              <div className="flex text-sm text-gray-500 items-center gap-2 max-sm:gap-1 cursor-pointer">
                <BsRepeat size={18} />
                <div className="text-xs max-sm:text-[11px]">0</div>
              </div>
              {/* </Link> */}

              <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                <BsEye size={18} />

                <div className="text-xs max-sm:text-[11px]">{data?.views}</div>
              </div>

            </Link>
            
            {/* <Link to={`/repost/${data?._id}`}>  */}
            <div  className="flex text-sm text-gray-500 items-center gap-2 max-sm:gap-1 cursor-pointer"
              onClick={() => repost(data?._id)}
            >
              <BsRepeat size={18} />
              <div className="text-xs max-sm:text-[11px]">0</div>
            </div>
            {/* </Link>  */}
            

            <div
             className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
            >
              <BsEye size={18} />
              <div className="text-xs max-sm:text-[11px]">{data?.views}</div>
            </div>

            </div>

            <RWebShare
              data={{
                text: "Check this post on HilalLink",
                url: "https://hilal-one.vercel.app",
                title: "Share this post",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <BsShare className="max-sm:text-xs" />
            </RWebShare>

          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
