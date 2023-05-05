import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export const UseUserContext = () => {
  const { dispatch, user1, selectedUserRole } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch({
        type: "SetUser",
        payload: [user],
      });

      dispatch({ type: "SetSelectedUserRole", payload: "User" });
    }
  }, [dispatch]);

  function getUser() {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  }

  function getUserRole() {
    const userSaved = localStorage.getItem("user");

    if (userSaved) {
      const user = JSON.parse(userSaved);
      return user.role;
    }
  }

  function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function setSelectedUserRole(role) {
    dispatch({ type: "SetSelectedUserRole", payload: role });
  }

  function getSelectedUserRole() {
    return selectedUserRole;
  }

  function logoutUser() {
    const userSaved = localStorage.getItem("user");
    if (userSaved) {
      localStorage.removeItem("user");
      dispatch({ type: "Logout" });
      return true;
    } else return false;
  }

  return {
    dispatch,
    user1,
    selectedUserRole,
    setSelectedUserRole,
    getSelectedUserRole,
    getUser,
    getUserRole,
    setUser,
    logoutUser,
  };
};
