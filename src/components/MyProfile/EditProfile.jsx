import { loginUser } from "@/redux/userSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCamera, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import avatar from "../../assets/images/avatar.jpeg";
import { TailSpin } from "react-loader-spinner";

const EditProfile = ({ handler }) => {
  const { handleSubmit, register, setValue } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const base = useSelector((state) => state.userSlice.base_url);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const saveCover = async () => {
    const data = new FormData();
    data.append("file", coverPhoto);
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
      console.log(cloudData.url);

      return cloudData.url;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to save profile photo to Cloudinary
  const saveImage = async () => {
    const data = new FormData();
    data.append("file", profilePhoto);
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
      console.log(cloudData.url);

      return cloudData.url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Set form values from user data
    setValue("name", user.name);
    setValue("category", user.category);
    setValue("gender", user.gender);
    setValue("city", user.city);
    setValue("state", user.state);
    setValue("country", user.country);
    setValue("bio", user.bio);
  }, []);

  // Function to update user profile
  async function updateUser(data) {
    setLoading(true);
    data.profile_url = profilePhoto ? await saveImage() : user?.profile_url;
    data.cover_url = coverPhoto ? await saveCover() : user?.cover_url;
    fetch(`${base}/user/update`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handler(false);
        dispatch(loginUser());
        toast.success("Profile Updated Successfully");
        setLoading(false);
      })
      .then((data) => console.log(data));
  }

  // Lock body scroll when the component mounts
  useLockBodyScroll();

  return (
    <div className="fixed inset-0 glass z-50 grid place-items-center overflow-y-auto">
      <form
        onSubmit={handleSubmit(updateUser)}
        className="w-[min(540px,96%)] relative mt-5"
      >
        <div
          className="rounded-md overflow-hidden"
          style={{ borderRadius: "6px" }}
        >
          <div className="flex bg-white p-3 items-center gap-2">
            <BsX
              onClick={() => handler(false)}
              className="cursor-pointer"
              size={22}
            />{" "}
            Edit profile{" "}
          </div>
          <div className="relative">
            <div className="absolute z-50 inset-0 grid place-content-center text-white">
              <label htmlFor="cover">
                <div className="border border-white p-3 rounded-full">
                  <BsCamera size={18} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverPhoto(e.target.files[0])}
                  hidden
                  name=""
                  id="cover"
                />
              </label>
            </div>
            {coverPhoto ? (
              <img
                src={URL.createObjectURL(coverPhoto)}
                className="h-[200px] max-sm:h-[100px] w-full object-cover brightness-50"
                alt=""
              />
            ) : (
              <img
                src={user?.cover_url || "https://picsum.photos/400"}
                className="h-[200px] max-sm:h-[100px] w-full object-cover brightness-50"
                alt=""
              />
            )}
          </div>
          <div className="bg-white pt-16 max-sm:pt-8 relative p-4 grid gap-y-4">
            <div className="absolute -top-10 left-4 border-4 border-white rounded-full ">
              <label htmlFor="profile">
                <div className="inset-0 z-50 absolute grid place-items-center text-white">
                  <div className="p-2 border border-white rounded-full">
                    <BsCamera size={20} />
                  </div>
                </div>
                {profilePhoto ? (
                  <img
                    src={URL.createObjectURL(profilePhoto)}
                    className="size-24 rounded-full max-sm:size-16 brightness-50"
                    alt=""
                  />
                ) : (
                  <img
                    src={user?.profile_url ? user?.profile_url : avatar}
                    className="size-24 rounded-full max-sm:size-16 brightness-50"
                    alt=""
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                  hidden
                  accept="image/*"
                  id="profile"
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="Full name"
              className="p-2 border mt-3 rounded w-full max-sm:text-sm"
              {...register("name")}
            />
            <input
              type="text"
              placeholder="Category"
              className="p-2 border rounded w-full max-sm:text-sm"
              {...register("category")}
            />
            <input
              type="text"
              placeholder="Gender"
              className="p-2 border rounded w-full max-sm:text-sm"
              {...register("gender")}
            />
            <input
              type="text"
              placeholder="City"
              className="p-2 border rounded w-full max-sm:text-sm"
              {...register("city")}
            />
            <input
              type="text"
              placeholder="State"
              className="p-2 border rounded w-full max-sm:text-sm"
              {...register("state")}
            />
            <input
              type="text"
              placeholder="Country"
              className="p-2 border rounded w-full max-sm:text-sm"
              {...register("country")}
            />
            <input
              type="text"
              placeholder="Bio"
              className="p-2 border rounded w-full max-sm:text-sm"
              {...register("bio")}
            />
          </div>
          <div className="border-t p-2 bg-white flex justify-end">
            {loading ? (
              <button
                className="bg-black text-white text-sm px-3 py-1.5 rounded-full opacity-50 cursor-not-allowed"
                disabled
              >
                <TailSpin height={16} color="white" />
              </button>
            ) : (
              <button className="bg-black text-white text-sm px-3 py-1.5 rounded-full">
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
