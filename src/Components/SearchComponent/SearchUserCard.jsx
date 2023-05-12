import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchUserCard = ({username,image,setIsSearchVisible}) => {
  const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate(`/${username}`)
    setIsSearchVisible(false);
  }
  return (
    <div onClick={handleNavigate} className='py-2 cursor-pointer'>
         <div className="flex items-center ">
            <img
              className="w-10 h-10 rounded-full"
              src={image?image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt=""
            />
            <div className="ml-3">
              <p>{username}</p>
              <p className="opacity-70">{username}</p>
            </div>
          </div>
    </div>
  )
}

export default SearchUserCard