import axios from "axios";
import { UseUserContext } from "../hooks/useUserContext";
import { SendEmail } from "../components/SendEmail";
import { useNavigate } from "react-router-dom";
import { UseProductContext } from "../hooks/useProductContext";
import { EmailJSKeyWords } from "../pages/entrepreneur/EmailJSKeyWords";

export const UseBackendAPI = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { dispatch, setUser, getUser } = UseUserContext();
  const user = getUser();

  const productDispatch = UseProductContext().dispatch;

  const navigate = useNavigate();

  const {
    user_registered_message,
    message,
    user_accepted_message,
    user_rejected_message,
    user_rejected_by_admin_title,
    user_accepted_by_admin_title,
    account_registered_title,
  } = EmailJSKeyWords();

  return {
    login: async function (userDetails) {
      console.log(backendUrl);
      try {
        const info = await axios.post(
          `${backendUrl}/api/users/login/`,
          userDetails
        );

        console.log(info);

        if (info.status == 200) {
          if (info.data.userIsApprovedByAdmin || info.data.role === "User") {
            async function configureUser() {
              localStorage.setItem("user", JSON.stringify(info.data));
              dispatch({ type: "SetUser", payload: [info.data] });
            }
            await configureUser();

            if (user?.role === "User") navigate("/");
            else if (user.role === "Entrepreneur")
              navigate("/entrepreneurship");
            else if (user?.role === "Admin") navigate("/admin");
          } else
            alert("Your Account is under review. Check your email for updates");
        } else {
          alert(info.data.err);
        }
      } catch (err) {
        const errMsg = err.response.data.err;
        alert(errMsg);
      }
    },
    registerUser: async function (userDetails) {
      try {
        const info = await axios.post(
          `${backendUrl}/api/users/signup/`,
          userDetails
        );

        if (info.status == 200) {
          SendEmail({
            user_name: userDetails.userName,
            main_message: user_registered_message,
            message,
            title: account_registered_title,
          });

          if (info.data) {
            if (info.data.userIsApprovedByAdmin || info.data.role === "User") {
              setUser(info.data);
              dispatch({ type: "SetUser", payload: [info.data] });

              if (!info.data.err) alert("Account Created Successfully");
              else alert(info.data.err);

              if (info.data.role === "Entrepreneur")
                navigate("/entrepreneurship");
              else if (info.data.role === "User") navigate("/");
              else if (info.data.role === "Admin") navigate("/admin");
            } else {
              alert(
                "Your account has been created Successfully. We will try to reach you through email regarding your account confirmation"
              );
              navigate("/");
            }
          }
        } else {
          alert(info.data.err);
        }
      } catch (err) {
        const errMsg = err.response.data.err;
        alert(errMsg);
      }
    },

    updateUserProfileDetails: async function (userDetailsToUpdate) {
      userDetailsToUpdate.userId = user._id;
      try {
        const info = await axios.patch(
          `${backendUrl}/api/users/update/`,
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
      const { data } = await axios.get(`${backendUrl}/api/users/`);

      console.log(data);
      return data;
    },

    deleteUser: async function (userID) {
      try {
        await axios.delete(
          `${backendUrl}/api/protected/products/deleteAllUserProducts/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        //To delete the user
        const info = await axios.delete(
          `${backendUrl}/api/users/deleteUser/${userID}`
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

    acceptUserRequest: async function (userID, userName) {
      try {
        const info = await axios.patch(
          `${backendUrl}/api/users/approveUser/${userID}`
        );

        if (info.status == 200) {
          alert("User Request Accepted Successfully");
          SendEmail({
            title: user_accepted_by_admin_title,
            user_name: userName,
            main_message: user_accepted_message,
            message,
          });
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
          `${backendUrl}/api/users/rejectUser/`,
          details
        );

        if (info.status == 200) {
          alert("User Request Rejected");
          SendEmail({
            title: user_rejected_by_admin_title,
            user_name: details.userName,
            main_message: user_rejected_message,
            message: `Reason For Rejection : ${details.rejectionReason}`,
          });
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
          `${backendUrl}/api/protected/products/addProduct/`,
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
          `${backendUrl}/api/protected/products/updateProduct/`,
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
          `${backendUrl}/api/protected/products/deleteProduct/${itemID}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
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
          `${backendUrl}/api/protected/products/markAsRead/`,
          details,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
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
        console.log(user);

        const info = await axios.patch(
          `${backendUrl}/api/protected/products/approveProduct/${productID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
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
          `${backendUrl}/api/protected/products/rejectProduct/`,
          details,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
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

    sendMessage: async function (details) {
      try {
        const info = await axios.patch(
          `${backendUrl}/api/protected/products/discussion/addOrUpdateDiscussion/`,
          details,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (info.status == 200) {
          alert("Message Recorded");

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
