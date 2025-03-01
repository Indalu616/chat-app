import React, { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import "./sidebar.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UserProfile from "../../components/UserProfile/Profile";
import { UserContext } from "../../components/UserContext/UserContext";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../components/AuthContext/AuthContext";

function SideBar({ open, setOpen, setSelected }) {
  const [users, setUsers] = useState([]);
  const { currUser } = useAuth();
  const { dispatch } = useContext(UserContext);
  // !change user function
  const changeUser = (newUser) => {
    dispatch({ type: "CHANGE_USER", payload: newUser });
    setOpen(false);
    setSelected(true);
  };
  useEffect(() => {
    const q = query(
      collection(db, "Users")
    );
    const arr=[]
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())
        // setUsers((prev) => [...prev, doc.data()]);
      });
      setUsers(arr)
    });
    return ()=>unsubscribe()
  }, []);
  console.log(users);
  // ! fetch users data from database

  // const fetchData = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "Users"));
  //     querySnapshot.forEach((doc) => {
  //       setUsers((prev) => [...prev, doc.data()]);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className={open ? "open side-bar" : "side-bar"}>
      <div className="sidebar-header">
        <div className="close" onClick={() => setOpen(false)}>
          <CloseIcon style={{ color: "white" }} />
        </div>
        <input type="search" className="input-box" placeholder="Search..." />
        <div className="user">
          <UserProfile />
        </div>
      </div>
      <Divider />
      <div className="side-bar-body">
        <div className="sider-bar-user">
          <List>
            {users
              ?.filter((u) => u.email.toLowerCase()!=currUser.email.toLowerCase())
              .map((user) => {
                return (
                  <ListItem
                    key={user?.userId}
                    disablePadding
                    onClick={() => changeUser(user)}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <p style={{ marginBottom: "0px", color: "white" }}>
                          {user?.name}
                        </p>
                        {user?.status == "Online" ? (
                          <small style={{ color: "#088408" }}>Online</small>
                        ) : (
                          <small style={{ color: "silver" }}>
                            last seen recently
                          </small>
                        )}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
