import {Page, expect} from "@playwright/test";
import ProductsSelectors from './products.selector';
import { BasePage } from "../../base/basePage";
export default class ProductsPage extends BasePage{
    productsSelectors = new ProductsSelectors();

    async clickOnAddToCartBtn(productTitle: string){
        await this.page.locator(`//a[text()='${productTitle}']//parent::h2//following-sibling::div[@class='add-info']/div/input[@value='Add to cart']`).click({ force: true });
    }
    async clickOnAddToCartBtnInProductDetails(){
        await this.page.locator(this.productsSelectors.PROD_DETAILS_PAGE_ADD_TO_CART_BTN).click();
    }
    async verifySuccessNotiBar(){
         expect(await this.page.locator(this.productsSelectors.BAR_NOTI_SUCCESS).isVisible());
    }
    async verifyProductNameDisplayed(productName: string){
        expect(await this.page.locator(`//h1[contains(text(),'${productName}')]`).isVisible());
    }
    async clickOnShoppingCartLinkInNotiBar(){
        await this.page.locator(this.productsSelectors.SHOPPING_CART_LINK_IN_NOTI).click();
    }

}