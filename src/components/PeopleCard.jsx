import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/userSlice";
import { toast } from "sonner";

const PeopleCard = ({ index, data }) => {
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);

  const dispatch = useDispatch();
  function follow(id) {
    fetch(`${base}/user/follow/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      dispatch(loginUser());

      toast.success("Started following " + data?.name);
    });
  }
  function unfollow(id) {
    fetch(`${base}/user/unfollow/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      dispatch(loginUser());

      toast.success("Unfollowed " + data?.name);
    });
  }
  return (
    <div className="flex justify-between items-center p-4 max-sm:p-2">
      <Link to={`/profile/${data?._id}`}>
        <div className="flex gap-2 items-center">
          <div className="bg-white rounded-full">
            <img
              src={data?.profile_url ? data?.profile_url : avatar}
              className="size-12 rounded-full max-sm:size-10 border"
              alt=""
            />
          </div>
          <div>
            {/* <div className="text-sm font-medium max-sm:text-xs">
              {data?.name}
            </div> */}
            <div className="text-sm font-medium max-sm:text-xs">
              {data?.name.length > 20
                ? data?.name.substring(0, 20) + "..."
                : data?.name}
            </div>

            <div className="text-xs text-gray-500">
              {data?.city + " ," + data?.state}
            </div>
            <div className="text-xs text-gray-500">{data?.category}</div>
          </div>
        </div>
      </Link>
      <div>
        {my?.following?.includes(data?._id) ? (
          <button
            onClick={() => unfollow(data?._id)}
            className="text-xs border px-4 rounded-full py-1.5  text-black border-black max-sm:px-2  max-sm:py-1"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => follow(data?._id)}
            className="text-xs border px-4 rounded-full py-1.5 bg-black text-white max-sm:px-2  max-sm:py-1"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
