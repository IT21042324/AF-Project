import { createContext, useReducer } from "react";
import React from "react";

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [product, dispatch] = useReducer(reducer, {
    products: [],
  });

  function reducer(state, action) {
    switch (action.type) {
      case "CreateProduct":
        return { products: [action.payload, ...state.products] };

      case "UpdateProduct":
        return {
          ...state,
          products: state.products.map((product) => {
            if (product._id === action.payload._id) {
              return action.payload;
            } else {
              return product;
            }
          }),
        };

      case "SetProducts":
        return { products: action.payload };

      case "RemoveProduct":
        return {
          products: state.products.filter(
            (product) => product._id !== action.payload
          ),
        };

      case "AddReview":
        //[{userID, userName, rating, review},...{}] what a review contains
        //the payload struture {_id (product), userID, userName, rating, review}
        return {
          ...state,
          products: state.products.map((itm) => {
            if (itm._id === action.payload._id) {
              return {
                ...itm,
                reviews: [
                  ...itm.reviews,
                  {
                    userID: action.payload.userID,
                    userName: action.payload.userName,
                    rating: action.payload.rating,
                    review: action.payload.review,
                  },
                ],
              };
            } else {
              return itm;
            }
          }),
        };

      case "DeleteReview": {
        return {
          ...state,
          products: state.products.map((itm) => {
            if (itm._id === action.payload._id) {
              return {
                ...itm,
                reviews: itm.reviews.filter(
                  (rev) => rev.userID !== action.payload.userID
                ),
              };
            } else return itm;
          }),
        };
      }

      case "DeleteProducts":
        return {
          products: state.products.filter((data) => {
            return data._id !== action.payload._id;
          }),
        };

      default:
        return state;
    }
  }

  return (
    <ProductContext.Provider value={{ ...product, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};
