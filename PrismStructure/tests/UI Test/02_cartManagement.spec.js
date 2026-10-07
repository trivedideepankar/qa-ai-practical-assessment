const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const {
  buildRegistrationData,
} = require("../../API/utilities/testDataGenerator");
const utils = require("../../commonUtils/utils");

test.describe("Cart Management", () => {
  let poManager;
  let registerPage;
  let loginPage;
  let productPage;
  let cartPage;
  let testUser;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    registerPage = poManager.getRegisterPage();
    loginPage = poManager.getLoginPage();
    productPage = poManager.getProductPage();
    cartPage = poManager.getCartPage();
    testUser = buildRegistrationData();

    await registerPage.goto();
    await registerPage.register(testUser);
    await registerPage.verifyRegistrationSuccess();
    await loginPage.login(testUser.email, testUser.password);
  });

  test("UI-04 Add multiple products and update cart quantity @regression", async () => {
    await utils.addTestAnnotationsByKeyword("cart");
    await productPage.addMultipleInStockProducts(2);
    await productPage.verifyCartQuantity(2);
    await productPage.openCart();
    await cartPage.verifyCartHasItems(2);
  });
});
