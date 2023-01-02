import React, { useContext } from "react";
import Messages from "./Messages";
import Input from './Input';
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const {data} = useContext(ChatContext);
  console.log(data.user.displayName);
  return (
    <>
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
    </>
  );
  
};

export default Chat;
