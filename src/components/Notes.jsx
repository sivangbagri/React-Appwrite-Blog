import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { AiOutlineToTop } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleShow } from "../store/showSlice";
import authService from "../appwrite/auth";

export default function Notes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const notesContainerRef = useRef();
  const pathname = location.pathname;
  const current_slug = location.pathname.substring(
    pathname.lastIndexOf("/") + 1
  );

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    const current_user = await authService.getCurrentUser();
    const blog = await appwriteService.getPost(current_slug);
    if (blog) {
      const featuredImage = appwriteService.getFilePreview(blog.featuredImage);

      appwriteService.createUserData(current_user.$id, {
        slug: current_slug,
        lineData: note,
      });
      const xyz=await appwriteService.getUserData(current_user.$id,"lines");
      console.log("lines extracted  ",xyz);
      // setNotes([
      //   ...notes,
      //   {
      //     title: blog.title,
      //     slug: blog.$id,
      //     text: note,
      //     image: featuredImage,
      //     timeAdded: Date.now(),
      //     author: blog.author,
      //   },
      // ]);

      setNote("");
    }
  };

  function timeAgo(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return "just now";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }

  useEffect(() => {
    const saved_notes = JSON.parse(localStorage.getItem("notes"));
    if (saved_notes && saved_notes.length > 0) {
      setNotes(saved_notes);
    }
    console.log("yes");
  }, []);
  useEffect(() => {
    scrollToBottom();

    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function scrollToBottom() {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop =
        notesContainerRef.current.scrollHeight;
    }
  }
  function scrollToTop() {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = 0;
    }
  }
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <>
      {authStatus && (
        <div
          className="font-poppins bg-white top-14 right-auto md:right-20 p-4 max-h-96 6 w-[500px] rounded-lg transition-all duration-300 drop-shadow-md fixed z-50 dark:bg-secondary-dark-bg dark:text-white overflow-y-scroll scroll-smooth"
          ref={notesContainerRef}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-xl font-semibold text-black ">
                Your Special Lines
              </p>
              <p className="text-xs font-medium text-gray-400 ">
                {" "}
                Add your lines here
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                dispatch(toggleShow());
              }}
              style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />{" "}
            </button>
          </div>
          <div>
            {notes?.map((item, index) => {
              return (
                <Link to={`/post/${item.slug}`} key={index}>
                  <div className="hover:drop-shadow-lg p-2 my-2 bg-white h-auto overflow-y-scroll flex drop-shadow-md rounded-md ">
                    <div className="  w-auto mr-2  ">
                      <img
                        src={item.image}
                        className=" size-10  object-cover rounded-full "
                      />
                    </div>
                    <div className="text-black w-4/5">
                      <div className="flex justify-between">
                        <p className="text-semibold text-sm font-medium flex items-center">
                          {item.title}{" "}
                          <span className="text-xs font-extralight ml-2">
                            {item.author}
                          </span>
                        </p>
                      </div>
                      <p
                        className=" font-xs text-gray-400 flex items-start "
                        style={{ fontSize: "10px" }}
                      >
                        {item.text}
                      </p>

                      <p
                        className=" text-gray-500 flex justify-end "
                        style={{ fontSize: "10px" }}
                      >
                        {timeAgo(item.timeAdded)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <form onSubmit={handleForm}>
            <div className="flex bottom-0 mt-4 text-black bg-white ">
              <input
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                placeholder="Whats next ?"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 "
              />
              <button
                type="button"
                onClick={scrollToTop}
                className={`text-black mb-3 p-2 text-2xl fixed z-20 right-5  ont-thin rounded-md hover:opacity-75`}
              >
                <AiOutlineToTop />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
