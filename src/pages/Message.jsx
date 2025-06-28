import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import FriendListmsg from "../components/FriendListmsg";
const Message = () => {
  const user = useSelector((state) => state.chatInfo.value);
  let [msg, setMsg] = useState(null)

  let handleMsg = (e)=> {
    setMsg(e.target.value)
  }

  let handleSendmsg=()=>{

  }
  console.log(user);
  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="w-full mx-auto rounded-lg shadow-lg ">
        {/* headaer */}
        <div className="flex items-center justify-between border-b-2 border-indigo-400 px-5 py-5 backdrop-blur-xl">
          <div className="text-indigo-500 text-3xl font-bold">GoingChat</div>
          <div className="w-1/2 ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search IRL"
              className="w-full rounded-2xl bg-indigo-200 px-5 py-3"
            />
          </div>
          <h1 className="text-indigo-500 text-2xl font-semibold">{user?.name}</h1>
        </div>
        {/* end header */}
        {/* Chatting */}
        <div className="flex flex-row justify-between backdrop-blur-xl">
          {/* chat list */}
          <FriendListmsg/>
          {/* end chat list */}
          {/* message */}
          <div className="flex w-full flex-col justify-between px-5">
            <div className="mt-5 flex flex-col">
              <div className="mb-4 flex justify-end">
                <div className="mr-2 rounded-tl-3xl rounded-tr-xl rounded-bl-3xl bg-blue-400 px-4 py-3 text-white">
                  Welcome to group everyone !
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="h-8 w-8 rounded-full object-cover"
                  alt=""
                />
              </div>
              <div className="mb-4 flex justify-start">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="h-8 w-8 rounded-full object-cover"
                  alt=""
                />
                <div className="ml-2 rounded-tl-xl rounded-tr-3xl rounded-br-3xl bg-gray-400 px-4 py-3 text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat at praesentium, aut ullam delectus odio error sit rem.
                  Architecto nulla doloribus laborum illo rem enim dolor odio
                  saepe, consequatur quas?
                </div>
              </div>
              <div className="mb-4 flex justify-end">
                <div>
                  <div className="mr-2 rounded-tl-3xl rounded-tr-xl rounded-bl-3xl bg-blue-400 px-4 py-3 text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Magnam, repudiandae.
                  </div>
                  <div className="mt-4 mr-2 rounded-tl-3xl rounded-tr-xl rounded-bl-3xl bg-blue-400 px-4 py-3 text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis, reiciendis!
                  </div>
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="h-8 w-8 rounded-full object-cover"
                  alt=""
                />
              </div>
              <div className="mb-4 flex justify-start">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="h-8 w-8 rounded-full object-cover"
                  alt=""
                />
                <div className="ml-2 rounded-tl-xl rounded-tr-3xl rounded-br-3xl bg-gray-400 px-4 py-3 text-white">
                  happy holiday guys!
                </div>
              </div>
            </div>
            <div>
              {user &&
              <div className="py-5 flex"> 
              <input onChange={handleMsg}
                className="w-full rounded-xl bg-indigo-200 px-3 py-5"
                type="text"
                placeholder="Type your message here..."
              />
              <button onClick={handleSendmsg} className="-ml-10 text-2xl text-indigo-700"><RiSendPlaneFill /></button>
            </div>
              }
            </div>
            
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
