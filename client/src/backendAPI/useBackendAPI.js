import axios from "axios";
import { UseUserContext } from "../context/useUserContext";
import { SendEmail } from "../components/SendEmail";
import { useNavigate } from "react-router-dom";

export const UseBackendAPI = () => {
  const { getUser, dispatch, setUser } = UseUserContext();
  const user = getUser();

  const navigate = useNavigate();

  return {
    login: async function (userDetails) {
      try {
        const { data } = await axios.post(
          "http://localhost:8070/api/users/login/",
          userDetails
        );

        setUser(data);
        dispatch({ type: "SetUser", payload: [data] });

        //now once the merchant or user is successfully registered,we try to redirect him to his store page once he is registered
        if (user.role === "User") navigate("/");
        else if (user.role === "Entrepreneur")
          navigate("/entrepreneurship/seller");
        else if (user.role === "Admin") navigate("/admin");
        else alert(data.err);
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

        //Here we send an email once the user is registered
        // SendEmail({
        //   user_name: userDetails.userName,
        //   role: userDetails.role,
        // });

        if (!data.err) alert("Account Created Successfully");
        else alert(data.err);

        if (data.role === "Entrepreneur") navigate("/entrepreneuship/product");
        else if (data.role === "User") navigate("/");
      } catch (err) {
        alert("Ooops.. There seems to be an error. Try again later");
        console.log(err);
      }
    },
  };
};