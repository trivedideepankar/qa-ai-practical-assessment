/**
 * Shared runtime data across API/UI tests (token, cart, user, invoice).
 * Follows Prism createDynamicData getter/setter pattern.
 */
class SharedTestData {
  static accessToken = null;
  static cartId = null;
  static userId = null;
  static userEmail = null;
  static userPassword = null;
  static productIds = [];
  static invoiceId = null;

  static setAuth(token, userId = null, email = null, password = null) {
    SharedTestData.accessToken = token;
    if (userId) SharedTestData.userId = userId;
    if (email) SharedTestData.userEmail = email;
    if (password) SharedTestData.userPassword = password;
  }

  static setCart(cartId) {
    SharedTestData.cartId = cartId;
  }

  static setProducts(productIds) {
    SharedTestData.productIds = productIds;
  }

  static setInvoice(invoiceId) {
    SharedTestData.invoiceId = invoiceId;
  }

  static getAuthHeader() {
    return {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${SharedTestData.accessToken}`,
    };
  }

  static getJsonHeader() {
    return {
      accept: "application/json",
      "Content-Type": "application/json",
    };
  }
}

class DynamicData {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}

module.exports = { DynamicData, SharedTestData };
