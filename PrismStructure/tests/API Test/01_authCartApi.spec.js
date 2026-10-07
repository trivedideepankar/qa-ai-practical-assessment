import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
import { SharedTestData } from "../../API/utilities/createDynamicData";
import authApi from "../../API/pageobjects/authApi";
import cartApi from "../../API/pageobjects/cartApi";
import {
  buildRegistrationData,
} from "../../API/utilities/testDataGenerator";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const utils = require("../../commonUtils/utils");

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
  SharedTestData.accessToken = null;
  SharedTestData.cartId = null;
});

test("API-01 Register user via API @smoke @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-auth");
  const user = buildRegistrationData();
  SharedTestData.userEmail = user.email;
  SharedTestData.userPassword = user.password;

  const api = new commonMethods();
  const response = await api.PostResponse(
    authApi.registerEndpoint,
    user.apiPayload,
    authApi.registerHeader
  );

  expect(response.status()).toBe(_Response.postPositive);
  const body = await response.json();
  const storeJson = new storeResponseToJsonFile();
  storeJson.storeJsonDataToFile(body, "registeredUser");
  SharedTestData.userId = body.id || body.data?.id;
});

test("API-02 Login and obtain bearer token @smoke @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-auth");
  const api = new commonMethods();
  const loginBody = authApi.buildLoginBody(
    SharedTestData.userEmail,
    SharedTestData.userPassword
  );
  const response = await api.PostResponse(
    authApi.loginEndpoint,
    loginBody,
    authApi.loginHeader
  );

  expect(response.status()).toBe(_Response.getPositive);
  const body = await response.json();
  const token = body.access_token || body.data?.access_token;
  expect(token).toBeTruthy();
  SharedTestData.setAuth(token, SharedTestData.userId);

  const storeJson = new storeResponseToJsonFile();
  storeJson.storeJsonDataToFile(body, "AccessToken");
});

test("API-03 Login with invalid credentials returns error @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-auth");
  const api = new commonMethods();
  const response = await api.PostResponse(
    authApi.loginEndpoint,
    authApi.buildLoginBody("invalid@example.com", "wrongpassword"),
    authApi.loginHeader
  );

  expect([401, 400, 422]).toContain(response.status());
});

test("API-04 Create cart with bearer token @regression", async () => {
  await utils.addTestAnnotationsByKeyword("api-cart");
  const api = new commonMethods();
  const response = await api.PostResponse(
    cartApi.createCartEndpoint,
    {},
    SharedTestData.getAuthHeader()
  );

  expect([_Response.postPositive, _Response.getPositive]).toContain(
    response.status()
  );
  const body = await response.json();
  const cartId = body.id || body.data?.id || body.cart_id;
  expect(cartId).toBeTruthy();
  SharedTestData.setCart(cartId);

  const storeJson = new storeResponseToJsonFile();
  storeJson.storeJsonDataToFile(body, "createdCart");
});
