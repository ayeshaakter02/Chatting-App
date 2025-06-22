import React from "react";
import Userlist from "../components/Userlist";
import FriendRequestList from "../components/FriendRequestList";
import FriendList from "../components/FriendList";
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
    <div className="grid grid-cols-3 w-full h-[1000px]">
      <FriendRequestList />
      <Userlist />
      <FriendList/>  
    </div>
  );
};

export default Home;
