import React, { useEffect, useMemo, useRef, useState } from "react";
import CompactSidebar from "../components/CompactSidebar";
import { LuSend } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpeg";
import { io } from "socket.io-client";

const Chat = () => {
  const { id } = useParams();
  const base = useSelector((state) => state.userSlice.base_url);
  const my = useSelector((state) => state.userSlice.user);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const messageEndRef = useRef(null);
  const socket = useMemo(() => {
    return io(base);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add-user", id);
    });
    socket.on("msg-recieve", (msg) => {
      console.log(JSON.stringify(msg));
      let newMessage = {
        content: msg.message,
        from: msg.from,
        to: msg.to,
      };
      setMessages([...messages, newMessage]);
    });
  }, []);

  function getCurrentUser() {
    fetch(`${base}/user/by-id/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }

  function sendMessage() {
    let newMessage = {
      content: text,
      from: my?._id,
      to: id,
    };
    socket.emit("send-msg", {
      to: id,
      from: my?._id,
      message: text,
    });
    setMessages([...messages, newMessage]);
    fetch(`${base}/message/send/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.er);
        }
      });
    setText("");
  }
  useEffect(() => {
    fetch(`${base}/message/by-chat/${id}`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.found) setMessages(data.found);
      });
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
                  {item?.content}
                </div>
              </div>
            ) : (
              <div className="flex justify-start w-full px-2">
                <div
                  className="bg-gray-400 text-sm text-white max-w-[300px] break-words p-2 mt-2"
                  style={{ borderRadius: 10 + "px" }}
                >
                  {item?.content}
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef}></div>
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
