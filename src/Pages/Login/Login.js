import React, { useState } from "react";
import "./Login.css";
import { Alert, Button } from "@mui/material";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../components/AuthContext/AuthContext";

function Login() {
  const { currUser, setUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [comp, setComp] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   !handlelogin function
  const handleLogin = async () => {
    setLoading(true);
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser(user);
          updateUser(user.uid);
          navigate("/chat-app");
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setError(errorMessage);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // !handleRegister function

  const Register = async () => {
    setLoading(true);
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user.uid);
          storeUsers(user.uid);
          setComp("login");
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setError(errorMessage);
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   !sore user in database

  const storeUsers = async (id) => {
    try {
      const usersRef = collection(db, "Users");
      console.log(id);
      await setDoc(doc(usersRef, `${id}`), {
        name: username,
        email:email,
        userId: id,
        status: "Online",
      });
    } catch (error) {
      console.log(error);

      setError(error);
    }
  };
  // !update users

  const updateUser = async (id) => {
    try {
      const userRef = doc(db, "Users", id);
      // Set the "status" field of the User 'Online'
      await updateDoc(userRef, {
        status: "Online",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="sign-with-google">
          <div className="app-logo">
            <h2>PingMe Chat App</h2>
          </div>
        </div>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <div className="login-form">
          {comp == "signup" && (
            <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label"
                style={{ color: "white" }}
              >
                User name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="user name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
          )}

          <div className="mb-3">
            <label
              for="exampleFormControlInput1"
              className="form-label"
              style={{ color: "white" }}
            >
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
            <label
              for="password"
              className="form-label"
              style={{ color: "white" }}
            >
              Password
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
            <Button
              variant="contained"
              className="mt-2"
              onClick={handleLogin}
              style={{ width: "100%" }}
            >
              {isLoading ? "Signing in..." : "Sign IN"}
            </Button>
          ) : (
            <Button
              variant="contained"
              className="mt-2"
              onClick={Register}
              style={{ width: "100%" }}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          )}
          {comp == "login" ? (
            <div className="dont-have-account mt-2">
              <p style={{ color: "white" }}>
                Don't have an account?
                <span
                  style={{
                    color: "#2A71BD",
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
                  onClick={() => setComp("signup")}
                >
                  Sign up
                </span>
              </p>
            </div>
          ) : (
            <div className="dont-have-account mt-2">
              <p style={{ color: "white" }}>
                Don't have an account?
                <span
                  style={{
                    color: "#2A71BD",
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
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
