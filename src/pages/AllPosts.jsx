import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
 useEffect(()=>{
  appwriteService.getPosts().then((posts) => {
    // console.log("posts ",posts)
    if (posts) {
      setPosts(posts.documents);
    }
  });

 },[])
 
  return (
    <div className="w-full py-3">
      <Container>
      <h2 className="text-white font-semibold text-2xl mb-3 mx-auto">All Posts</h2>

        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="">
                {/* <PostCard key={post.$id} post={post} /> explained in video */}
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
