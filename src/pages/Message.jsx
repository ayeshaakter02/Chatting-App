import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import FriendListmsg from "../components/FriendListmsg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import moment from "moment";
const Message = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.chatInfo.value);
  let [msg, setMsg] = useState(null);
  const [msglist, setMsglist] = useState([]);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleSendmsg = () => {
    set(push(ref(db, "msgList/")), {
      senderid: auth.currentUser.uid,
      sendername: auth.currentUser.displayName,
      receiverid: user.id,
      receivername: user.name,
      msg: msg,
      date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
    }).then(() => {
      setMsg("");
      toast.success("msg send successfull");
    });
  };

  useEffect(() => {
    const requestRef = ref(db, "msgList/");
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
      setMsglist(array);
    });
  }, []);

  return (
    <>
      <Toaster />
      {/* component */}
      {/* This is an example component */}
      <div className="mx-auto w-full rounded-lg shadow-lg mt-3">
        {/* headaer */}
        <div className="flex items-center justify-between border-b-2 border-indigo-400 px-5 py-5 backdrop-blur-xl">
          <div className="text-3xl font-bold text-indigo-500">GoingChat</div>
          <div className="w-1/2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search IRL"
              className="w-full rounded-2xl bg-indigo-200 px-5 py-3"
            />
          </div>
          <h1 className="text-2xl font-semibold text-indigo-500">
            {user?.name}
          </h1>
        </div>
        {/* end header */}
        {/* Chatting */}
        <div className="flex flex-row justify-between backdrop-blur-xl">
          {/* chat list */}
          <FriendListmsg />
          {/* end chat list */}
          {/* message */}
          <div className="flex w-full flex-col justify-between px-5">
            {user && (

              <div>
                <div className="mt-5 flex flex-col overflow-y-scroll h-180">

                  {msglist.map((msgitem) =>
                    msgitem.senderid == auth.currentUser.uid ? (
                      <div className="mb-4">
                        <div className="flex justify-end">
                          <div className="mr-2 rounded-tl-3xl rounded-tr-xl rounded-bl-3xl bg-blue-400 px-4 py-3 text-white">
                            {msgitem.msg}
                          </div>
                          <img
                            src="images/user.jpg"
                            className="h-8 w-8 rounded-full object-cover"
                            alt=""
                          />
                        </div>
                        <p className="mr-2 flex justify-end px-4 text-white">
                          {moment(msgitem.date, "YYYYMMDD,h:mm").fromNow()}
                        </p>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="flex justify-start">
                          <img
                            src="images/user.jpg"
                            className="h-8 w-8 rounded-full object-cover"
                            alt=""
                          />
                          <div className="ml-2 rounded-tl-xl rounded-tr-3xl rounded-br-3xl bg-gray-400 px-4 py-3 text-white">
                            {msgitem.msg}
                          </div>
                        </div>
                        <p className="mr-2 px-4 text-white">
                          {moment(msgitem.date, "YYYYMMDD,h:mm").fromNow()}
                        </p>
                      </div>
                    ),
                  )}
                </div>

                <div>
                  <div className="flex py-5">
                    <input
                      onChange={handleMsg}
                      className="w-full rounded-xl bg-indigo-200 px-3 py-5"
                      type="text"
                      value={msg}
                      placeholder="Type your message here..."
                    />
                    <button
                      onClick={handleSendmsg}
                      className="-ml-10 text-2xl text-indigo-700"
                    >
                      <RiSendPlaneFill />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* end message */}
          <div className="w-2/5 border-l-2 border-indigo-400 px-5">
            <div className="flex flex-col">
              <div className="py-4 text-xl font-semibold">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="h-64 rounded-xl object-cover"
                alt=""
              />
              <div className="py-4 font-semibold">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
