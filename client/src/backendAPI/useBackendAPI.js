import axios from "axios";
import { UseUserContext } from "../hooks/useUserContext";
import { SendEmail } from "../components/SendEmail";
import { useNavigate } from "react-router-dom";

export const UseBackendAPI = () => {
  const { dispatch, setUser, getUser, user1 } = UseUserContext();

  const user = getUser();
  const navigate = useNavigate();

  return {
    login: async function (userDetails) {
      try {
        const { data } = await axios.post(
          "http://localhost:8070/api/users/login/",
          userDetails
        );

        if (data.role) {
          async function configureUser() {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch({ type: "SetUser", payload: [data] });
          }
          await configureUser();

          if (user?.role === "User") navigate("/");
          else if (user.role === "Entrepreneur") navigate("/entrepreneurship");
          else if (user?.role === "Admin") navigate("/admin");
          else alert(data.err);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.err);
        return err.response.data.err;
      }
    },
    registerUser: async function (userDetails) {
      try {
        const { data } = await axios.post(
          "http://localhost:8070/api/users/signup/",
          userDetails
        );

        //To store in localstorage
        setUser(data);
        dispatch({ type: "SetUser", payload: [data] });

        if (!data.err) alert("Account Created Successfully");
        else alert(data.err);

        if (data.role === "Entrepreneur") navigate("/entrepreneuship/product");
        else if (data.role === "User") navigate("/");
        else if (data.role === "Admin") navigate("/admin");
      } catch (err) {
        alert("Ooops.. There seems to be an error. Try again later");
        console.log(err);
      }
    },

    getUsersForAdminPage: async function () {
      const { data } = await axios.get("http://localhost:8070/api/users/");

      console.log(data);
      return data;
    },

    makeProductRequest: async function (product) {
      product.userName = user.userName;
      product.userID = user._id;

      try {
        const info = await axios.post(
          "http://localhost:8070/api/protected/products/addProduct/",
          product,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (info.status == 200) alert("Product Request Success!");
        else alert(info.data);
        return info;
      } catch (err) {
        alert(
          "There seems to be an error. Your Request cannot be fulfilled at the moment"
        );
      }
    },
    updateUserProfileDetails: async function (userDetailsToUpdate) {
      userDetailsToUpdate.userId = user._id;
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/users/update/",
          userDetailsToUpdate
        );

        console.log(info);

        if (info.status == 200) {
          localStorage.setItem("user", JSON.stringify(info.data));

          dispatch({
            type: "SetUser",
            payload: info.data,
          });

          alert("Profile Updated Successfully!");
        } else alert("Oops! Something went wrong");
      } catch (err) {
        alert("Oops! Something went wrong");
      }
    },
  };
};
