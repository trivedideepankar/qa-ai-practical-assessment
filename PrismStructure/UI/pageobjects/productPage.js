import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class productPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.productLinks = page.locator('a[href*="/product/"]');
    this.addToCartButton = page.locator("[data-test='add-to-cart']");
    this.navCart = page.locator("[data-test='nav-cart']");
    this.cartQuantity = page.locator("[data-test='cart-quantity']");
  }

  async gotoHome() {
    await this.page.goto(process.env.BASE_URL, { waitUntil: "domcontentloaded" });
    await this.productLinks.first().waitFor({ state: "visible", timeout: 15000 });
    this.log.logger("Navigated to home/products page");
  }

  async addInStockProductToCart() {
    await this.gotoHome();
    const count = await this.productLinks.count();
    for (let i = 0; i < count; i++) {
      await this.productLinks.nth(i).click();
      await this.page.waitForURL(/\/product\//);
      const addButton = this.addToCartButton;
      if (await addButton.isEnabled()) {
        await addButton.click();
        await this.page.waitForTimeout(1500);
        this.log.logger(`Added in-stock product at index ${i} to cart`);
        return;
      }
      await this.page.goBack();
      await this.page.waitForTimeout(500);
    }
    throw new Error("No in-stock product found to add to cart");
  }

  async addMultipleInStockProducts(count = 2) {
    let added = 0;
    await this.gotoHome();
    const total = await this.productLinks.count();
    for (let i = 0; i < total && added < count; i++) {
      await this.productLinks.nth(i).click();
      await this.page.waitForURL(/\/product\//);
      if (await this.addToCartButton.isEnabled()) {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(1500);
        added++;
      }
      await this.gotoHome();
    }
    expect(added).toBeGreaterThanOrEqual(count);
    this.log.logger(`Added ${added} in-stock product(s) to cart`);
  }

  async openCart() {
    await expect(this.cartQuantity).toBeVisible({ timeout: 15000 });
    await this.navCart.click();
    await this.page.waitForURL(/checkout/, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await this.page.locator("[data-test='proceed-1']").waitFor({
      state: "visible",
      timeout: 15000,
    });
    this.log.logger("Opened cart/checkout");
  }

  async verifyCartQuantity(minQty = 1) {
    await expect(this.cartQuantity).toBeVisible();
    const qty = Number(await this.cartQuantity.textContent());
    expect(qty).toBeGreaterThanOrEqual(minQty);
    this.log.logger(`Cart quantity is ${qty}`);
  }
}

export default { productPage };
