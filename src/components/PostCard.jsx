import React from "react";
import { Link } from "react-router-dom";
import  appwriteService  from "../appwrite/config"; // source of info
export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#0c0a09] p-3 border-2 border-[#525252] rounded-lg text-white font-poppins">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt=""
            className="object-cover size-32 w-full"
          />
        </div>
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
    </Link>
  );
}
