import React, { useState } from "react";
import {
  BsExclamationCircle,
  BsHeart,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import avatar from "../assets/images/avatar.jpeg";
import { useSelector } from "react-redux";
const CommentCard = ({ id, data, load }) => {
  const [options, setOptions] = useState(false);
  const my = useSelector((state) => state.userSlice.user);
  const user = data?.user;
  const [hide, setHide] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);

  function deleteComment() {
    let confirmation = confirm("Are you sure you want to delete this comment?");
    if (confirmation) {
      fetch(`${base}/post/remove-comment/${id}`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({ comment: data?.text }),
      })
        .then((res) => res.json())
        .then((data) => setHide(true));
    }
  }
  return (
    <div className={`${hide && "hidden"} relative`}>
      {options && (
        <div
          className="border bg-white absolute right-4 shadow top-7"
          style={{ borderRadius: 6 + "px" }}
        >
          {data?.user?._id == my?._id && (
            <div
              onClick={deleteComment}
              className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2 border-b"
            >
              <BsTrash /> Delete
            </div>
          )}

          <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-xs p-2">
            <BsExclamationCircle /> Report
          </div>
        </div>
      )}
      <div className="py-2 px-4 mb-3">
        <div className="flex justify-between">
          <div className="flex gap-3 w-[80%]">
            <img
              src={user?.profile_url ? user?.profile_url : avatar}
              className="size-10 rounded-full"
              alt=""
            />
            <div>
              <div className="text-sm max-sm:text-xs">{user?.name}</div>
              <div className="text-xs text-gray-500">
                {user?.city}, {user?.state}, {user?.country}
              </div>
              <div className="text-xs text-gray-500">{user?.category}</div>
              <div className="text-xs mt-2">{data?.text}</div>
              <div className="flex items-center gap-12 max-sm:gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <BsHeart size={14} />

                  <span className="text-xs text-gray-500">0</span>
                </div>
                <div className="text-xs text-gray-500">Reply</div>
                <div className="text-xs text-gray-500">See replies</div>
              </div>
            </div>
          </div>
          <div className="text-gray-500 flex gap-2">
            <span className="text-xs"></span>{" "}
            <BsThreeDotsVertical
              className="cursor-pointer"
              onClick={() => setOptions(!options)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
