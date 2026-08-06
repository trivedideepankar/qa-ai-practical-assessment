import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class profilePage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.firstName = page.locator("[data-test='first-name']");
    this.lastName = page.locator("[data-test='last-name']");
    this.email = page.locator("[data-test='email']");
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/account/profile`, {
      waitUntil: "domcontentloaded",
    });
    await this.firstName.waitFor({ state: "visible" });
    this.log.logger("Navigated to profile page");
  }

  async verifyProfileDetails(expectedUser) {
    await expect(this.firstName).toHaveValue(expectedUser.firstName);
    await expect(this.lastName).toHaveValue(expectedUser.lastName);
    await expect(this.email).toHaveValue(expectedUser.email);
    this.log.logger("Profile details verified");
  }
}

export default { profilePage };
