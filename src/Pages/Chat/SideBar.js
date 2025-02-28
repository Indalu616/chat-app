import React, { useContext, useEffect,useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
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
import { auth, db } from "../../firebaseConfig";
import { useAuth } from "../../components/AuthContext/AuthContext";

function SideBar({ open, setOpen }) {
  const { currUser } = useAuth();
  const [users, setUsers] = useState([]);
  const {user, dispatch} = useContext(UserContext);
  const changeUser = (newUser) => {
    dispatch({ type: "CHANGE_USER", payload: newUser });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(users)
  // ! fetch users data from database

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data())
        setUsers((prev)=>[...prev,doc.data()])
        // console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={open ? "open side-bar" : "side-bar"}>
      <div className="sidebar-header">
        <div className="close" onClick={() => setOpen(false)}>
          <CloseIcon style={{ color: "white" }} />
        </div>
        <input
          type="search"
          className="border-bottom"
          placeholder="search friend..."
        />
        <div className="user">
          <UserProfile />
        </div>
      </div>
      <Divider />
      <div className="side-bar-body">
        <div className="sider-bar-user">
          <List>
            {users?.map((user) => {
              return (
                <ListItem key={user?.userId} disablePadding onClick={()=>changeUser(user)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                      />
                    </ListItemIcon>
                    <ListItemText primary={user?.name} style={{ color: "#EEF5FF" }} />
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
