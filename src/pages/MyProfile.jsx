import React, { useEffect, useState } from "react";
import All from "../components/MyProfile/All";
import Images from "../components/MyProfile/Images";
import Articles from "../components/Profile/Videos";
import Activities from "../components/MyProfile/Activities";
import CompactSidebar from "../components/CompactSidebar";
import EditProfile from "../components/MyProfile/EditProfile";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import avatar from "../assets/images/avatar.png";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const menu = {
    Home: <All />,
    Images: <Images />,
    Videos: <Articles />,
    Activities: <Activities />,
  };
  const [current, setCurrent] = useState("Home");
  const user = useSelector((state) => state.userSlice.user);
  
  return (
    <>
      {edit && <EditProfile handler={setEdit} />}
      <CompactSidebar />
      <div className="font-bold hidden max-sm:flex items-center gap-2 p-3">
        <BsArrowLeft onClick={() => navigate(-1)} /> Profile
      </div>
      <div className="w-[min(560px,98%)] mx-auto">
            <div className="">
              <div></div>
              <img
                src={
                  user?.cover_url ? user?.cover_url : "https://picsum.photos/800"
                }
                className="w-full h-[300px] max-sm:h-[140px] object-cover"
                alt=""
              />
            </div>

            <div className="bg-white relative py-4 flex justify-end px-4">
              <img
                src={user?.profile_url ? user?.profile_url : avatar}
                className="rounded-full size-[100px] absolute -top-12 left-4"
                alt=""
              />
              <div className="gap-2 flex items-start max-sm:hidden">
                <button
                  onClick={() => navigate("/verification/home")}
                  className="border-primary primary px-3 text-xs rounded-full py-1.5"
                >
                  Get verified
                </button>

                <button
                  onClick={() => setEdit(true)}
                  className="border-primary primary px-3 text-xs rounded-full py-1.5"
                >
                  Edit profile
                </button>
              </div>
            </div>
            <div className="bg-white px-4 pt-3">
              <div className="font-bold text-sm">{user?.name} </div>
              <div className="text-xs text-gray-500">
                <div className="flex gap-1 items-center">
                  <div>{user?.city}</div>
                  <div>{", " + user?.state}</div>
                  <div>{", " + user?.country}</div>
                </div>
                {user?.category}
              </div>
            </div>

            {user?.bio && (
              <div className="text-xs px-4 max-sm:px-2 pb-4 pt-4 bg-white text-gray-600">
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
                  {" "}
                  {user?.following?.length}
                </span>{" "}
                <div>Following</div>
              </div>
              <div className="text-sm text-center pb-4 text-gray-500">
                <span className="font-bold text-black">0</span> <div>Posts</div>
              </div>
              <div className="text-sm text-center pb-4 text-gray-500">
                <span className="font-bold text-black">0</span> <div>Likes</div>
              </div>
            </div>
            <div className="border-t bg-white flex justify-evenly mb-3">
              {Object.keys(menu).map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setCurrent(item)}
                    className={`cursor-pointer text-sm max-sm:text-xs max-sm:p-2.5 p-3.5 ${
                      current === item && "active-menu  "
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
  );
};

export default MyProfile;








