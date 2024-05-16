import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/images/avatar.jpeg";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import CompactSidebar from "./CompactSidebar";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { BsX } from "react-icons/bs";

const EditPost = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.userSlice.user);
    const base = useSelector((state) => state.userSlice.base_url);
    const [post, setPost] = useState(null);
    const [text, setText] = useState("");
    const [uploadImage, setUploadImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${base}/post/post-by-id/${id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setPost(data.data);
                    setText(data.data.text);
                    setUploadImage(data.data.asset_url);
                } else {
                    console.error("Data is not in the expected format:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });
    }, [base, id]);

    const handleChange = (markdown) => {
        if (markdown.length <= 200) {
            setText(markdown);
        }
    };

    const editPost = () => {
        fetch(`${base}/post/edit/${id}`, {
            method: "POST",
            headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
                "content-type": "application/json",
            },
            body: JSON.stringify({ text }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.success);
                } else {
                    navigate("/home");
                }
            });
    };

    return (
        <div className="h-[140dvh]">
            <CompactSidebar />
            {post && (
                <div className=" grid place-items-center">
                    <div className="w-[min(600px,96%)] bg-white max-sm:w-[min(400px,100%)] ">
                        <div className="border-b relative text-center primary text-lg p-3 flex items-center justify-center max-sm:text-sm">
                            Edit your post{" "}
                            <Link to="/home">
                                <BsX className="absolute right-5 cursor-pointer" size={22} />{" "}
                            </Link>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex p-3">
                                <img
                                    src={user?.profile_url ? user.profile_url : avatar}
                                    className="size-12 max-sm:size-10 rounded-full" alt=""
                                />
                                <span className="ml-2 mt-3">{user.name}</span>
                            </div>
                        </div>
                        <div className="grid place-items-start gap-2 mb-5">
                            <div className=" relative">
                                <MDXEditor
                                    onChange={handleChange}
                                    markdown={text}
                                    placeholder="Bismillah! What's on your mind, write here.."
                                    readOnly={text.length >= 200} 
                                    className="mt-4 mb-12"
                                />
                                <div className="my-3 ml-3 max-sm:text-sm text-gray-400">
                                    Characters: {text.length}/200
                                </div>
                                <img src={uploadImage} alt="" />
                                <button
                                    onClick={editPost}
                                    className="ml-3 bg-primary mt-2 text-sm py-2 px-4 rounded-full max-sm:text-xs"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPost;

