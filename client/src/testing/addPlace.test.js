import { validateForm } from "../pages/place/AddPlaceValidations";
global.alert = jest.fn();

describe("validateForm", () => {
  test("returns true for valid inputs", () => {
    // Arrange
    const placeName = "Beautiful Place";
    const placeDescription = "A stunning place with breathtaking views.";
    const imageUrl = "https://example.com/image.jpg";

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(true);
  });

  test("returns false if place name length is less than 3", () => {
    // Arrange
    const placeName = "A";
    const placeDescription = "A stunning place with breathtaking views.";
    const imageUrl = "https://example.com/image.jpg";

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if place name length is greater than 30", () => {
    // Arrange
    const placeName =
      "This is a very long place name exceeding thirty characters.";
    const placeDescription = "A stunning place with breathtaking views.";
    const imageUrl = "https://example.com/image.jpg";

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if place description length is less than 25", () => {
    // Arrange
    const placeName = "Beautiful Place";
    const placeDescription = "Short description.";
    const imageUrl = "https://example.com/image.jpg";

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if place image URL is not provided", () => {
    // Arrange
    const placeName = "Beautiful Place";
    const placeDescription = "A stunning place with breathtaking views.";
    const imageUrl = "";

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });
});
