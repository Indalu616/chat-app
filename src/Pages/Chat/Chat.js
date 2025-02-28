import React, { useState } from "react";
import SideBar from "./SideBar";
import MessageArea from "../../components/MessageArea/MessageArea";

function Chat() {
    const [open,setOpen]=useState(false)

  return (
    <div>
      <SideBar open={open} setOpen={setOpen}/>
      <MessageArea setOpen={setOpen} open={open}/>
    </div>
  );
}

export default Chat;
