import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdTrendingUp } from "react-icons/md";
import PeopleCard from "../components/PeopleCard";
import PostDetails from "../components/PostDetails";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import CompactSidebar from "../components/CompactSidebar";
import MobileNavbar from "@/components/MobileNavbar";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RepostCard from "@/components/RepostedCard";

const Home = () => {
  const base = useSelector((state) => state.userSlice.base_url);
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${base}/user/top-users`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTrending(data.found));

    getAllPosts();
  }, []);

  function getAllPosts() {
    setLoading(true);
    fetch(`${base}/post/all`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPosts(data.data);
      });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`);
  };

  return (
    <>
      <div className="hidden max-sm:block">
        <MobileNavbar />
      </div>
      <div className="grid grid-cols-[0.2fr,0.5fr,0.3fr] max-sm:grid-cols-1">
        <div className="h-[100dvh] max-sm:hidden">
          <CompactSidebar />
        </div>
        <div className="h-[100dvh] overflow-scroll scrollbar-hide pt-4">
          <div className="w-[min(560px,98%)] mx-auto">
            {loading ? (
              <div className="h-[400px] grid place-items-center">
                <TailSpin height={52} color="dodgerblue" />
              </div>
            ) : (
              <div>
              {posts.map((item, index) => (
                item.original_user ? <RepostCard key={index} data={item} /> : <PostCard data={item} key={index} />
              ))}
              
              </div>
            )}
            
          </div>
        </div>
        <div className="max-sm:hidden">
          <div className="w-[min(380px,98%)] h-[100dvh] overflow-scroll scrollbar-hide">
            <form onSubmit={handleSearchSubmit}>
              <div className="bg-white flex py-2 pl-4 pr-2 rounded-full items-center mt-5">
                <input
                  type="text"
                  className="w-full px-2 outline-none"
                  placeholder="Search here..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-full"
                  >
                    <BsSearch />
                  </button>
                )}
              </div>
            </form>
            <div className="rounded-md mt-5">
              <div className="flex p-3 items-center gap-2 text-sm">
                <div className="bg-gray-100 p-2 rounded-full">
                  <MdTrendingUp />
                </div>
                Trending users
              </div>
              {trending && (
                <div>
                  {trending.map((item, index) => {
                    return <PeopleCard data={item} index={index} />;
                  })}
                </div>
              )}
              <Link to="/all-people">
                <div className="primary px-5 pb-4">See all</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
