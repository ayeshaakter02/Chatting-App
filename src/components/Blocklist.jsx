import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { auth } from "../firebase.config";

const BlockList = () => {
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const requestRef = ref(db, "blockList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().blockbyuser 
        ){
            array.push({ ...item.val(), id: item.key });
        }
          
      });
      setBlockList(array);
    });
  }, []);

  const handleUnblock = (item) =>{
    if(auth.currentUser.uid == item.blockbyuser) {
      set(push(ref(db, "friendList/")), {
              senderid: item.blockbyuser,
              sendername: item.blockbyusername,
              reciverid: item.blockuser,
              recivername: item.blockusername,
            }).then(() => {
              remove(ref(db, "blockList/" + item.id));
            });
    }else{
      set(push(ref(db, "friendList/")), {
              senderid: item.blockuser,
              sendername: item.blockusername,
              reciverid: item.blockbyuser,
              recivername: item.blockbyusername,
            }).then(() => {
              remove(ref(db, "blockList/" + item.id));
            });
    }
  }

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div>
        <div className="max-w-md rounded-lg border bg-white p-4 shadow-md sm:p-8 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
              Block List
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
              {blockList.map((item) => (
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
                      {auth.currentUser.uid == item.blockbyuser ? (
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {item.blockusername}
                        </p>
                      ) : (
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {item.blockbyusername}
                        </p>
                      )}

                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        njmvbjhhkj
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>handleUnblock(item)} className="bg-blue-500 p-1 text-lg text-white">
                        Unblock
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

export default BlockList;
