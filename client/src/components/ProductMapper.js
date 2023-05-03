import { Product } from "./Product";
import { UseProductContext } from "../context/useProductContext";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchComponent";

export const ProductMapper = () => {
  const product = UseProductContext();
  const [search, setSearch] = useState("");

  const [products, SetProducts] = useState([]);

  useEffect(() => {
    SetProducts(product.products);
  }, [products]);

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
          .filter((dat) => {
            return (
              dat.itemName.toLowerCase().includes(search.toLowerCase()) ||
              dat.storeName.toLowerCase().includes(search.toLowerCase())
            );
          })
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