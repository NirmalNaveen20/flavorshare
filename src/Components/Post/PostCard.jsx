import React, { useEffect, useState } from 'react'
import { BsThreeDots, BsBookmarkFill, BsBookmark, BsEmojiSmile } from 'react-icons/bs'
import "./PostCard.css"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import CommentModel from '../Comment/CommentModel'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { likePostAction, savePostAction, unLikePostAction, unSavePostAction } from '../../Redux/Post/Action'
import { isCommentLikedByUser, isSavePost } from '../../Config/Login'

const PostCard = ({post}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { user} = useSelector((store) => store);

    const data={jwt:token,postId:post?.id}
    const handleSavePost = () => {
        setIsSaved(true);
        dispatch(savePostAction(data))
    };
    const handleUnSavePost = () => {
        setIsSaved(false);
        dispatch(unSavePostAction(data))
    };
    const handlePostLike = () => {
        setIsPostLiked(true);
        dispatch(likePostAction(data))
    };
    const handlePostUnLike = () => {
        setIsPostLiked(false);
        dispatch(unLikePostAction(data))
    };
    const handleClick = () => {
        setShowDropDown(!showDropDown);
    };
    const handleOpenCommentModal = () => {
        onOpen()
    }

    useEffect(() => {
        setIsPostLiked(isCommentLikedByUser(post, user.reqUser?.id));
        setIsSaved(isSavePost(user.reqUser, post.id));
    },[post.likedByUsers,user.reqUser])

  return (
    <div>
        <div className='border rounded-md w-full'>
            <div className='flex justify-between items-center w-full py-4 px-5'> 
                <div className='flex items-center'>
                      <img className='h-12 w-12 rounded-full' src='https://cdn.pixabay.com/photo/2023/03/29/17/05/artisanal-food-7885997__340.jpg' alt='' />
                      <div className='pl-2'>
                          <p className='font-semibold text-sm'>username</p>
                          <p className='font-thin text-sm'>location</p>
                      </div>
                </div>
                
                  <div className='dropdown'>
                      <BsThreeDots className="dots" onClick={handleClick} />
                      <div  className='dropdown-content'>
                          { showDropDown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>Delete</p>}
                      </div>
                  </div>
                  
                  

              </div>
              
            <div className='w-full'>
                    <img src={post?.image} alt='' />
            </div>

              <div className='flex justify-between items-center w-full px-5 py-4'>
                  <div className='flex items-center space-x-2'>
                      {isPostLiked ? (
                          <AiFillHeart className="text-2xl hover:opacity-50 cursor-pointer text-red-600" onClick={handlePostUnLike} /> 
                      ): ( 
                          <AiOutlineHeart className="text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike} />
                      )}
                      <FaRegComment onClick={handleOpenCommentModal} className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                  </div>

                  <div className='cursor-pointer'>
                      {isSaved ? (
                          <BsBookmarkFill onClick={handleUnSavePost} className="text-xl hover:opacity-50 cursor-pointer" />
                      ) : (
                          <BsBookmark onClick={handleSavePost} className="text-xl hover:opacity-50 cursor-pointer" />
                          )}
                  </div>
              </div>

              <div className='w-full py-2 px-5'>
                  {post?.likedByUsers?.length > 0 && <p>{post?.likedByUsers?.length} likes</p>}
                  {post.comments.length > 0 && <p className='opacity-50 py-2 cursor-pointer'>View all {post?.comments?.length} comments</p>}
              </div>

              <div className='border border-t w-full'>
                  <div className='flex w-full items-center px-5'>
                      <BsEmojiSmile />
                      <input className='commentInput' type='text' placeholder='Add a comment...' />
                  </div>
              </div>
          </div>
          
          <CommentModel handlePostLike={handlePostLike} onClose={onClose} isOpen={isOpen} handleSavePost={handleSavePost} isPostLiked={isPostLiked} isSaved={isSaved}/>
    </div>
  )
}

export default PostCard