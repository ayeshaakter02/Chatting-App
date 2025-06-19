import React from "react";
import Userlist from "../components/Userlist";
import FriendRequestList from "../components/FriendRequestList";
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
    <div className="flex gap-10">
      <FriendRequestList />
      <Userlist />      
    </div>
  );
};

export default Home;
