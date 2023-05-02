import { useContext, useEffect } from "react";
import { ProductContext } from "./productContext";
import axios from "axios";

export const UseProductContext = () => {
  const productContext = useContext(ProductContext);
  const { dispatch, products } = productContext;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:8070/api/products/");
        dispatch({
          type: "SetProducts",
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function hasUserReviewedProduct(productId, userId) {
    const product = products.find((product) => product.id === productId);

    const hasReviewed = product.reviews.some(
      (review) => review.userId === userId
    );

    return hasReviewed;
  }
  return { productContext, dispatch, products, hasUserReviewedProduct };
};
