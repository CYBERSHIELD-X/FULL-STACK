import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>All Posts</h1>
      {posts.map(p => (
        <PostCard key={p._id} post={p}/>
      ))}
    </div>
  );
}

export default Home;
