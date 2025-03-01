import React, { useState } from "react";
import SideBar from "./SideBar";
import MessageArea from "../../components/MessageArea/MessageArea";

function Chat() {
    const [open,setOpen]=useState(false)
    const [isSelected, setSelected] = useState(false);

  return (
    <div>
      <SideBar open={open} setOpen={setOpen} setSelected={setSelected}/>
      <MessageArea setOpen={setOpen} open={open} isSelected={isSelected}/>
    </div>
  );
}

export default Chat;
