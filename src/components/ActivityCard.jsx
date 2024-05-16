import React, { useState } from "react";
import {
  BsBookmark,
  BsChat,
  BsExclamation,
  BsExclamationCircle,
  BsEye,
  BsHeart,
  BsLink,
  BsPerson,
  BsRepeat,
  BsShare,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { showDetails } from "../redux/toggleSlice";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import avatar from "../assets/images/avatar.jpeg";

const ActivityCard = ({ index, data, text }) => {
  const [options, setOptions] = useState(false);
  return (
    <>
      <div className="rounded-md overflow-hidden mb-5 relative" style={{ borderRadius: 10 + "px" }}>
        <div className="bg-white px-4 py-3 border-b text-[12px] text-gray-500">
          You reposted this post
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
        <div className="flex justify-between bg-white p-3">
            <div className="flex gap-3">
              <img
                src={data?.original_user?.profile_url ? data?.original_user?.profile_url : avatar}
                className="size-12 max-sm:size-10 rounded-full"
                alt=""
              />
              <div>
                <div className="text-sm max-sm:text-xs font-bold">
                  {data.original_user.name} 
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

            <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsRepeat />
              <div className="text-xs max-sm:text-[10px]">4.5M</div>
            </div>

             <div className="flex text-sm text-gray-500  items-center gap-2 max-sm:gap-1">
              <BsEye size={18} />
              <div className="text-xs max-sm:text-[11px]">{data?.views}</div>
            </div>

          </div>
          
          <BsShare className="max-sm:text-xs" />
        </div>
      </div>
    </>
  );
};

export default ActivityCard;



