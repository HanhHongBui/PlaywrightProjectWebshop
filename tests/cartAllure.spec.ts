import { expect, test, delay } from '../po/base/baseTests';
import { allure } from "allure-playwright";

test.beforeEach(async ({ baseURL, homePage, page }) => {
  await homePage.navigate(`${baseURL}`);
  await allure.attachment("home-page.png", await page.screenshot(), {
    contentType: "image/png",
  });
  await allure.parentSuite("Cart page");
  await allure.suite("Add products");
  allure.owner("Hanh Bui");
})

test('Add product to cart from sub product page', async ({ homePage, productsPage, cartPage, page }, testInfo) => {
  await allure.description(
    "Add product to cart from sub product page",
  );
  const productName = "Smartphone";
  await allure.step("I navigate to product sub-category page", async () => {
    await homePage.goToSubProductPage("Electronics", "Cell phones")
    await allure.attachment("sub-category.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I add product to cart", async () => {
    await productsPage.clickOnAddToCartBtn(productName);
    await allure.attachment("add-product.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I should see success notification bar displayed", async () => {
    await productsPage.verifySuccessNotiBar();
    await allure.attachment("success-notification.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I navigate to shopping cart from link in the notification bar", async () => {
    await productsPage.clickOnShoppingCartLinkInNotiBar();
    await allure.attachment("shopping-cart.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I should see the added product in the shopping cart", async () => {
    await cartPage.verifyProductIsInCart(productName);
    await allure.attachment("added-product.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

});

test('Add product to cart from product details page', async ({ page, homePage, productsPage, cartPage }, testInfo) => {
  await allure.description(
    "Add product to cart from product details page",
  );
  const productName = "Blue and green Sneaker";
  await allure.step("I navigate to product category page", async () => {
    await homePage.goToProductPage("Apparel & Shoes");
    await allure.attachment("product-category.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I click on Add to cart button", async () => {
    await productsPage.clickOnAddToCartBtn(productName);
    await allure.attachment("click-Add-to-cart.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I should see product name displayed in product details page", async () => {
    await productsPage.verifyProductNameDisplayed(productName);
    await allure.attachment("product-details.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I click on Add to cart button in product details page", async () => {
    await productsPage.clickOnAddToCartBtnInProductDetails();
    await allure.attachment("click-Add-to-cart-product-details.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I should see success notification bar displayed", async () => {
    await productsPage.verifySuccessNotiBar();
    await allure.attachment("success-notification.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I navigate to shopping cart from link in the notification bar", async () => {
    await productsPage.clickOnShoppingCartLinkInNotiBar();
    await allure.attachment("shopping-cart.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });

  await allure.step("I should see the added product in the shopping cart", async () => {
    await cartPage.verifyProductIsInCart(productName);
    await allure.attachment("added-product.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });
});
test.afterEach(async ({ cartPage, page }) => {
  await allure.step("I remove all items in the shopping cart", async () => {
    await cartPage.removeAllFromCart();
    await allure.attachment("remove.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });
  await allure.step("I should see text informing the shopping cart is empty", async () => {
    await cartPage.verifyEmtptyCart();
    await allure.attachment("empty-cart.png", await page.screenshot(), {
      contentType: "image/png",
    });
  });
})

