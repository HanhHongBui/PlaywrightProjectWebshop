import {test as baseTests} from "@playwright/test";
import LoginPage from '../pages/login/loginPage';
import HomePage from '../pages/home/homePage';
import ProductsPage from '../pages/products/productsPage';
import CartPage from '../pages/cart/cartPage';
import MyAccountPage from '../pages/myAccount/myAccountPage';
type pages = {
    loginPage : LoginPage;
    homePage: HomePage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    myAccountPage: MyAccountPage;
}

const testPages = baseTests.extend<pages>({
    loginPage: async ({page},use) =>{
        await use(new LoginPage(page));
    },
    homePage: async ({page},use) =>{
        await use(new HomePage(page));
    },
    productsPage: async ({page}, use) =>{
        await use(new ProductsPage(page));
    },
    cartPage: async ({page}, use) =>{
        await use(new CartPage(page));
    },
    myAccountPage: async ({page}, use) =>{
        await use(new MyAccountPage(page));
    }
})

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const test = testPages;
export const expect = testPages.expect;