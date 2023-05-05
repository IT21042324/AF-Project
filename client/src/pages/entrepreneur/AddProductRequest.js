import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserContext } from "../../hooks/useUserContext";

export function AddProductRequest() {
  const { user1 } = UseUserContext();
  const { saveProduct } = UseBackendAPI();

  // Setting initial state for the product picture as an empty string
  const [image, setProductPicture] = useState("");

  // Function for converting the selected image file to base64 format
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setProductPicture(reader.result);
    reader.onerror = (error) => console.log("error: ", error);
  }

  const productName = useRef(),
    description = useRef(),
    price = useRef(),
    quantity = useRef(),
    imageInputRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const data = await saveProduct({
      productName: productName.current.value,
      description: description.current.value,
      price: price.current.value,
      quantity: quantity.current.value,
      image,
    });

    //To clear the form after submission
    productName.current.value = "";
    description.current.value = "";
    price.current.value = "";
    quantity.current.value = "";
    imageInputRef.current.value = "";
  };

  return (
    <div>
      <section className="main-wrap">
        <div
          className="content-main"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h2 style={{ float: "left" }}>Add New Product</h2>
            <br />
            <p style={{ float: "left" }}>Make A New Product Request Here</p>
          </div>
          <div>
            <Link className="btn btn-primary" to={"/entrepreneurship"}>
              Back
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <header className="card-header">
              <h4>Product</h4>
              <div>
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Submit"
                />
              </div>
            </header>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    Product title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Type here"
                    ref={productName}
                    required
                  />
                </div>
                <div className="col">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    Product description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Type here"
                    ref={description}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="0"
                    ref={quantity}
                    required
                  />
                </div>
                <div className="col">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="0.00"
                    onChange={(e) => convertToBase64(e)}
                    ref={imageInputRef}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label for="validationCustom01">Unit Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="0.00"
                    ref={price}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
