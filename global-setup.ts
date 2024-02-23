import { test, expect } from './po/base/baseTests';
    test('Log in to page successfully', async ({ page, baseURL, homePage, loginPage },testInfo) => {
      await test.step("I go to Log in page", async () => {
        await homePage.navigate(`${baseURL}/login`);
        await homePage.screenshot(testInfo);
      });
      await test.step("I log in to page", async () => {
        await loginPage.loginToPage(process.env.EMAIL!,process.env.PASSWORD!);
        await loginPage.screenshot(testInfo);
        await (await loginPage.context()).storageState({ path: "./STORAGE_STATE.json" });
        await loginPage.closePage();
      });
    });
