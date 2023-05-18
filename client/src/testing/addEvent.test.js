describe("ValidateAddevent", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("returns true if the price is a valid number with two decimal places", () => {
    const price = "123.45";
    const result = ValidateAddevent(price);
    expect(result).toBe(true);
  });

  it("returns true if the price is a valid integer", () => {
    const price = "100";
    const result = ValidateAddevent(price);
    expect(result).toBe(true);
  });

  it("returns false and sets an error message if the price is not a valid number", () => {
    const price = "abc";
    const setErrorMessage = jest.fn();
    const result = ValidateAddevent(price);
    expect(result).toBe(false);
    expect(setErrorMessage).toHaveBeenCalledWith(
      "Please enter a valid price (e.g. 123.45)"
    );
  });

  it("returns false and sets an error message if the price has more than two decimal places", () => {
    const price = "123.456";
    const setErrorMessage = jest.fn();
    const result = ValidateAddevent(price);
    expect(result).toBe(false);
    expect(setErrorMessage).toHaveBeenCalledWith(
      "Please enter a valid price (e.g. 123.45)"
    );
  });
});
