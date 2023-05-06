import axios from "axios";
import { UseUserContext } from "../hooks/useUserContext";
import { SendEmail } from "../components/SendEmail";
import { useNavigate } from "react-router-dom";
import { UseProductContext } from "../hooks/useProductContext";

export const UseBackendAPI = () => {
  const { dispatch, setUser, getUser, user1 } = UseUserContext();

  const productDispatch = UseProductContext().dispatch;

  const user = getUser();
  const navigate = useNavigate();

  return {
    login: async function (userDetails) {
      try {
        const info = await axios.post(
          "http://localhost:8070/api/users/login/",
          userDetails
        );

        if (info.status == 200) {
          if (info.data.role) {
            async function configureUser() {
              localStorage.setItem("user", JSON.stringify(info.data));
              dispatch({ type: "SetUser", payload: [info.data] });
            }
            await configureUser();

            if (user?.role === "User") navigate("/");
            else if (user.role === "Entrepreneur")
              navigate("/entrepreneurship");
            else if (user?.role === "Admin") navigate("/admin");
          }
        } else {
          alert(info.data.err);
        }
      } catch (err) {
        console.log(err);
        alert("Oops! Something went wrong. Try again later.");
      }
    },
    registerUser: async function (userDetails) {
      try {
        const info = await axios.post(
          "http://localhost:8070/api/users/signup/",
          userDetails
        );

        //To store in localstorage

        if (info.status == 200) {
          setUser(info.data);
          dispatch({ type: "SetUser", payload: [info.data] });

          if (!info.data.err) alert("Account Created Successfully");
          else alert(info.data.err);

          if (info.data.role === "Entrepreneur") navigate("/entrepreneuship");
          else if (info.data.role === "User") navigate("/");
          else if (info.data.role === "Admin") navigate("/admin");
        } else {
          alert(info.data.err);
        }
      } catch (err) {
        console.log(err);
        alert("Oops! Something went wrong. Try again later.");
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

    getUsersForAdminPage: async function () {
      const { data } = await axios.get("http://localhost:8070/api/users/");

      console.log(data);
      return data;
    },

    deleteUser: async function (userID) {
      try {
        await axios.delete(
          "http://localhost:8070/api/protected/products/deleteAllUserProducts/" +
            userID,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        //To delete the user
        const info = await axios.delete(
          "http://localhost:8070/api/users/deleteUser/" + userID
        );

        if (info.status == 200) {
          alert(
            "User and all his product info has been removed from the system"
          );
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        console.log(err);
      }
    },

    acceptUserRequest: async function (userID) {
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/users/approveUser/" + userID
        );

        if (info.status == 200) {
          alert("User Request Accepted Successfully");
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        console.log(err);
      }
    },

    rejectUserRequest: async function (details) {
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/users/rejectUser/",
          details
        );

        if (info.status == 200) {
          alert("User Request Rejected");
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        console.log(err);
      }
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

        if (info.status == 200) {
          productDispatch({ type: "CreateProduct", payload: info.data });

          alert("Product Request Success!");
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
        return info;
      } catch (err) {
        alert(
          "There seems to be an error. Your Request cannot be fulfilled at the moment"
        );
      }
    },

    updateProductDetails: async function (product) {
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/protected/products/updateProduct/",
          product,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (info.status == 200) {
          alert("Item details updated");
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        alert(
          "There seems to be an error. Product cannot be modified at the moment"
        );
      }
    },

    removeProductDetails: async function (itemID) {
      try {
        const info = await axios.delete(
          "http://localhost:8070/api/protected/products/deleteProduct/" +
            itemID,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              role: user.role,
            },
          }
        );

        if (info.status == 200) {
          alert("Product Deleted");
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        alert(
          "There seems to be an error. Product cannot be removed at the moment"
        );
      }
    },

    markAsRead: async function (details) {
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/protected/products/markAsRead/",
          details,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              role: user.role,
            },
          }
        );

        if (info.status == 200) {
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        alert(
          "There seems to be an error. Product cannot be removed at the moment"
        );
      }
    },

    acceptProductRequest: async function (productID) {
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/protected/products/approveProduct/" +
            productID,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              role: user.role,
            },
          }
        );

        if (info.status == 200) {
          alert("Product Request Accepted Successfully");
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        console.log(err);
      }
    },

    rejectProductRequest: async function (details) {
      try {
        const info = await axios.patch(
          "http://localhost:8070/api/protected/products/rejectProduct/",
          details,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              role: user.role,
            },
          }
        );

        if (info.status == 200) {
          alert("Product Request Rejected");
          return info.data;
        } else
          alert(
            "There seems to be an error. Your Request cannot be fulfilled at the moment"
          );
      } catch (err) {
        console.log(err);
      }
    },
  };
};
