import React, { useEffect, useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.jpeg";

const Notifications = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [notifications, setNotifications] = useState([]);
  const types = {
    Like: "liked your post",
    comment: "commented on your post",
    repost: "reposted your post",
  };
  useEffect(() => {
    fetch(`${base}/notification/my`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNotifications(data.data);
      });
  }, []);
  return (
    <div className="w-[390px] overflow-scroll animate__animated animate__fadeIn">
      <div className="text-lg p-4 font-bold">Notifications</div>
      <div className="flex justify-between px-4 items-center border-b pb-4">
        <div className="flex text-[16px] items-center gap-3 font-bold">
          <BsPersonAdd size={32} />
          Follow Requests
        </div>
        <div>
          <FaAngleRight />
        </div>
      </div>
      <div className="p-4">
        {notifications.length > 0 ? (
          notifications.map((item, index) => {
            console.log(item);
            return (
              <div className="flex justify-between mb-6 gap-3">
                <div className="flex items-center text-sm gap-2">
                  <img
                    src={item?.from?.profile_url || avatar}
                    className="size-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <span className="font-bold">{item?.from?.name}</span>{" "}
                    {types[item?.type]}
                  </div>
                </div>
                {item?.content?.asset_url && (
                  <img
                    src={item?.content?.asset_url}
                    className="size-10 rounded-md"
                    alt=""
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center grid place-items-center h-[calc(100vh-300px)] font-bold text-gray-500 text-lg">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
