import React from "react";
import { useNavigate } from "react-router-dom";
import {  BsPower } from "react-icons/bs";

const Logout = () => {

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="h-[100dvh] py-12 max-sm:px-4">
      {/* {loading && (
        <div className="fixed inset-0 glass z-50 grid place-items-center">
          <TailSpin height={42} color="dodgerblue" />
        </div>
      )} */}
      <div className="text-xl font-bold">Logout</div>
      <div className="text-gray-600 mt-2">
        Once you logout, you have to enter you email and password to login again.
      </div>
       <div
        className="flex items-center text-lg font-bold mt-5"
        onClick={logout}
    >
        <BsPower className="mr-1" /> Logout
    </div>
      
    </div>
    
  );
};

export default Logout;