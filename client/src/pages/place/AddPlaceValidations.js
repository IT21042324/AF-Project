export function validateForm(placeName, placeDescription, imageUrl) {

    //validation for place name
    if (placeName.length < 3 || placeName.length > 30) {
      alert("Place Name should be between 3 and 30 characters.");
      return false;
    }

    //validation for place description
    if (placeDescription.length < 25) {
      alert("Place Description should be at least 25 characters.");
      return false;
    }

    //validation for place image
    if (!imageUrl) {
      alert("Place Image should be uploaded.");
      return false;
    }

    return true;
  }