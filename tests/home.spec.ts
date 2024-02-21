import { test } from '../po/base/baseTests';
test.describe("Verify successful log in", () => {
  test('Verify successful log in', async ({ baseURL, homePage }, testInfo) => {
    await test.step("I go to home page", async () => {
      await homePage.navigate(`${baseURL}`);
      await homePage.screenshot(testInfo);
    });
 
    await test.step("I see user email address displayed", async () => {
       await homePage.verifyUserEmailDisplayed(process.env.EMAIL!);
    });
  });
})

