import { expect, test, delay } from '../po/base/baseTests';
import addAddress1 from "../po/testData/addAddress1.json"; 
import addAddress2 from "../po/testData/addAddress2.json";
import { allure } from "allure-playwright";
test.beforeEach(async ({ baseURL, homePage, page }) => {
  await allure.description(
    "Navigate to My account page before each test",
  );
  await homePage.navigate(`${baseURL}/customer/info`);
  await allure.attachment("my-account-page.png", await page.screenshot(), {
    contentType: "image/png",
  });
})

test.describe("Add new address in My Account page", () => {
  test('Add new customer address', async ({ page, myAccountPage }) => {
    await allure.parentSuite("My account page");
    await allure.suite("Address page");
    await allure.subSuite("Add new Address");
    allure.owner("Hanh Bui");
    allure.tags("NewUI", "DemoWebshop")

    await allure.step("I navigate to Addresses page", async () => {
      await myAccountPage.clickOnLinkInSidebar("Addresses")
      await allure.attachment("Addresses-page.png", await page.screenshot(), {
        contentType: "image/png",
      });
    });

    for (const addresses of [addAddress1, addAddress2]) {
      await allure.step("I click on Add new button", async () => {
        await myAccountPage.clickOnButton("Add new");
        await allure.attachment("click-Add-new.png", await page.screenshot(), {
          contentType: "image/png",
        });
      });
      await allure.step("I fill in information of the new address", async () => {
        await allure.parameter("address", addresses);
        await myAccountPage.addNewAddress(addresses);
        await allure.attachment("fill-info.png", await page.screenshot(), {
          contentType: "image/png",
        });
      });

      await allure.step("I click on Save button", async () => {
        await myAccountPage.clickOnButton("Save");
        await allure.attachment("click-save.png", await page.screenshot(), {
          contentType: "image/png",
        });
      });
    }
  });
})



