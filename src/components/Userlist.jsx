import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { auth } from "../firebase.config";
// import FriendRequestList from "./FriendRequestList";
const Userlist = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userListRef = ref(db, "userslist/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (item.key != auth.currentUser.uid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  const handleFriendrequest = (item) => {
    set(push(ref(db, "friendrequestList/")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      recivername: item.name,
      reciverid: item.id,
    }).then(() => {
      console.log("friendrequest");
    });
  };

  return (
    <>
      {/* This is an example component */}
      <div>
        <div className="max-w-md rounded-lg border bg-white p-4 shadow-md sm:p-8 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
              User List
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="h-[300px] divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-700"
            >
              {userList.map((item) => {
                return (
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                          alt="Neil image"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xl font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-md truncate text-gray-500">
                          {item.email}
                        </p>
                      </div>
                      <button
                        onClick={() => handleFriendrequest(item)}
                        className="bg-blue-500 p-1 text-xl text-white"
                      >
                        <GoPlus />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
