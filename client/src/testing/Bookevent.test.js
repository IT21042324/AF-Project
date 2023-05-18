describe("Form Validations", () => {
  let valid, alertMessages;

  beforeEach(() => {
    valid = true;
    alertMessages = [];

    // Mocking the alert function
    global.alert = (message) => {
      alertMessages.push(message);
    };
  });

  afterEach(() => {
    alertMessages = [];
  });

  it("should validate name field", () => {
    const name = "";

    if (name.trim() === "") {
      valid = false;
      alert("Please enter your name.");
    }

    expect(valid).toBe(false);
    expect(alertMessages).toContain("Please enter your name.");
  });

  it("should validate phone field", () => {
    const phone = "";

    if (phone.trim() === "") {
      valid = false;
      alert("Please enter your phone number.");
    } else if (!/^\d{10}$/.test(phone)) {
      valid = false;
      alert("Please enter a valid phone number.");
    }

    expect(valid).toBe(false);
    expect(alertMessages).toContain("Please enter your phone number.");
  });

  it("should validate number of tickets field", () => {
    const numberOfTickets = "";

    if (numberOfTickets.trim() === "") {
      valid = false;
      alert("Please enter the number of tickets.");
    } else if (numberOfTickets < 1 || numberOfTickets > 10) {
      valid = false;
      alert("Please enter a number between 1 and 10.");
    }

    expect(valid).toBe(false);
    expect(alertMessages).toContain("Please enter the number of tickets.");
  });

  it("should validate price field", () => {
    const price = "";

    if (price.trim() === "") {
      valid = false;
      alert("Please enter the price.");
    } else if (isNaN(price)) {
      valid = false;
      alert("Please enter a valid price.");
    }

    expect(valid).toBe(false);
    expect(alertMessages).toContain("Please enter the price.");
  });
});
