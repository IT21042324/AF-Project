import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPerson, faCubes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseProductContext } from "../../hooks/useProductContext";
import { UseUserContext } from "../../hooks/useUserContext";

export const EntrepreneurDashBoard = (props) => {
  const { logoutUser } = UseUserContext();

  const [mechantIsLoggedIn, setMerchantIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!mechantIsLoggedIn) {
      logoutUser();
    }
  }, [mechantIsLoggedIn]);

  const logoutFunction = () => {
    setMerchantIsLoggedIn(false);
    alert("Logged Out");
  };

  const product = UseProductContext().products;

  const [productCount, setProductCount] = useState(0);
  const [approvedProductCount, setApprovedProductCount] = useState(0);
  const [partiesCount, setPartiesCount] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(product);

    setProductCount(product.length);

    const approvedProduct = product.filter((prod) => prod.isApprovedByAdmin);
    setApprovedProductCount(approvedProduct.length);

    const discussionsByUser = product
      .flatMap((prod) =>
        prod.discussion.map((discussion) => ({
          ...discussion,
          productId: prod._id,
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

    setPartiesCount(discussionsByUser.length);
  }, []);

  return (
    <div>
      {mechantIsLoggedIn ? (
        <>
          <div
            className="content-main"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2>{props.title}</h2>
              <p
                style={{
                  color: "black",
                  float: "left",
                }}
              >
                {props.subTitle}
              </p>
            </div>
            <div>
              <input
                type="Button"
                className="btn btn-primary"
                onClick={(e) => logoutFunction()}
                value="Logout"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Approved Products</h6>
                    <span>{approvedProductCount}</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-success-light">
                    <FontAwesomeIcon icon={faPerson} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Interested Parties</h6>
                    <span>{partiesCount}</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-warning-light">
                    <FontAwesomeIcon icon={faCubes} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Total Products</h6>
                    <span>{productCount}</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
