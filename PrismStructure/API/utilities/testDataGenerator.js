const { faker } = require("@faker-js/faker");

/**
 * API requires uppercase, lowercase, and symbol; avoid common leaked passwords.
 */
function generateStrongPassword() {
  const suffix = faker.string.alphanumeric(8);
  return `Qa${suffix}!1`;
}

/**
 * Generate registration payload and UI user object for Toolshop.
 */
function buildRegistrationData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet
    .email({ firstName, lastName, provider: "example.com" })
    .toLowerCase();
  const password = generateStrongPassword();
  const address = "123 Main St";
  const houseNumber = "123";
  const postalCode = "10001";
  const city = "New York";
  const state = "New York";
  const phone = faker.string.numeric(10);

  return {
    firstName,
    lastName,
    email,
    password,
    dob: "1990-05-15",
    address,
    houseNumber,
    postalCode,
    city,
    state,
    country: "US",
    phone,
    apiPayload: {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      dob: "1990-05-15",
      address: [address],
      postal_code: postalCode,
      city,
      state,
      country: "US",
      phone,
    },
  };
}

function buildInvoicePayload(cartId) {
  // TG country requires matching city/state from assessment-validated set
  return {
    billing_street: "Zoey Shore",
    billing_city: "Hesselbury",
    billing_state: "Florida",
    billing_country: "TG",
    billing_postal_code: "1234AA",
    payment_method: "cash-on-delivery",
    cart_id: cartId,
    payment_details: {},
  };
}

module.exports = { buildRegistrationData, buildInvoicePayload, generateStrongPassword };
