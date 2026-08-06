import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class cartPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.cartQuantity = page.locator("[data-test='cart-quantity']");
    this.proceedStep1 = page.locator("[data-test='proceed-1']");
    this.proceedStep2 = page.locator("[data-test='proceed-2']");
    this.continueShopping = page.locator("[data-test='continue-shopping']");
    this.billingHouseNumber = page.locator("[data-test='house_number']");
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/checkout`, {
      waitUntil: "domcontentloaded",
    });
    this.log.logger("Navigated to checkout page");
  }

  async verifyCartHasItems(minQty = 1) {
    await expect(this.cartQuantity).toBeVisible();
    const qty = Number(await this.cartQuantity.textContent());
    expect(qty).toBeGreaterThanOrEqual(minQty);
    this.log.logger(`Cart has ${qty} item(s)`);
  }

  /**
   * Checkout wizard: Cart (proceed-1) → Sign-in (proceed-2 when logged in) → Billing.
   */
  async proceedToCheckoutStep() {
    const proceed1 = this.proceedStep1;
    await proceed1.waitFor({ state: "visible", timeout: 15000 });
    if (await proceed1.isEnabled()) {
      await proceed1.click();
    }
    await expect(this.proceedStep2).toBeEnabled({ timeout: 15000 });
    await this.proceedStep2.click();
    await expect(this.billingHouseNumber).toBeVisible({ timeout: 15000 });
    this.log.logger("Advanced to billing step");
  }

  async verifyEmptyCartState() {
    const hasContinueShopping = await this.continueShopping.isVisible();
    const qtyHidden =
      (await this.cartQuantity.count()) === 0 ||
      (await this.cartQuantity.textContent()) === "";
    expect(hasContinueShopping || qtyHidden).toBeTruthy();
    this.log.logger("Empty cart state verified");
  }
}

export default { cartPage };
