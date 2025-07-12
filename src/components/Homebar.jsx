import React from "react";
import { Link, useLocation } from "react-router";
import { FaUserFriends } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";

const Homebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="xl:hidden">
      <nav class=" backdrop-blur-xl">
        <div class="md:w-auto" id="navbar-default">
          <ul class="sm:mt-0 mt-2 md:mt-2 flex flex-row justify-center rounded-lg p-4 sm:py-0.5 md:py-4 font-medium rtl:space-x-reverse gap-3">
            <li>
              <Link
                to={"/"}
                className={`block rounded-sm ${pathname == "/" && "bg-indigo-600 text-white"} px-3 py-2 text-white   dark:text-white `}
                // aria-current="page"
              >
                {/* Friend List */}
                <FaUserFriends />
              </Link>
            </li>
            <li>
              <Link
                to={"/friendrequest"}
                className={`block rounded-sm ${pathname == "/friendrequest" && "bg-indigo-600 text-white"} px-3 py-2 text-white dark:text-white`}
              >
                {/* Friend Request List */}
                <FaCodePullRequest />
              </Link>
            </li>
            <li>
              <Link
                to={"/userlist"}
                className={`block rounded-sm ${pathname == "/userlist" && "bg-indigo-600 text-white"} px-3 py-2 text-white  dark:text-white `}
              >
                {/* User List */}
                <FaUser />
              </Link>
            </li>
            <li>
              <Link
                to={"/blocklist"}
                className={`block rounded-sm ${pathname == "/blocklist" && "bg-indigo-600 text-white"} px-3 py-2 text-white  dark:text-white md:dark:text-blue-500`}
              >
                {/* Block List */}
                <MdOutlineBlock />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Homebar;
