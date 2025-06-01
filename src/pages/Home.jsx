import React from 'react'
import Userlist from '../components/Userlist'
import { useSelector } from 'react-redux'


const Home = () => {
  const data = useSelector((state)=> state).userSignin.value;
  console.log(data)

  return (
    <Userlist/>
  )
}

export default Home