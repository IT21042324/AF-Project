export function ValidateBookevent(name, phone, numberOfTickets, price) {
  if (name.trim() === "") {
    valid = false;
    alert("Please enter your name.");
  }

  // validate phone
  if (phone.trim() === "") {
    valid = false;
    alert("Please enter your phone number.");
  } else if (!/^\d{10}$/.test(phone)) {
    valid = false;
    alert("Please enter a valid phone number.");
  }
  // validate number of tickets
  if (numberOfTickets.trim() === "") {
    valid = false;
    alert("Please enter the number of tickets.");
  } else if (numberOfTickets < 1 || numberOfTickets > 10) {
    valid = false;
    alert("Please enter a number between 1 and 10.");
  }
  // validate price
  if (price.trim() === "") {
    valid = false;
    alert("Please enter the price.");
  } else if (isNaN(price)) {
    valid = false;
    alert("Please enter a valid price.");
  }
}
