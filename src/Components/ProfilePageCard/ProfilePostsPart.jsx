import React, { useEffect, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { GrTable } from "react-icons/gr";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { BiBookmark, BiUserPin } from "react-icons/bi";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction, savePostAction } from "../../Redux/Post/Action";
// import {reqUserPostAction} from "../../Redux/Post/Action.js"

const ProfilePostsPart = ({user}) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { post} = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable className="text-xs" />,
      activeTab: "",
    },
    { tab: "Reels", icon: <RiVideoLine className="text-xs" />, activeTab: "" },
    { tab: "Saved", icon: <BiBookmark className="text-xs" />, activeTab: "" },
    {
      tab: "Tagged",
      icon: <AiOutlineUser className="text-xs" />,
      activeTab: "",
    },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
  }, [user,post.createdPost]);



  return (
    <div className="">
      <div className="flex space-x-14 border-t relative ">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              item.tab === activeTab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>

            <p className="ml-1 text-xs">{item.tab} </p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {post.reqUserPost?.length > 0 &&
            activeTab==="Post"? post.reqUserPost?.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            )):activeTab==="Saved"?user?.savedPost?.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            )):
            ""}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsPart;
