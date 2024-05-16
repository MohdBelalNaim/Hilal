import { showCreate } from "@/redux/toggleSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ notifications }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-[200px] border-r">
      <div className="text-lg px-4 py-5 font-bold">HilalLink</div>
      <div className="mt-9 grid gap-y-6">
        <Link to="/home">
          <div>Home</div>
        </Link>
        <Link to="/explore">
          <div>Explore</div>
        </Link>
        <div className="mt-1.5 cursor-pointer" onClick={() => notifications()}>
          Notifications
        </div>
        <Link to="/messages">
          <div className="mt-1.5">Messages</div>
        </Link>
        <Link to="/saved">
          <div className="mt-1">Saved posts</div>
        </Link>
        <Link to="/islam-section">
          <div className="">My islam</div>
        </Link>
        <Link to="/my-profile">
          <div className="mt-2.5">Profile</div>
        </Link>

        <div
          className="mt-2.5 cursor-pointer"
          onClick={() => dispatch(showCreate())}
        >
          Create post
        </div>
        <div className="mt-1.5 cursor-pointer" onClick={() => alert("Hemlo")}>
          Analytics and Rewards
        </div>
      </div>
    </div>
  );
};

export default Home;
