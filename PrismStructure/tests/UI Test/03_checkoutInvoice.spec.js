const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const {
  buildRegistrationData,
} = require("../../API/utilities/testDataGenerator");
const utils = require("../../commonUtils/utils");

test.describe("Checkout and Invoice E2E", () => {
  let poManager;
  let registerPage;
  let loginPage;
  let productPage;
  let cartPage;
  let checkoutPage;
  let invoicePage;
  let testUser;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    registerPage = poManager.getRegisterPage();
    loginPage = poManager.getLoginPage();
    productPage = poManager.getProductPage();
    cartPage = poManager.getCartPage();
    checkoutPage = poManager.getCheckoutPage();
    invoicePage = poManager.getInvoicePage();
    testUser = buildRegistrationData();

    await registerPage.goto();
    await registerPage.register(testUser);
    await registerPage.verifyRegistrationSuccess();
    await loginPage.login(testUser.email, testUser.password);
  });

  test("UI-05 Checkout with Cash on Delivery @smoke @regression", async () => {
    await utils.addTestAnnotationsByKeyword("checkout");
    await productPage.addInStockProductToCart();
    await productPage.openCart();
    await cartPage.proceedToCheckoutStep();
    await checkoutPage.completeCheckoutWithCOD(testUser);
  });

  test("UI-06 Generate invoice (confirm twice) and verify in My Invoices @smoke @regression", async () => {
    await utils.addTestAnnotationsByKeyword("invoice");
    await productPage.addInStockProductToCart();
    await productPage.openCart();
    await cartPage.proceedToCheckoutStep();
    await checkoutPage.completeCheckoutWithCOD(testUser);
    await invoicePage.gotoMyInvoices();
    await invoicePage.verifyInvoiceListed();
  });

  test("UI-07 Checkout with empty cart shows appropriate state @regression", async () => {
    await utils.addTestAnnotationsByKeyword("invoice");
    await cartPage.goto();
    await cartPage.verifyEmptyCartState();
  });
});
