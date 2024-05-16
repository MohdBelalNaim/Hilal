import React, { useState, useEffect } from "react";
import PeopleCard from "../../components/PeopleCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const Final = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const base = useSelector((state) => state.userSlice.base_url);

  const Login = () => {
    setLoading(true);
    const accessId = localStorage.getItem("accessId");
    fetch(`${base}/auth/final/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ accessId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          setLoading(false);
        } else {
          localStorage.clear();
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const accessId = localStorage.getItem("accessId");
    const address= localStorage.getItem("address");
    const bio= localStorage.getItem("bio");
    const verification = localStorage.getItem("verification");
    const photo = localStorage.getItem("photo");
    if(!accessId){
      navigate("/signup");
    }
    if(!address){
      navigate("/signup/address");
    }
    if(!bio){
      navigate("/signup/bio");
    }
    if(!verification){
      navigate("/signup/verification");
    }
    if(!photo){
      navigate("/signup/photo");
    }

    const fetchUsers = async () => {
      try {
        const accessId = localStorage.getItem("accessId");
        const response = await fetch(`${base}/signup/all-user`);
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.users.filter(user => user.accessId !== accessId);
          setUserData(filteredUsers);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    

    fetchUsers();
  }, []);

  return (
    <div className="w-[min(480px,96%)] mx-auto pt-12 h-[100dvh]">
      <div className="text-xl font-medium max-sm:text-lg">
        People you may follow
      </div>
      <div className="bg-white border rounded mt-4">
        {userData.map((data, index) => (
          <PeopleCard key={index} data={data} />
        ))}
        <div className="px-6 mt-4 mb-4">
          <button className="bg-primary w-full p-2 rounded-full text-sm">
            Follow all
          </button>

          <button
              disabled={loading}
              className={`w-full mt-1 p-2 rounded-full text-sm ${
                loading ? "bg-blue-200" : "bg-light"
              } grid place-items-center w-full disabled:cursor-not-allowed`}
              onClick={() => Login()}
            >
              {loading ? (
                <TailSpin height={20} width={20} color="white" />
              ) : (
                "Skip and Continue"
              )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Final;