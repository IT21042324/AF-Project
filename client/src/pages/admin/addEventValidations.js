export function ValidateAddevent(price) {
  const pattern = /^[0-9]+(\.[0-9]{1,2})?$/;
  if (!pattern.test(price)) {
    setErrorMessage("Please enter a valid price (e.g. 123.45)");
    return false;
  }
}
