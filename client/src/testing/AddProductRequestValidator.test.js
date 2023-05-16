import { validateForm } from "../pages/entrepreneur/assets/AddProductValidator";
global.alert = jest.fn();

describe("validateForm", () => {
  test("should return false if productName is empty", () => {
    expect(validateForm("", "description", 10, 1, "image")).toBe(false);
  });
  test("should return false if description is empty", () => {
    expect(validateForm("productName", "", 10, 1, "image")).toBe(false);
  });
  test("should return false if price is empty", () => {
    expect(validateForm("productName", "description", "", 1, "image")).toBe(
      false
    );
  });
  test("should return false if quantity is empty", () => {
    expect(validateForm("productName", "description", 10, "", "image")).toBe(
      false
    );
  });
  test("should return false if image is empty", () => {
    expect(validateForm("productName", "description", 10, 1, "")).toBe(false);
  });
  test("should return true if all fields are filled", () => {
    expect(validateForm("productName", "description", 10, 1, "image")).toBe(
      true
    );
  });
});
