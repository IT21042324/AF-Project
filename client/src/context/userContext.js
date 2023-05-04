import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, {
    user1: [],
    selectedUserRole: "", //The selectedUserRole is to know if the merchant, user or admin who is trying to use the login/signup page to display content accordingly
  });

  function reducer(state, action) {
    switch (action.type) {
      case "SetUser":
        return {
          ...state,
          user1: action.payload,
        };

      case "UpdateUser": {
        return {
          ...state,
          user1: action.payload,
        };
      }

      case "Logout":
        return { user1: [], selectedUserRole: "" };

      case "SetSelectedUserRole":
        return { ...state, selectedUserRole: action.payload };

      case "ClearSelectedUserRole":
        return {
          ...state,
          selectedUserRole: "",
        };

      default:
        return state;
    }
  }

  return (
    <UserContext.Provider value={{ ...user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
