import { ValidateBookevent } from "../pages/culturalEvents/Bookeventvalidations";
global.alert = jest.fn();

describe("ValidateBookevent", () => {
  test("returns true for valid inputs", () => {
    // Arrange
    const name = "John Doe";
    const phone = "1234567890";
    const numberOfTickets = "5";
    const price = "100";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(true);
  });

  test("returns false if name is empty", () => {
    // Arrange
    const name = "";
    const phone = "1234567890";
    const numberOfTickets = "5";
    const price = "100";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if phone is empty", () => {
    // Arrange
    const name = "John Doe";
    const phone = "";
    const numberOfTickets = "5";
    const price = "100";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if phone is not valid", () => {
    // Arrange
    const name = "John Doe";
    const phone = "12345";
    const numberOfTickets = "5";
    const price = "100";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if number of tickets is empty", () => {
    // Arrange
    const name = "John Doe";
    const phone = "1234567890";
    const numberOfTickets = "";
    const price = "100";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if number of tickets is not between 1 and 10", () => {
    // Arrange
    const name = "John Doe";
    const phone = "1234567890";
    const numberOfTickets = "15";
    const price = "100";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if price is empty", () => {
    // Arrange
    const name = "John Doe";
    const phone = "1234567890";
    const numberOfTickets = "5";
    const price = "";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });

  test("returns false if price is not a number", () => {
    // Arrange
    const name = "John Doe";
    const phone = "1234567890";
    const numberOfTickets = "5";
    const price = "abc";

    // Act
    const result = ValidateBookevent(name, phone, numberOfTickets, price);

    // Assert
    expect(result).toBe(false);
  });
});
