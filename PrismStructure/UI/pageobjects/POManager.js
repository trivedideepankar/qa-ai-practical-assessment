const { navigationBar } = require("./navigationBar");
const { loginPage } = require("./loginPage").default;
const { registerPage } = require("./registerPage").default;
const { productPage } = require("./productPage").default;
const { cartPage } = require("./cartPage").default;
const { checkoutPage } = require("./checkoutPage").default;
const { invoicePage } = require("./invoicePage").default;
const { profilePage } = require("./profilePage").default;

/** Common class to create page object references for Toolshop tests. */
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(page);
    this.registerPage = new registerPage(page);
    this.productPage = new productPage(page);
    this.cartPage = new cartPage(page);
    this.checkoutPage = new checkoutPage(page);
    this.invoicePage = new invoicePage(page);
    this.profilePage = new profilePage(page);
    this.navigationBar = new navigationBar(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getInvoicePage() {
    return this.invoicePage;
  }

  getProfilePage() {
    return this.profilePage;
  }

  getNavigationBar() {
    return this.navigationBar;
  }
}

module.exports = { POManager };
