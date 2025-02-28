import React, { useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../components/AuthContext/AuthContext";

function Login() {
  const { currUser, setUser } = useAuth();
  const navigate = useNavigate();

  const [comp, setComp] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   !handlelogin function
  const handleLogin = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser(user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // !handleRegister function

  const Register = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user.uid);
          storeUsers(user.uid, user.email);
          setComp("login");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   !sore user in database

  const storeUsers = async (id, name) => {
    try {
      const usersRef = collection(db, "Users");
      console.log(id);
      await setDoc(doc(usersRef, `${id}`), {
        name: name,
        userId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="sign-with-google"></div>
        <div className="login-form">
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Email address
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {comp === "login" ? (
            <Button variant="contained" className="mt-2" onClick={handleLogin}>
              Sign In
            </Button>
          ) : (
            <Button variant="contained" className="mt-2" onClick={Register}>
              Sign Up
            </Button>
          )}
          {comp == "login" ? (
            <div className="dont-have-account mt-2">
              <p>
                Don't have an account?
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setComp("signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          ) : (
            <div className="dont-have-account mt-2">
              <p>
                Don't have an account?
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setComp("login")}
                >
                  Log in
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
