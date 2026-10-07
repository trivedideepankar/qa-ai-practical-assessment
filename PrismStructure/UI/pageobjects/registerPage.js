import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class registerPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.firstName = page.locator("[data-test='first-name']");
    this.lastName = page.locator("[data-test='last-name']");
    this.email = page.locator("[data-test='email']");
    this.password = page.locator("[data-test='password']");
    this.dob = page.locator("[data-test='dob']");
    this.country = page.locator("[data-test='country']");
    this.postalCode = page.locator("[data-test='postal_code']");
    this.houseNumber = page.locator("[data-test='house_number']");
    this.street = page.locator("[data-test='street']");
    this.city = page.locator("[data-test='city']");
    this.state = page.locator("[data-test='state']");
    this.phone = page.locator("[data-test='phone']");
    this.registerButton = page.locator(
      "[data-test='register-submit'], button:has-text('Register')"
    );
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/auth/register`, {
      waitUntil: "domcontentloaded",
    });
    await this.firstName.waitFor({ state: "visible" });
    this.log.logger("Navigated to register page");
  }

  async fillRegistrationForm(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);
    await this.country.selectOption({
      label: "United States of America (the)",
    });
    await this.postalCode.fill(user.postalCode);
    await this.houseNumber.fill(user.houseNumber || "123");
    await this.street.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    this.log.logger(`Filled registration form for ${user.email}`);
  }

  async submit() {
    await this.registerButton.first().click();
    this.log.logger("Submitted registration form");
  }

  async register(user) {
    await this.fillRegistrationForm(user);
    await this.submit();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page).toHaveURL(/auth\/login/, { timeout: 15000 });
    this.log.logger("Registration success verified");
  }
}

export default { registerPage };
