import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class loginPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.email = page.locator("[data-test='email']");
    this.password = page.locator("[data-test='password']");
    this.loginButton = page.locator("[data-test='login-submit']");
    this.errorAlert = page.locator(
      ".alert-danger, .invalid-feedback, .text-danger, [role='alert']"
    );
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/auth/login`, {
      waitUntil: "domcontentloaded",
    });
    await this.email.waitFor({ state: "visible" });
    this.log.logger("Navigated to login page");
  }

  async attemptLogin(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    this.log.logger(`Submitted login for ${email}`);
  }

  async login(email, password) {
    await this.attemptLogin(email, password);
    await this.page.waitForSelector("[data-test='nav-menu']", { timeout: 15000 });
    this.log.logger(`Logged in as ${email}`);
  }

  async verifyLoginError() {
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(
      this.errorAlert.or(this.page.getByText(/incorrect|invalid|wrong/i))
    ).toBeVisible({ timeout: 10000 });
    this.log.logger("Login error message displayed");
  }
}

export default { loginPage };
