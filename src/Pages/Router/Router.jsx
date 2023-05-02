import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import { Auth } from "../Auth/Auth";

const Routers = () => {
  const location =useLocation();
  return (
    <div>
      {/* <div className="flex ">
      <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>
      
      <div className="w-[80%] ">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/p/:postId" element={<HomePage />}></Route>
          <Route path="/:username" element={<Profile />}></Route>
          <Route path="/demo" element={<StoryPage />}></Route>
          <Route path="/story/:userId" element={<Story />}></Route>
          <Route path="/account/edit" element={<EditProfilePage />}></Route>
        </Routes>
      </div>
    </div>
     */}

{(location.pathname !== "/login" && location.pathname!=="/signup")&& (
    <div className="flex">
      <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/p/:postId" element={<HomePage />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/story/:userId" element={<Story />} />
        </Routes>
      </div>
    </div>
  )}
  {(location.pathname === "/login" || location.pathname==="/signup") && (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
