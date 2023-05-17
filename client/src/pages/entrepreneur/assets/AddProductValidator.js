export function validateForm(productName, description, price, quantity, image) {
  let isValid = true;
  if (!productName) {
    alert("Please enter a product name");
    isValid = false;
  } else if (!description) {
    alert("Please enter a product description");
    isValid = false;
  } else if (!price) {
    alert("Please enter a product price");
    isValid = false;
  } else if (!quantity) {
    alert("Please enter a product quantity");
    isValid = false;
  } else if (image == "") {
    alert("Please enter a image");
    isValid = false;
  }
  return isValid;
}
