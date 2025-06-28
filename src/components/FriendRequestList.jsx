import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { auth } from "../firebase.config";

const FriendRequestList = () => {
  const db = getDatabase();
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const requestRef = ref(db, "friendrequestList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().receiverid) {
          array.push({...item.val(), id: item.key});
        }
      });
      setRequestList(array);
    });
  }, []);

  const handleFriendAccept = (item) => {
    set(push(ref(db, "friendList/")), {
        ...item,
        }).then(() => {
          remove(ref(db, "friendrequestList/" + item.id))
        });
  }

  const handleFriendDelete = (item) => {
    set(push(ref(db, "deletelist/")), {
        ...item,
        }).then(() => {
          remove(ref(db, "friendrequestList/" + item.id))
        });
  }

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div>
        <div className="max-w-md rounded-lg border p-4 shadow-md sm:p-8 dark:border-gray-700 dark:bg-gray-800 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl leading-none font-bold text-white dark:text-white">
              Friend Request List
            </h3>
            <a
              href="#"
              className="text-md font-medium text-indigo-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="h-[300px] divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-700"
            >
              {requestList.map((item) => (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="images/user.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white dark:text-white">
                        {item.sendername}
                      </p>
                      <p className="truncate text-sm text-white dark:text-gray-400">
                        Email
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>handleFriendAccept(item)} className="bg-blue-500 p-1 text-lg text-white rounded-sm">
                        Accept
                      </button>
                      <button onClick={()=>handleFriendDelete(item)} className="bg-blue-500 p-1 text-lg text-white rounded-sm mr-2">
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequestList;
