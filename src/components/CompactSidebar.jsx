import React, { useEffect, useState } from "react";
import {
  BsBell,
  BsBookmark,
  BsChatDots,
  BsGear,
  BsHouse,
  BsPerson,
  BsPlus,
  BsSearch,
} from "react-icons/bs";

import { PiMosque } from "react-icons/pi";
import { LuMedal } from "react-icons/lu";
import logo from "../assets/images/logo.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCreate } from "../redux/toggleSlice";
import Settings from "./Sidebar/Settings";
import Home from "./Sidebar/Home";
import Notifications from "./Sidebar/Notifications";
import Explore from "../components/Sidebar/Explore";
import CreatePost from "./CreatePost";
import avatar from "../assets/images/avatar.jpeg";
import { loginUser } from "@/redux/userSlice";
import PostDetails from "./PostDetails";
import Search from "../components/Sidebar/Search"

const CompactSidebar = () => {
  const dispatch = useDispatch();
  const base = useSelector((state) => state.userSlice.base_url);
  const { pathname } = useLocation();
  const [explore, setExplore] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [settings, setSettings] = useState(false);
  const [home, setHome] = useState(false);
  const [search, setSearch] = useState(false)
  const navigate = useNavigate();
  const details = useSelector((state) => state.toggleSlice.details);
  function handleNotifications() {
    if (pathname == "/home") {
      setExplore(false);
      setHome(false);
      setNotifications(true);
      setSearch(false);
    } else {
      setExplore(false);
      setHome(false);
      setNotifications(!notifications);
      setSearch(false);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loginUser());
      fetch(`${base}/auth/my-id`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => localStorage.setItem("user", data.id));
    } else navigate("/");
  }, []);
  useEffect(() => {
    if (pathname == "/explore" && !notifications && !home) {
      setExplore(true);
    }
    if (
      pathname == "/home" ||
      pathname == "/profile" ||
      pathname == "/islam-section" ||
      pathname == "/my-profile" ||
      (pathname == "/messages" && !notifications && !explore)
    ) {
      setHome(true);
    }
    if (pathname == "/settings") {
      setSettings(true);
    }
    if (pathname == "/search") {
      setSearch(true);
    }
  }, [pathname]);

  const createPost = useSelector((state) => state.toggleSlice.createPost);
  const user = useSelector((state) => state.userSlice.user);

  return (
    <>
      {details && <PostDetails />}
      {createPost && <CreatePost />}
      <div className="max-sm:hidden fixed h-[100dvh] z-50 flex bg-white pb-4">
        <div
          className={`z-50 flex flex-col justify-between  bg-white ${
            !home && "border-r"
          }`}
        >
          <div className="mt-4">
            <div className="grid place-items-center">
              <img src={logo} className="size-10 rounded-full" alt="" />
            </div>
            <div className="grid gap-y-8 place-items-center px-6 mt-12">
              <Link to="/home">
                <BsHouse size={20} className="cursor-pointer" />
              </Link>
              <Link to="/explore">
                <BsSearch size={20} className="cursor-pointer" />
              </Link>
              <BsBell
                onClick={handleNotifications}
                size={20}
                className="cursor-pointer"
              />
              <Link to="/messages">
                <BsChatDots size={20} className="cursor-pointer" />
              </Link>
              <Link to="/saved">
                <BsBookmark size={20} className="cursor-pointer" />
              </Link>
              <Link to="/islam-section">
                <PiMosque size={20} className="cursor-pointer" />
              </Link>
              <Link to="/my-profile">
                <img
                  src={user?.profile_url ? user?.profile_url : avatar}
                  className="size-7 rounded-full"
                  alt=""
                />
              </Link>

              <div className="border bg-black text-white rounded-md">
                <BsPlus
                  onClick={() => dispatch(showCreate())}
                  size={24}
                  className="cursor-pointer"
                />
              </div>
              <Link to="/my-profile">
                <LuMedal size={20} className="cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="grid gap-y-6 px-6 mb-4">
            <Link to="/settings">
              {" "}
              <BsGear size={20} className="cursor-pointer" />
            </Link>
          </div>
        </div>
        {explore && <Explore />}
        {notifications && <Notifications />}
        {home && <Home notifications={handleNotifications} />}
        {settings && <Settings />}
        {search && <Search/>}
      </div>
    </>
  );
};

export default CompactSidebar;


