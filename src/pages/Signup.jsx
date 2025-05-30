import React, { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from 'react-hot-toast';
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
 
const Signup = () => { 

  const auth = getAuth();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

const handleName = (e) => {
    setUserInfo((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setUserInfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const handlePassword = (e) =>{
    setUserInfo ((prev) => {
      return{...prev, password: e.target.value}
    })
  }

  const handleSignup = (e) => {
    e.preventDefault();
    if(!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.error("All fileds are required");
    }else if(
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)
    ) {
      toast.error("Invalid email address");
    } else {
      toast.success("Done");
      createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    if(errorCode.include("auth/email-already-in-use")){
      toast.error("Email already in use");
       setUserInfo({
        name: "",
        email: "",
        password: "",
       })
    }
  });
    }
  };

  return (
    <div className="flex min-h-full w-full flex-col justify-center bg-[url('images/Signup_image.jpg')] bg-cover bg-center bg-no-repeat py-47">
      <Toaster />
      <div className="container">
        <div>
          <h2 className="mt-10 ml-10 text-2xl/9 font-bold tracking-tight text-white">
            Sign up
          </h2>
          <div className="mt-10 sm:ml-10 sm:w-full sm:max-w-sm">
            <form onSubmit={handleSignup} className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm/6 font-medium text-white"
                >
                  User name
                </label>
                <div className="mt-2">
                  <input value={userInfo.name}
                    onChange={handleName}
                    type="text"
                    name="text"
                    id="text"
                    // autoComplete="text"
                    required=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input value={userInfo.email}
                    onChange={handleEmail}
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required=""
                    className="block rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-full sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-white hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
                </div>
                <div className="mt-2">
                  <input value={userInfo.password}
                   onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required=""
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-full sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-full"
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              <Link
                to={"/signin"}
                className="font-semibold text-white hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
