
//form validation
export function validateForm(distance, cheapestPrice) {

    // Validation for distance
  if (isNaN(parseFloat(distance)) || parseFloat(distance) < 0) {
    alert("Please enter a valid Distance.");
    return false;
  }

  // Validation for cheapestPrice
  if (isNaN(parseFloat(cheapestPrice)) || parseFloat(cheapestPrice) < 0) {
    alert("Please enter a valid Price.");
    return false;
  }

    return true;
  }