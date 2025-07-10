import React, { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { app, auth } from "../firebase.config";
import { getDatabase, ref, set } from "firebase/database";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const db = getDatabase();
  const navigate = useNavigate();

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

  const handlePassword = (e) => {
    setUserInfo((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.error("All fileds are required");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
      toast.error("Invalid email address");
    } else {
      toast.success("Done");
      createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: userInfo.name,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                const user = userCredential.user;

                set(ref(db, "userslist/" + user.uid), {
                  name:user.displayName,
                  email: user.email,
                }).then(() => {
                  navigate("/signin")
                }).catch((error) => {
                console.log(error);
              })
              
              })
              .catch((error) => {
                // An error occurred
                // ...
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          if (errorCode.include("auth/email-already-in-use")) {
            toast.error("Email already in use");
            setUserInfo({
              name: "",
              email: "",
              password: "",
            });
          }
        });
    }
  };

  return (
    <div className="font-[--font-Roboto] flex min-h-full w-screen sm:w-full flex-col justify-center bg-[url('../images/Signup_image.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      <Toaster />
      <div className="xl:w-[1300px] mx-auto">
        <div className="w-80 sm:w-130 py-5 sm:py-1 lg:py-20 px-5 sm:pl-8 backdrop-blur-xl">
          <h2 className="mt-2 lg:mt-10 ml-10 text-xl lg:text-2xl/9 font-bold tracking-tight text-white">
            Sign up
          </h2>
          <div className="mt-2.5 lg:mt-10 sm:ml-10 sm:w-full sm:max-w-sm">
            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-1 md:space-y-6" method="POST">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm/6 font-medium text-white"
                >
                  User name
                </label>
                <div className="md:mt-2">
                  <input
                    value={userInfo.name}
                    onChange={handleName}
                    type="text"
                    name="text"
                    id="text"
                    // autoComplete="text"
                    required=""
                    className="block w-70 sm:w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                <div className="md:mt-2">
                  <input
                    value={userInfo.email}
                    onChange={handleEmail}
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required=""
                    className="block rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 w-70 sm:w-full sm:text-sm/6"
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
                </div>
                <div className="md:mt-2">
                  <input
                    value={userInfo.password}
                    onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required=""
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 w-70 sm:w-full sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-full mt-2"
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="md:mt-10 sm:text-center text-sm/6 font-semibold text-gray-900">
              Have an account yet?
              <Link
                to={"/signin"}
                className="ml-2 font-semibold text-indigo-300 hover:text-indigo-700"
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
