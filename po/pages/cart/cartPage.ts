import {Page, expect} from "@playwright/test";
import CartSelectors from './cart.selector';
import { BasePage } from "../../base/basePage";
export default class CartPage extends BasePage{
    cartSelectors = new CartSelectors();

    async verifyProductIsInCart(productName: string){
         expect(await this.page.locator(`//td[@class='product']/a[text()='${productName}']`).isVisible());
    }
    async verifyEmtptyCart(){
        expect(await this.page.locator(this.cartSelectors.EMPTY_CART).isVisible());
    }
    async chooseProductToRemoveFromCart(productName: string){
        await this.page.locator(`//a[@class = 'product-name' and text() = '${productName}']//parent::td//preceding-sibling::td//input[@name='removefromcart']`).click();
    }
    async getProductQty(productName: string){
        const quatityElement = this.page.locator(`//a[@class = 'product-name' and text() = '${productName}']//parent::td//following-sibling::td[@class='qty nobr']/input`);
        const qtyValue = await quatityElement.getAttribute('value');
        const qty = parseInt(qtyValue!);
        return qty;
    }

    async clickOnUpdateShoppingCartBtn(){
        await this.page.locator(this.cartSelectors.UPDATE_SHOPPING_CART_BTN).click();
    }
    async removeAllFromCart(){
        const items = await this.page.locator(this.cartSelectors.REMOVE_FROM_CART_CHECKBOX).all();
        if(items.length > 0){
            for(let index = 0; index < items.length; index++){
                await items[index].click();
            }
            await this.clickOnUpdateShoppingCartBtn();  
        }
    }

}