// @ts-check
import { defineConfig } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  retries: 1,
  workers: 1,
  timeout: 250 * 1000,
  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: "data-test",
  },
  expect: {
    timeout: 60000,
  },
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],
  projects: [
    {
      name: "testcases_smoke",
      testMatch: "**/*.spec.js",
      grep: /@smoke/,
      use: {
        channel: "chrome",
        browserName: "chromium",
        headless: true,
        screenshot: "only-on-failure",
        video: "off",
        trace: "retain-on-failure",
      },
    },
    {
      name: "testcases_regression",
      testMatch: "**/*.spec.js",
      use: {
        channel: "chrome",
        browserName: "chromium",
        headless: true,
        screenshot: "only-on-failure",
        video: "off",
        trace: "retain-on-failure",
      },
    },
  ],
});
