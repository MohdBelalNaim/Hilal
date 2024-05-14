import { showCreate } from "@/redux/toggleSlice";
import React, { useEffect, useState } from "react";
import { BsBell, BsHouse, BsPlusCircleFill, BsSearch } from "react-icons/bs";
import { PiMosque } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNavbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (
      pathname == "/signup" ||
      pathname == "/signup/verification" ||
      pathname == "/signup/address" ||
      pathname == "/signup/bio" ||
      pathname == "/signup/photo" ||
      pathname == "/signup/final" ||
      pathname == "/" ||
      pathname.includes("/post-details/") ||
      pathname.includes("/chat/")
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);
  return (
    <div>
      {show && (
        <div
          className={`fixed py-4 shadow border-t justify-around bottom-0 z-30 bg-white w-full hidden max-sm:flex`}
        >
          <Link to="/home">
            <BsHouse size={20} />
          </Link>
          <Link to="/explore">
            <BsSearch size={20} />
          </Link>
          <BsPlusCircleFill size={26} onClick={() => dispatch(showCreate())} />
          <Link to="/islam-section">
            <PiMosque size={20} />
          </Link>
          <Link to="/notifications">
            <BsBell size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileBottomNavbar;
