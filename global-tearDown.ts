import { test, expect } from './po/base/baseTests';
    test('Log out from page', async ({ baseURL, homePage },testInfo) => {
      await test.step("I log out from page", async () => {
        await homePage.navigate(`${baseURL}`);
        await homePage.logout();
        await homePage.screenshot(testInfo);
        await homePage.closePage();
      });
    });
