import { validateForm } from '../pages/place/AddPlaceValidations';
global.alert = jest.fn();

describe('validateForm', () => {
  test('returns true for valid inputs', () => {
    // Arrange
    const placeName = 'Beautiful Place';
    const placeDescription = 'A stunning place with breathtaking views.';
    const imageUrl = 'https://example.com/image.jpg';

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(true);
  });

  test('returns false if place name length is less than 3', () => {
    // Arrange
    const placeName = 'A';
    const placeDescription = 'A stunning place with breathtaking views.';
    const imageUrl = 'https://example.com/image.jpg';

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test('returns false if place name length is greater than 30', () => {
    // Arrange
    const placeName = 'This is a very long place name exceeding thirty characters.';
    const placeDescription = 'A stunning place with breathtaking views.';
    const imageUrl = 'https://example.com/image.jpg';

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test('returns false if place description length is less than 25', () => {
    // Arrange
    const placeName = 'Beautiful Place';
    const placeDescription = 'Short description.';
    const imageUrl = 'https://example.com/image.jpg';

    // Act
    const result = validateForm(placeName, placeDescription, imageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test('should not display any error when all fields are valid', () => {
    render(<AddPlace />);
    const placeNameInput = screen.getByLabelText('Place Name');
    const placeDescriptionInput = screen.getByLabelText('Place Description');
    const placeImageInput = screen.getByLabelText('Place Image');
    const addButton = screen.getByRole('button', { name: 'Add Place' });

    fireEvent.change(placeNameInput, { target: { value: 'Sample Place' } });
    fireEvent.change(placeDescriptionInput, { target: { value: 'This is a sample place description.' } });
    fireEvent.change(placeImageInput, { target: { files: [new File(['image content'], 'test.png', { type: 'image/png' })] } });
    fireEvent.click(addButton);

    const errorMessage = screen.queryByText(/Place Name should be between 3 and 50 characters.|Place Description should be at least 25 characters.|Place Image should be uploaded./);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
