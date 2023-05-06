import { Product } from "./Product";
import { UseProductContext } from "../hooks/useProductContext";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchComponent";

export const ProductMapper = () => {
  const product = UseProductContext().products;
  const [search, setSearch] = useState("");

  const [products, SetProducts] = useState([]);

  useEffect(() => {
    SetProducts(product);
  }, [product]);

  function getSearchValue(searchResult) {
    setSearch(searchResult);
  }

  return (
    <div>
      <SearchBar functionSearch={getSearchValue} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {products
          .filter(
            (dat) =>
              (dat.productName.toLowerCase().includes(search.toLowerCase()) ||
                dat.userName.toLowerCase().includes(search.toLowerCase())) &&
              dat.isApprovedByAdmin === "Approved"
          )
          .map((dat) => (
            <div
              style={{ flexBasis: `${100 / Math.min(products.length, 8)}%` }}
              key={dat._id}
            >
              <Product details={dat} />
            </div>
          ))}
      </div>
    </div>
  );
};
