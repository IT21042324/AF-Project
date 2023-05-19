import { useContext, useEffect } from "react";
import { UseBackendAPI } from "../backendAPI/useBackendAPI";
import { UserListContext } from "../context/userListContext";

export const UseUserListContext = () => {
  const { getUsersForAdminPage } = UseBackendAPI();
  const adminUserContext = useContext(UserListContext);

  const { dispatch, content } = adminUserContext;

  useEffect(() => {
    async function getAdminUserInfo() {
      const data = await getUsersForAdminPage();

      dispatch({
        type: "SetUsers",
        payload: {
          data: data,
        },
      });
    }

    getAdminUserInfo();
  }, []);

  return { adminUserContext, dispatch, content };
};
