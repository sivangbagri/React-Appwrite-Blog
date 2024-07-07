import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";
import service from "../appwrite/config";
import appwriteService from "../appwrite/config";
export default function HistoryPage() {
  const [cache, setCache] = useState({});

  const getBlogFromSlug = useCallback(
    async (slug) => {
      if (cache[slug]) {
        return cache[slug];
      }
      const blog = await appwriteService.getPost(slug);
      if (blog) {
        const featuredImage = appwriteService.getFilePreview(
          blog.featuredImage
        );
        const blogData = {
          title: blog.title,
          slug: blog.$id,
          content:blog.content,
          image: featuredImage,
          timeAdded: Date.now(),
          author: blog.author,
        };
        setCache((prevCache) => ({ ...prevCache, [slug]: blogData }));
        return blogData;
      }
    },
    [cache]
  );
  const [history, setHistory] = useState([]);
  const initialiseHistory = async (db_history) => {
    const parsed_history = db_history.map((ele) => JSON.parse(ele));
    const historyToSet = [];
    for (const ele of parsed_history) {
      const obj = await getBlogFromSlug(ele.slug);
      historyToSet.push({ ...obj });
    }
    setHistory(historyToSet);
  };

  const getHistory = async () => {
    const current_user = await authService.getCurrentUser();
    const db_history = await service.getUserData(current_user.$id, "history");
    await initialiseHistory(db_history);
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <div className="mx-20">
        <h1 className="text-white font-poppins text-2xl font-semibold mb-7">Your Reading history</h1>
        {history?.map((item, index) => {
          return (
            
            <Link to={`/post/${item.slug}`} key={index}>
              <div className="hover:drop-shadow-lg p-2 my-2 bg-black text-white h-auto overflow-y-scroll flex drop-shadow-md rounded-md ">
                <div className="  w-auto mr-2  ">
                  <img
                    src={item.image}
                    className="w-44 h-36  object-cover rounded-md "
                  />
                </div>
                <div className=" ml-5 w-4/5">
                  <div className="flex justify-between">
                    <p className="text-semibold text-xl font-medium flex items-center">
                      {item.title}{" "}
                      <span className="text-xs font-extralight ml-2">
                        {item.author}
                      </span>
                    </p>
                  </div>
                  <p
                    className="text-lg  flex items-start "
                    style={{ fontSize: "10px" }}
                  >
                    {item.content}
                  </p>

                  <p
                    className=" text-gray-500 flex justify-end "
                    style={{ fontSize: "10px" }}
                  >
                    {item.timeAdded}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
