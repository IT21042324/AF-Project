import { render, screen, fireEvent } from "@testing-library/react";
import AddHotelForm from "../pages/admin/AddHotel"
import axios from "axios";

describe("AddHotelForm component", () => {
  test("submits form with valid input", () => {
    render(<AddHotelForm />);

    const nameInput = screen.getByLabelText("Hotel Name");
    const typeSelect = screen.getByLabelText("Accommodation Type");
    const cityInput = screen.getByLabelText("City");
    const addressInput = screen.getByLabelText("Address");
    const distanceInput = screen.getByLabelText("Distance");
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const cheapestPriceInput = screen.getByLabelText("Cheapest Price $ per night");
    const termsCheckbox = screen.getByLabelText("Above information is valid");

    fireEvent.change(nameInput, { target: { value: "Test Hotel" } });
    fireEvent.change(typeSelect, { target: { value: "Hotel" } });
    fireEvent.change(cityInput, { target: { value: "Test City" } });
    fireEvent.change(addressInput, { target: { value: "Test Address" } });
    fireEvent.change(distanceInput, { target: { value: "10" } });
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
    fireEvent.change(cheapestPriceInput, { target: { value: "100.50" } });
    fireEvent.click(termsCheckbox);

    const submitButton = screen.getByRole("button", { name: "Insert Hotel" });
    fireEvent.click(submitButton);

    expect(screen.queryByText("Hotel Successfully added")).toBeInTheDocument();
  });

  test("displays an error message if a required field is not filled", () => {
    render(<AddHotelForm />);

    const submitButton = screen.getByRole("button", { name: "Insert Hotel" });
    fireEvent.click(submitButton);

    expect(screen.queryByText("Please fill out this field.")).toBeInTheDocument();
  });

  test("displays an error message if distance is not a valid number", () => {
    render(<AddHotelForm />);

    const distanceInput = screen.getByLabelText("Distance");
    fireEvent.change(distanceInput, { target: { value: "invalid" } });

    expect(screen.queryByText("Please enter a valid Distance.")).toBeInTheDocument();
  });

  test("displays an error message if cheapestPrice is not a valid number", () => {
    render(<AddHotelForm />);

    const cheapestPriceInput = screen.getByLabelText("Cheapest Price $ per night");
    fireEvent.change(cheapestPriceInput, { target: { value: "invalid" } });

    expect(screen.queryByText("Please enter a valid Price.")).toBeInTheDocument();
  });
});
