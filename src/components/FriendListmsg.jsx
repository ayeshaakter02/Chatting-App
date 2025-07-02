import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { auth } from "../firebase.config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { chattinguser } from "../slices/chatSlice";
import { useSelector } from "react-redux";

const FriendListmsg = () => {
  const db = getDatabase();
  const [friendlist, setFriendlist] = useState([]);
  const [filterResult, setfilterResult] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.chatInfo.value);

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
      setFriendlist(array);
    });
  }, []);

  let handleSelectuser = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      dispatch(chattinguser({ name: item.receivername, id: item.receiverid }));
    } else {
      dispatch(chattinguser({ name: item.sendername, id: item.senderid }));
    }
  };

  // let handleSearch = (e) => {
  //   let filterresult = friendlist.filter(
  //     (item) =>
  //       item.sendername
  //         .toUpperCase()
  //         .replaceAll(" ", "")
  //         .includes(e.target.value.toUpperCase()) ||
  //       item.receivername
  //         .toUpperCase()
  //         .replaceAll(" ", "")
  //         .includes(e.target.value.toUpperCase()),
  //   );
  //   setfilterResult(filterresult);
  // };

  return (
    <div>
      <div className="flex h-210 w-60 flex-col overflow-y-scroll border-r-2 border-indigo-400">
        {/* search compt */}
        <div className="border-b-2 border-indigo-400 px-2 py-4">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search chatting"
            className="w-full rounded-2xl bg-indigo-200 px-2 py-2"
          />
        </div>
        {/* end search compt */}
        {/* user list */}

        {filterResult
          ? filterResult.map((item) => (
              <div
                onClick={() => handleSelectuser(item)}
                className={`flex flex-row items-center justify-center gap-2 border-b-2 border-indigo-400 px-2 py-4 ${user?.id == item.senderid || user?.id == item.receiverid ? "bg-indigo-700" : "bg-transparent"}`}
              >
                <div>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="images/user.jpg"
                    alt="user"
                  />
                </div>
                <div className="ml-2">
                  {auth.currentUser.uid == item.senderid ? (
                    <div className="text-lg font-semibold text-white">
                      {item.receivername}
                    </div>
                  ) : (
                    <div className="text-lg font-semibold text-white">
                      {item.sendername}
                    </div>
                  )}

                  <span className="text-gray-400">Pick me at 9:00 Am</span>
                </div>
              </div>
            ))
          : 
          friendlist.map((item) => (
              <div
                onClick={() => handleSelectuser(item)}
                className={`flex flex-row items-center justify-center gap-2 border-b-2 border-indigo-400 px-2 py-4 ${user?.id == item.senderid || user?.id == item.receiverid ? "bg-indigo-700" : "bg-transparent"}`}
              >
                <div>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="images/user.jpg"
                    alt="user"
                  />
                </div>
                <div className="ml-2">
                  {auth.currentUser.uid == item.senderid ? (
                    <div className="text-lg font-semibold text-white">
                      {item.receivername}
                    </div>
                  ) : (
                    <div className="text-lg font-semibold text-white">
                      {item.sendername}
                    </div>
                  )}

                  <span className="text-gray-400">Pick me at 9:00 Am</span>
                </div>
              </div>
            ))}

        {/* end user list */}
      </div>
    </div>
  );
};

export default FriendListmsg;
