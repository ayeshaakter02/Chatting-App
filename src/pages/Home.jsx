import React, { useEffect } from 'react'
import Userlist from '../components/Userlist'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userSigninInfo } from '../slices/userSlice';

const Home = () => {
  const navigate = useNavigate()
  const data = useSelector((state)=> state.userSignin.value);
  const auth = getAuth()
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
  if (user) {
    dispatch(userSigninInfo({
      name: user.displayName,
      email: user.email,
      uid: user.uid,
    }))
    //user is signed in
    // ...
  } else {
    dispatch(userSigninInfo(null))
    // User is signed out
    // ...
  }
});
  },[dispatch])

  // useEffect(() =>{
  //   if(!data){
  //     navigate("/signin",)
  //   }
  // } ,[]);
  return (
    <Userlist/>
  )
}

export default Home 