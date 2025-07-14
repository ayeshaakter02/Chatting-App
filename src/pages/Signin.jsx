import React, { useState } from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userSigninInfo } from "../slices/userSlice.js";
import { getDatabase, ref, set } from "firebase/database";

const Signin = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const db = getDatabase();

  const navigate = useNavigate();

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

  const handleSignin = (e) => {
    e.preventDefault();
    console.log("submit", userInfo);
    if (userInfo.email && userInfo.password) {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          if (user.emailVerified) {
            dispatch(userSigninInfo(user)); //set data in redux
            navigate("/");
          } else {
            toast.error("Please verify your email or password");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("Email already in use");
            toast.errror("invalid email or password");
            setUserInfo({
              email: "",
              password: "",
            });
          }
        });
    } else {
      alert("email & password is required");
    }
  };

  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        set(ref(db, "userslist/" + user.uid), {
          name: user.displayName,
          email: user.email,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });

        dispatch(userSigninInfo(user));
        navigate("/");
      })
      .catch((error) => {
        // Handle errors here
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <div className="font-[--font-Roboto] flex min-h-full flex-col justify-center bg-[url('../images/Signup_image.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      <Toaster />
      <div className="xl:w-[1300px] mx-auto">
        <div className="w-80 sm:w-130 py-7 sm:py-1 md:py-5 xl:py-20 px-3 sm:pl-10 backdrop-blur-xl">
          <div className="sm:w-full sm:max-w-sm">
            <h2 className="mt-1 lg:mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-2.5 lg:mt-10 sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSignin}
              className="space-y-5 sm:space-y-2 md:space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-white"
                >
                  Email address
                </label>
                <div className="md:mt-2">
                  <input
                    onChange={handleEmail}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-700 hover:text-indigo-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="md:mt-2">
                  <input
                    onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required=""
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <p className="md:mt-2 flex justify-center text-lg font-semibold">
                  or
                </p>
                <button
                  onClick={handleGoogleSignin}
                  type="submit"
                  className="mx-auto md:mt-2 flex cursor-pointer items-center font-semibold"
                >
                  <FcGoogle className="mr-2 text-xl" />
                  Continue with google
                </button>
              </div>
            </form>
            <p className="md:mt-10 text-center text-sm/6 font-normal text-gray-900">
              Don't have an account?
              <Link
                to={"/signup"}
                className="font-semibold text-indigo-700 hover:text-indigo-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signin;
