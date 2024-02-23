import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";
import * as os from "os";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: `./testsEnv/.env.${process.env.ENV}`
});
export default defineConfig({
  use: {
    baseURL: "https://demowebshop.tricentis.com",
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'off',
    video: 'on'
  },
  reporter: [["line"],["list"],
  [
    "allure-playwright",
    {
      detail: true,
      suiteTitle: false,
      environmentInfo: {
        os_platform: os.platform(),
        os_release: os.release(),
        os_version: os.version(),
        node_version: process.version,
      },
    },
  ],],
  // reporter: 'html',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1: 2,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: "./",
      testMatch: "global-setup.ts",
      teardown: "teardown"
    },
    {
      name: 'teardown',
      testDir: "./",
      testMatch: "global-tearDown.ts",
      use: {
        storageState: "./STORAGE_STATE.json"
      },
    },
    {
      name: 'chromium',
      testMatch: '**/cartAllure.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: "./STORAGE_STATE.json",
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
