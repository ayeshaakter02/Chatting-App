import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { auth } from "../firebase.config";

const FriendList = () => {
  const db = getDatabase();
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const requestRef = ref(db, "friendList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().senderid ||
          auth.currentUser.uid == item.val().receiverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setRequestList(array);
    });
  }, []);

  const handleBlock = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      console.log("receiver", item);
      set(push(ref(db, "blockList/")), {
        blockbyuser: item.senderid,
        blockbyusername: item.sendername,
        blockuser: item.receiverid,
        blockusername: item.receivername,
      }).then(() => {
        remove(ref(db, "friendList/" + item.id));
      });
    } else {
      console.log("sender", item);
      set(push(ref(db, "blockList/")), {
        blockbyuser: item.receiverid,
        blockbyusername: item.receivername,
        blockuser: item.senderid,
        blockusername: item.sendername,
      }).then(() => {
        remove(ref(db, "friendList/" + item.id));
      });
    }
  };

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div>
        <div className="max-w-md rounded-lg border p-4 shadow-md backdrop-blur-xl sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl leading-none font-bold text-white">
              Friend List
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
                      {auth.currentUser.uid == item.senderid ? (
                        <p className="truncate text-sm font-medium text-white dark:text-white">
                          {item.receivername}
                        </p>
                      ) : (
                        <p className="truncate text-sm font-medium text-white dark:text-white">
                          {item.sendername}
                        </p>
                      )}

                      <p className="truncate text-sm text-white">njmvbjhhkj</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBlock(item)}
                        className="mr-2 rounded-sm bg-blue-500 p-1 text-lg text-white"
                      >
                        Block
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

export default FriendList;
