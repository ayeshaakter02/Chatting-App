import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userSigninInfo } from "../slices/userSlice";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignin.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userSigninInfo({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          }),
        );
        //user is signed in
        // ...
      } else {
        dispatch(userSigninInfo(null));
        navigate("/signin");
        // User is signed out
        // ...
      }
    });
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <div
        id="hs-sidebar-collapsible-group"
        className="hs-overlay h-full w-70 transform border-e border-gray-200 transition-all duration-300 lg:end-auto lg:bottom-0 lg:block dark:border-neutral-700 dark:bg-neutral-800 backdrop-blur-xl"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex h-full max-h-full flex-col">
          {/* Header */}
          <header className="flex items-center justify-between gap-x-2 p-4">
            <a
              className="flex-none text-2xl font-bold text-white focus:opacity-80 focus:outline-hidden dark:text-white"
              href="#"
              aria-label="Brand"
            >
              {user?.name}
            </a>
            <div className="-me-2 lg:hidden">
              {/* Close Button */}
              <button
                type="button"
                className="flex size-6 items-center justify-center gap-x-3 rounded-full border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700 dark:focus:text-neutral-200"
                data-hs-overlay="#hs-sidebar-collapsible-group"
              >
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
              {/* End Close Button */}
            </div>
          </header>
          {/* End Header */}
          {/* Body */}
          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
            <div
              className="hs-accordion-group flex w-full flex-col flex-wrap px-2 pb-0"
              data-hs-accordion-always-open=""
            >
              <ul className="space-y-1">
                <li>
                  <Link to="/"
                    className={`flex items-center gap-x-3 px-2.5 py-2 ${pathname == "/" && "bg-pink-600 text-white"} rounded-lg text-md   focus:outline-hidden hover:bg-pink-600 text-white`}
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li className="hs-accordion" id="users-accordion">
                  <Link to="/message"
                    type="button"
                    className={`flex items-center gap-x-3 px-2.5 py-2 ${pathname == "/message" && "bg-pink-600 text-white"} rounded-lg text-md focus:outline-hidden hover:bg-pink-600 text-white`}
                    aria-expanded="true"
                    aria-controls="users-accordion-collapse-1"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Message
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </Link>
                  <div
                    id="users-accordion-collapse-1"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    role="region"
                    aria-labelledby="users-accordion"
                  >
                    <ul
                      className="hs-accordion-group space-y-1 ps-7 pt-1"
                      data-hs-accordion-always-open=""
                    >
                      <li className="hs-accordion" id="users-accordion-sub-1">
                        <button
                          type="button"
                          className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          aria-expanded="true"
                          aria-controls="users-accordion-sub-1-collapse-1"
                        >
                          Sub Menu 1
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div
                          id="users-accordion-sub-1-collapse-1"
                          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                          role="region"
                          aria-labelledby="users-accordion-sub-1"
                        >
                          <ul className="space-y-1 ps-2 pt-1">
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                              >
                                Link 1
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                              >
                                Link 2
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                              >
                                Link 3
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="hs-accordion" id="users-accordion-sub-2">
                        <button
                          type="button"
                          className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          aria-expanded="true"
                          aria-controls="users-accordion-sub-2-collapse-1"
                        >
                          Sub Menu 2
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div
                          id="users-accordion-sub-2-collapse-1"
                          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                          role="region"
                          aria-labelledby="users-accordion-sub-2"
                        >
                          <ul className="space-y-1 ps-2 pt-1">
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                              >
                                Link 1
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                              >
                                Link 2
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                href="#"
                              >
                                Link 3
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-md focus:outline-hidden  hover:bg-pink-600 text-white focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xc
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          {/* End Body */}
        </div>
      </div>
      {/* End Sidebar */}
    </>
  );
};

export default Sidebar;
