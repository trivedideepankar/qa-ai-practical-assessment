import { expect } from "@playwright/test";
import loggerUtilities from "../../commonUtils/loggerUtil";

class checkoutPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.country = page.locator("[data-test='country']");
    this.postalCode = page.locator("[data-test='postal_code']");
    this.houseNumber = page.locator("[data-test='house_number']");
    this.street = page.locator("[data-test='street']");
    this.city = page.locator("[data-test='city']");
    this.state = page.locator("[data-test='state']");
    this.proceedStep3 = page.locator("[data-test='proceed-3']");
    this.paymentMethod = page.locator("[data-test='payment-method']");
    this.finishButton = page.locator("[data-test='finish']");
  }

  async fillBillingAddress(user) {
    await this.houseNumber.waitFor({ state: "visible", timeout: 15000 });
    const house = user.houseNumber || "123";

    await this.country.selectOption({ value: user.country || "US" });
    await this.postalCode.fill(user.postalCode);
    await this.page.waitForTimeout(1500);
    await this.street.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.houseNumber.fill(house);
    await this.houseNumber.press("Tab");
    await this.page.waitForTimeout(500);
    if ((await this.houseNumber.inputValue()) !== house) {
      await this.houseNumber.fill(house);
    }
    await expect(this.houseNumber).toHaveValue(house);
    this.log.logger("Filled checkout billing address");
  }

  async ensureBillingReady(user) {
    const house = user.houseNumber || "123";
    if ((await this.houseNumber.inputValue()) !== house) {
      await this.houseNumber.fill(house);
      await this.houseNumber.press("Tab");
    }
    await expect(this.houseNumber).toHaveValue(house);
    await expect(this.proceedStep3).toBeEnabled({ timeout: 15000 });
  }

  async selectCashOnDelivery() {
    await this.paymentMethod.waitFor({ state: "visible", timeout: 15000 });
    await this.paymentMethod.selectOption("cash-on-delivery");
    await expect(this.paymentMethod).toHaveValue("cash-on-delivery");
    this.log.logger("Selected Cash on Delivery payment method");
  }

  /**
   * Assessment requirement: invoice generation requires Confirm clicked TWICE.
   * First click processes payment; second click completes the order/invoice.
   */
  async confirmOrderTwice() {
    await expect(this.finishButton).toBeEnabled({ timeout: 15000 });
    await this.finishButton.click();
    await expect(this.page.getByText(/Payment was successful/i)).toBeVisible({
      timeout: 30000,
    });
    await this.page.waitForTimeout(2000);
    await expect(this.finishButton).toBeEnabled({ timeout: 15000 });
    await this.finishButton.click();
    await expect(this.page.getByText(/Thanks for your order/i)).toBeVisible({
      timeout: 30000,
    });
    this.log.logger("Clicked Confirm (finish) twice for invoice generation");
  }

  async completeCheckoutWithCOD(user) {
    await this.fillBillingAddress(user);
    await this.ensureBillingReady(user);
    await this.proceedStep3.click();
    await expect(this.page.getByRole("heading", { name: "Payment" })).toBeVisible({
      timeout: 15000,
    });
    await this.selectCashOnDelivery();
    await this.confirmOrderTwice();
    this.log.logger("Completed checkout with Cash on Delivery");
  }
}

export default { checkoutPage };
