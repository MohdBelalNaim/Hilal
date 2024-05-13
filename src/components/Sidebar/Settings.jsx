import React from "react";
import {
  BsBell,
  BsChatDots,
  BsHeart,
  BsKey,
  BsSearch,
  BsShield,
  BsTag,
  BsTrash,
  BsPower
} from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeMenu } from "../../redux/settingsSlice";

const Settings = () => {
  const menu = [
    {
      title: "Private account",
      icon: <BsShield />,
      action: "privacy",
    },
    {
      title: "Change password",
      icon: <BsKey />,
      action: "password",
    },
    {
      title: "Blocked accounts",
      icon: <MdBlock />,
      action: "blocked",
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      action: "notification",
    },
    {
      title: "Who can message you",
      icon: <BsChatDots />,
      action: "messages",
    },
    {
      title: "Likes, Replies and Reposts",
      icon: <BsHeart />,
      action: "activity",
    },
    {
      title: "Tags and Mentions",
      icon: <BsTag />,
      action: "tag",
    },
    {
      title: "Delete account",
      icon: <BsTrash />,
      action: "delete",
    },
    {
      title: "Logout",
      icon: <BsPower />,
      action:"logout"
    },
  ];

  const dispatch = useDispatch();
  const current = useSelector((state) => state.settingSlice.current);
  return (
    <div className="border-r">
      <div className="border-b p-4">
        <div className="flex items-center gap-2 border px-3 py-1.5 rounded-md">
          <BsSearch />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="p-4 w-[320px] grid gap-y-4">
        {menu.map((item) => {
          return (
            <div
              onClick={() => dispatch(changeMenu(item.action))}
              className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              {item.icon} {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
