import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class navigationBar {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.navMenu = page.locator("[data-test='nav-menu']");
    this.signInLink = page.locator("[data-test='nav-sign-in']");
  }

  async verifyUserLoggedIn() {
    await expect(this.navMenu).toBeVisible({ timeout: 15000 });
    await expect(this.signInLink).not.toBeVisible();
    this.log.logger("User session active — navigation visible");
  }
}

module.exports = { navigationBar };
