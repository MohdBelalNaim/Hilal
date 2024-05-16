import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ActivityCard from "../ActivityCard";

const Activities = () => {
  const [posts, setPosts] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  const {id} = useParams()

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${base}/repost/user-repost/${id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.posts);
    } 
    catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      {posts.map((post, index) => (
        <ActivityCard key={post._id} index={index} data={post} />
      ))}
    </>
  );
};

export default Activities;