import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      console.log(action.payload);

      return { name: action.payload.name, id: action.payload.userId,status:action.payload.status };
    default:
      return state;
  }
};

function UserContextProvider({ children }) {
  const INITIAL_STATE = { name: "", id: "" };
  const [user, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
