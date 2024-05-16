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
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../redux/toggleSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import avatar from "../assets/images/avatar.jpeg";
import { PiPaperPlaneRight } from "react-icons/pi";
import { RWebShare } from "react-web-share";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaShare } from "react-icons/fa";
import { toast } from "sonner";

const RepostCard = ({ index, data }) => {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const createPost = useSelector((state) => state.toggleSlice.createPost);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [options, setOptions] = useState(false);
  const [likeVal, setLikeVal] = useState(data?.likes?.length);
  const [hide, setHide] = useState(false);

  const addComment = () => {
    fetch(`${base}/post/add-comment/${data._id}`, {
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
      });
  };
  
  function getdetails() {
    fetch(`${base}/post/post-by-id/${data?._id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(showDetails(data?.data));
        console.log(data?.data);
        setComment("");
      });
  }

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
  
  return (
    <>
      <div
        className=" mb-5 relative max-sm:mb-2"
        style={{ borderRadius: 10 + "px" }}
      >
      <div className={`${hide && "hidden"} relative`}>
        <div className="rounded-md overflow-hidden mb-5 relative" style={{ borderRadius: 10 + "px" }}>
        <div className="bg-white px-4 py-3 border-b text-[12px] text-gray-500">
           {data?.user?.name} reposted this post
        </div>
        {options && (
          <div className="bg-white absolute text-sm border shadow rounded-md right-2 top-14">
            <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
              <BsBookmark /> Save post
            </div>
            <div className="py-1.5 px-3 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ">
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
        {data?.original_user?.name && (
            <div className="flex justify-between bg-white p-3">
            <div className="flex gap-3">
              <img
                src={data?.original_user?.profile_url ? data?.original_user?.profile_url : avatar}
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
            
          <div className="flex text-xs items-center gap-3 text-gray-500">
            <span className="font-normal text-gray-600 text-xs">2d </span>
            <BsThreeDots
              onClick={() => setOptions(!options)}
              className="cursor-pointer max-sm:text-xs"
            />
          </div>
        </div>
        
        )}

        {data.text && (<div className="bg-white text-sm pb-2 px-4">
          <Markdown remarkPlugins={[remarkGfm]}>{data?.text}</Markdown>
        </div>)}

        {data.asset_url && ( <img
          src={data.asset_url}
          className="w-full h-[360px] object-cover cursor-pointer"
          alt=""
        />)}
        
        <div className="bg-white flex p-3 justify-between">
          <div className="flex gap-8 max-sm:gap-4">
              <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
                <BsHeart size={18} />
                <div className="text-xs max-sm:text-[11px]">
                  {data?.likes?.length}
                </div>
              </div>

            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsChat size={18} />
              <div className="text-xs max-sm:text-[10px]">
                {data?.comments?.length}
              </div>
            </div>


            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1"
            onClick={()=>repost(`${data?._id}`)}
            >
              <BsRepeat />
              <div className="text-xs max-sm:text-[10px]">{data?.reposts}</div>
            </div>

             <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsEye size={18} />
              <div className="text-xs max-sm:text-[11px]">{data?.views}</div>
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