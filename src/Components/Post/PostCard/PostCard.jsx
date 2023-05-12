import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsDot, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
} from "../../../Config/Logic";

import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";
import CommentModal from "../../Comment/CommentModal";

import "./PostCard.css";

const PostCard = ({
  userProfileImage,
  username,
  location,
  postImage,
  createdAt,
  post,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const [numberOfLikes, setNumberOfLike] = useState(0);

  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleAddComment = () => {
    const data = {
      jwt: token,
      postId: post.id,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);
  };
  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = (postId) => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
    setNumberOfLike(post?.likedByUsers?.length);
  }, [user.reqUser, post]);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleWindowClick(event) {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };
  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };
  return (
    <div>
      <div className="flex flex-col items-center w-full border rounded-md">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={userProfileImage}
              alt=""
            />

            <div className="pl-2">
              <p className="font-semibold text-sm flex items-center">
                <span
                  onClick={() => handleNavigate(username)}
                  className="cursor-pointer"
                >
                  {username}
                </span>
                <span className="opacity-50 flex items-center">
                  {" "}
                  <BsDot />
                  {createdAt}
                </span>{" "}
              </p>
              <p className="font-thin text-sm">{location} </p>
            </div>
          </div>
          <div>
            <div className="dropdown">
              <BsThreeDots onClick={handleClick} className="dots" />
              {isOwnPost && (
                <div className="dropdown-content">
                  {showDropdown && (
                    <p
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"
                    >
                      Delete
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" w-full">
          <img className="w-full" src={postImage} alt="" />
        </div>
        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2 ">
            {isPostLiked ? (
              <AiFillHeart
                onClick={handleUnLikePost}
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleLikePost}
                className="text-2xl hover:opacity-50 cursor-pointer "
              />
            )}

            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={() => handleUnSavePost(post.id)}
                className="text-xl"
              />
            ) : (
              <BsBookmark
                onClick={() => handleSavePost(post.id)}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="w-full py-2 px-5">
          {numberOfLikes > 0 && (
            <p className="text-sm">{numberOfLikes} likes </p>
          )}
          {/* <div className="flex mt-3">
          <div className="mr-3">
            <img
              className="w-10 h-10 rounded-full"
              src={
                "https://cdn.pixabay.com/photo/2022/12/22/02/56/heron-7671357__340.jpg"
              }
              alt=""
            />
          </div>

          <div className="w-[90%]">
            <span className="font-semibold text-sm"> {username} </span>
            <span className="commentBox">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
              placeat facilis impedit, qui quia, aut velit ipsa, autem
              perspiciatis cumque et provident porro laboriosam eveniet quaerat
              quas aliquid eos maiores!
            </span>
          </div>
        </div> */}
          {post?.comments?.length > 0 && (
            <p
              onClick={handleOpenCommentModal}
              className="opacity-50 text-sm py-2 -z-0 cursor-pointer"
            >
              View all {post?.comments?.length} comments
            </p>
          )}
         
        </div>
        
        <div className="border border-t w-full">
          <div className="w-full flex items-center px-5">
             <BsEmojiSmile className=""/>
           <input
            onKeyPress={handleOnEnterPress}
            onChange={handleCommnetInputChange}
            className="commentInput"
            type="text"
            placeholder="Add a comment..."
          />
          </div>
         
        </div>
      </div>

      <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;
