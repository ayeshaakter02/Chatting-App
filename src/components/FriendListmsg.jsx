import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react'
import { auth } from '../firebase.config';
import { useState } from 'react';

const FriendListmsg = () => {
   const db = getDatabase();
   const [friendlist, setFriendlist] = useState([]);

  useEffect (() => {
    const requestRef = ref(db, "friendList/");
    onValue(requestRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().senderid ||
          auth.currentUser.uid == item.val().reciverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
          setFriendlist(array);
    });
  }, []);
  console.log(friendlist);

  return (
    <div>
        <div className="flex w-60 flex-col overflow-y-auto border-r-2">
            {/* search compt */}
            <div className="border-b-2 px-2 py-4">
              <input
                type="text"
                placeholder="search chatting"
                className="w-full rounded-2xl border-2 border-gray-200 px-2 py-2"
              />
            </div>
            {/* end search compt */}
            {/* user list */}
            {friendlist.map((item) => (
              <div className="flex flex-row items-center justify-center border-b-2 px-2 py-4">
              <div className="w-full">
                {auth.currentUser.uid == item.senderid ? 
                <div className="text-lg font-semibold">{item.recivername}</div> : <div className="text-lg font-semibold">{item.sendername}</div>
              }
                
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>
            ))}
            
            
            {/* end user list */}
          </div>
    </div>
  )
}

export default FriendListmsg;