import React from "react";
import { BsPersonAdd } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";

const Notifications = () => {
  return (
    <div className="w-[min(560px,96%)] mx-auto bg-white">
      <div className="text-lg p-2 font-bold">Notifications</div>
      <div className="flex justify-between px-4 items-center border-b pb-4">
        <div className="flex text-sm mt-3 items-center gap-3 font-bold">
          <BsPersonAdd size={32} />
          Follow Requests
        </div>
        <div>
          <FaAngleRight />
        </div>
      </div>
      <div className="p-2 border-b">
        <div className="font-bold mb-4">Today</div>
        {"abcde".split("").map((item, index) => {
          return (
            <div className="flex justify-between mb-6">
              <div className="flex items-center text-sm gap-2">
                <img
                  src={`https://picsum.photos/400?${index}`}
                  className="size-10 rounded-full"
                  alt=""
                />
                <div>
                  <span className="font-bold">Sajad khaki</span> commented on a
                  post you're tagged in
                </div>
              </div>
              <img
                src={`https://picsum.photos/400?${index * 10}`}
                className="size-10 rounded-md"
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="p-2 border-b">
        <div className="font-bold mb-4">This week</div>
        {"abcde".split("").map((item, index) => {
          return (
            <div className="flex justify-between mb-6">
              <div className="flex items-center text-sm gap-2">
                <img
                  src={`https://picsum.photos/400?${index}`}
                  className="size-10 rounded-full"
                  alt=""
                />
                <div>
                  <span className="font-bold">Sajad khaki</span> commented on a
                  post you're tagged in
                </div>
              </div>
              <img
                src={`https://picsum.photos/400?${index * 10}`}
                className="size-10 rounded-md"
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="p-2 border-b">
        <div className="font-bold mb-4">Earlier</div>
        {"abcde".split("").map((item, index) => {
          return (
            <div className="flex justify-between mb-6">
              <div className="flex items-center text-sm gap-2">
                <img
                  src={`https://picsum.photos/400?${index}`}
                  className="size-10 rounded-full"
                  alt=""
                />
                <div>
                  <span className="font-bold">Sajad khaki</span> commented on a
                  post you're tagged in
                </div>
              </div>
              <img
                src={`https://picsum.photos/400?${index * 10}`}
                className="size-10 rounded-md"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
