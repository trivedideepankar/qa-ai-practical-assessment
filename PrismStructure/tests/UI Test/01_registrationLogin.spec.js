const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const {
  buildRegistrationData,
} = require("../../API/utilities/testDataGenerator");
const utils = require("../../commonUtils/utils");

test.describe("Registration and Login", () => {
  let poManager;
  let registerPage;
  let loginPage;
  let profilePage;
  let navigationBar;
  let testUser;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    registerPage = poManager.getRegisterPage();
    loginPage = poManager.getLoginPage();
    profilePage = poManager.getProfilePage();
    navigationBar = poManager.getNavigationBar();
    testUser = buildRegistrationData();
  });

  test("UI-01 Register new user with valid details @smoke @regression", async () => {
    await utils.addTestAnnotationsByKeyword("registration");
    await registerPage.goto();
    await registerPage.register(testUser);
    await registerPage.verifyRegistrationSuccess();
  });

  test("UI-02 Login and verify profile @smoke @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("login");
    await registerPage.goto();
    await registerPage.register(testUser);
    await registerPage.verifyRegistrationSuccess();
    await loginPage.login(testUser.email, testUser.password);
    await navigationBar.verifyUserLoggedIn();
    await profilePage.goto();
    await profilePage.verifyProfileDetails(testUser);
    await page.context().storageState({ path: "./storeBrowserState.json" });
  });

  test("UI-03 Login with invalid password shows error @regression", async () => {
    await utils.addTestAnnotationsByKeyword("login");
    await registerPage.goto();
    await registerPage.register(testUser);
    await registerPage.verifyRegistrationSuccess();
    await loginPage.attemptLogin(testUser.email, "WrongPassword123!");
    await loginPage.verifyLoginError();
  });
});
