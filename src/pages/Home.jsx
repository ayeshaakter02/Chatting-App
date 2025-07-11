import React from "react";
import Userlist from "../components/Userlist";
import FriendRequestList from "../components/FriendRequestList";
import FriendList from "../components/FriendList";
import BlockList from "../components/Blocklist";
import Homebar from "../components/Homebar";
// import { useSelector } from 'react-redux'

const Home = () => {
  return (
    <>
      <div className="mt-10 w-full xl:gap-2 xl:grid xl:grid-cols-2 hidden">
        <FriendList />
        <FriendRequestList />
        <Userlist />
        <BlockList />
      </div>
      <div className="xl:hidden ">
        <FriendList />
      </div>
    </>
  );
};

export default Home;
