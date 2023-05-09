import { useEffect, useState } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { Link } from "react-router-dom";
import { UseProductContext } from "../../hooks/useProductContext";
import { EntrepreneurDashBoard } from "./EntrepreneurDashBoard";
import { DiscussionContainer } from "../../components/DiscussionContainer";

export const DiscussionRequest = () => {
  //Accessing necessary variables from the hooks
  const product = UseProductContext().products;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(product);
  }, [product]);

  // Define a state variable to track merchant's login status
  const [productDiscussion, setProductDiscussion] = useState([]);

  useEffect(() => {
    const discussionsByUser = products
      .flatMap((product) =>
        product.discussion.map((discussion) => ({
          ...discussion,
          productId: product._id,
        }))
      )
      .reduce((acc, discussion) => {
        const existingUser = acc.find(
          (user) => user.chatWith === discussion.chatWith
        );
        if (existingUser) {
          existingUser.messages.push(discussion);
        } else {
          acc.push({
            chatWith: discussion.chatWith,
            chatWithName: discussion.chatWithName,
            sender: discussion.sender,
            messages: [discussion],
            productId: discussion.productId,
          });
        }
        return acc;
      }, [])
      .map((user) => ({
        ...user,
        messages: user.messages.sort((a, b) => a.time - b.time),
      }));

    setProductDiscussion(discussionsByUser);
  }, [products]);

  console.log(productDiscussion);

  const [showPopup, setShowPopup] = useState(false);
  const [productForPopUp, setProductForPopUp] = useState({});
  const [userNameToGetData, setUserNameToGetData] = useState("");
  const [userIdToGetData, setUserIdToGetData] = useState("");

  const handleViewProductClick = (productId, chatWithName, chatWith) => {
    const relevantProduct = products.find(
      (product) => product._id === productId
    );

    setProductForPopUp(relevantProduct);
    setUserNameToGetData(chatWithName);
    setUserIdToGetData(chatWith);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="main-wrap">
      <>
        <EntrepreneurDashBoard />

        <div className="card mb-4">
          <header className="card-header">
            <h4>All Notifications</h4>
          </header>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Thread Length</th>

                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productDiscussion.map((data) => {
                    return (
                      <>
                        <tr key={data.time}>
                          <td>{data.chatWithName}</td>
                          <td>pid{data.productId.slice(-4)}</td>

                          <td>
                            {
                              data.messages.filter(
                                (rec) => rec.productId === data.productId
                              ).length
                            }{" "}
                            Messages
                          </td>
                          <td>
                            <Link
                              onClick={(e) => {
                                handleViewProductClick(
                                  data.productId,
                                  data.chatWithName,
                                  data.chatWith
                                );
                              }}
                            >
                              View Disucssions
                            </Link>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showPopup && (
          <div
            className="popup"
            style={{ display: showPopup ? "flex" : "none" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleClosePopup();
              }
            }}
          >
            <div className="popup-content">
              <img
                src={productForPopUp.image}
                alt={productForPopUp.productName}
              />
              <h4 style={{ color: "black" }}>{productForPopUp.productName}</h4>
              <h3>Discussion</h3>
              <div>
                <DiscussionContainer
                  discussionArray={productForPopUp.discussion}
                  productID={productForPopUp._id}
                  userName={userNameToGetData}
                  userID={userIdToGetData}
                  sender="seller"
                />
              </div>
            </div>
          </div>
        )}
      </>
    </section>
  );
};
