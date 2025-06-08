import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { getDatabase, ref, onValue } from "firebase/database";

const Userlist = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userListRef = ref(db, "userslist/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if(item.key != auth.currentUser.uid){
          array.push(item.val());
        }
        
      });
      setUserList(array);
    }); 
  }, []);

  return (
    <>
      {/* component */}
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
                return(
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
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {item.email}
                      </p>
                    </div>
                    <div className="bg-blue-500 p-1 text-xl text-white">
                      <GoPlus />
                    </div>
                  </div>
                </li>
                )
                
              })}

              {/* <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Bonnie Green
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $3467
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Michael Gough
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $67
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt="Lana image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Lana Byrd
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $367
                  </div>
                </div>
              </li>
              <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Thomas image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      Thomes Lean
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $2367
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
