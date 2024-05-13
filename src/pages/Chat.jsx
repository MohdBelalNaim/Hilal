import React, { useEffect, useState } from "react";
import CompactSidebar from "../components/CompactSidebar";
import { LuSend } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
const Chat = () => {
  const { id } = useParams();
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([
    {
      text: "Hi how are you",
      from: "78560fh7ct9w8mu4594",
    },
    {
      text: "I'm fine thanks",
      from: "66389140e6822bed87a6d47d",
    },
  ]);

  function getCurrentUser() {
    fetch(`${base}/user/by-id/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }
  function sendMessage() {
    let newMessage = {
      text,
      from: my?._id,
    };
    setMessages([...messages, newMessage]);
    setText("");
  }
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="h-[100dvh]">
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto h-[100dvh] bg-white ">
        <div className="flex items-center gap-4 p-4 border-b">
          <img
            src={currentUser?.profile_url || avatar}
            className="size-8 rounded-full"
            alt=""
          />
          <div className="font-medium">{currentUser.name}</div>
        </div>
        <div className="h-[calc(92dvh-55px)] overflow-scroll no-scrollbar">
          {messages.map((item, index) => {
            return item?.from == my?._id ? (
              <div className="flex justify-end w-full px-2">
                <div
                  className="bg-blue-500 text-sm text-white max-w-[300px] break-words p-2 mt-2"
                  style={{ borderRadius: 10 + "px" }}
                >
                  {item?.text}
                </div>
              </div>
            ) : (
              <div className="flex justify-start w-full px-2">
                <div
                  className="bg-gray-400 text-sm text-white max-w-[300px] break-words p-2 mt-2"
                  style={{ borderRadius: 10 + "px" }}
                >
                  {item?.text}
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-[calc(9dvh-32px)] border-t flex px-4 py-2 items-center gap-4">
          <input
            type="text"
            placeholder="Type message here"
            className=" border w-full py-2 px-4 rounded-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <button
              onClick={sendMessage}
              className="bg-primary p-2 rounded-full"
            >
              <LuSend size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
