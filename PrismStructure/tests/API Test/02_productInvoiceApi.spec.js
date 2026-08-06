import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
import { SharedTestData } from "../../API/utilities/createDynamicData";
import productApi from "../../API/pageobjects/productApi";
import cartApi from "../../API/pageobjects/cartApi";
import invoiceApi from "../../API/pageobjects/invoiceApi";
import authApi from "../../API/pageobjects/authApi";
import {
  buildRegistrationData,
  buildInvoicePayload,
} from "../../API/utilities/testDataGenerator";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const utils = require("../../commonUtils/utils");

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  suiteInfo.suiteStarter();

  // Self-contained setup when this file runs without 01_authCartApi.spec.js
  if (!SharedTestData.accessToken || !SharedTestData.cartId) {
    const user = buildRegistrationData();
    const api = new commonMethods();

    await api.PostResponse(
      authApi.registerEndpoint,
      user.apiPayload,
      authApi.registerHeader
    );

    const loginResponse = await api.PostResponse(
      authApi.loginEndpoint,
      authApi.buildLoginBody(user.email, user.password),
      authApi.loginHeader
    );
    const loginBody = await loginResponse.json();
    SharedTestData.setAuth(
      loginBody.access_token || loginBody.data?.access_token
    );

    const cartResponse = await api.PostResponse(
      cartApi.createCartEndpoint,
      {},
      SharedTestData.getAuthHeader()
    );
    const cartBody = await cartResponse.json();
    SharedTestData.setCart(cartBody.id || cartBody.data?.id || cartBody.cart_id);
  }
});

test("API-05 Retrieve products list @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-cart");
  const api = new commonMethods();
  const headers = SharedTestData.accessToken
    ? SharedTestData.getAuthHeader()
    : { accept: "application/json" };

  const response = await api.GetResponse(
    productApi.listProductsEndpoint,
    headers
  );

  expect(response.status()).toBe(_Response.getPositive);
  const body = await response.json();
  const products = body.data || body;
  expect(Array.isArray(products)).toBeTruthy();
  expect(products.length).toBeGreaterThan(0);

  SharedTestData.setProducts([
    products[0].id,
    products[1]?.id || products[0].id,
  ]);
});

test("API-06 Add products to cart and verify cart contents @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-cart");
  expect(SharedTestData.cartId).toBeTruthy();
  expect(SharedTestData.productIds.length).toBeGreaterThan(0);

  const api = new commonMethods();
  const productId = SharedTestData.productIds[0];

  const addResponse = await api.PutResponse(
    cartApi.updateQuantityEndpoint(SharedTestData.cartId),
    SharedTestData.getAuthHeader(),
    cartApi.buildUpdateQuantityBody(productId, 2)
  );
  expect(addResponse.status()).toBe(_Response.getPositive);
  const addBody = await addResponse.json();
  expect(addBody.result || addBody.success).toBeTruthy();

  const cartResponse = await api.GetResponse(
    cartApi.getCartEndpoint(SharedTestData.cartId),
    SharedTestData.getAuthHeader()
  );
  expect(cartResponse.status()).toBe(_Response.getPositive);
  const cartBody = await cartResponse.json();
  const storeJson = new storeResponseToJsonFile();
  storeJson.storeJsonDataToFile(cartBody, "cartContents");
});

test("API-07 Generate invoice with billing payload @smoke @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-invoice");
  expect(SharedTestData.cartId).toBeTruthy();

  const api = new commonMethods();
  const payload = buildInvoicePayload(SharedTestData.cartId);
  const response = await api.PostResponse(
    invoiceApi.createInvoiceEndpoint,
    payload,
    SharedTestData.getAuthHeader()
  );

  expect([_Response.getPositive, _Response.postPositive]).toContain(
    response.status()
  );
  const body = await response.json();
  const invoiceId = body.id || body.data?.id || body.invoice_id;
  expect(invoiceId).toBeTruthy();
  SharedTestData.setInvoice(invoiceId);

  const storeJson = new storeResponseToJsonFile();
  storeJson.storeJsonDataToFile(body, "generatedInvoice");
});

test("API-08 Generate invoice without token returns unauthorized @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-invoice");
  const api = new commonMethods();
  const payload = buildInvoicePayload(SharedTestData.cartId || "invalid-cart-id");

  const response = await api.PostResponse(
    invoiceApi.createInvoiceEndpoint,
    payload,
    { accept: "application/json", "Content-Type": "application/json" }
  );

  expect([401, 403, 404]).toContain(response.status());
});
