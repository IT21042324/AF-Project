import { createContext, useReducer } from "react";
import React from "react";

export const UserListContext = createContext();

export const UserListContextProvider = (props) => {
  const [content, dispatch] = useReducer(reducer, {
    users: [],
  });

  function reducer(state, action) {
    switch (action.type) {
      case "SetUsers":
        return {
          users: action.payload.data,
        };
      case "DeleteUser":
        return {
          users: state.users.filter((ord) => ord._id !== action.payload._id),
        };

      case "ApproveUser":
        return {
          users: state.users.map((user) =>
            user._id === action.payload._id
              ? {
                  ...user,
                  userIsApprovedByAdmin: true,
                  userIsRejectedByAdmin: false,
                }
              : user
          ),
        };

      case "RejectUser":
        return {
          users: state.users.map((user) =>
            user._id === action.payload._id
              ? {
                  ...user,
                  userIsApprovedByAdmin: false,
                  userIsRejectedByAdmin: true,
                }
              : user
          ),
        };

      default:
        return state;
    }
  }

  return (
    <UserListContext.Provider value={{ content, dispatch }}>
      {props.children}
    </UserListContext.Provider>
  );
};
