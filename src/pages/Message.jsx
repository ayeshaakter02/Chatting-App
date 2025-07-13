import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import FriendListmsg from "../components/FriendListmsg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.config";
import moment from "moment";
import { Link } from "react-router";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
const Message = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.chatInfo.value);
  let [msg, setMsg] = useState("");
  const [msglist, setMsglist] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

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
          (auth.currentUser.uid == item.val().senderid &&
            user?.id == item.val().receiverid) ||
          (auth.currentUser.uid == item.val().receiverid &&
            user?.id == item.val().senderid)
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setMsglist(array);
    });
  }, [user?.id]);

  const handleEmoji = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiData) => {
    setMsg((prev) => prev + emojiData.emoji);
  };

  return (
    <>
      <Toaster />
      {/* component */}
      {/* This is an example component */}
      <div className="m-3 mx-auto w-full rounded-lg shadow-lg backdrop-blur-xl">
        {/* headaer */}
        <div className="flex items-center justify-between border-b-2 border-indigo-400 px-5 py-5">
          <div className="text-3xl font-bold text-indigo-500">GoingChat</div>
          <h1 className="text-2xl font-semibold text-indigo-500">
            {user?.name}
          </h1>
        </div>
        {/* end header */}
        {/* Chatting */}
        <div className="flex flex-row justify-between">
          {/* chat list */}
          <FriendListmsg />
          {/* end chat list */}
          {/* message */}
          <div className="flex w-full flex-col justify-between px-5">
            <div className="mt-5 mr-0 flex h-180 flex-col overflow-y-scroll">
              {msglist.map((msgitem) =>
                msgitem.senderid == auth.currentUser.uid ? (
                  <div className="mb-4">
                    <div className="flex justify-end">
                      <div className="mr-2 rounded-tl-3xl rounded-tr-xl rounded-bl-3xl bg-blue-500 px-4 py-3 text-white">
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

            {user && (
              <div>
                <div className="relative inline-block py-5">
                  <MdEmojiEmotions
                    onClick={handleEmoji}
                    className="absolute z-1 -mt-7 ml-3 text-2xl text-indigo-700"
                  />
                  {showPicker && (
                    <div className="absolute -mt-125">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        searchDisabled={true}
                        theme="dark"
                        skinTonesDisabled={true}
                      />
                    </div>
                  )}
                  <textarea
                    onChange={handleMsg}
                    className="fixed -mt-14 w-5/7 md:w-6/8 lg:w-5/7 xl:w-5/6 rounded-xl bg-indigo-200 px-10 py-2"
                    type="text"
                    value={msg}
                    placeholder="Type your message here..."
                  />
                  <button
                    onClick={handleSendmsg}
                    className="absolute z-1 -mt-6 text-2xl text-indigo-700 lg:ml-330"
                  >
                    <RiSendPlaneFill />
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* end message */}
        </div>
      </div>
    </>
  );
};

export default Message;