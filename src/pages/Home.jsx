import React from "react";
import Userlist from "../components/Userlist";
import FriendRequestList from "../components/FriendRequestList";
import FriendList from "../components/FriendList";
import BlockList from "../components/Blocklist";
// import { useSelector } from 'react-redux'

const Home = () => {
  // const data = useSelector((state)=> state.userSignin.value)
  // console.log(data)

  // useEffect(() =>{
  //   if(!data){
  //     navigate("/signin",)
  //   }
  // } ,[]);
  return (
    <div className="grid h-[1000px] w-full grid-cols-3 mt-5 gap-2">
      <FriendList />
      <FriendRequestList />
      <Userlist />
      <BlockList />
    </div>
  );
};

export default Home;
