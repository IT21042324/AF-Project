import { validateForm } from "../pages/accommodations/AddHotelValidations";
global.alert=jest.fn();

describe('validateForm', () => {
  it('should return true when both distance and cheapestPrice are valid numbers', () => {
    const distance = '10.5';
    const cheapestPrice = '50.99';
    const result = validateForm(distance, cheapestPrice);
    expect(result).toBe(true);
  });

  it('should display an alert and return false when distance is not a valid number', () => {
    const distance = 'invalid';
    const cheapestPrice = '50.99';

    const result = validateForm(distance, cheapestPrice);

    expect(result).toBe(false);
  });

  it('should display an alert and return false when cheapestPrice is not a valid number', () => {
    const distance = '10.5';
    const cheapestPrice = 'invalid';


    const result = validateForm(distance, cheapestPrice);

    expect(result).toBe(false);
  });

  it('should display an alert and return false when both distance and cheapestPrice are not valid numbers', () => {
    const distance = 'invalid';
    const cheapestPrice = 'invalid';


    const result = validateForm(distance, cheapestPrice);
    expect(result).toBe(false);
  });
});