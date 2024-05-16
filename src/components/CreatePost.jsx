import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  BsAspectRatio,
  BsImage,
  BsSquare,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { hideCreate } from "../redux/toggleSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import avatar from "../assets/images/avatar.jpeg";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/crop";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { toast } from "sonner";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import { TailSpin } from "react-loader-spinner";
const CreatePost = () => {
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(null);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.userSlice.user);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [aspect, setAspect] = useState(1 / 1);
  const [aspectMenu, setAspectMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef("");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  function handleChange() {
    setText(editorRef.current.getMarkdown());
    console.log(editorRef.current.getMarkdown());
  }

  const handelSave = useCallback(async () => {
    try {
      const { file } = await getCroppedImg(
        URL.createObjectURL(uploadImage),
        croppedAreaPixels,
        rotation
      );
      await savePost(file);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, uploadImage]);

  const saveImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hilal_link");
    data.append("cloud_name", "myimagestorage");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/myimagestorage/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      return cloudData.url;
    } catch (error) {
      console.log(error);
    }
  };

  const base = useSelector((state) => state.userSlice.base_url);
  async function savePost(imgfile) {
    if (text == "" && uploadImage == "") {
      toast.error("Post cannot be empty!");
      return;
    }
    setLoading(true);
    await fetch(`${base}/post/create`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text,
        post_type: uploadImage ? "Media" : "Text",
        asset_url: await saveImage(imgfile),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          dispatch(hideCreate());
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      });
  }

  useLockBodyScroll();
  const cropperRef = useRef();

  function changeAspectRatio(newaspect) {
    setAspect(newaspect);
    setAspectMenu(false);
  }

  return (
    <div className="inset-0 fixed glass grid place-items-center z-50">
      <div className="w-[min(600px,96%)] bg-white rounded-2xl">
        <div className="border-b relative text-center primary text-lg p-3 flex items-center justify-center max-sm:text-sm">
          Create a new post{" "}
          <BsX
            className="absolute right-5 cursor-pointer"
            size={22}
            onClick={() => dispatch(hideCreate())}
          />{" "}
        </div>
        <div className="p-4 relative">
          <div className="flex items-center gap-3">
            <img
              src={user?.profile_url ? user.profile_url : avatar}
              className="size-16 rounded-full"
              alt=""
            />
            <div>
              <div className="font-medium max-sm:text-sm">{user?.name}</div>
              <select
                name=""
                id=""
                className="text-xs mt-2 bg-blue-100 text-blue-500 py-1 px-3 rounded-full max-sm:text-[10px] max-sm:px-2"
              >
                <option value="">Post to everyone</option>
                <option value="">My follower</option>
                <option value="">My following</option>
              </select>
            </div>
          </div>
          <MDXEditor
            onChange={handleChange}
            ref={editorRef}
            markdown=""
            placeholder="Bismillah! What's on your mind, write here.."
            className="mt-4 mb-12"
          />
          {/* <textarea
            placeholder="Bismillah! What's on your mind, write here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            name=""
            id=""
            className="w-full outline-none text-lg mt-5 max-sm:text-sm z-50"
            cols="30"
            rows="3"
            maxLength={250}
          ></textarea> */}

          <div className={`${uploadImage && "h-[300px]"} relative mt-3`}>
            {uploadImage && (
              <>
                <button
                  className="absolute z-50 bg-white rounded-full top-2 left-2 cursor-pointer"
                  onClick={() => setUploadImage("")}
                >
                  <BsX size={20} />
                </button>
                <div
                  onClick={() => setAspectMenu(!aspectMenu)}
                  className="w-max cursor-pointer bg-gray-200 p-2 rounded-full z-50 absolute bottom-2 left-2"
                >
                  <BsAspectRatio />
                </div>
                {aspectMenu && (
                  <div className="absolute overflow-hidden bg-white z-50 bottom-11 left-2 rounded overfolow-hidden">
                    <div
                      onClick={() => changeAspectRatio(1 / 1)}
                      className="hover:bg-gray-200 cursor-pointer px-2 border-b w-[80px] py-2 flex items-center justify-between"
                    >
                      1:1 <BsSquare size={16} />{" "}
                    </div>
                    <div
                      onClick={() => changeAspectRatio(4 / 5)}
                      className="hover:bg-gray-200 cursor-pointer px-2 border-b w-[80px] py-2 flex items-center justify-between"
                    >
                      4:5 <LuRectangleVertical size={20} />
                    </div>
                    <div
                      onClick={() => changeAspectRatio(16 / 9)}
                      className="hover:bg-gray-200 cursor-pointer px-2 border-b w-[80px] py-2 flex items-center justify-between"
                    >
                      16:9 <LuRectangleHorizontal size={20} />
                    </div>
                  </div>
                )}
                <Cropper
                  image={URL.createObjectURL(uploadImage)}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </>
            )}
          </div>
        </div>
        {/* <button
          style={{
            display:
              uploadImage === null || croppedImage !== null ? "none" : "block",
          }}
          onClick={showCroppedImage}
        >
          Crop
        </button> */}

        <div className="border-t flex items-center justify-between p-4">
          <div className="flex text-lg items-center gap-3 text-gray-500">
            <span className="text-sm">Add</span>
            <label>
              <BsImage className="text-blue-500" />
              <input
                type="file"
                id="post"
                hidden
                accept="image/*"
                onChange={(e) => setUploadImage(e.target.files[0])}
              />
            </label>
            <BsThreeDots className="text-blue-500" />
          </div>
          <div className="flex items-center gap-4">
            {loading ? (
              <button
                onClick={savePost}
                className="bg-primary text-sm w-max py-1 rounded-full max-sm:text-xs opacity-55 cursor-not-allowed"
                disabled
              >
                <TailSpin height={20} color="white" />
              </button>
            ) : (
              <button
                onClick={handelSave}
                className="bg-primary text-sm py-1 px-4 rounded-full max-sm:text-xs"
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
