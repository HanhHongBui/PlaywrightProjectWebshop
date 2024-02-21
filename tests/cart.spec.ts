import { expect, test, delay } from '../po/base/baseTests';
test.beforeAll('Before all test', async () => {
  console.log("Before all tests");
});
test.beforeEach(async ({baseURL, homePage},testInfo)=>{
    console.log("Before each test");
    await homePage.navigate(`${baseURL}`);
    await homePage.screenshot(testInfo);
})

test.describe("Add product to cart", () => {
  test('Add product to cart from sub product page', async ({ homePage, productsPage, cartPage }, testInfo) => {
    const productName = "Smartphone";
    await test.step("I navigate to product sub-category page", async () => {
      await homePage.goToSubProductPage("Electronics","Cell phones")
      await homePage.screenshot(testInfo);
    });
 
    await test.step("I add product to cart", async () => {
      await productsPage.clickOnAddToCartBtn(productName);
      await productsPage.screenshot(testInfo)
    });

    await test.step("I should see success notification bar displayed", async () => {
      await productsPage.verifySuccessNotiBar();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I navigate to shopping cart from link in the notification bar", async () => {
      await productsPage.clickOnShoppingCartLinkInNotiBar();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I should see the added product in the shopping cart", async () => {
      await cartPage.verifyProductIsInCart(productName);
      await cartPage.screenshot(testInfo)
    });

  });

  test('Add product to cart from product details page', async ({ baseURL, homePage, productsPage, cartPage }, testInfo) => {
    const productName = "Blue and green Sneaker";
    await test.step("I navigate to product category page", async () => {
      await homePage.goToProductPage("Apparel & Shoes");
      await homePage.screenshot(testInfo);
    });
 
    await test.step("I click on Add to cart button", async () => {
      await productsPage.clickOnAddToCartBtn(productName);
      await productsPage.screenshot(testInfo)
    });

    await test.step("I should see product name displayed in product details page", async () => {
      await productsPage.verifyProductNameDisplayed(productName);
      await productsPage.screenshot(testInfo)
    });

    await test.step("I click on Add to cart button in product details page", async () => {
      await productsPage.clickOnAddToCartBtnInProductDetails();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I should see success notification bar displayed", async () => {
      await productsPage.verifySuccessNotiBar();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I navigate to shopping cart from link in the notification bar", async () => {
      await productsPage.clickOnShoppingCartLinkInNotiBar();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I should see the added product in the shopping cart", async () => {
      await cartPage.verifyProductIsInCart(productName);
      await cartPage.screenshot(testInfo)
    });
  });
})

test.describe("Add multiple products to cart", () => {
  test('Add multiple products to cart', async ({ homePage, productsPage, cartPage }, testInfo) => {
    const productName1 = "Fiction";
    const productName2 = "14.1-inch Laptop";
   
    await test.step("I navigate to product category page", async () => {
      await homePage.goToProductPage("Books");
      await homePage.screenshot(testInfo);
    });
 
    await test.step("I add 1st product to cart", async () => {
      await productsPage.clickOnAddToCartBtn(productName1);
      await productsPage.waitForPageToLoad()
      await productsPage.screenshot(testInfo)
    });

    await test.step("I navigate to product sub-category page", async () => {
      await homePage.goToSubProductPage("Computers","Notebooks")
      await homePage.screenshot(testInfo);
    });
 
    await test.step("I add 2nd product to cart", async () => {
      await productsPage.clickOnAddToCartBtn(productName2);
      await productsPage.screenshot(testInfo)
    });
    
    await test.step("I should see success notification bar displayed", async () => {
      await productsPage.verifySuccessNotiBar();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I navigate to shopping cart from link in the notification bar", async () => {
      await productsPage.clickOnShoppingCartLinkInNotiBar();
      await productsPage.screenshot(testInfo)
    });

    await test.step("I should see the added product in the shopping cart", async () => {
      await cartPage.verifyProductIsInCart(productName1);
      await cartPage.verifyProductIsInCart(productName2);
      await cartPage.screenshot(testInfo)
    });

    await test.step("I should see the correct quantity of added products in the shopping cart", async () => {
      expect((await cartPage.getProductQty(productName1)) == 1);
      expect((await cartPage.getProductQty(productName2)) == 1);
      await cartPage.screenshot(testInfo)
    });

  });

 
})
test.afterEach(async ({cartPage},testInfo)=>{
  console.log("After each test");
  await test.step("I remove all items in the shopping cart", async () => {
    await cartPage.removeAllFromCart();
    await cartPage.screenshot(testInfo)
  });

  await test.step("I should see text informing the shopping cart is empty", async () => {
    await cartPage.verifyEmtptyCart();
    await cartPage.screenshot(testInfo)
  });
})
test.afterAll('After all test', async () => {
  console.log("after all tests")
});

