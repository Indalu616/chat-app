import React, { useContext, useEffect, useState } from "react";
import "./MessageArea.css";
import { Badge, Button, Stack } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../UserContext/UserContext";
import { useAuth } from "../AuthContext/AuthContext";
import { db } from "../../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
function MessageArea({ open, setOpen, isSelected }) {
  const [currentChats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const { currUser } = useAuth();

  // !store messages in databases

  const storeMessages = async () => {
    try {
      const messageRef = collection(db, "messages");
      const docId =
        user.id < currUser.uid
          ? `${user.id}_${currUser.uid}`
          : `${currUser.uid}_${user.id}`;
      const Hour = new Date().getHours();
      const minute = new Date().getMinutes();
      await setDoc(
        doc(messageRef, `${docId}`),
        {
          chats: arrayUnion({
            name: currUser.email,
            message: message,
            createdAt: `${Hour}:${minute}`,
          }),
        },
        { merge: true }
      );
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  // !retrive messages from database

  useEffect(() => {
    const docId =
      user.id < currUser.uid
        ? `${user.id}_${currUser.uid}`
        : `${currUser.uid}_${user.id}`;
    const unsub = onSnapshot(doc(db, "messages", docId), (doc) => {
      setChats(doc.data()?.chats);
    });
    return () => unsub();
  }, [user.id, message]);
  return (
    <div className="message-area">
      {isSelected && (
        <div className="message-area-header">
          <div className="message-area-header-left">
            <div
              className="menu"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </div>
            <div className="receiver-part">
              <p>{user?.name}</p>
              {user?.name && user.status ? (
                <small style={{ color: "#088408" }}>{user.status}</small>
              ) : (
                <small>last seen recently</small>
              )}
            </div>
          </div>

          <div className="messaging-actions">
            <Stack spacing={2} direction="row" sx={{ color: "action.active" }}>
              <Badge color="secondary">
                <MailIcon />
              </Badge>
              <Badge color="secondary">
                <CallIcon />
              </Badge>
              <Badge color="secondary">
                <VideoCallIcon />
              </Badge>
            </Stack>
          </div>
        </div>
      )}
      <div className="chatting-space">
        {!isSelected && (
          <div className="start-chat">Select a chat to start messaging </div>
        )}
        <div className="conversation-box">
          {isSelected && (
            <div>
              {currentChats?.map((message) => {
                return (
                  <div
                    className={
                      message.name === currUser?.email
                        ? "receiver-row"
                        : "sender-row"
                    }
                    key={message.id}
                  >
                    <div
                      className={
                        message.name === currUser?.email ? "receiver" : "sender"
                      }
                    >
                      <p>{message.message}</p>
                      <div className="time">
                        <small>{message.createdAt}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="message-area-footer">
          <div className="input-area">
            <input
              type="text"
              placeholder="type message here..."
              className="border rounded p-2"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="buttons">
            <Button
              variant="contained"
              onClick={storeMessages}
              disabled={message == ""}
            >
              send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
