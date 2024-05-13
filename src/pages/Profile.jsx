import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import All from "../components/Profile/All";
import Images from "../components/Profile/Images";
import Articles from "../components/Profile/Videos";
import Activities from "../components/Profile/Activities";
import CompactSidebar from "../components/CompactSidebar";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/userSlice";
import { toast } from "sonner";
import avatar from "../assets/images/avatar.jpeg";
import FullScreenLoader from "@/components/FullScreenLoader";
import { TailSpin } from "react-loader-spinner";

const Profile = () => {
  const menu = {
    Home: <All />,
    Images: <Images />,
    Videos: <Articles />,
    Activities: <Activities />,
  };

  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [current, setCurrent] = useState("Home");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);

  function getDetails() {
    fetch(`${base}/user/by-id/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoad(true);
      })
      .catch((err) => alert(err));
  }
  useEffect(() => {
    if (id == my?._id) navigate(`/my-profile`);
    getDetails();
  }, []);

  function follow() {
    fetch(`${base}/user/follow/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      dispatch(loginUser());
      getDetails();
      toast.success("Started following " + user?.name);
    });
  }
  function unfollow() {
    fetch(`${base}/user/unfollow/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      dispatch(loginUser());
      getDetails();
      toast.success("Unfollowed " + user?.name);
    });
  }

  function gotochat() {
    navigate(`/chat/${id}`);
  }

  return (
    <>
      <CompactSidebar />
      {load ? (
        <>
          <div className="font-bold hidden max-sm:flex items-center gap-2 p-3">
            <BsArrowLeft onClick={() => navigate(-1)} /> Profile
          </div>
          <div className="w-[min(560px,98%)] mx-auto">
            <div className="">
              <div></div>
              <img
                src={
                  user?.cover_url
                    ? user?.cover_url
                    : "https://picsum.photos/800"
                }
                className="w-full h-[300px] max-sm:h-[140px] object-cover"
                alt=""
              />
            </div>
            <div className="flex items-start bg-white justify-between p-4 max-sm:p-2 max-sm:py-4">
              <div className="flex gap-3 items-start">
                <img
                  src={user?.profile_url || avatar}
                  className="size-14 rounded-full"
                  alt=""
                />
                <div className="grid gap-y-1">
                  <div className="font-bold text-sm">{user?.name} </div>
                  <div className="text-xs text-gray-500">
                    {user?.city}, {user?.state}, {user?.country} <br />
                    {user?.category}
                  </div>
                </div>
              </div>
            </div>
            {user?.bio && (
              <div className="max-sm:text-xs text-sm px-4 max-sm:px-2 pb-4 pt-1 bg-white text-gray-600">
                {user?.bio}
              </div>
            )}
            <div className="bg-white grid grid-cols-4 pb-4 max-sm:pt-4 max-sm:px-2.5">
              <div className="text-sm text-center pb-4 text-gray-500">
                <span className="font-bold text-black">
                  {user?.followers?.length}
                </span>{" "}
                <div>Followers</div>
              </div>
              <div className="text-sm text-center pb-4 text-gray-500">
                <span className="font-bold text-black">
                  {user?.following?.length}
                </span>{" "}
                <div>Following</div>
              </div>
              <div className="text-sm text-center pb-4 text-gray-500">
                <span className="font-bold text-black">688</span>{" "}
                <div>Posts</div>
              </div>
              <div className="text-sm text-center pb-4 text-gray-500">
                <span className="font-bold text-black">68.8K</span>{" "}
                <div>Likes</div>
              </div>
            </div>
            <div className="flex gap-3 bg-white px-3 pb-4 ">
              <button
                onClick={gotochat}
                className="primary border-primary rounded-full p-1.5 text-xs w-full"
              >
                Message
              </button>

              {user?.followers?.includes(my?._id) ? (
                <button
                  onClick={unfollow}
                  className="primary border-primary rounded-full p-1.5 text-xs w-full"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={follow}
                  className="primary border-primary rounded-full p-1.5 text-xs w-full"
                >
                  Follow
                </button>
              )}
            </div>

            <div className="border-t bg-white flex justify-evenly mb-3">
              {Object.keys(menu).map((item, index) => {
                return (
                  <div
                    onClick={() => setCurrent(item)}
                    className={`cursor-pointer text-sm max-sm:text-xs max-sm:p-2.5 p-3.5 ${
                      current == item && "active-menu"
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div>{menu[current]}</div>
          </div>
        </>
      ) : (
        <div className="h-[400px] grid place-items-center">
          <TailSpin height={52} color="dodgerblue" />
        </div>
      )}
    </>
  );
};

export default Profile;
