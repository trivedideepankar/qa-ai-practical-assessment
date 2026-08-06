import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class invoicePage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.invoiceRow = page.getByRole("row").filter({ hasText: /INV-/i });
  }

  async gotoMyInvoices() {
    await expect(this.page.locator("[data-test='nav-menu']")).toBeVisible({
      timeout: 15000,
    });
    await this.page.goto(`${process.env.BASE_URL}/account/invoices`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    this.log.logger("Navigated to My Invoices");
  }

  async verifyInvoiceListed() {
    await expect(this.invoiceRow.first()).toBeVisible({ timeout: 30000 });
    this.log.logger("Invoice visible in My Invoices list");
  }
}

export default { invoicePage };
