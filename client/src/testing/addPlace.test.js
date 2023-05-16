import { render, screen, fireEvent } from "@testing-library/react";
import { AddPlace } from "../pages/place/AddPlace";

describe("AddPlace component", () => {
  test("should display an error when Place Name is less than 3 characters", () => {
    render(<AddPlace />);
    const placeNameInput = screen.getByLabelText("Place Name");
    const addButton = screen.getByRole("button", { name: "Add Place" });

    fireEvent.change(placeNameInput, { target: { value: "ab" } });
    fireEvent.click(addButton);

    const errorMessage = screen.getByText(
      "Place Name should be between 3 and 50 characters."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display an error when Place Name is more than 50 characters", () => {
    render(<AddPlace />);
    const placeNameInput = screen.getByLabelText("Place Name");
    const addButton = screen.getByRole("button", { name: "Add Place" });

    fireEvent.change(placeNameInput, {
      target: {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a dolor vel neque.",
      },
    });
    fireEvent.click(addButton);

    const errorMessage = screen.getByText(
      "Place Name should be between 3 and 50 characters."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display an error when Place Description is less than 25 characters", () => {
    render(<AddPlace />);
    const placeDescriptionInput = screen.getByLabelText("Place Description");
    const addButton = screen.getByRole("button", { name: "Add Place" });

    fireEvent.change(placeDescriptionInput, {
      target: { value: "Short description." },
    });
    fireEvent.click(addButton);

    const errorMessage = screen.getByText(
      "Place Description should be at least 25 characters."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display an error when Place Image is not uploaded", () => {
    render(<AddPlace />);
    const placeImageInput = screen.getByLabelText("Place Image");
    const addButton = screen.getByRole("button", { name: "Add Place" });

    fireEvent.click(addButton);

    const errorMessage = screen.getByText("Place Image should be uploaded.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should not display any error when all fields are valid", () => {
    render(<AddPlace />);
    const placeNameInput = screen.getByLabelText("Place Name");
    const placeDescriptionInput = screen.getByLabelText("Place Description");
    const placeImageInput = screen.getByLabelText("Place Image");
    const addButton = screen.getByRole("button", { name: "Add Place" });

    fireEvent.change(placeNameInput, { target: { value: "Sample Place" } });
    fireEvent.change(placeDescriptionInput, {
      target: { value: "This is a sample place description." },
    });
    fireEvent.change(placeImageInput, {
      target: {
        files: [new File(["image content"], "test.png", { type: "image/png" })],
      },
    });
    fireEvent.click(addButton);

    const errorMessage = screen.queryByText(
      /Place Name should be between 3 and 50 characters.|Place Description should be at least 25 characters.|Place Image should be uploaded./
    );
    expect(errorMessage).not.toBeInTheDocument();
  });
});
